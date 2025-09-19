'use client'

import { motion } from 'framer-motion'

const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`game-container ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card