import { motion } from 'framer-motion'
import { IMAGE_MODELS, VIDEO_MODELS } from '../utils/constants'

interface ModelSelectorProps {
  type: 'image' | 'video'
  value: string
  onChange: (value: string) => void
}

const ModelSelector = ({ type, value, onChange }: ModelSelectorProps) => {
  const models = type === 'image' ? IMAGE_MODELS : VIDEO_MODELS

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">AI Model</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {models.map((model) => (
          <motion.button
            key={model.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(model.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              value === model.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-dark-200 dark:border-dark-700 hover:border-primary-300'
            }`}
          >
            <div className="text-2xl mb-2">{model.icon}</div>
            <div className="text-xs font-medium text-center line-clamp-2">{model.name}</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ModelSelector