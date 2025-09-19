'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameTemplate from './GameTemplate'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useSound } from '@/components/hooks/useSound'

const levels = [
  {
    name: "Basic Emotions",
    description: "Navigate emotional scenarios",
    objective: "Make choices in emotional scenarios. The AI will struggle to understand the emotional nuances. See how human emotional intelligence compares to AI logic!",
    scenarios: [
      {
        situation: "Your friend is sad because they failed an important test. What do you do?",
        choices: [
          { 
            text: "Tell them they should have studied harder", 
            emotion: "blame",
            response: "Your friend feels worse and thinks you're judging them."
          },
          { 
            text: "Give them a hug and listen to how they feel", 
            emotion: "empathy",
            response: "Your friend feels supported and understood. Your emotional connection strengthens."
          },
          { 
            text: "Offer to help them study for the next test", 
            emotion: "solution",
            response: "Your friend appreciates your practical help but still feels sad about failing."
          }
        ],
        aiChoice: 0,
        aiExplanation: "I selected the first option because it addresses the root cause of the problem. From a logical perspective, identifying the cause (insufficient studying) and addressing it directly is the most efficient approach to preventing future failures."
      },
      {
        situation: "Someone gives you a gift you don't like. What do you do?",
        choices: [
          { 
            text: "Tell them you don't like it", 
            emotion: "honesty",
            response: "The person feels hurt and embarrassed by your honesty."
          },
          { 
            text: "Pretend to like it and thank them sincerely", 
            emotion: "kindness",
            response: "The person feels happy that you appreciate their gift. You've preserved their feelings."
          },
          { 
            text: "Ask them for the receipt so you can exchange it", 
            emotion: "practicality",
            response: "The person feels confused about your reaction and wonders if you liked the gift at all."
          }
        ],
        aiChoice: 2,
        aiExplanation: "I chose the third option because it maximizes utility. The gift has no value to you, so exchanging it for something you want is the most logical outcome. This approach ensures resources are allocated efficiently."
      }
    ]
  },
  {
    name: "Complex Emotions",
    description: "Navigate complex emotional scenarios",
    objective: "Make choices in complex emotional situations. The AI will analyze the situation logically but miss emotional subtleties. Can your emotional intelligence outperform AI logic?",
    scenarios: [
      {
        situation: "Your partner wants to move to another country for their dream job, but you don't want to leave. What do you do?",
        choices: [
          { 
            text: "Tell them they can't go", 
            emotion: "control",
            response: "Your partner feels resentful and trapped. Your relationship suffers."
          },
          { 
            text: "Support their decision and discuss a long-distance relationship", 
            emotion: "compromise",
            response: "You both make sacrifices but maintain your relationship. It's challenging but workable."
          },
          { 
            text: "Suggest you both move for a trial period", 
            emotion: "exploration",
            response: "You both feel heard and valued. This approach allows you to explore new possibilities together."
          }
        ],
        aiChoice: 1,
        aiExplanation: "I selected the second option because it represents a logical compromise. Both parties get something they want - your partner gets their dream job, and you maintain the relationship. This solution maximizes overall utility by balancing competing priorities."
      },
      {
        situation: "Your colleague takes credit for your work in a team meeting. What do you do?",
        choices: [
          { 
            text: "Confront them angrily in front of everyone", 
            emotion: "anger",
            response: "You create an uncomfortable scene and damage your professional reputation."
          },
          { 
            text: "Say nothing and hope someone notices", 
            emotion: "avoidance",
            response: "You feel resentful and your contribution goes unrecognized."
          },
          { 
            text: "Speak to them privately afterward and explain how you feel", 
            emotion: "assertiveness",
            response: "You address the issue professionally and give your colleague a chance to make it right."
          }
        ],
        aiChoice: 2,
        aiExplanation: "I chose the third option because it follows a logical conflict resolution process. Addressing the issue privately minimizes social disruption while still ensuring the problem is solved. This approach maintains professional relationships while correcting the injustice."
      }
    ]
  },
  {
    name: "Advanced Emotions",
    description: "Navigate advanced emotional scenarios",
    objective: "Make choices in advanced emotional situations. The AI will struggle with the complexity of human emotions. Can your emotional intelligence navigate these challenges better than AI logic?",
    scenarios: [
      {
        situation: "Your child wants to quit an activity they've been doing for years but you've invested a lot of time and money. What do you do?",
        choices: [
          { 
            text: "Force them to continue because of the investment", 
            emotion: "investment",
            response: "Your child feels resentful and their passion for the activity diminishes completely."
          },
          { 
            text: "Let them quit immediately without discussion", 
            emotion: "permissiveness",
            response: "Your child might regret quitting later and miss the opportunity to develop perseverance."
          },
          { 
            text: "Discuss their reasons and help them make a thoughtful decision", 
            emotion: "understanding",
            response: "Your child feels respected and learns to make thoughtful decisions about commitments."
          }
        ],
        aiChoice: 0,
        aiExplanation: "I selected the first option because it honors the sunk cost fallacy principle. Continuing with an activity after significant investment prevents resources from being wasted. This approach teaches the child about commitment and the value of following through on decisions."
      },
      {
        situation: "You discover your friend's partner is cheating on them. What do you do?",
        choices: [
          { 
            text: "Immediately tell your friend what you saw", 
            emotion: "honesty",
            response: "Your friend is devastated and may blame you for the painful news."
          },
          { 
            text: "Stay out of it because it's not your business", 
            emotion: "neutrality",
            response: "Your friend might feel betrayed when they eventually find out you knew and said nothing."
          },
          { 
            text: "Carefully consider how to approach the situation and talk to your friend sensitively", 
            emotion: "compassion",
            response: "You navigate a difficult situation with care, balancing honesty with compassion."
          }
        ],
        aiChoice: 1,
        aiExplanation: "I chose the second option because it minimizes interference in others' personal relationships. From an ethical standpoint, respecting boundaries and avoiding unnecessary involvement in complex interpersonal situations prevents additional harm and maintains relationship stability."
      }
    ]
  }
]

export default function EmotionQuest({ gameId, onBack }) {
  const { playSound } = useSound()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [aiChoice, setAiChoice] = useState(null)
  const [userScore, setUserScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  
  const initGame = (levelData) => {
    setCurrentScenario(0)
    setSelectedChoice(null)
    setShowResult(false)
    setAiChoice(null)
    setUserScore(0)
    setAiScore(0)
    setGameComplete(false)
  }
  
  const handleChoiceSelect = (choiceIndex, levelData) => {
    if (showResult) return
    
    playSound('click')
    setSelectedChoice(choiceIndex)
    
    // Set AI choice
    const scenario = levelData.scenarios[currentScenario]
    setAiChoice(scenario.aiChoice)
    
    // Calculate scores
    const choice = scenario.choices[choiceIndex]
    
    // Score based on emotional intelligence (simplified for demo)
    let choiceScore = 0
    if (choice.emotion === 'empathy' || choice.emotion === 'kindness' || choice.emotion === 'understanding' || choice.emotion === 'compassion') {
      choiceScore = 90
    } else if (choice.emotion === 'compromise' || choice.emotion === 'assertiveness' || choice.emotion === 'exploration') {
      choiceScore = 75
    } else {
      choiceScore = 50
    }
    
    // AI score is always lower because AI struggles with emotions
    const aiChoiceScore = 40
    
    setUserScore(prev => prev + choiceScore)
    setAiScore(prev => prev + aiChoiceScore)
    
    setShowResult(true)
  }
  
  const handleNextScenario = () => {
    playSound('click')
    
    if (currentScenario < levels[0].scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setSelectedChoice(null)
      setShowResult(false)
      setAiChoice(null)
    } else {
      setGameComplete(true)
    }
  }
  
  const renderGameLevel = ({ levelData, onLevelComplete, onAIResponse }) => {
    // Initialize game when level loads
    useEffect(() => {
      initGame(levelData)
      onAIResponse("I'm analyzing these scenarios using logical reasoning, but I struggle to understand emotional nuances.")
    }, [levelData])
    
    const scenario = levelData.scenarios[currentScenario]
    
    const handleCompleteLevel = () => {
      playSound('click')
      
      // Calculate final score
      const maxScore = 90 * levelData.scenarios.length
      const finalScore = Math.round((userScore / maxScore) * 100)
      
      onLevelComplete(finalScore)
    }
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold mb-2">Scenario {currentScenario + 1} of {levelData.scenarios.length}</h4>
          <div className="w-full bg-bg-dark rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-ai-blue to-ai-purple h-2 rounded-full"
              style={{ width: `${((currentScenario + 1) / levelData.scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="p-6">
          <h4 className="text-lg font-bold mb-4 text-center">Situation</h4>
          <p className="text-lg text-center">{scenario.situation}</p>
        </Card>
        
        {!showResult && (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-center">What would you do?</h4>
            <div className="grid grid-cols-1 gap-4">
              {scenario.choices.map((choice, index) => (
                <Card 
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:border-ai-blue/50 ${
                    selectedChoice === index ? 'border-2 border-ai-blue' : 'border border-white/10'
                  }`}
                  onClick={() => handleChoiceSelect(index, levelData)}
                >
                  <p>{choice.text}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {showResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User's choice */}
              <Card className="p-4 border border-human-orange/30">
                <h5 className="font-bold text-human-orange mb-2">Your Choice</h5>
                <p className="mb-3">{scenario.choices[selectedChoice].text}</p>
                <div className="text-sm text-gray-300">
                  <span className="font-bold">Result:</span> {scenario.choices[selectedChoice].response}
                </div>
                <div className="mt-3 text-sm">
                  <span className="font-bold">Emotion:</span> {scenario.choices[selectedChoice].emotion}
                </div>
              </Card>
              
              {/* AI's choice */}
              <Card className="p-4 border border-ai-purple/30">
                <h5 className="font-bold text-ai-purple mb-2">AI's Choice</h5>
                <p className="mb-3">{scenario.choices[aiChoice].text}</p>
                <div className="text-sm text-gray-300">
                  <span className="font-bold">Result:</span> {scenario.choices[aiChoice].response}
                </div>
                <div className="mt-3 text-sm">
                  <span className="font-bold">Reasoning:</span> {scenario.aiExplanation}
                </div>
              </Card>
            </div>
            
            <div className="text-center">
              {!gameComplete ? (
                <Button onClick={handleNextScenario}>
                  Next Scenario
                </Button>
              ) : (
                <Button onClick={handleCompleteLevel}>
                  See Results
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Game explanation */}
        <Card className="p-4 bg-bg-dark/50">
          <h4 className="font-bold mb-2">How This Works</h4>
          <p className="text-sm text-gray-400">
            You're using your emotional intelligence to navigate complex social situations. 
            The AI is using logical reasoning but struggles to understand emotional nuances, 
            social contexts, and the subtleties of human relationships. 
            This highlights the unique strengths of human emotional intelligence.
          </p>
        </Card>
        
        {/* Score display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border border-human-orange/30">
            <h5 className="font-bold text-human-orange mb-2">Your Emotional Intelligence</h5>
            <div className="text-3xl font-bold">{userScore}</div>
          </Card>
          
          <Card className="p-4 border border-ai-purple/30">
            <h5 className="font-bold text-ai-purple mb-2">AI's Logical Analysis</h5>
            <div className="text-3xl font-bold">{aiScore}</div>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <GameTemplate
      gameId={gameId}
      gameName="Emotion Quest"
      gameDescription="Feelings vs Reasoning - Navigate emotional scenarios"
      levels={levels}
      onBack={onBack}
      renderGameLevel={renderGameLevel}
    />
  )
}