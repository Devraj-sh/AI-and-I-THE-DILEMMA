import { useState, useEffect } from 'react';
import { Brain, Zap, BarChart3, TrendingUp, Clock, Target, Lightbulb, ArrowLeft } from 'lucide-react';

export default function ComparePage() {
  const [selectedComparison, setSelectedComparison] = useState('reasoning');
  const [animationStep, setAnimationStep] = useState(0);

  const comparisons = {
    reasoning: {
      title: 'Logical Reasoning',
      description: 'How different AI models approach logical problems',
      problem: 'If all roses are flowers, and some flowers are red, can we conclude that some roses are red?',
      models: [
        {
          name: 'Human Brain',
          icon: '🧠',
          color: 'from-blue-400 to-cyan-500',
          steps: [
            'Read the problem carefully',
            'Identify the logical structure',
            'Consider: All roses → flowers',
            'Consider: Some flowers → red',
            'Realize this doesn\'t guarantee roses are red',
            'Conclude: Cannot determine from given info'
          ],
          conclusion: 'Cannot be determined',
          confidence: 85,
          time: '45 seconds'
        },
        {
          name: 'GPT-4',
          icon: '🤖',
          color: 'from-green-400 to-emerald-500',
          steps: [
            'Parse logical statements',
            'Map: roses ⊆ flowers',
            'Map: ∃ flowers that are red',
            'Check logical validity',
            'No direct connection established',
            'Output: Insufficient information'
          ],
          conclusion: 'Cannot be determined',
          confidence: 95,
          time: '2.3 seconds'
        },
        {
          name: 'Claude',
          icon: '🎯',
          color: 'from-purple-400 to-violet-500',
          steps: [
            'Analyze premise structure',
            'Identify universal vs existential',
            'All roses are flowers (universal)',
            'Some flowers are red (existential)',
            'Check for logical bridge',
            'No valid inference possible'
          ],
          conclusion: 'Cannot be determined',
          confidence: 92,
          time: '1.8 seconds'
        }
      ]
    },
    creativity: {
      title: 'Creative Problem Solving',
      description: 'How AI models approach creative challenges',
      problem: 'Design a new type of transportation for a city on Mars',
      models: [
        {
          name: 'Human Brain',
          icon: '🧠',
          color: 'from-blue-400 to-cyan-500',
          steps: [
            'Imagine Mars environment',
            'Consider low gravity, thin atmosphere',
            'Think about existing sci-fi concepts',
            'Combine ideas: magnetic levitation + pods',
            'Add personal touch: transparent tubes',
            'Refine based on practicality'
          ],
          conclusion: 'Magnetic levitation pod network with transparent tubes',
          confidence: 70,
          time: '5 minutes'
        },
        {
          name: 'GPT-4',
          icon: '🤖',
          color: 'from-green-400 to-emerald-500',
          steps: [
            'Analyze Mars constraints',
            'Low gravity: 38% of Earth',
            'Thin atmosphere: 1% pressure',
            'Generate transport concepts',
            'Evaluate feasibility matrix',
            'Optimize for efficiency'
          ],
          conclusion: 'Pneumatic tube system with pressurized capsules',
          confidence: 88,
          time: '3.1 seconds'
        },
        {
          name: 'Claude',
          icon: '🎯',
          color: 'from-purple-400 to-violet-500',
          steps: [
            'Consider Martian physics',
            'Dust storms, temperature extremes',
            'Think sustainable materials',
            'Combine multiple transport modes',
            'Underground + surface hybrid',
            'Account for human psychology'
          ],
          conclusion: 'Multi-modal underground/surface hybrid with bio-domes',
          confidence: 82,
          time: '2.7 seconds'
        }
      ]
    },
    pattern: {
      title: 'Pattern Recognition',
      description: 'How AI models identify and extend patterns',
      problem: 'What comes next: 2, 6, 12, 20, 30, ?',
      models: [
        {
          name: 'Human Brain',
          icon: '🧠',
          color: 'from-blue-400 to-cyan-500',
          steps: [
            'Look at differences: 4, 6, 8, 10',
            'Differences increase by 2',
            'Next difference should be 12',
            'So: 30 + 12 = 42',
            'Double-check the pattern',
            'Verify: looks right!'
          ],
          conclusion: '42',
          confidence: 90,
          time: '30 seconds'
        },
        {
          name: 'GPT-4',
          icon: '🤖',
          color: 'from-green-400 to-emerald-500',
          steps: [
            'Calculate first differences: [4,6,8,10]',
            'Calculate second differences: [2,2,2]',
            'Identify arithmetic progression',
            'Next first difference: 12',
            'Apply: 30 + 12 = 42',
            'Verify pattern consistency'
          ],
          conclusion: '42',
          confidence: 99,
          time: '0.8 seconds'
        },
        {
          name: 'Claude',
          icon: '🎯',
          color: 'from-purple-400 to-violet-500',
          steps: [
            'Examine sequence structure',
            'Notice: n(n+1) pattern',
            '2=1×2, 6=2×3, 12=3×4, 20=4×5, 30=5×6',
            'Next: 6×7 = 42',
            'Confirm with difference method',
            'Both approaches agree'
          ],
          conclusion: '42',
          confidence: 98,
          time: '1.2 seconds'
        }
      ]
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 6);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const currentData = comparisons[selectedComparison];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo('/')}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Thinking Comparison
              </h1>
              <p className="text-gray-400">See how different AI models approach the same problems</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Comparison Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            {Object.entries(comparisons).map(([key, comp]) => (
              <button
                key={key}
                onClick={() => setSelectedComparison(key)}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedComparison === key
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {comp.title}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3 text-cyan-400" />
            {currentData.title}
          </h2>
          <p className="text-gray-300 mb-6">{currentData.description}</p>
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-cyan-400">Problem:</h3>
            <p className="text-white text-lg">{currentData.problem}</p>
          </div>
        </div>

        {/* AI Model Comparisons */}
        <div className="grid lg:grid-cols-3 gap-8">
          {currentData.models.map((model, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              {/* Model Header */}
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center text-2xl mr-4`}>
                  {model.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{model.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {model.time}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {model.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Thinking Steps */}
              <div className="space-y-3 mb-6">
                <h4 className="font-bold text-sm text-gray-300 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Thinking Process:
                </h4>
                {model.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-500 ${
                      animationStep >= stepIndex
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      animationStep >= stepIndex
                        ? `bg-gradient-to-r ${model.color} text-white`
                        : 'bg-white/20 text-gray-400'
                    }`}>
                      {stepIndex + 1}
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className={`bg-gradient-to-r ${model.color.replace('to-', 'to-').replace('from-', 'from-')}/10 border border-white/20 rounded-lg p-4`}>
                <h4 className="font-bold text-sm mb-2">Conclusion:</h4>
                <p className="text-white font-medium">{model.conclusion}</p>
              </div>

              {/* Confidence Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Confidence Level</span>
                  <span className="text-xs font-bold">{model.confidence}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${model.color} transition-all duration-1000`}
                    style={{ width: `${model.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
            Key Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-cyan-400">Human Thinking</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>More intuitive and experience-based</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Takes time to process and verify</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Often includes creative leaps</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Considers emotional and practical factors</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-purple-400">AI Thinking</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Systematic and methodical approach</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Extremely fast processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>High confidence in logical tasks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consistent and reproducible results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Experience This Yourself?</h3>
          <p className="text-gray-400 mb-8">Try our interactive games and playground to see AI thinking in action!</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigateTo('/games')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Play Games
            </button>
            <button
              onClick={() => navigateTo('/playground')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Try Playground
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}