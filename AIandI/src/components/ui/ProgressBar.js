'use client'

import { motion } from 'framer-motion'

const ProgressBar = ({ progress, className = '', ...props }) => {
  return (
    <div className={`w-full h-4 bg-bg-dark rounded-full overflow-hidden ${className}`} {...props}>
      <motion.div 
        className="h-full bg-gradient-to-r from-ai-blue to-ai-purple"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

export default ProgressBar