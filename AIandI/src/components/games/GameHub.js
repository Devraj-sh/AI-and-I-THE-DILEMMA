'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import HumanAvatar from '@/components/avatars/HumanAvatar'
import RobotAvatar from '@/components/avatars/RobotAvatar'
import { useSound } from '@/components/hooks/useSound'
import { useGameProgress } from '@/components/hooks/useGameProgress'
import MemeWar from './MemeWar'
import WhatIf from './WhatIf'
import HangmanChallenge from './HangmanChallenge'
import LogicLabyrinth from './LogicLabyrinth'
import EmotionQuest from './EmotionQuest'
import PatternDetective from './PatternDetective'
import CreativityDuel from './CreativityDuel'

const games = [
  { id: 'meme-war', name: 'Meme War', description: 'Creativity vs Logic', icon: '🎭', component: MemeWar },
  { id: 'what-if', name: 'What If?', description: 'Imagination vs Probability', icon: '❓', component: WhatIf },
  { id: 'hangman', name: 'Hangman Challenge', description: 'Intuition vs Data', icon: '🔤', component: HangmanChallenge },
  { id: 'logic-labyrinth', name: 'Logic Labyrinth', description: 'Shortcuts vs Computation', icon: '🧩', component: LogicLabyrinth },
  { id: 'emotion-quest', name: 'Emotion Quest', description: 'Feelings vs Reasoning', icon: '❤️', component: EmotionQuest },
  { id: 'pattern-detective', name: 'Pattern Detective', description: 'Intuition vs Algorithm', icon: '🔍', component: PatternDetective },
  { id: 'creativity-duel', name: 'Creativity Duel', description: 'Imagination vs Data', icon: '🎨', component: CreativityDuel },
  // Additional games would go here
]

export default function GameHub({ onBack }) {
  const { playSound } = useSound()
  const { gameProgress, totalProgress } = useGameProgress()
  const [activeGame, setActiveGame] = useState(null)
  
  const handleGameSelect = (game) => {
    playSound('click')
    setActiveGame(game)
  }
  
  const handleBackToHub = () => {
    playSound('click')
    setActiveGame(null)
  }
  
  if (activeGame) {
    const GameComponent = activeGame.component
    return (
      <GameComponent 
        gameId={activeGame.id}
        onBack={handleBackToHub}
      />
    )
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Button onClick={onBack} variant="secondary">
          ← Back to Home
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Game Hub</h2>
          <p className="text-gray-400">Challenge yourself against AI in these fun games</p>
        </div>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">Your Progress</h3>
          <span className="text-ai-blue font-bold">{totalProgress}%</span>
        </div>
        <ProgressBar progress={totalProgress} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {games.map((game, index) => {
          const progress = gameProgress[game.id] ? 
            Object.values(gameProgress[game.id]).reduce((acc, score) => acc + score, 0) / 
            Object.keys(gameProgress[game.id]).length : 0
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card 
                className={`level-card p-6 cursor-pointer h-full flex flex-col ${progress > 0 ? 'border-ai-blue/50' : ''}`}
                onClick={() => handleGameSelect(game)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{game.icon}</div>
                  {progress > 0 && (
                    <div className="text-xs font-bold px-2 py-1 rounded-full bg-ai-blue/20 text-ai-blue">
                      {Math.round(progress)}% Complete
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{game.description}</p>
                
                <div className="mt-auto">
                  <div className="w-full h-2 bg-bg-dark rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-ai-blue to-ai-purple"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <Button className="w-full">
                    {progress > 0 ? 'Continue' : 'Start Game'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
      
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-center">Your Badges</h3>
        <div className="flex justify-center space-x-6">
          <Badge earned={totalProgress >= 10}>🥉</Badge>
          <Badge earned={totalProgress >= 50}>🥈</Badge>
          <Badge earned={totalProgress >= 100}>🥇</Badge>
        </div>
      </Card>
      
      <div className="flex justify-center space-x-4 mb-8">
        <HumanAvatar thought="I can beat the AI!" />
        <RobotAvatar message="I calculate a 97.3% chance of victory." />
      </div>
    </div>
  )
}