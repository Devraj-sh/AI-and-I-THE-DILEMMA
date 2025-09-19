'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import HumanAvatar from '@/components/avatars/HumanAvatar'
import RobotAvatar from '@/components/avatars/RobotAvatar'
import { useSound } from '@/components/hooks/useSound'
import { useGameProgress } from '@/components/hooks/useGameProgress'
import { useTextToSpeech } from '@/components/hooks/useSound'

export default function GameTemplate({ 
  gameId, 
  gameName, 
  gameDescription, 
  levels, 
  onBack,
  renderGameLevel
}) {
  const { playSound } = useSound()
  const { updateLevelProgress, getLevelProgress, earnBadge } = useGameProgress()
  const { speak } = useTextToSpeech()
  
  const [currentLevel, setCurrentLevel] = useState(1)
  const [gameState, setGameState] = useState('intro') // intro, playing, levelComplete, gameComplete
  const [score, setScore] = useState(0)
  const [humanThought, setHumanThought] = useState('')
  const [aiMessage, setAiMessage] = useState('')
  const [isAIThinking, setIsAIThinking] = useState(false)
  
  const handleStartGame = () => {
    playSound('click')
    setGameState('playing')
    setHumanThought("Let's do this!")
    setAiMessage("Initializing game logic...")
    speak("Initializing game logic...", { voice: 'ai' })
  }
  
  const handleNextLevel = () => {
    playSound('levelComplete')
    
    if (currentLevel < levels.length) {
      setCurrentLevel(prev => prev + 1)
      setGameState('playing')
      setHumanThought("Next level, here I come!")
      setAiMessage(`Analyzing level ${currentLevel + 1} parameters...`)
      speak(`Analyzing level ${currentLevel + 1} parameters...`, { voice: 'ai' })
    } else {
      // Game completed
      setGameState('gameComplete')
      setHumanThought("I did it! I beat all the levels!")
      setAiMessage("Calculating final performance metrics... Human capabilities exceed my projections.")
      speak("Calculating final performance metrics... Human capabilities exceed my projections.", { voice: 'ai' })
      
      // Award badge if game is completed
      earnBadge(`${gameId}-completed`)
    }
  }
  
  const handleLevelComplete = (levelScore) => {
    playSound('success')
    setScore(prev => prev + levelScore)
    updateLevelProgress(gameId, currentLevel, levelScore)
    setGameState('levelComplete')
    
    // Set AI message based on performance
    if (levelScore >= 80) {
      setAiMessage("Impressive performance! Your human intuition is remarkable.")
      speak("Impressive performance! Your human intuition is remarkable.", { voice: 'ai' })
    } else if (levelScore >= 50) {
      setAiMessage("Adequate results. With more data, I could optimize further.")
      speak("Adequate results. With more data, I could optimize further.", { voice: 'ai' })
    } else {
      setAiMessage("My algorithms predict room for improvement in your strategy.")
      speak("My algorithms predict room for improvement in your strategy.", { voice: 'ai' })
    }
  }
  
  const handleBackToHub = () => {
    playSound('click')
    onBack()
  }
  
  const handleAIResponse = (message) => {
    setIsAIThinking(true)
    setAiMessage("Processing...")
    
    // Simulate AI thinking
    setTimeout(() => {
      setAiMessage(message)
      speak(message, { voice: 'ai' })
      setIsAIThinking(false)
    }, 1500)
  }
  
  const currentLevelData = levels[currentLevel - 1]
  const levelProgress = getLevelProgress(gameId, currentLevel)
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Button onClick={handleBackToHub} variant="secondary">
          ← Back to Game Hub
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{gameName}</h2>
          <p className="text-gray-400">{gameDescription}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Score</div>
          <div className="text-xl font-bold text-ai-blue">{score}</div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">Level {currentLevel} of {levels.length}</h3>
          <span className="text-sm text-gray-400">
            {levelProgress > 0 ? `Best: ${levelProgress}%` : 'Not completed'}
          </span>
        </div>
        <ProgressBar progress={(currentLevel / levels.length) * 100} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            {gameState === 'intro' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold mb-4">Welcome to {gameName}</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  {currentLevelData.description}
                </p>
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">Level {currentLevel}: {currentLevelData.name}</h4>
                  <p className="text-gray-400">{currentLevelData.objective}</p>
                </div>
                <Button onClick={handleStartGame} size="lg">
                  Start Level {currentLevel}
                </Button>
              </motion.div>
            )}
            
            {gameState === 'playing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-bold mb-4">Level {currentLevel}: {currentLevelData.name}</h3>
                <div className="mb-6">
                  <p className="text-gray-300 mb-4">{currentLevelData.objective}</p>
                </div>
                
                {renderGameLevel({
                  levelData: currentLevelData,
                  onLevelComplete: handleLevelComplete,
                  onAIResponse: handleAIResponse
                })}
              </motion.div>
            )}
            
            {gameState === 'levelComplete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold mb-4 text-ai-green">Level Complete!</h3>
                <div className="text-5xl mb-6">🎉</div>
                <p className="text-gray-300 mb-8">
                  You've completed Level {currentLevel}! Your human skills are impressive.
                </p>
                <Button onClick={handleNextLevel} size="lg">
                  {currentLevel < levels.length ? 'Next Level' : 'Finish Game'}
                </Button>
              </motion.div>
            )}
            
            {gameState === 'gameComplete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold mb-4 text-ai-yellow">Game Complete!</h3>
                <div className="text-5xl mb-6">🏆</div>
                <p className="text-gray-300 mb-2">
                  Congratulations! You've completed all levels of {gameName}!
                </p>
                <p className="text-xl font-bold mb-8 text-ai-blue">Final Score: {score}</p>
                <Button onClick={handleBackToHub} size="lg">
                  Back to Game Hub
                </Button>
              </motion.div>
            )}
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 text-center">Players</h3>
            <div className="flex justify-center space-x-8">
              <HumanAvatar thought={humanThought} />
              <RobotAvatar message={aiMessage} />
            </div>
          </Card>
          
          {gameState === 'playing' && (
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">AI Thinking Process</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isAIThinking ? 'bg-ai-green animate-pulse' : 'bg-ai-blue'}`}></div>
                  <span className="text-sm">Analyzing game parameters</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isAIThinking ? 'bg-ai-green animate-pulse' : 'bg-ai-blue'}`}></div>
                  <span className="text-sm">Calculating probabilities</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isAIThinking ? 'bg-ai-green animate-pulse' : 'bg-ai-blue'}`}></div>
                  <span className="text-sm">Optimizing strategy</span>
                </div>
              </div>
            </Card>
          )}
          
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Level Progress</h3>
            <div className="space-y-4">
              {levels.map((level, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index + 1 < currentLevel ? 'bg-ai-green' : 
                    index + 1 === currentLevel ? 'bg-ai-blue' : 'bg-bg-dark'
                  }`}>
                    {index + 1 <= currentLevel ? '✓' : index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium">{level.name}</div>
                    <div className="w-full h-2 bg-bg-dark rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-ai-blue to-ai-purple"
                        style={{ width: `${getLevelProgress(gameId, index + 1)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}