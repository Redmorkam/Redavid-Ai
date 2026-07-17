import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import FileUpload from '../components/FileUpload'
import ModelSelector from '../components/ModelSelector'
import Slider from '../components/Slider'
import { VIDEO_DURATIONS, VIDEO_ASPECT_RATIOS, VIDEO_RESOLUTIONS, CAMERA_MOTIONS } from '../utils/constants'
import { VideoGenerationRequest } from '../types'
import { Sparkles } from 'lucide-react'
import { useVideoGeneration } from '../hooks/useGeneration'

const VideosPage = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('veo')
  const [duration, setDuration] = useState(10)
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [resolution, setResolution] = useState('1080p')
  const [cameraMotion, setCameraMotion] = useState('cinematic')
  const [motionIntensity, setMotionIntensity] = useState(5)
  const [referenceImage, setReferenceImage] = useState<File | null>(null)

  const { generate, isGenerating, progress } = useVideoGeneration()

  const handleGenerateVideo = async () => {
    if (!prompt.trim()) return

    const request: VideoGenerationRequest = {
      prompt,
      model: selectedModel as any,
      duration: duration as any,
      aspectRatio: aspectRatio as any,
      fps: 30,
      resolution: resolution as any,
      cameraMotion: cameraMotion as any,
      motionIntensity,
    }

    try {
      await generate(prompt, request)
    } catch (error) {
      console.error('Generation failed:', error)
    }
  }

  return (
    <div className="flex-1 pb-24 px-4 py-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">AI Video Generator</h1>
          <p className="text-dark-600 dark:text-dark-300">Create cinematic videos with AI-powered effects</p>
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
                  <label className="text-sm font-medium block mb-2">Video Description</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the video you want to generate..."
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring resize-none"
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleGenerateVideo}
                  isLoading={isGenerating}
                  icon={<Sparkles size={18} />}
                  className="w-full"
                >
                  {isGenerating ? `Generating... ${progress}%` : 'Generate Video'}
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
                <ModelSelector type="video" value={selectedModel} onChange={setSelectedModel} />

                <div className="space-y-3">
                  <label className="text-sm font-medium">Duration (seconds)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {VIDEO_DURATIONS.map((dur) => (
                      <motion.button
                        key={dur}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setDuration(dur)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          duration === dur
                            ? 'bg-primary-500 text-white'
                            : 'bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700'
                        }`}
                      >
                        {dur}s
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring"
                  >
                    {VIDEO_ASPECT_RATIOS.map((ratio) => (
                      <option key={ratio} value={ratio}>
                        {ratio}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Resolution</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring"
                  >
                    {VIDEO_RESOLUTIONS.map((res) => (
                      <option key={res.value} value={res.value}>
                        {res.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Camera Motion</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {CAMERA_MOTIONS.map((motion) => (
                      <motion.button
                        key={motion.id}
                        whileHover={{ x: 4 }}
                        onClick={() => setCameraMotion(motion.id)}
                        className={`w-full text-left p-2 rounded-lg transition-all ${
                          cameraMotion === motion.id
                            ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-500'
                            : 'bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 hover:border-primary-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{motion.name}</div>
                        <div className="text-xs text-dark-500 dark:text-dark-400">{motion.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <Slider
                  label="Motion Intensity"
                  value={motionIntensity}
                  onChange={setMotionIntensity}
                  min={0}
                  max={10}
                  step={1}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VideosPage