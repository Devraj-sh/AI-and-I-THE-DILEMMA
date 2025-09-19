'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Simple Maze",
    description: "Navigate a simple maze",
    objective: "Find your way through the maze to reach the goal. The AI will use a systematic search algorithm. See if you can find shortcuts the AI might miss!",
    maze: [
      "S#####",
      "#     #",
      "# ### #",
      "#   # #",
      "### # #",
      "#   # #",
      "#   #G#",
      "#######"
    ],
    playerStart: { x: 0, y: 0 },
    goal: { x: 5, y: 6 },
    aiExplanation: "I'm using a breadth-first search algorithm to find the shortest path through the maze. This method explores all possible positions level by level until it reaches the goal."
  },
  {
    name: "Complex Maze",
    description: "Navigate a complex maze",
    objective: "Find your way through a more complex maze with multiple paths. The AI will use an optimized search algorithm. Can your intuition find a faster path?",
    maze: [
      "S  #   #",
      "### # # #",
      "#   #   #",
      "# # ### #",
      "# #     #",
      "# ##### #",
      "#       #",
      "#######G#"
    ],
    playerStart: { x: 0, y: 0 },
    goal: { x: 7, y: 7 },
    aiExplanation: "I'm using A* search algorithm with a Manhattan distance heuristic. This method evaluates each possible move based on both the distance already traveled and the estimated distance to the goal."
  },
  {
    name: "Tricky Maze",
    description: "Navigate a maze with tricks",
    objective: "Find your way through a maze with some tricks and shortcuts. The AI will use a comprehensive search method. Can you find creative solutions the AI might overlook?",
    maze: [
      "S   # #",
      "### # #",
      "#   # #",
      "# ### #",
      "#     #",
      "##### #",
      "#     #",
      "# ###G#"
    ],
    playerStart: { x: 0, y: 0 },
    goal: { x: 6, y: 7 },
    aiExplanation: "I'm using Dijkstra's algorithm to find the shortest path. This method explores all possible paths in order of increasing length, guaranteeing the optimal solution but potentially missing creative shortcuts."
  }
]

export default function LogicLabyrinth({ gameId, onBack }) {
  const { playSound } = useSound()
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [aiPath, setAiPath] = useState([])
  const [aiPosition, setAiPosition] = useState({ x: 0, y: 0 })
  const [aiThinking, setAiThinking] = useState(true)
  const [gameStatus, setGameStatus] = useState('playing') // playing, won, lost
  const [aiStatus, setAiStatus] = useState('thinking') // thinking, moving, won, lost
  const [playerMoves, setPlayerMoves] = useState(0)
  const [aiMoves, setAiMoves] = useState(0)
  
  const initGame = (levelData) => {
    setPlayerPosition(levelData.playerStart)
    setAiPosition(levelData.playerStart)
    setGameStatus('playing')
    setAiStatus('thinking')
    setPlayerMoves(0)
    setAiMoves(0)
    
    // Calculate AI path
    calculateAIPath(levelData)
  }
  
  const calculateAIPath = (levelData) => {
    setAiThinking(true)
    
    // Simulate AI calculation time
    setTimeout(() => {
      // For demo purposes, we'll use a simple pathfinding algorithm
      const path = findPath(levelData.maze, levelData.playerStart, levelData.goal)
      setAiPath(path)
      setAiThinking(false)
      
      // Start AI movement
      moveAIAlongPath(path, levelData.goal)
    }, 2000)
  }
  
  const findPath = (maze, start, goal) => {
    // Simple pathfinding for demo purposes
    // In a real implementation, this would use A* or similar algorithm
    
    const path = [start]
    let current = { ...start }
    
    // Simple right/down priority pathfinding (not optimal but works for demo)
    while (current.x !== goal.x || current.y !== goal.y) {
      // Try to move right first
      if (current.x < goal.x && maze[current.y][current.x + 1] !== '#') {
        current.x++
      } 
      // Then try to move down
      else if (current.y < goal.y && maze[current.y + 1][current.x] !== '#') {
        current.y++
      }
      // Then try to move left
      else if (current.x > goal.x && maze[current.y][current.x - 1] !== '#') {
        current.x--
      }
      // Finally try to move up
      else if (current.y > goal.y && maze[current.y - 1][current.x] !== '#') {
        current.y--
      }
      // If stuck, try to find any valid move
      else {
        if (current.x < maze[0].length - 1 && maze[current.y][current.x + 1] !== '#') {
          current.x++
        } else if (current.y < maze.length - 1 && maze[current.y + 1][current.x] !== '#') {
          current.y++
        } else if (current.x > 0 && maze[current.y][current.x - 1] !== '#') {
          current.x--
        } else if (current.y > 0 && maze[current.y - 1][current.x] !== '#') {
          current.y--
        } else {
          break // No valid moves
        }
      }
      
      path.push({ ...current })
      
      // Prevent infinite loops
      if (path.length > 100) break
    }
    
    return path
  }
  
  const moveAIAlongPath = (path, goal) => {
    setAiStatus('moving')
    
    let step = 1 // Skip the starting position
    
    const moveInterval = setInterval(() => {
      if (step >= path.length) {
        clearInterval(moveInterval)
        setAiStatus('won')
        return
      }
      
      setAiPosition(path[step])
      setAiMoves(prev => prev + 1)
      step++
      
      // Check if AI reached goal
      if (path[step - 1].x === goal.x && path[step - 1].y === goal.y) {
        clearInterval(moveInterval)
        setAiStatus('won')
      }
    }, 800) // AI moves every 800ms
  }
  
  const handlePlayerMove = (dx, dy, levelData) => {
    if (gameStatus !== 'playing') return
    
    playSound('click')
    
    const newX = playerPosition.x + dx
    const newY = playerPosition.y + dy
    
    // Check if move is valid
    if (
      newX >= 0 && 
      newX < levelData.maze[0].length && 
      newY >= 0 && 
      newY < levelData.maze.length && 
      levelData.maze[newY][newX] !== '#'
    ) {
      setPlayerPosition({ x: newX, y: newY })
      setPlayerMoves(prev => prev + 1)
      
      // Check if player reached goal
      if (newX === levelData.goal.x && newY === levelData.goal.y) {
        setGameStatus('won')
      }
    }
  }
  
  const renderMaze = (maze, playerPos, aiPos, goal, isPlayerView) => {
    return (
      <div className="flex flex-col items-center">
        {maze.map((row, y) => (
          <div key={y} className="flex">
            {row.split('').map((cell, x) => {
              let cellContent = null
              let cellClass = "w-8 h-8 flex items-center justify-center border border-gray-700"
              
              if (cell === '#') {
                cellClass += " bg-gray-800"
              } else {
                cellClass += " bg-gray-900"
              }
              
              // Player position
              if (playerPos.x === x && playerPos.y === y && isPlayerView) {
                cellContent = <div className="w-6 h-6 rounded-full bg-human-orange"></div>
              }
              // AI position
              else if (aiPos.x === x && aiPos.y === y && !isPlayerView) {
                cellContent = <div className="w-6 h-6 rounded-full bg-ai-purple"></div>
              }
              // Goal position
              else if (goal.x === x && goal.y === y) {
                cellContent = <div className="w-6 h-6 rounded-full bg-ai-green"></div>
              }
              
              return (
                <div key={`${x}-${y}`} className={cellClass}>
                  {cellContent}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
  
  const renderControls = (levelData) => {
    return (
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          <div></div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handlePlayerMove(0, -1, levelData)}
            disabled={gameStatus !== 'playing'}
          >
            ↑
          </Button>
          <div></div>
          
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handlePlayerMove(-1, 0, levelData)}
            disabled={gameStatus !== 'playing'}
          >
            ←
          </Button>
          <div></div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handlePlayerMove(1, 0, levelData)}
            disabled={gameStatus !== 'playing'}
          >
            →
          </Button>
          
          <div></div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handlePlayerMove(0, 1, levelData)}
            disabled={gameStatus !== 'playing'}
          >
            ↓
          </Button>
          <div></div>
        </div>
        
        <div className="text-center mt-4 text-sm">
          Moves: {playerMoves}
        </div>
      </Card>
    )
  }
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    // Initialize game when level loads
    useEffect(() => {
      initGame(levelData)
      onAIResponse("I'm calculating the optimal path through the maze using search algorithms.")
    }, [levelData])
    
    const handleCompleteLevel = () => {
      playSound('click')
      
      // Calculate score based on performance
      let score = 50 // Base score
      
      if (gameStatus === 'won') score += 30
      if (aiStatus === 'lost') score += 20
      
      // Bonus for fewer moves than AI
      if (playerMoves < aiMoves) {
        score += 20
      }
      
      onLevelComplete(score)
    }
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Player's game */}
          <Card className="p-6 border border-human-orange/30">
            <h4 className="font-bold text-human-orange mb-4 text-center">Your Path</h4>
            
            {renderMaze(levelData.maze, playerPosition, aiPosition, levelData.goal, true)}
            
            <div className="mt-4">
              {renderControls(levelData)}
            </div>
            
            {gameStatus === 'won' && (
              <div className="text-center py-4">
                <div className="text-2xl mb-2">🎉</div>
                <div className="font-bold text-human-orange">You Reached the Goal!</div>
                <div className="text-sm mt-2">Moves: {playerMoves}</div>
              </div>
            )}
          </Card>
          
          {/* AI's game */}
          <Card className="p-6 border border-ai-purple/30">
            <h4 className="font-bold text-ai-purple mb-4 text-center">AI's Path</h4>
            
            {renderMaze(levelData.maze, playerPosition, aiPosition, levelData.goal, false)}
            
            <div className="mt-4 text-center">
              {aiThinking && (
                <div className="text-sm text-gray-400">
                  AI is calculating optimal path...
                </div>
              )}
              
              {!aiThinking && aiStatus === 'moving' && (
                <div className="text-sm text-gray-400">
                  AI is moving along calculated path...
                </div>
              )}
              
              {!aiThinking && aiStatus === 'won' && (
                <div className="text-center py-4">
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="font-bold text-ai-purple">AI Reached the Goal!</div>
                  <div className="text-sm mt-2">Moves: {aiMoves}</div>
                </div>
              )}
              
              <div className="text-sm mt-2">
                Moves: {aiMoves}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Game explanation */}
        <Card className="p-4 bg-bg-dark/50">
          <h4 className="font-bold mb-2">How This Works</h4>
          <p className="text-sm text-gray-400 mb-2">
            {levelData.aiExplanation}
          </p>
          <p className="text-sm text-gray-400">
            You're using your intuition and ability to recognize patterns to find your way through the maze. 
            The AI is using systematic search algorithms to calculate the optimal path. 
            Sometimes, human intuition can find shortcuts that algorithms might miss!
          </p>
        </Card>
        
        {/* Complete button when both are done */}
        {gameStatus === 'won' && aiStatus === 'won' && (
          <div className="text-center">
            <Button onClick={handleCompleteLevel} size="lg">
              Continue to Results
            </Button>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="Logic Labyrinth"
      gameDescription="Shortcuts vs Computation - Navigate through mazes"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}