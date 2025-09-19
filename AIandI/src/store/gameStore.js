import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
  // Game state
  currentGame: null,
  currentLevel: 1,
  gameProgress: {},
  
  // Actions
  setCurrentGame: (gameId) => set({ currentGame: gameId }),
  setCurrentLevel: (level) => set({ currentLevel: level }),
  updateGameProgress: (gameId, level, score) => set((state) => ({
    gameProgress: {
      ...state.gameProgress,
      [gameId]: {
        ...state.gameProgress[gameId],
        [level]: score
      }
    }
  })),
  
  // Reset
  resetGame: () => set({ currentGame: null, currentLevel: 1 }),
  resetProgress: () => set({ gameProgress: {} })
}))