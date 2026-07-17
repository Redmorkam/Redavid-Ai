import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import FileUpload from '../components/FileUpload'
import ModelSelector from '../components/ModelSelector'
import Slider from '../components/Slider'
import PromptStudio from '../components/PromptStudio'
import { IMAGE_SIZES, IMAGE_MODELS } from '../utils/constants'
import { ImageGenerationRequest } from '../types'
import { Sparkles, Wand2, Library } from 'lucide-react'
import { useImageGeneration, usePromptEnhancer } from '../hooks/useGeneration'

const ImagesPage = () => {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('flux-pro')
  const [selectedSize, setSelectedSize] = useState('1024x1024')
  const [quantity, setQuantity] = useState(1)
  const [guidanceScale, setGuidanceScale] = useState(7.5)
  const [promptStudioOpen, setPromptStudioOpen] = useState(false)
  const [referenceImage, setReferenceImage] = useState<File | null>(null)

  const { generate, isGenerating, progress } = useImageGeneration()
  const { enhance, isEnhancing } = usePromptEnhancer()

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return

    const request: ImageGenerationRequest = {
      prompt,
      negativePrompt,
      model: selectedModel as any,
      size: selectedSize,
      quantity,
      guidance_scale: guidanceScale,
    }

    try {
      await generate(prompt, request)
    } catch (error) {
      console.error('Generation failed:', error)
    }
  }

  const handleEnhancePrompt = async () => {
    try {
      const enhanced = await enhance(prompt)
      setPrompt(enhanced)
    } catch (error) {
      console.error('Enhancement failed:', error)
    }
  }

  return (
    <div className="flex-1 pb-24 px-4 py-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">AI Image Generator</h1>
          <p className="text-dark-600 dark:text-dark-300">Create stunning images from text or reference images</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Prompt</label>
                    <button
                      onClick={() => setPromptStudioOpen(true)}
                      className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1"
                    >
                      <Library size={14} /> Templates
                    </button>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring resize-none"
                    rows={4}
                  />
                  <div className="text-xs text-dark-500 dark:text-dark-400 mt-2">
                    {prompt.length} characters
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Negative Prompt (Optional)</label>
                  <input
                    type="text"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="What should NOT be in the image..."
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<Wand2 size={16} />}
                    onClick={handleEnhancePrompt}
                    isLoading={isEnhancing}
                  >
                    Enhance Prompt
                  </Button>
                </div>

                <Button
                  onClick={handleGenerateImage}
                  isLoading={isGenerating}
                  icon={<Sparkles size={18} />}
                  className="w-full"
                >
                  {isGenerating ? `Generating... ${progress}%` : 'Generate Image'}
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Reference Image (Optional)</h3>
              <FileUpload onFileSelected={(file) => setReferenceImage(file)} accept="image/*" />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card>
              <div className="space-y-6">
                <ModelSelector type="image" value={selectedModel} onChange={setSelectedModel} />

                <div className="space-y-3">
                  <label className="text-sm font-medium">Image Size</label>
                  <div className="space-y-2">
                    {IMAGE_SIZES.square.map((size) => (
                      <motion.button
                        key={size.value}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedSize(size.value)}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedSize === size.value
                            ? 'bg-primary-500 text-white'
                            : 'bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700'
                        }`}
                      >
                        {size.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Number of Images</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} Image{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <Slider
                  label="Guidance Scale"
                  value={guidanceScale}
                  onChange={setGuidanceScale}
                  min={1}
                  max={20}
                  step={0.5}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <PromptStudio
        isOpen={promptStudioOpen}
        onClose={() => setPromptStudioOpen(false)}
        onSelectPrompt={(selectedPrompt) => setPrompt(selectedPrompt)}
      />
    </div>
  )
}

export default ImagesPage