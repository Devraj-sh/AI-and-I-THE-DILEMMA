'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Animals",
    description: "Guess animal names",
    objective: "Guess the animal name by selecting letters. The AI will use probability to make its guesses. See if your intuition can beat the AI's calculations!",
    words: ["ELEPHANT", "GIRAFFE", "PENGUIN", "DOLPHIN", "BUTTERFLY"],
    hints: {
      "ELEPHANT": "Largest land animal with a trunk",
      "GIRAFFE": "Tallest animal in the world",
      "PENGUIN": "Bird that cannot fly but swims expertly",
      "DOLPHIN": "Intelligent marine mammal known for its playful behavior",
      "BUTTERFLY": "Insect that undergoes metamorphosis"
    }
  },
  {
    name: "Technology",
    description: "Guess technology terms",
    objective: "Guess the technology term by selecting letters. The AI will use frequency analysis to make its guesses. Can your intuition beat the AI's data-driven approach?",
    words: ["ALGORITHM", "BLOCKCHAIN", "QUANTUM", "NEURAL NETWORK", "CRYPTOCURRENCY"],
    hints: {
      "ALGORITHM": "Step-by-step procedure for solving a problem",
      "BLOCKCHAIN": "Decentralized digital ledger technology",
      "QUANTUM": "Related to the smallest amount of a physical quantity",
      "NEURAL NETWORK": "Computing system inspired by the human brain",
      "CRYPTOCURRENCY": "Digital or virtual currency secured by cryptography"
    }
  },
  {
    name: "Space",
    description: "Guess space-related terms",
    objective: "Guess the space-related term by selecting letters. The AI will use scientific knowledge to make its guesses. Will your intuition outperform the AI's knowledge base?",
    words: ["GALAXY", "NEBULA", "ASTEROID", "SATELLITE", "BLACK HOLE"],
    hints: {
      "GALAXY": "System of millions or billions of stars",
      "NEBULA": "Cloud of gas and dust in outer space",
      "ASTEROID": "Small rocky body orbiting the sun",
      "SATELLITE": "Object that orbits around a larger object",
      "BLACK HOLE": "Region of spacetime with gravitational pull so strong nothing can escape"
    }
  }
]

export default function HangmanChallenge({ gameId, onBack }) {
  const { playSound } = useSound()
  const [word, setWord] = useState('')
  const [hint, setHint] = useState('')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing') // playing, won, lost
  const [aiProgress, setAiProgress] = useState(0)
  const [aiGuessedLetters, setAiGuessedLetters] = useState([])
  const [aiIncorrectGuesses, setAiIncorrectGuesses] = useState(0)
  const [aiGameStatus, setAiGameStatus] = useState('playing')
  
  const initGame = (levelData) => {
    const randomWord = levelData.words[Math.floor(Math.random() * levelData.words.length)]
    setWord(randomWord)
    setHint(levelData.hints[randomWord])
    setGuessedLetters([])
    setIncorrectGuesses(0)
    setGameStatus('playing')
    
    // Initialize AI game
    setAiProgress(0)
    setAiGuessedLetters([])
    setAiIncorrectGuesses(0)
    setAiGameStatus('playing')
    
    // Start AI guessing process
    simulateAIGuesses(randomWord)
  }
  
  const simulateAIGuesses = (targetWord) => {
    // Letter frequency in English (from most to least common)
    const letterFrequency = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'U', 'C', 'M', 'W', 'F', 'Y', 'G', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z']
    
    let aiGuessIndex = 0
    let aiTargetWord = targetWord
    let aiCurrentGuesses = []
    let aiCurrentIncorrect = 0
    
    const aiGuessInterval = setInterval(() => {
      if (aiGameStatus !== 'playing' || aiGuessIndex >= letterFrequency.length) {
        clearInterval(aiGuessInterval)
        return
      }
      
      const letter = letterFrequency[aiGuessIndex]
      aiGuessIndex++
      
      if (!aiCurrentGuesses.includes(letter)) {
        aiCurrentGuesses.push(letter)
        setAiGuessedLetters([...aiCurrentGuesses])
        
        if (aiTargetWord.includes(letter)) {
          // Correct guess
          // Check if AI has won
          const hasWon = aiTargetWord.split('').every(char => char === ' ' || aiCurrentGuesses.includes(char))
          if (hasWon) {
            setAiGameStatus('won')
            clearInterval(aiGuessInterval)
          }
        } else {
          // Incorrect guess
          aiCurrentIncorrect++
          setAiIncorrectGuesses(aiCurrentIncorrect)
          
          if (aiCurrentIncorrect >= 6) {
            setAiGameStatus('lost')
            clearInterval(aiGuessInterval)
          }
        }
        
        // Update AI progress
        const progress = Math.min(100, (aiGuessIndex / letterFrequency.length) * 100)
        setAiProgress(progress)
      }
    }, 1500) // AI makes a guess every 1.5 seconds
  }
  
  const handleLetterClick = (letter) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return
    
    playSound('click')
    
    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)
    
    if (word.includes(letter)) {
      // Correct guess
      // Check if player has won
      const hasWon = word.split('').every(char => char === ' ' || newGuessedLetters.includes(char))
      if (hasWon) {
        setGameStatus('won')
      }
    } else {
      // Incorrect guess
      const newIncorrectGuesses = incorrectGuesses + 1
      setIncorrectGuesses(newIncorrectGuesses)
      
      if (newIncorrectGuesses >= 6) {
        setGameStatus('lost')
      }
    }
  }
  
  const renderWordDisplay = (targetWord, guesses) => {
    return targetWord.split('').map((letter, index) => (
      <span key={index} className="inline-block mx-1 text-2xl font-bold">
        {letter === ' ' ? ' ' : guesses.includes(letter) ? letter : '_'}
      </span>
    ))
  }
  
  const renderHangman = (incorrectCount) => {
    // Simple hangman drawing using text/emojis
    const stages = [
      '', // 0 incorrect
      '😵', // 1 incorrect - head
      '😵\n|', // 2 incorrect - head + body
      '😵\n|\n/', // 3 incorrect - head + body + left arm
      '😵\n|\n/ \\', // 4 incorrect - head + body + both arms
      '😵\n|\n/ \\\n/', // 5 incorrect - head + body + arms + left leg
      '😵\n|\n/ \\\n/ \\' // 6 incorrect - head + body + arms + both legs (game over)
    ]
    
    return (
      <div className="font-mono text-center whitespace-pre-line">
        {stages[incorrectCount]}
      </div>
    )
  }
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    // Initialize game when level loads
    useEffect(() => {
      initGame(levelData)
      onAIResponse("I'm using letter frequency analysis to determine the most probable letters.")
    }, [levelData])
    
    const handleNextRound = () => {
      playSound('click')
      initGame(levelData)
    }
    
    const handleCompleteLevel = () => {
      playSound('click')
      
      // Calculate score based on performance
      let score = 50 // Base score
      
      if (gameStatus === 'won') score += 30
      if (aiGameStatus === 'lost') score += 20
      
      // Bonus for fewer incorrect guesses
      score += Math.max(0, (6 - incorrectGuesses) * 5)
      
      onLevelComplete(score)
    }
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Player's game */}
          <Card className="p-6 border border-human-orange/30">
            <h4 className="font-bold text-human-orange mb-4 text-center">Your Game</h4>
            
            <div className="text-center mb-4">
              {renderHangman(incorrectGuesses)}
            </div>
            
            <div className="text-center mb-4">
              {renderWordDisplay(word, guessedLetters)}
            </div>
            
            {gameStatus === 'playing' && (
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Hint: {hint}</div>
                <div className="text-sm text-gray-400">
                  Incorrect guesses: {incorrectGuesses}/6
                </div>
              </div>
            )}
            
            {gameStatus === 'won' && (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-bold text-human-orange">You Won!</div>
              </div>
            )}
            
            {gameStatus === 'lost' && (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">😢</div>
                <div className="font-bold text-human-red">Game Over</div>
                <div className="text-sm mt-2">The word was: {word}</div>
              </div>
            )}
            
            {gameStatus !== 'playing' && (
              <div className="text-center mt-4">
                <Button onClick={handleNextRound} variant="secondary" className="mr-2">
                  Play Again
                </Button>
                <Button onClick={handleCompleteLevel}>
                  Continue
                </Button>
              </div>
            )}
          </Card>
          
          {/* AI's game */}
          <Card className="p-6 border border-ai-purple/30">
            <h4 className="font-bold text-ai-purple mb-4 text-center">AI's Game</h4>
            
            <div className="text-center mb-4">
              {renderHangman(aiIncorrectGuesses)}
            </div>
            
            <div className="text-center mb-4">
              {renderWordDisplay(word, aiGuessedLetters)}
            </div>
            
            {aiGameStatus === 'playing' && (
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">AI is thinking...</div>
                <div className="w-full bg-bg-dark rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-ai-blue to-ai-purple h-2 rounded-full"
                    style={{ width: `${aiProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Incorrect guesses: {aiIncorrectGuesses}/6
                </div>
              </div>
            )}
            
            {aiGameStatus === 'won' && (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-bold text-ai-purple">AI Won!</div>
                <div className="text-sm mt-2">My probability analysis was successful.</div>
              </div>
            )}
            
            {aiGameStatus === 'lost' && (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">💥</div>
                <div className="font-bold text-ai-purple">AI Failed</div>
                <div className="text-sm mt-2">Even my algorithms have limitations.</div>
              </div>
            )}
          </Card>
        </div>
        
        {/* Letter keyboard */}
        {gameStatus === 'playing' && (
          <Card className="p-4">
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.split('').map(letter => (
                <Button
                  key={letter}
                  variant="secondary"
                  size="sm"
                  disabled={guessedLetters.includes(letter)}
                  onClick={() => handleLetterClick(letter)}
                  className={`w-10 h-10 ${guessedLetters.includes(letter) ? 
                    (word.includes(letter) ? 'bg-ai-green/20 text-ai-green' : 'bg-human-red/20 text-human-red') : 
                    ''}`}
                >
                  {letter}
                </Button>
              ))}
            </div>
          </Card>
        )}
        
        {/* Game explanation */}
        <Card className="p-4 bg-bg-dark/50">
          <h4 className="font-bold mb-2">How This Works</h4>
          <p className="text-sm text-gray-400">
            You're using your intuition and knowledge of words to guess letters. 
            The AI is using letter frequency analysis - it starts with the most common letters in English 
            (E, T, A, O, I, N, S, H, R, D, L, U) and works its way down to less common ones.
          </p>
        </Card>
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="Hangman Challenge"
      gameDescription="Intuition vs Data - Can you outsmart the AI at word guessing?"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}