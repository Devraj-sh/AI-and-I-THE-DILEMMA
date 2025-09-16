import { useState, useEffect } from 'react';
import { Brain, MessageSquare, Settings, Plus, Trash2, Send, Copy, Download, Sparkles, Zap } from 'lucide-react';

export default function PlaygroundPage() {
  const [connectedAIs, setConnectedAIs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const aiProviders = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      description: 'OpenAI\'s conversational AI',
      icon: '🤖',
      color: 'from-green-400 to-emerald-500',
      apiKeyLabel: 'OpenAI API Key',
      placeholder: 'sk-...'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Google\'s advanced AI model',
      icon: '💎',
      color: 'from-blue-400 to-cyan-500',
      apiKeyLabel: 'Gemini API Key',
      placeholder: 'AIza...'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Anthropic\'s helpful AI assistant',
      icon: '🧠',
      color: 'from-purple-400 to-violet-500',
      apiKeyLabel: 'Anthropic API Key',
      placeholder: 'sk-ant-...'
    }
  ];

  const samplePrompts = [
    "Explain quantum computing in simple terms",
    "Write a creative story about a robot learning emotions",
    "Compare the advantages of renewable energy sources",
    "Describe how machine learning works step by step",
    "Create a recipe for a healthy breakfast"
  ];

  const AddAIModal = () => {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [customName, setCustomName] = useState('');

    const handleAdd = () => {
      if (selectedProvider && apiKey) {
        const newAI = {
          id: Date.now(),
          provider: selectedProvider,
          apiKey: apiKey,
          name: customName || selectedProvider.name,
          isActive: true
        };
        setConnectedAIs([...connectedAIs, newAI]);
        setShowAddModal(false);
        setSelectedProvider(null);
        setApiKey('');
        setCustomName('');
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-white">Add AI Provider</h3>
          
          <div className="space-y-4 mb-6">
            {aiProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => setSelectedProvider(provider)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProvider?.id === provider.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${provider.color} rounded-lg flex items-center justify-center text-xl`}>
                    {provider.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{provider.name}</h4>
                    <p className="text-sm text-gray-400">{provider.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedProvider && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {selectedProvider.apiKeyLabel}
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={selectedProvider.placeholder}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Name (Optional)
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={`My ${selectedProvider.name}`}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!selectedProvider || !apiKey}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add AI
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSendPrompt = async () => {
    if (!currentPrompt.trim() || connectedAIs.length === 0) return;
    
    setIsLoading(true);
    const newResponses = {};
    
    // Simulate API calls to different AI providers
    for (const ai of connectedAIs) {
      if (ai.isActive) {
        // Simulate different response styles for different AIs
        setTimeout(() => {
          let response = '';
          switch (ai.provider.id) {
            case 'chatgpt':
              response = `ChatGPT Response: I understand you're asking about "${currentPrompt}". Let me break this down step by step...`;
              break;
            case 'gemini':
              response = `Gemini Analysis: Based on your query "${currentPrompt}", I can provide multiple perspectives...`;
              break;
            case 'claude':
              response = `Claude's Perspective: That's an interesting question about "${currentPrompt}". I'd like to approach this thoughtfully...`;
              break;
            default:
              response = `AI Response: Here's my analysis of "${currentPrompt}"...`;
          }
          
          setResponses(prev => ({
            ...prev,
            [ai.id]: {
              text: response,
              timestamp: new Date().toLocaleTimeString(),
              tokens: Math.floor(Math.random() * 100) + 50,
              processingTime: Math.floor(Math.random() * 3000) + 500
            }
          }));
        }, Math.random() * 2000 + 500);
      }
    }
    
    setTimeout(() => setIsLoading(false), 3000);
  };

  const removeAI = (aiId) => {
    setConnectedAIs(connectedAIs.filter(ai => ai.id !== aiId));
    const newResponses = { ...responses };
    delete newResponses[aiId];
    setResponses(newResponses);
  };

  const toggleAI = (aiId) => {
    setConnectedAIs(connectedAIs.map(ai => 
      ai.id === aiId ? { ...ai, isActive: !ai.isActive } : ai
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Playground
          </h1>
          <p className="text-gray-400">Connect your AI tools and compare their responses side by side</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Connected AIs */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Connected AIs</h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {connectedAIs.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">No AIs connected yet</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-sm hover:shadow-lg transition-all"
                  >
                    Add Your First AI
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {connectedAIs.map((ai) => (
                    <div key={ai.id} className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${ai.provider.color} rounded-lg flex items-center justify-center text-sm`}>
                            {ai.provider.icon}
                          </div>
                          <span className="font-medium">{ai.name}</span>
                        </div>
                        <button
                          onClick={() => removeAI(ai.id)}
                          className="w-6 h-6 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAI(ai.id)}
                          className={`flex-1 px-3 py-1 rounded text-xs font-medium transition-all ${
                            ai.isActive
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {ai.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sample Prompts */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Sample Prompts</h4>
                <div className="space-y-2">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPrompt(prompt)}
                      className="w-full text-left p-3 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Prompt Input */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
              <h3 className="text-xl font-bold mb-4">Enter Your Prompt</h3>
              <div className="flex space-x-4">
                <textarea
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  placeholder="Ask something interesting and see how different AIs respond..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSendPrompt}
                  disabled={!currentPrompt.trim() || connectedAIs.length === 0 || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isLoading ? 'Sending...' : 'Send'}</span>
                </button>
              </div>
            </div>

            {/* Responses */}
            <div className="grid md:grid-cols-2 gap-6">
              {connectedAIs.filter(ai => ai.isActive).map((ai) => (
                <div key={ai.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${ai.provider.color} rounded-lg flex items-center justify-center`}>
                        {ai.provider.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{ai.name}</h4>
                        <p className="text-xs text-gray-400">{ai.provider.name}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 min-h-[200px]">
                    {isLoading && !responses[ai.id] ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    ) : responses[ai.id] ? (
                      <div>
                        <p className="text-white text-sm leading-relaxed mb-4">
                          {responses[ai.id].text}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/10">
                          <span>⏱️ {responses[ai.id].processingTime}ms</span>
                          <span>🔤 {responses[ai.id].tokens} tokens</span>
                          <span>🕒 {responses[ai.id].timestamp}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <MessageSquare className="w-8 h-8 mb-2" />
                        <p className="text-sm">Send a prompt to see response</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {connectedAIs.filter(ai => ai.isActive).length === 0 && (
              <div className="text-center py-16">
                <Zap className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Active AIs</h3>
                <p className="text-gray-400 mb-6">Connect and activate AI providers to start comparing responses</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg transition-all"
                >
                  Add AI Provider
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && <AddAIModal />}
    </div>
  );
}