'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Simple What If",
    description: "Explore a simple hypothetical scenario",
    objective: "Answer a 'what if' question creatively. The AI will provide a logical analysis. See how human creativity compares to AI reasoning!",
    question: "What if humans could fly?",
    aiResponse: "If humans could fly, several physiological changes would be required. Humans would need lighter bones, stronger chest muscles, and a different respiratory system to support flight. From a physics perspective, humans would need wings with approximately a 7-meter wingspan to generate enough lift. Society would be completely transformed with new transportation systems, building designs, and laws regarding airspace. Energy expenditure for flight would be significant, requiring humans to consume more calories daily."
  },
  {
    name: "Complex What If",
    description: "Explore a complex hypothetical scenario",
    objective: "Answer a complex 'what if' question that involves multiple systems. The AI will analyze the interconnected impacts. Compare human intuition with systematic analysis!",
    question: "What if the internet suddenly disappeared worldwide?",
    aiResponse: "The sudden disappearance of the internet would cause immediate global disruption. Financial markets would crash, communication systems would fail, and supply chains would break down. Emergency services would be severely impacted. Within days, governments would struggle to function, and access to information would be limited to physical media. Long-term effects include economic depression, social isolation, and a complete restructuring of how societies function. Recovery would take years, with new systems emerging that are less dependent on centralized networks."
  },
  {
    name: "Future What If",
    description: "Explore a futuristic hypothetical scenario",
    objective: "Answer a futuristic 'what if' question. The AI will extrapolate based on current trends. See how human imagination compares to AI projections!",
    question: "What if we discovered we're living in a simulation?",
    aiResponse: "The discovery that we're living in a simulation would fundamentally challenge our understanding of reality. Scientific paradigms would shift dramatically as researchers would need to consider the simulation's parameters and creators. Philosophical and religious systems would face existential questions about purpose and free will. Economies might collapse if people perceived their efforts as meaningless. However, it could also lead to new technologies as we attempt to understand and potentially manipulate the simulation's code. The psychological impact would vary, with some experiencing existential dread while others find liberation from previous constraints."
  }
]

export default function WhatIf({ gameId, onBack }) {
  const { playSound } = useSound()
  const [userAnswer, setUserAnswer] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [comparisonStage, setComparisonStage] = useState(false)
  const [results, setResults] = useState(null)
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    const handleSubmitAnswer = () => {
      if (!userAnswer.trim()) return
      
      playSound('click')
      
      // Set AI answer based on level
      setAiAnswer(levelData.aiResponse)
      
      // Set AI message
      onAIResponse("I've analyzed the hypothetical scenario based on logical reasoning and available data.")
      
      // Move to comparison stage
      setComparisonStage(true)
    }
    
    const handleComplete = () => {
      playSound('click')
      
      // Calculate score based on answer quality (simplified for demo)
      const answerLength = userAnswer.length
      let score = 60
      
      if (answerLength > 200) score += 10
      if (answerLength > 400) score += 10
      if (userAnswer.includes('?') || userAnswer.includes('!')) score += 5
      
      // Random bonus for creativity
      score += Math.floor(Math.random() * 10)
      
      // Show results
      setResults({ score })
      onLevelComplete(score)
    }
    
    const resetLevel = () => {
      setUserAnswer('')
      setAiAnswer('')
      setComparisonStage(false)
      setResults(null)
    }
    
    return (
      <div className="space-y-6">
        {/* Question */}
        <Card className="p-6 bg-bg-dark/50">
          <h4 className="text-xl font-bold mb-4 text-center">What If...</h4>
          <p className="text-lg text-center">{levelData.question}</p>
        </Card>
        
        {/* User input */}
        {!comparisonStage && !results && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Answer:</label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                rows={6}
                placeholder="Share your creative thoughts on this scenario..."
              />
              <p className="text-xs text-gray-400 mt-2">Be creative and explore different aspects of this scenario!</p>
            </div>
            <Button 
              onClick={handleSubmitAnswer}
              disabled={!userAnswer.trim()}
              className="w-full"
            >
              Submit Answer
            </Button>
          </div>
        )}
        
        {/* Comparison stage */}
        {comparisonStage && !results && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-center">Comparing Human Creativity vs AI Logic</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 border border-human-orange/30">
                <h5 className="font-bold text-human-orange mb-2">Human Response</h5>
                <div className="text-sm text-gray-300 mb-3">Creative, emotional, imaginative</div>
                <p className="whitespace-pre-line">{userAnswer}</p>
              </Card>
              
              <Card className="p-4 border border-ai-purple/30">
                <h5 className="font-bold text-ai-purple mb-2">AI Analysis</h5>
                <div className="text-sm text-gray-300 mb-3">Logical, systematic, data-driven</div>
                <p>{aiAnswer}</p>
              </Card>
            </div>
            
            <div className="text-center">
              <Button onClick={handleComplete}>
                See Results
              </Button>
            </div>
          </div>
        )}
        
        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <h4 className="text-2xl font-bold mb-4">Level Complete!</h4>
            <div className="text-5xl mb-4">💡</div>
            <p className="text-lg mb-2">Your creative thinking is impressive!</p>
            <p className="text-lg mb-6">Your score: {results.score}</p>
            <Button onClick={resetLevel}>
              Try Another Scenario
            </Button>
          </motion.div>
        )}
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="What If?"
      gameDescription="Imagination vs Probability - Explore hypothetical scenarios"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}