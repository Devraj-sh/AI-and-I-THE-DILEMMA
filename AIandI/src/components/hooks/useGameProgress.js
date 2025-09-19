'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const GameProgressContext = createContext()

export const UserProgressProvider = ({ children }) => {
  const [gameProgress, setGameProgress] = useState({})
  const [badges, setBadges] = useState([])
  
  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('ai-vs-i-progress')
      const savedBadges = localStorage.getItem('ai-vs-i-badges')
      
      if (savedProgress) {
        setGameProgress(JSON.parse(savedProgress))
      }
      
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges))
      }
    }
  }, [])
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-vs-i-progress', JSON.stringify(gameProgress))
    }
  }, [gameProgress])
  
  // Save badges to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-vs-i-badges', JSON.stringify(badges))
    }
  }, [badges])
  
  const updateLevelProgress = (gameId, level, score) => {
    setGameProgress(prev => {
      const currentProgress = prev[gameId] || {}
      const newProgress = {
        ...currentProgress,
        [level]: Math.max(score, currentProgress[level] || 0)
      }
      
      return {
        ...prev,
        [gameId]: newProgress
      }
    })
  }
  
  const getLevelProgress = (gameId, level) => {
    return gameProgress[gameId]?.[level] || 0
  }
  
  const getTotalProgress = () => {
    const totalLevels = 10 // Total number of levels across all games
    const completedLevels = Object.values(gameProgress).reduce((acc, game) => {
      return acc + Object.values(game).filter(score => score > 0).length
    }, 0)
    
    return Math.round((completedLevels / totalLevels) * 100)
  }
  
  const earnBadge = (badgeId) => {
    if (!badges.includes(badgeId)) {
      setBadges(prev => [...prev, badgeId])
      return true // Badge was earned
    }
    return false // Badge already earned
  }
  
  const hasBadge = (badgeId) => {
    return badges.includes(badgeId)
  }
  
  const resetProgress = () => {
    setGameProgress({})
    setBadges([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ai-vs-i-progress')
      localStorage.removeItem('ai-vs-i-badges')
    }
  }
  
  return (
    <GameProgressContext.Provider value={{
      gameProgress,
      badges,
      updateLevelProgress,
      getLevelProgress,
      getTotalProgress,
      earnBadge,
      hasBadge,
      resetProgress,
      totalProgress: getTotalProgress()
    }}>
      {children}
    </GameProgressContext.Provider>
  )
}

export const useGameProgress = () => {
  const context = useContext(GameProgressContext)
  if (!context) {
    throw new Error('useGameProgress must be used within a UserProgressProvider')
  }
  return context
}