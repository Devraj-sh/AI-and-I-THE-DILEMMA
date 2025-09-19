'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SoundToggle } from '@/components/ui/SoundToggle'
import HumanAvatar from '@/components/avatars/HumanAvatar'
import RobotAvatar from '@/components/avatars/RobotAvatar'
import PromptVisualizer from './PromptVisualizer'
import APIConnector from './APIConnector'
import { useSound } from '@/components/hooks/useSound'
import { useTextToSpeech } from '@/components/hooks/useSound'

export default function AIMasteryLab({ onBack }) {
  const { playSound } = useSound()
  const { speak } = useTextToSpeech()
  const [activeTab, setActiveTab] = useState('visualizer')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    google: ''
  })
  
  const handleSubmitPrompt = () => {
    if (!prompt.trim()) return
    
    playSound('click')
    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      // This would be replaced with actual API calls in a real implementation
      const mockResponse = `I understand you're asking about "${prompt}". Based on my analysis, this appears to be a request for information or creative content. I'll process this by breaking it down into key components, analyzing the intent, and generating a relevant response based on my training data and algorithms.`
      
      setResponse(mockResponse)
      setIsProcessing(false)
      speak(mockResponse, { voice: 'ai' })
    }, 2000)
  }
  
  const handleApiKeyChange = (service, key) => {
    setApiKeys(prev => ({
      ...prev,
      [service]: key
    }))
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Button onClick={onBack} variant="secondary">
          ← Back to Home
        </Button>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">AI Mastery Lab</h2>
          <p className="text-gray-400">Explore prompt engineering and AI thinking processes</p>
        </div>
        <SoundToggle />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button
          variant={activeTab === 'visualizer' ? 'primary' : 'secondary'}
          onClick={() => {
            playSound('click')
            setActiveTab('visualizer')
          }}
        >
          Prompt Visualizer
        </Button>
        <Button
          variant={activeTab === 'api' ? 'primary' : 'secondary'}
          onClick={() => {
            playSound('click')
            setActiveTab('api')
          }}
        >
          API Connector
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            {activeTab === 'visualizer' && (
              <PromptVisualizer 
                prompt={prompt}
                setPrompt={setPrompt}
                response={response}
                isProcessing={isProcessing}
                onSubmit={handleSubmitPrompt}
              />
            )}
            
            {activeTab === 'api' && (
              <APIConnector 
                apiKeys={apiKeys}
                onApiKeyChange={handleApiKeyChange}
                prompt={prompt}
                setPrompt={setPrompt}
                response={response}
                isProcessing={isProcessing}
                onSubmit={handleSubmitPrompt}
              />
            )}
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4 text-center">AI Interaction</h3>
            <div className="flex justify-center space-x-8">
              <HumanAvatar thought={prompt ? "I wonder how the AI will respond..." : "What should I ask the AI?"} />
              <RobotAvatar message={isProcessing ? "Processing your request..." : response || "I'm ready to analyze your prompt!"} />
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">About This Lab</h3>
            <p className="text-sm text-gray-300 mb-3">
              The AI Mastery Lab helps you understand how artificial intelligence processes language and generates responses.
            </p>
            <p className="text-sm text-gray-300">
              Use the Prompt Visualizer to see how AI breaks down your requests, or connect to external AI models using the API Connector.
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Prompt Engineering Tips</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Be specific and clear in your requests</li>
              <li>• Provide context when necessary</li>
              <li>• Break complex requests into steps</li>
              <li>• Specify the format you want for responses</li>
              <li>• Experiment with different phrasings</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}