'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSound } from '@/components/hooks/useSound'

export default function SoundToggle() {
  const { soundEnabled, toggleSound } = useSound()
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSound}
      className="p-2 rounded-full bg-bg-light"
      aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
    >
      {soundEnabled ? (
        <motion.svg
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ai-blue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 9h.01M15 15h.01"
          />
        </motion.svg>
      ) : (
        <motion.svg
          initial={{ rotate: 20 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clipRule="evenodd"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </motion.svg>
      )}
    </motion.button>
  )
}