'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function PromptVisualizer({ 
  prompt, 
  setPrompt, 
  response, 
  isProcessing, 
  onSubmit 
}) {
  const [tokenization, setTokenization] = useState([])
  const [processingSteps, setProcessingSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  
  // Simulate tokenization when prompt changes
  useEffect(() => {
    if (prompt.trim()) {
      // Simple tokenization for demo purposes
      const tokens = prompt.split(/\s+/).map((token, index) => ({
        id: index,
        text: token,
        type: getTokenType(token)
      }))
      setTokenization(tokens)
      
      // Set up processing steps
      setProcessingSteps([
        { name: "Tokenization", description: "Breaking text into smaller units", progress: 0 },
        { name: "Context Analysis", description: "Understanding relationships between words", progress: 0 },
        { name: "Intent Recognition", description: "Determining what the user wants", progress: 0 },
        { name: "Knowledge Retrieval", description: "Accessing relevant information", progress: 0 },
        { name: "Response Generation", description: "Creating a coherent response", progress: 0 }
      ])
      setCurrentStep(0)
    } else {
      setTokenization([])
      setProcessingSteps([])
      setCurrentStep(0)
    }
  }, [prompt])
  
  // Simulate processing progress when isProcessing changes
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= processingSteps.length - 1) {
            clearInterval(interval)
            return prev
          }
          
          // Update progress for current step
          setProcessingSteps(steps => {
            const newSteps = [...steps]
            newSteps[prev] = { ...newSteps[prev], progress: 100 }
            if (prev < newSteps.length - 1) {
              newSteps[prev + 1] = { ...newSteps[prev + 1], progress: 0 }
            }
            return newSteps
          })
          
          return prev + 1
        })
      }, 800)
      
      return () => clearInterval(interval)
    }
  }, [isProcessing, processingSteps.length])
  
  const getTokenType = (token) => {
    // Simple token type detection for demo
    if (token.includes('?')) return 'question'
    if (['what', 'how', 'why', 'when', 'where', 'who'].includes(token.toLowerCase())) return 'interrogative'
    if (['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'].includes(token.toLowerCase())) return 'function'
    return 'content'
  }
  
  const getTokenColor = (type) => {
    switch (type) {
      case 'question': return 'bg-ai-blue/20 text-ai-blue'
      case 'interrogative': return 'bg-ai-purple/20 text-ai-purple'
      case 'function': return 'bg-gray-600/20 text-gray-400'
      default: return 'bg-human-orange/20 text-human-orange'
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Enter your prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
          rows={3}
          placeholder="Enter a prompt for the AI to process..."
        />
      </div>
      
      <Button 
        onClick={onSubmit}
        disabled={!prompt.trim() || isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Submit Prompt'}
      </Button>
      
      {tokenization.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-3">Tokenization</h3>
          <p className="text-sm text-gray-400 mb-3">AI breaks down your prompt into smaller units called tokens:</p>
          <div className="flex flex-wrap gap-2">
            {tokenization.map(token => (
              <div 
                key={token.id}
                className={`px-3 py-1 rounded-full text-sm ${getTokenColor(token.type)}`}
              >
                {token.text}
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {processingSteps.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-3">AI Processing Steps</h3>
          <div className="space-y-4">
            {processingSteps.map((step, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-medium ${index === currentStep && isProcessing ? 'text-ai-blue' : ''}`}>
                    {step.name}
                  </span>
                  <span className="text-sm text-gray-400">{step.progress}%</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{step.description}</p>
                <ProgressBar progress={step.progress} />
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {response && (
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-3">AI Response</h3>
          <p className="text-gray-300">{response}</p>
        </Card>
      )}
      
      <Card className="p-4 bg-bg-dark/50">
        <h3 className="text-lg font-bold mb-3">How AI Processes Prompts</h3>
        <p className="text-sm text-gray-400">
          When you submit a prompt, AI systems follow several steps to generate a response:
        </p>
        <ol className="text-sm text-gray-400 list-decimal pl-5 mt-2 space-y-1">
          <li><strong>Tokenization:</strong> Breaking text into smaller units</li>
          <li><strong>Context Analysis:</strong> Understanding relationships between words</li>
          <li><strong>Intent Recognition:</strong> Determining what the user wants</li>
          <li><strong>Knowledge Retrieval:</strong> Accessing relevant information</li>
          <li><strong>Response Generation:</strong> Creating a coherent response</li>
        </ol>
      </Card>
    </div>
  )
}