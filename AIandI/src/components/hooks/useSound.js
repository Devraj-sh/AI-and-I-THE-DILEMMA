'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react'

const SoundContext = createContext()

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const soundsRef = useRef({})
  
  useEffect(() => {
    // Initialize sounds
    const loadSounds = async () => {
      if (typeof window !== 'undefined') {
        const { Howl } = await import('howler')
        
        soundsRef.current = {
          click: new Howl({
            src: ['/assets/sounds/click.mp3'],
            volume: 0.5,
          }),
          success: new Howl({
            src: ['/assets/sounds/success.mp3'],
            volume: 0.7,
          }),
          levelComplete: new Howl({
            src: ['/assets/sounds/level-complete.mp3'],
            volume: 0.8,
          }),
          thinking: new Howl({
            src: ['/assets/sounds/thinking.mp3'],
            volume: 0.3,
            loop: true,
          }),
        }
      }
    }
    
    loadSounds()
    
    return () => {
      // Cleanup sounds
      Object.values(soundsRef.current).forEach(sound => {
        if (sound && typeof sound.unload === 'function') {
          sound.unload()
        }
      })
    }
  }, [])
  
  const playSound = (soundName) => {
    if (soundEnabled && soundsRef.current[soundName]) {
      soundsRef.current[soundName].play()
    }
  }
  
  const stopSound = (soundName) => {
    if (soundsRef.current[soundName]) {
      soundsRef.current[soundName].stop()
    }
  }
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev)
  }
  
  return (
    <SoundContext.Provider value={{ 
      soundEnabled, 
      playSound, 
      stopSound, 
      toggleSound 
    }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}