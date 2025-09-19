import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
  // User state
  username: '',
  badges: [],
  soundEnabled: true,
  
  // Actions
  setUsername: (name) => set({ username: name }),
  addBadge: (badgeId) => set((state) => ({
    badges: [...state.badges, badgeId]
  })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  // Reset
  resetUser: () => set({ username: '', badges: [], soundEnabled: true })
}))