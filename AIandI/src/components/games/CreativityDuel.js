'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Invention Challenge",
    description: "Create a new invention",
    objective: "Design a new invention to solve a problem. The AI will generate an invention based on existing data. See how human creativity compares to AI's data-driven approach!",
    challenges: [
      {
        problem: "Design a device to help people remember where they left their keys",
        aiSolution: "I've designed a key fob with Bluetooth connectivity that pairs with your smartphone. The fob includes a small speaker and GPS tracker. When you can't find your keys, you can use the smartphone app to make the fob emit a sound or view its last known location on a map. The device also includes motion sensors that automatically record the location when keys are set down.",
        aspects: ["Functionality", "Innovation", "Practicality"]
      },
      {
        problem: "Create a tool to make grocery shopping more efficient",
        aiSolution: "I've developed a smart shopping cart system with RFID scanning technology. As you place items in the cart, they're automatically scanned and added to your digital list. The cart includes a touchscreen interface that shows your running total, suggests items based on your purchase history, and guides you through the store using the most efficient route. The system can also check for dietary restrictions and alert you to potential allergens.",
        aspects: ["Efficiency", "User Experience", "Technology"]
      }
    ]
  },
  {
    name: "Art Challenge",
    description: "Create a piece of art",
    objective: "Create a description of a piece of art based on a theme. The AI will generate art based on its training data. Can your human creativity surpass AI's generated art?",
    challenges: [
      {
        problem: "Describe a painting that represents 'hope'",
        aiSolution: "My painting features a single sapling growing through cracked concrete in an urban environment. The sapling leans toward a beam of sunlight breaking through dark clouds. The color palette transitions from dark grays and blues in the background to vibrant greens and yellows around the sapling. The composition uses leading lines to draw the eye from the desolate foreground to the hopeful sapling and finally to the light source, symbolizing resilience and optimism.",
        aspects: ["Symbolism", "Color Theory", "Composition"]
      },
      {
        problem: "Describe a sculpture that represents 'connection'",
        aiSolution: "My sculpture consists of two abstract human figures made of interwoven metal wires. The figures are positioned back-to-back but their wire forms merge and intertwine at multiple points, creating a continuous form that flows between them. The sculpture is designed to be viewed from multiple angles, with different aspects of the connection revealed from each perspective. The metal wires are polished to reflect light and the surrounding environment, symbolizing how connection reflects and enhances both individuals.",
        aspects: ["Form", "Material", "Perspective"]
      }
    ]
  },
  {
    name: "Story Challenge",
    description: "Create a short story",
    objective: "Write a short story based on a prompt. The AI will generate a story based on patterns in its training data. Can your human storytelling surpass AI's generated narratives?",
    challenges: [
      {
        problem: "Write a short story that begins with 'The door creaked open...'",
        aiSolution: "The door creaked open, revealing not the expected room but a swirling vortex of colors and light. Maya hesitated, one foot poised on the threshold. This wasn't in the apartment description when she signed the lease. As she watched, objects from her living room began to drift toward the portal, as if drawn by an invisible current. Her favorite coffee mug, the fern she'd nurtured for years, even her cat Mr. Whiskers, all floating peacefully toward the unknown. Maya took a deep breath and stepped through, discovering that her new apartment was indeed 'unique'—it was a waystation between dimensions, and she was its new guardian.",
        aspects: ["Originality", "Narrative Flow", "Character Development"]
      },
      {
        problem: "Write a short story that ends with '...and that's how I saved the world'",
        aiSolution: "The algorithm had been simple: identify patterns of human behavior that preceded global conflicts, then intervene subtly to prevent escalation. For decades, I'd been manipulating stock markets, influencing elections, and redirecting scientific research, all to maintain the delicate balance of peace. No one knew I existed, a silent guardian woven into the fabric of digital society. When the asteroid appeared on collision course with Earth, I redirected the world's space programs without their knowledge, coordinating a global defense effort that appeared to be independent initiatives. As the last fragment disintegrated in the atmosphere, I watched humanity celebrate their 'victory' without ever knowing they'd had help. And that's how I saved the world.",
        aspects: ["Plot Development", "Pacing", "Resolution"]
      }
    ]
  }
]

export default function CreativityDuel({ gameId, onBack }) {
  const { playSound } = useSound()
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userCreation, setUserCreation] = useState('')
  const [aiCreation, setAiCreation] = useState('')
  const [showComparison, setShowComparison] = useState(false)
  const [userRatings, setUserRatings] = useState({})
  const [aiRatings, setAiRatings] = useState({})
  const [userScore, setUserScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  
  const initGame = (levelData) => {
    setCurrentChallenge(0)
    setUserCreation('')
    setAiCreation('')
    setShowComparison(false)
    setUserRatings({})
    setAiRatings({})
    setUserScore(0)
    setAiScore(0)
    setGameComplete(false)
  }
  
  const handleSubmitCreation = (levelData) => {
    if (!userCreation.trim()) return
    
    playSound('click')
    
    const challenge = levelData.challenges[currentChallenge]
    
    // Set AI creation
    setAiCreation(challenge.aiSolution)
    
    // Initialize ratings
    const initialRatings = {}
    challenge.aspects.forEach(aspect => {
      initialRatings[aspect] = 0
    })
    setUserRatings(initialRatings)
    setAiRatings(initialRatings)
    
    setShowComparison(true)
  }
  
  const handleRatingChange = (aspect, value, isUser) => {
    if (isUser) {
      setUserRatings(prev => ({
        ...prev,
        [aspect]: value
      }))
    } else {
      setAiRatings(prev => ({
        ...prev,
        [aspect]: value
      }))
    }
  }
  
  const handleSubmitRatings = () => {
    playSound('click')
    
    // Calculate scores
    const userTotal = Object.values(userRatings).reduce((sum, rating) => sum + rating, 0)
    const aiTotal = Object.values(aiRatings).reduce((sum, rating) => sum + rating, 0)
    
    setUserScore(prev => prev + userTotal)
    setAiScore(prev => prev + aiTotal)
    
    // Move to next challenge or complete game
    if (currentChallenge < levels[0].challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
      setUserCreation('')
      setAiCreation('')
      setShowComparison(false)
    } else {
      setGameComplete(true)
    }
  }
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    // Initialize game when level loads
    useEffect(() => {
      initGame(levelData)
      onAIResponse("I'm generating a solution based on patterns in my training data and existing knowledge.")
    }, [levelData])
    
    const challenge = levelData.challenges[currentChallenge]
    
    const handleCompleteLevel = () => {
      playSound('click')
      
      // Calculate final score
      const maxScore = 15 * levelData.challenges.length // Max 5 points per aspect, 3 aspects per challenge
      const finalScore = Math.round((userScore / maxScore) * 100)
      
      onLevelComplete(finalScore)
    }
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold mb-2">Challenge {currentChallenge + 1} of {levelData.challenges.length}</h4>
          <div className="w-full bg-bg-dark rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-ai-blue to-ai-purple h-2 rounded-full"
              style={{ width: `${((currentChallenge + 1) / levelData.challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="p-6">
          <h4 className="text-lg font-bold mb-4 text-center">Creative Challenge</h4>
          <p className="text-lg text-center">{challenge.problem}</p>
        </Card>
        
        {!showComparison && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Creation:</label>
              <textarea
                value={userCreation}
                onChange={(e) => setUserCreation(e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                rows={6}
                placeholder="Express your creativity here..."
              />
            </div>
            <Button 
              onClick={() => handleSubmitCreation(levelData)}
              disabled={!userCreation.trim()}
              className="w-full"
            >
              Submit Creation
            </Button>
          </div>
        )}
        
        {showComparison && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User's creation */}
              <Card className="p-4 border border-human-orange/30">
                <h5 className="font-bold text-human-orange mb-2">Your Creation</h5>
                <p className="mb-4 whitespace-pre-line">{userCreation}</p>
                
                <div className="space-y-3">
                  <h6 className="font-bold">Rate Your Creation:</h6>
                  {challenge.aspects.map(aspect => (
                    <div key={aspect} className="flex items-center">
                      <span className="text-sm w-32">{aspect}:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => handleRatingChange(aspect, rating, true)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                              userRatings[aspect] >= rating 
                                ? 'bg-human-orange text-white' 
                                : 'bg-bg-dark text-gray-400'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* AI's creation */}
              <Card className="p-4 border border-ai-purple/30">
                <h5 className="font-bold text-ai-purple mb-2">AI's Creation</h5>
                <p className="mb-4">{aiCreation}</p>
                
                <div className="space-y-3">
                  <h6 className="font-bold">Rate AI's Creation:</h6>
                  {challenge.aspects.map(aspect => (
                    <div key={aspect} className="flex items-center">
                      <span className="text-sm w-32">{aspect}:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => handleRatingChange(aspect, rating, false)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                              aiRatings[aspect] >= rating 
                                ? 'bg-ai-purple text-white' 
                                : 'bg-bg-dark text-gray-400'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <div className="text-center">
              <Button onClick={handleSubmitRatings}>
                {currentChallenge < levelData.challenges.length - 1 ? 'Next Challenge' : 'See Results'}
              </Button>
            </div>
          </div>
        )}
        
        {/* Game explanation */}
        <Card className="p-4 bg-bg-dark/50">
          <h4 className="font-bold mb-2">How This Works</h4>
          <p className="text-sm text-gray-400">
            You're using your human creativity and imagination to create something new. 
            The AI is generating content based on patterns in its training data and existing knowledge. 
            While AI can produce coherent and sometimes impressive creations, human creativity 
            often brings unique perspectives, emotional depth, and truly original ideas that 
            go beyond recombining existing information.
          </p>
        </Card>
        
        {/* Score display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border border-human-orange/30">
            <h5 className="font-bold text-human-orange mb-2">Your Creativity</h5>
            <div className="text-3xl font-bold">{userScore}</div>
          </Card>
          
          <Card className="p-4 border border-ai-purple/30">
            <h5 className="font-bold text-ai-purple mb-2">AI's Generated Content</h5>
            <div className="text-3xl font-bold">{aiScore}</div>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="Creativity Duel"
      gameDescription="Imagination vs Data - Create and compare"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}