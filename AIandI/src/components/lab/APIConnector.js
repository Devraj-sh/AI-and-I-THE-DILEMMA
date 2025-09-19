'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function APIConnector({ 
  apiKeys, 
  onApiKeyChange, 
  prompt, 
  setPrompt, 
  response, 
  isProcessing, 
  onSubmit 
}) {
  const [selectedModel, setSelectedModel] = useState('openai')
  
  const handleModelChange = (model) => {
    setSelectedModel(model)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select AI Model:</label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={selectedModel === 'openai' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModelChange('openai')}
          >
            OpenAI
          </Button>
          <Button
            variant={selectedModel === 'anthropic' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModelChange('anthropic')}
          >
            Anthropic
          </Button>
          <Button
            variant={selectedModel === 'google' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModelChange('google')}
          >
            Google
          </Button>
        </div>
      </div>
      
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-3">API Configuration</h3>
        
        {selectedModel === 'openai' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">OpenAI API Key:</label>
              <input
                type="password"
                value={apiKeys.openai}
                onChange={(e) => onApiKeyChange('openai', e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                placeholder="sk-..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model:</label>
              <select className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white">
                <option>gpt-4</option>
                <option>gpt-3.5-turbo</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedModel === 'anthropic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Anthropic API Key:</label>
              <input
                type="password"
                value={apiKeys.anthropic}
                onChange={(e) => onApiKeyChange('anthropic', e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                placeholder="sk-ant-..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model:</label>
              <select className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white">
                <option>claude-3-opus-20240229</option>
                <option>claude-3-sonnet-20240229</option>
                <option>claude-3-haiku-20240307</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedModel === 'google' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Google API Key:</label>
              <input
                type="password"
                value={apiKeys.google}
                onChange={(e) => onApiKeyChange('google', e.target.value)}
                className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white"
                placeholder="AIza..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model:</label>
              <select className="w-full p-3 rounded-lg bg-bg-dark border border-white/10 text-white">
                <option>gemini-pro</option>
                <option>gemini-pro-vision</option>
              </select>
            </div>
          </div>
        )}
      </Card>
      
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
        disabled={!prompt.trim() || isProcessing || !apiKeys[selectedModel]}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Submit to AI'}
      </Button>
      
      {response && (
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-3">AI Response</h3>
          <p className="text-gray-300">{response}</p>
        </Card>
      )}
      
      <Card className="p-4 bg-bg-dark/50">
        <h3 className="text-lg font-bold mb-3">About API Integration</h3>
        <p className="text-sm text-gray-400">
          This section allows you to connect to external AI models using their APIs. 
          By entering your API keys, you can compare how different AI models respond to the same prompts.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Note: In a production environment, API keys should be stored securely and not exposed in client-side code.
        </p>
      </Card>
    </div>
  )
}