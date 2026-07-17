import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const LoadingAnimation = ({ size = 'md', text }: LoadingAnimationProps) => {
  const sizeMap = {
    sm: { loader: 24, dot: 6 },
    md: { loader: 40, dot: 8 },
    lg: { loader: 60, dot: 10 },
  }

  const current = sizeMap[size]

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Loader size={current.loader} className="text-primary-500" />
      </motion.div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className={`w-${current.dot} h-${current.dot} rounded-full bg-gradient-premium`}
          />
        ))}
      </div>

      {text && <p className="text-sm text-dark-600 dark:text-dark-300 font-medium">{text}</p>}
    </div>
  )
}

export default LoadingAnimation