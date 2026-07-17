import { motion } from 'framer-motion'
import { Heart, Download, Trash2 } from 'lucide-react'
import Card from './Card'
import { GeneratedImage } from '../types'

interface ImageCardProps {
  image: GeneratedImage
  onFavorite?: (id: string) => void
  onDownload?: (id: string) => void
  onDelete?: (id: string) => void
}

const ImageCard = ({ image, onFavorite, onDownload, onDelete }: ImageCardProps) => {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-48 object-cover rounded-lg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFavorite?.(image.id)}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <Heart
              size={20}
              className={image.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload?.(image.id)}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <Download size={20} className="text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete?.(image.id)}
            className="p-3 rounded-full bg-white/20 hover:bg-red-500/30 backdrop-blur-sm transition-colors"
          >
            <Trash2 size={20} className="text-white" />
          </motion.button>
        </motion.div>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-dark-600 dark:text-dark-400 line-clamp-2">{image.prompt}</p>
        <div className="flex items-center justify-between text-xs text-dark-500 dark:text-dark-400">
          <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
            {image.model}
          </span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  )
}

export default ImageCard