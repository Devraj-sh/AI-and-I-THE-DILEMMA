'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SoundToggle } from '@/components/ui/SoundToggle'
import { useSound } from '@/components/hooks/useSound'
import { useGameProgress } from '@/components/hooks/useGameProgress'

export default function Header() {
  const { playSound } = useSound()
  const { totalProgress } = useGameProgress()

  return (
    <header className="py-4 px-6 bg-bg-medium/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="text-2xl">🧠</div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-ai-blue to-ai-purple text-transparent bg-clip-text">
            AI & I: THE DILEMMA
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          {totalProgress > 0 && (
            <div className="hidden md:flex items-center space-x-2 bg-bg-light/50 px-3 py-1 rounded-full">
              <span className="text-sm">Progress:</span>
              <div className="w-24 h-2 bg-bg-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-ai-blue to-ai-purple"
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold">{totalProgress}%</span>
            </div>
          )}
          <SoundToggle />
        </motion.div>
      </div>
    </header>
  )
}