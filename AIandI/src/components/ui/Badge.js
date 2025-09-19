'use client'

import { motion } from 'framer-motion'

const Badge = ({ children, className = '', earned = false, ...props }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`badge ${earned ? '' : 'grayscale opacity-50'} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Badge