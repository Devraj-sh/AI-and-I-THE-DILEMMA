'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Number Patterns",
    description: "Find patterns in number sequences",
    objective: "Identify the pattern in number sequences and predict the next number. The AI will use mathematical analysis. Can your intuition beat the AI's algorithms?",
    patterns: [
      {
        sequence: [2, 4, 6, 8, 10],
        answer: 12,
        explanation: "Add 2 to each number",
        aiExplanation: "I identified this as an arithmetic sequence with a common difference of 2. The pattern is linear: each term increases by 2 from the previous term."
      },
      {
        sequence: [1, 4, 9, 16, 25],
        answer: 36,
        explanation: "Square numbers (1², 2², 3², etc.)",
        aiExplanation: "I recognized this sequence as perfect squares. Each term is the square of its position in the sequence: 1², 2², 3², etc."
      },
      {
        sequence: [1, 1, 2, 3, 5],
        answer: 8,
        explanation: "Fibonacci sequence (each number is the sum of the two preceding ones)",
        aiExplanation: "I identified this as the Fibonacci sequence, where each term is the sum of the two preceding terms. This is a well-known mathematical sequence with applications in nature and computer science."
      }
    ]
  },
  {
    name: "Visual Patterns",
    description: "Find patterns in visual sequences",
    objective: "Identify the pattern in visual sequences and predict the next image. The AI will use pattern recognition algorithms. Can your intuition spot patterns the AI might miss?",
    patterns: [
      {
        type: "shapes",
        sequence: ["⚫", "⚫⚫", "⚫⚫⚫", "⚫⚫⚫⚫"],
        answer: "⚫⚫⚫⚫⚫",
        explanation: "Adding one more circle each time",
        aiExplanation: "I detected a linear progression in the number of circles. Each step adds exactly one circle to the previous pattern."
      },
      {
        type: "rotation",
        sequence: ["▲", "►", "▼", "◄"],
        answer: "▲",
        explanation: "Triangle rotating 90 degrees clockwise each time",
        aiExplanation: "I identified a rotational pattern where the triangle rotates 90 degrees clockwise with each step. After four rotations, it returns to the original position."
      },
      {
        type: "alternating",
        sequence: ["⚫⚪", "⚪⚫", "⚫⚪", "⚪⚫"],
        answer: "⚫⚪",
        explanation: "Alternating pattern of black and white circles",
        aiExplanation: "I detected a simple alternating pattern. The sequence alternates between two states: black circle followed by white circle, and white circle followed by black circle."
      }
    ]
  },
  {
    name: "Complex Patterns",
    description: "Find complex patterns",
    objective: "Identify complex patterns involving multiple elements. The AI will use advanced pattern recognition. Can your intuition find creative solutions the AI might overlook?",
    patterns: [
      {
        type: "math",
        sequence: [1, 8, 27, 64, 125],
        answer: 216,
        explanation: "Cube numbers (1³, 2³, 3³, etc.)",
        aiExplanation: "I identified this sequence as perfect cubes. Each term is the cube of its position in the sequence: 1³, 2³, 3³, etc."
      },
      {
        type: "mixed",
        sequence: [1, 2, 6, 24, 120],
        answer: 720,
        explanation: "Factorials (1!, 2!, 3!, etc.)",
        aiExplanation: "I recognized this sequence as factorials. Each term is the factorial of its position: 1! = 1, 2! = 2, 3! = 6, etc."
      },
      {
        type: "fibonacci-like",
        sequence: [2, 3, 5, 9, 17],
        answer: 33,
        explanation: "Each number is double the previous minus one",
        aiExplanation: "I identified this as a recursive sequence where each term is double the previous term minus one: aₙ = 2aₙ₋₁ - 1"
      }
    ]
  }
]

export default function PatternDetective({ gameId, onBack }) {
  const { playSound } = useSound()
  const [currentPattern, setCurrentPattern] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [userScore, setUserScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  
  const initGame = (levelData) => {
    setCurrentPattern(0)
    setUserAnswer('')
    setAiAnswer('')
    setShowResult(false)
    setUserScore(0)
    setAiScore(0)
    setGameComplete(false)
  }
  
  const handleSubmitAnswer = (levelData) => {
    if (!userAnswer.trim()) return
    
    playSound('click')
    
    const pattern = levelData.patterns[currentPattern]
    
    // Set AI answer
    setAiAnswer(pattern.answer.toString())
    
    // Check if user answer is correct
    const isCorrect = userAnswer.trim() === pattern.answer.toString()
    
    // Calculate scores
    let userPoints = 0
    let aiPoints = 100 // AI always gets it right
    
    if (isCorrect) {
      userPoints = 100
    } else {
      // Partial credit for being close
      const userNum = parseInt(userAnswer)
      const correctNum = pattern.answer
      if (!isNaN(userNum)) {
        const difference = Math.abs(userNum - correctNum)
        const maxDifference = correctNum // Arbitrary scale
        userPoints = Math.max(0, 100 - (difference / maxDifference) * 100)
      }
    }
    
    setUserScore(prev => prev + userPoints)
    setAiScore(prev => prev + aiPoints)
    
    setShowResult(true)
  }
  
  const handleNextPattern = () => {
    playSound('click')
    
    if (currentPattern < levels[0].patterns.length - 1) {
      setCurrentPattern(prev => prev + 1)
      setUserAnswer('')
      setAiAnswer('')
      setShowResult(false)
    } else {
      setGameComplete(true)
    }
  }
  
  const renderPattern = (pattern) => {
    if (pattern.type === "shapes" || pattern.type === "rotation" || pattern.type === "alternating") {
      return (
        <div className="flex justify-center items-center space-x-4 text-4xl">
          {pattern.sequence.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <div className="text-gray-500">?</div>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center items-center space-x-4 text-2xl">
          {pattern.sequence.map((item, index) => (
            <div key={index} className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-dark border border-white/10">
              {item}
            </div>
          ))}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-dark border border-ai-blue/50 text-ai-blue">
            ?
          </div>
        </div>
      )
    }
  }
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    // Initialize game when level loads
    useEffect(() => {
      initGame(levelData)
      onAIResponse("I'm analyzing the pattern using mathematical algorithms and statistical analysis.")
    }, [levelData])
    
    const pattern = levelData.patterns[currentPattern]
    
    const handleCompleteLevel = () => {
      playSound('click')
      
      // Calculate final score
      const maxScore = 100 * levelData.patterns.length
      const finalScore = Math.round((userScore / maxScore) * 100)
      
      onLevelComplete(finalScore)
    }
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold mb-2">Pattern {currentPattern + 1} of {levelData.patterns.length}</h4>
          <div className="w-full bg-bg-dark rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-ai-blue to-ai-purple h-2 rounded-full"
              style={{ width: `${((currentPattern + 1) / levelData.patterns.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="p-8">
          <h4 className="text-lg font-bold mb-6 text-center">Find the Pattern</h4>
          {renderPattern(pattern)}
        </Card>
        
        {!showResult && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">What comes next?</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                placeholder="Enter your answer..."
              />
            </div>
            <Button 
              onClick={() => handleSubmitAnswer(levelData)}
              disabled={!userAnswer.trim()}
              className="w-full"
            >
              Submit Answer
            </Button>
          </div>
        )}
        
        {showResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User's answer */}
              <Card className="p-4 border border-human-orange/30">
                <h5 className="font-bold text-human-orange mb-2">Your Answer</h5>
                <div className="text-2xl font-bold mb-3">{userAnswer}</div>
                <div className="text-sm">
                  <span className="font-bold">Correct Answer:</span> {pattern.answer}
                </div>
                <div className="text-sm mt-2">
                  <span className="font-bold">Pattern:</span> {pattern.explanation}
                </div>
              </Card>
              
              {/* AI's answer */}
              <Card className="p-4 border border-ai-purple/30">
                <h5 className="font-bold text-ai-purple mb-2">AI's Answer</h5>
                <div className="text-2xl font-bold mb-3">{aiAnswer}</div>
                <div className="text-sm">
                  <span className="font-bold">Analysis:</span> {pattern.aiExplanation}
                </div>
              </Card>
            </div>
            
            <div className="text-center">
              {!gameComplete ? (
                <Button onClick={handleNextPattern}>
                  Next Pattern
                </Button>
              ) : (
                <Button onClick={handleCompleteLevel}>
                  See Results
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Game explanation */}
        <Card className="p-4 bg-bg-dark/50">
          <h4 className="font-bold mb-2">How This Works</h4>
          <p className="text-sm text-gray-400">
            You're using your intuition and pattern recognition abilities to identify patterns. 
            The AI is using mathematical algorithms and statistical analysis to detect patterns. 
            While AI excels at mathematical patterns, humans often have an advantage with 
            creative or ambiguous patterns that require flexible thinking.
          </p>
        </Card>
        
        {/* Score display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border border-human-orange/30">
            <h5 className="font-bold text-human-orange mb-2">Your Pattern Recognition</h5>
            <div className="text-3xl font-bold">{Math.round(userScore)}</div>
          </Card>
          
          <Card className="p-4 border border-ai-purple/30">
            <h5 className="font-bold text-ai-purple mb-2">AI's Algorithmic Analysis</h5>
            <div className="text-3xl font-bold">{Math.round(aiScore)}</div>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="Pattern Detective"
      gameDescription="Intuition vs Algorithm - Find hidden patterns"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}