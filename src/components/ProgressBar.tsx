import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

const ProgressBar = ({ progress = 0 }: ProgressBarProps) => (
  <div className="w-full h-2 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-full bg-gradient-premium"
      transition={{ duration: 0.3 }}
    />
  </div>
)

export default ProgressBar