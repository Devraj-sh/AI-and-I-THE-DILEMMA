'use client'

import { useState, useRef, useEffect } from 'react'
import { useSound } from './useSound'

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { soundEnabled } = useSound()
  const synthRef = useRef(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
    }
  }, [])
  
  const speak = (text, options = {}) => {
    if (!soundEnabled || !synthRef.current) return
    
    // Stop any ongoing speech
    synthRef.current.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set default options
    utterance.rate = options.rate || 1
    utterance.pitch = options.pitch || 1
    utterance.volume = options.volume || 0.8
    
    // Try to use a more robotic voice for AI
    if (options.voice === 'ai') {
      const voices = synthRef.current.getVoices()
      const aiVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.name.includes('Alex')
      )
      if (aiVoice) utterance.voice = aiVoice
    }
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synthRef.current.speak(utterance)
  }
  
  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }
  
  return { speak, stop, isSpeaking }
}