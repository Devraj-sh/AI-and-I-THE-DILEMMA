'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import GameHub from '@/components/games/GameHub'
import AIMasteryLab from '@/components/lab/AIMasteryLab'
import { useSound } from '@/components/hooks/useSound'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const { playSound } = useSound()

  const handleSectionChange = (section) => {
    playSound('click')
    setActiveSection(section)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {activeSection === 'home' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 glow-text text-transparent bg-clip-text bg-gradient-to-r from-ai-blue to-ai-purple"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              AI & I: THE DILEMMA
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Explore the fascinating world of artificial intelligence through games and challenges
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 border-ai-blue/30 hover:border-ai-blue/60 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h2 className="text-2xl font-bold mb-4 text-ai-blue">Game Hub</h2>
                <p className="text-gray-300 mb-6">
                  For students aged 10-17. Play 10 exciting games that challenge you against AI and learn how artificial intelligence thinks!
                </p>
                <Button 
                  onClick={() => handleSectionChange('games')}
                  className="w-full"
                >
                  Enter Game Hub
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-2 border-ai-purple/30 hover:border-ai-purple/60 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h2 className="text-2xl font-bold mb-4 text-ai-purple">AI Mastery Lab</h2>
                <p className="text-gray-300 mb-6">
                  For adults (18+). Explore prompt engineering and see how AI processes your requests behind the scenes.
                </p>
                <Button 
                  onClick={() => handleSectionChange('lab')}
                  className="w-full"
                >
                  Enter AI Lab
                </Button>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-ai-blue/10 to-ai-purple/10 border-2 border-white/10">
            <h3 className="text-xl font-bold mb-4 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👤</div>
                <h4 className="font-bold mb-2">Human Intelligence</h4>
                <p className="text-sm text-gray-300">Creativity, emotions, intuition, and abstract thinking</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold mb-2">The Challenge</h4>
                <p className="text-sm text-gray-300">Compete in games that test different aspects of intelligence</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🤖</div>
                <h4 className="font-bold mb-2">Artificial Intelligence</h4>
                <p className="text-sm text-gray-300">Logic, pattern recognition, data processing, and algorithms</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {activeSection === 'games' && <GameHub onBack={() => handleSectionChange('home')} />}
      {activeSection === 'lab' && <AIMasteryLab onBack={() => handleSectionChange('home')} />}
    </div>
  )
}