import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

const Card = ({ children, className = '', onClick, hover = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)' } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card