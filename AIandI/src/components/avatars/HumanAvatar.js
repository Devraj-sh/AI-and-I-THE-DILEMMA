'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HumanAvatar({ thought, className = '' }) {
  const [showThought, setShowThought] = useState(false)
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setShowThought(true)}
        onHoverEnd={() => setShowThought(false)}
      >
        <img 
          src="/assets/avatars/human-avatar.png" 
          alt="Human Player" 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-human-orange/50"
        />
        
        {thought && showThought && (
          <motion.div 
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="thought-bubble">
              {thought}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="mt-4 text-center">
        <h3 className="font-bold text-human-orange">You</h3>
        <p className="text-sm text-gray-400">Human Player</p>
      </div>
    </div>
  )
}