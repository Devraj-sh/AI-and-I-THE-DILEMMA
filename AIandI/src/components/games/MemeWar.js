'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Meme Beginner",
    description: "Create a funny caption for an image",
    objective: "Come up with the funniest caption for the given image. The AI will also create one, and then you'll vote for the best one!",
    image: "/assets/games/meme-war/cat.jpg",
    aiCaptions: [
      "When you finally catch the red dot after 5 years",
      "Me: I'm not going to fall for that again. Also me:",
      "When you realize the laser pointer was just a trick all along"
    ]
  },
  {
    name: "Meme Expert",
    description: "Create a meme based on a trending topic",
    objective: "Create a meme about a trending topic. The AI will analyze current trends and create one too. Vote for the best one!",
    topic: "AI taking over jobs",
    aiCaptions: [
      "AI after taking my job: 'Don't worry, I'll do it better.' Me: 'But I liked doing it.'",
      "When AI writes code better than you but still can't figure out why the printer won't work",
      "AI: I can process millions of data points per second. Also AI: 'Error 404: Common sense not found'"
    ]
  },
  {
    name: "Meme Master",
    description: "Create a meme with multiple images",
    objective: "Create a multi-panel meme that tells a story. The AI will use pattern recognition to create its version. Vote for the best one!",
    images: [
      "/assets/games/meme-war/panel1.jpg",
      "/assets/games/meme-war/panel2.jpg",
      "/assets/games/meme-war/panel3.jpg"
    ],
    aiCaptions: [
      "Panel 1: Human sees a problem. Panel 2: Human tries to solve it. Panel 3: Human creates more problems.",
      "Panel 1: AI learning. Panel 2: AI improving. Panel 3: AI taking over the world.",
      "Panel 1: Me at the start of the week. Panel 2: Me by Wednesday. Panel 3: Me by Friday."
    ]
  }
]

export default function MemeWar({ gameId, onBack }) {
  const { playSound } = useSound()
  const [userCaption, setUserCaption] = useState('')
  const [aiCaption, setAiCaption] = useState('')
  const [votingStage, setVotingStage] = useState(false)
  const [userVote, setUserVote] = useState(null)
  const [results, setResults] = useState(null)
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    const handleSubmitCaption = () => {
      if (!userCaption.trim()) return
      
      playSound('click')
      
      // Set AI caption based on level
      const aiCaption = levelData.aiCaptions[Math.floor(Math.random() * levelData.aiCaptions.length)]
      setAiCaption(aiCaption)
      
      // Set AI message
      onAIResponse(`I've analyzed the image and generated a caption based on my training data: "${aiCaption}"`)
      
      // Move to voting stage
      setVotingStage(true)
    }
    
    const handleVote = (winner) => {
      playSound('click')
      setUserVote(winner)
      
      // Calculate score based on vote
      let score = 0
      if (winner === 'user') {
        score = 85 // User wins
        onAIResponse("Your humor is uniquely human! My algorithms can't replicate that creativity.")
      } else {
        score = 60 // AI wins
        onAIResponse("My data-driven approach to humor appears to be more effective in this instance.")
      }
      
      // Show results after a delay
      setTimeout(() => {
        setResults({ winner, score })
        onLevelComplete(score)
      }, 2000)
    }
    
    const resetLevel = () => {
      setUserCaption('')
      setAiCaption('')
      setVotingStage(false)
      setUserVote(null)
      setResults(null)
    }
    
    return (
      <div className="space-y-6">
        {/* Game content based on level */}
        {levelData.image && (
          <div className="flex justify-center">
            <img 
              src={levelData.image} 
              alt="Meme template" 
              className="max-w-full h-auto rounded-lg border-2 border-white/10"
            />
          </div>
        )}
        
        {levelData.topic && (
          <Card className="p-4 bg-bg-dark/50">
            <h4 className="font-bold mb-2">Topic: {levelData.topic}</h4>
            <p className="text-sm text-gray-400">Create a meme about this trending topic</p>
          </Card>
        )}
        
        {levelData.images && (
          <div className="grid grid-cols-3 gap-2">
            {levelData.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Meme panel ${index + 1}`} 
                className="w-full h-auto rounded border border-white/10"
              />
            ))}
          </div>
        )}
        
        {/* User input */}
        {!votingStage && !results && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Caption:</label>
              <textarea
                value={userCaption}
                onChange={(e) => setUserCaption(e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                rows={3}
                placeholder="Enter your funny caption here..."
              />
            </div>
            <Button 
              onClick={handleSubmitCaption}
              disabled={!userCaption.trim()}
              className="w-full"
            >
              Submit Caption
            </Button>
          </div>
        )}
        
        {/* Voting stage */}
        {votingStage && !results && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-center">Vote for the Best Caption!</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={`p-4 cursor-pointer transition-all ${userVote === 'user' ? 'border-2 border-human-orange' : 'border border-white/10'}`} onClick={() => handleVote('user')}>
                <h5 className="font-bold text-human-orange mb-2">Your Caption</h5>
                <p className="mb-4">{userCaption}</p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVote('user')
                  }}
                >
                  Vote for This
                </Button>
              </Card>
              
              <Card className={`p-4 cursor-pointer transition-all ${userVote === 'ai' ? 'border-2 border-ai-purple' : 'border border-white/10'}`} onClick={() => handleVote('ai')}>
                <h5 className="font-bold text-ai-purple mb-2">AI Caption</h5>
                <p className="mb-4">{aiCaption}</p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVote('ai')
                  }}
                >
                  Vote for This
                </Button>
              </Card>
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
            <h4 className="text-2xl font-bold mb-4">
              {results.winner === 'user' ? 'You Win!' : 'AI Wins!'}
            </h4>
            <div className="text-5xl mb-4">
              {results.winner === 'user' ? '🎉' : '🤖'}
            </div>
            <p className="text-lg mb-6">Your score: {results.score}</p>
            <Button onClick={resetLevel}>
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="Meme War"
      gameDescription="Creativity vs Logic - Who can create the funniest meme?"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}