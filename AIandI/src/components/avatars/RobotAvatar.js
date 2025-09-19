'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTextToSpeech } from '@/components/hooks/useSound'

export default function RobotAvatar({ message, className = '', onSpeakComplete }) {
  const [showMessage, setShowMessage] = useState(false)
  const { speak, isSpeaking } = useTextToSpeech()
  
  const handleSpeak = () => {
    if (message) {
      speak(message, { voice: 'ai' })
      if (onSpeakComplete) {
        // Simulate completion after speaking
        setTimeout(onSpeakComplete, message.length * 50) // Rough estimate
      }
    }
  }
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setShowMessage(true)}
        onHoverEnd={() => setShowMessage(false)}
        onClick={handleSpeak}
      >
        <img 
          src="/assets/avatars/robot-avatar.png" 
          alt="AI Player" 
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 ${isSpeaking ? 'border-ai-purple animate-pulse' : 'border-ai-purple/50'} cursor-pointer`}
        />
        
        {message && showMessage && (
          <motion.div 
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="robot-message">
              {message}
            </div>
          </motion.div>
        )}
        
        {isSpeaking && (
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-6 h-6 rounded-full bg-ai-purple flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <div className="mt-4 text-center">
        <h3 className="font-bold text-ai-purple">AI</h3>
        <p className="text-sm text-gray-400">Artificial Intelligence</p>
      </div>
    </div>
  )
}