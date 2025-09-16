import { useState, useEffect } from 'react';
import { Brain, BookOpen, Target, Lightbulb, Code, Zap, ChevronRight, CheckCircle, XCircle, Star, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

export default function AdvancedPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [promptAnalysis, setPromptAnalysis] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const modules = [
    {
      id: 1,
      title: 'Prompt Fundamentals',
      description: 'Learn the building blocks of effective AI communication',
      icon: '🎯',
      difficulty: 'Beginner',
      lessons: 8,
      color: 'from-green-400 to-emerald-500',
      topics: ['Clear Instructions', 'Context Setting', 'Output Format', 'Examples']
    },
    {
      id: 2,
      title: 'Advanced Techniques',
      description: 'Master sophisticated prompting strategies',
      icon: '🧠',
      difficulty: 'Intermediate',
      lessons: 10,
      color: 'from-blue-400 to-cyan-500',
      topics: ['Chain of Thought', 'Few-shot Learning', 'Role Playing', 'Constraints']
    },
    {
      id: 3,
      title: 'AI Psychology',
      description: 'Understand how AI models process and respond',
      icon: '🔬',
      difficulty: 'Advanced',
      lessons: 12,
      color: 'from-purple-400 to-violet-500',
      topics: ['Token Limits', 'Attention Mechanisms', 'Bias Handling', 'Temperature']
    },
    {
      id: 4,
      title: 'Prompt Engineering',
      description: 'Professional-level prompt optimization',
      icon: '⚡',
      difficulty: 'Expert',
      lessons: 15,
      color: 'from-orange-400 to-red-500',
      topics: ['Systematic Testing', 'Performance Metrics', 'A/B Testing', 'Automation']
    }
  ];

  // Complete lesson content with voice scripts
  const promptFundamentalsLessons = [
    {
      title: 'Writing Clear Instructions',
      content: 'The foundation of good prompting is clarity. AI models perform best when given specific, unambiguous instructions that leave no room for misinterpretation.',
      example: {
        bad: 'Write about dogs',
        good: 'Write a 200-word informative paragraph about Golden Retrievers, focusing on their temperament and care requirements for first-time dog owners.',
        explanation: 'The improved prompt specifies length, format, topic, focus areas, and target audience.'
      },
      exercise: 'Rewrite this vague prompt to be more specific: "Tell me about space"',
      voiceScript: 'Welcome to lesson one: Writing Clear Instructions. The key to effective AI communication is being as specific as possible. Vague prompts lead to vague responses, while detailed instructions produce focused, useful outputs.'
    },
    {
      title: 'Setting Context',
      content: 'Providing relevant background information helps AI understand the situation and respond appropriately. Context acts as a lens through which the AI interprets your request.',
      example: {
        bad: 'How do I fix this?',
        good: 'I\'m a beginner programmer working on a Python web app using Flask. My server returns a 404 error when I try to access the /users endpoint. The route is defined in my app.py file. How do I troubleshoot this?',
        explanation: 'Context includes skill level, technology stack, specific problem, existing setup, and desired outcome.'
      },
      exercise: 'Add context to this prompt: "What should I do about my presentation?"',
      voiceScript: 'Context is everything in AI communication. Just like talking to a human expert, the more relevant background you provide, the better advice you\'ll receive. Always include your experience level, current situation, and constraints.'
    },
    {
      title: 'Defining Output Format',
      content: 'Specifying exactly how you want the AI to structure its response ensures you get information in a usable format. This is especially important for complex tasks.',
      example: {
        bad: 'Give me marketing ideas',
        good: 'Provide 5 digital marketing strategies for a small bakery. Format as: Strategy Name, Target Audience, Implementation Steps (3-4 bullet points), Expected Timeline, Estimated Budget.',
        explanation: 'The prompt specifies quantity, structure, required fields, and level of detail for each component.'
      },
      exercise: 'Reformat this request to specify output structure: "Help me plan a vacation"',
      voiceScript: 'Think of output format as creating a template for the AI to fill in. Whether you need a list, table, step-by-step guide, or specific structure, always tell the AI exactly how to organize its response.'
    },
    {
      title: 'Using Examples Effectively',
      content: 'Examples are powerful tools that show the AI exactly what you\'re looking for. They serve as templates and set quality expectations.',
      example: {
        bad: 'Write a product description',
        good: 'Write a product description following this style: "Experience the luxury of [Product Name] - [Key Benefit]. With [Feature 1] and [Feature 2], this [Product Type] delivers [Main Value Proposition]. Perfect for [Target Customer]. Starting at [Price]." Product: Wireless Earbuds.',
        explanation: 'The example provides a clear template showing structure, tone, and required elements.'
      },
      exercise: 'Create an example-based prompt for writing email subject lines',
      voiceScript: 'Examples are like showing, not just telling. Instead of describing what you want, provide a concrete example that demonstrates your expectations. This dramatically improves output quality and consistency.'
    },
    {
      title: 'Combining Techniques',
      content: 'The most effective prompts combine multiple techniques: clear instructions, context, format specification, and examples working together.',
      example: {
        bad: 'Help me with social media',
        good: 'As a small business owner with limited marketing experience, I need to create engaging social media posts for my handmade jewelry business. Please provide 3 Instagram post ideas using this format: [Hook Question] + [Product Highlight] + [Call to Action]. Example: "Looking for unique gifts? ✨ Our handcrafted silver rings make perfect birthday presents! Shop our collection (link in bio) #HandmadeJewelry"',
        explanation: 'This combines context (business owner, experience level, industry), clear instructions (3 post ideas), format specification, and a concrete example.'
      },
      exercise: 'Create a comprehensive prompt for planning a content calendar',
      voiceScript: 'Now we bring it all together. The most powerful prompts layer multiple techniques. Start with context, add clear instructions, specify your desired format, and include examples. This systematic approach ensures consistently excellent results.'
    },
    {
      title: 'Common Pitfalls to Avoid',
      content: 'Understanding what NOT to do is just as important as learning best practices. These common mistakes can derail even well-intentioned prompts.',
      example: {
        bad: 'Make this better and more professional and engaging while keeping it short but comprehensive',
        good: 'Rewrite this email to be more professional. Target length: 100-150 words. Maintain a friendly but formal tone suitable for client communication.',
        explanation: 'Avoid contradictory instructions like "short but comprehensive" and vague terms like "better." Be specific about trade-offs.'
      },
      exercise: 'Identify and fix the problems in this prompt: "Write something creative and unique but also professional and formal about marketing but make it interesting and not boring"',
      voiceScript: 'Let\'s talk about what to avoid. Contradictory instructions confuse AI models. Vague adjectives like better, good, or interesting mean different things to different people. Always be specific about what you actually want.'
    },
    {
      title: 'Testing and Iteration',
      content: 'Great prompts are rarely perfect on the first try. Learn to systematically test and refine your prompts based on the outputs you receive.',
      example: {
        bad: 'This didn\'t work, let me try something completely different',
        good: 'The output was too formal. Let me adjust: "Use a conversational, friendly tone as if explaining to a colleague" and test again.',
        explanation: 'Systematic iteration involves identifying specific issues and making targeted adjustments rather than starting over.'
      },
      exercise: 'Design a testing strategy for a prompt that generates product names',
      voiceScript: 'Prompt engineering is an iterative process. Start with a solid foundation, test the output, identify specific issues, make targeted improvements, and test again. Each iteration should improve one specific aspect.'
    },
    {
      title: 'Advanced Integration',
      content: 'Learn to integrate prompting into workflows and combine it with other tools for maximum effectiveness.',
      example: {
        bad: 'Using AI for one-off tasks without considering workflow integration',
        good: 'Creating templated prompts that can be systematically applied across multiple similar tasks, with clear handoff points to human review.',
        explanation: 'Think beyond individual prompts to how AI can enhance entire workflows and processes.'
      },
      exercise: 'Design a multi-step prompting workflow for content creation',
      voiceScript: 'The final lesson focuses on integration. The most successful AI users don\'t just write better prompts - they design systems where AI enhances their entire workflow. Think about templates, automation, and human-AI collaboration.'
    }
  ];

  // Voice synthesis function
  const speakText = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    // Stop any currently speaking synthesis
    window.speechSynthesis.cancel();
    
    setIsAISpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setIsAISpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsAISpeaking(false);
  };

  // Navigate to lesson and speak if voice enabled
  const goToLesson = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
    if (isVoiceEnabled) {
      const lessons = selectedModule.id === 1 ? promptFundamentalsLessons : [];
      const lesson = lessons[lessonIndex];
      if (lesson && lesson.voiceScript) {
        setTimeout(() => speakText(lesson.voiceScript), 500);
      }
    }
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const PromptAnalyzer = () => {
    const analyzePrompt = () => {
      if (!userPrompt.trim()) return;

      const analysis = {
        clarity: Math.floor(Math.random() * 40) + 60,
        specificity: Math.floor(Math.random() * 40) + 50,
        context: Math.floor(Math.random() * 50) + 30,
        structure: Math.floor(Math.random() * 30) + 70,
        suggestions: [
          'Add more specific details about the desired output format',
          'Include relevant context or background information',
          'Consider adding examples to clarify your intent',
          'Break down complex requests into smaller parts'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      };

      setPromptAnalysis(analysis);
      
      if (isVoiceEnabled) {
        const score = Math.round((analysis.clarity + analysis.specificity + analysis.context + analysis.structure) / 4);
        speakText(`Analysis complete. Your prompt scored ${score} percent overall. The main areas for improvement are ${analysis.suggestions[0]}.`);
      }
    };

    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 card-3d">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-cyan-400" />
          AI-Powered Prompt Analyzer
        </h3>
        <div className="space-y-4">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Enter your prompt here to get instant AI feedback..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none transition-all duration-300"
            rows={4}
          />
          <div className="flex space-x-3">
            <button
              onClick={analyzePrompt}
              disabled={!userPrompt.trim()}
              className="flex-1 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed button-3d transform hover:scale-105"
            >
              Analyze with AI
            </button>
            {isVoiceEnabled && (
              <button
                onClick={() => speakText(userPrompt)}
                disabled={!userPrompt.trim()}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 button-3d transform hover:scale-105"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {promptAnalysis && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <h4 className="font-bold text-lg">AI Analysis Results</h4>
              
              {/* Enhanced Scores with 3D effects */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Clarity', score: promptAnalysis.clarity, color: 'text-green-400', bg: 'from-green-400 to-green-500' },
                  { label: 'Specificity', score: promptAnalysis.specificity, color: 'text-blue-400', bg: 'from-blue-400 to-blue-500' },
                  { label: 'Context', score: promptAnalysis.context, color: 'text-purple-400', bg: 'from-purple-400 to-purple-500' },
                  { label: 'Structure', score: promptAnalysis.structure, color: 'text-orange-400', bg: 'from-orange-400 to-orange-500' }
                ].map((metric) => (
                  <div key={metric.label} className="bg-white/10 rounded-lg p-3 card-3d transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <span className={`text-sm font-bold ${metric.color}`}>{metric.score}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          metric.score >= 80 ? 'from-green-400 to-green-500' :
                          metric.score >= 60 ? 'from-yellow-400 to-yellow-500' :
                          'from-red-400 to-red-500'
                        } transition-all duration-1000`}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Suggestions */}
              <div className="bg-white/10 rounded-lg p-4 card-3d">
                <h5 className="font-bold mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                  AI Recommendations
                </h5>
                <ul className="space-y-2">
                  {promptAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const LessonContent = ({ lesson }) => (
    <div className="space-y-6">
      <div className="bg-white/10 rounded-lg p-6 card-3d">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold">{lesson.title}</h4>
          {isVoiceEnabled && (
            <div className="flex space-x-2">
              <button
                onClick={() => speakText(lesson.voiceScript || lesson.content)}
                className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all duration-300 button-3d transform hover:scale-105"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              {isAISpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-2 bg-red-500 rounded-lg hover:shadow-lg transition-all duration-300 button-3d transform hover:scale-105"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
        <p className="text-gray-300 leading-relaxed mb-6">{lesson.content}</p>
        
        {lesson.example && (
          <div className="space-y-4">
            <h5 className="font-bold text-lg">Example</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 card-3d transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <XCircle className="w-4 h-4 text-red-400 mr-2" />
                  <span className="font-medium text-red-400">Poor Prompt</span>
                </div>
                <p className="text-sm text-gray-300 italic">"{lesson.example.bad}"</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 card-3d transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="font-medium text-green-400">Better Prompt</span>
                </div>
                <p className="text-sm text-gray-300 italic">"{lesson.example.good}"</p>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 card-3d">
              <h6 className="font-medium text-blue-400 mb-2">Why it's better:</h6>
              <p className="text-sm text-gray-300">{lesson.example.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {lesson.exercise && (
        <div className="bg-white/5 rounded-lg p-6 border border-white/10 card-3d">
          <h5 className="font-bold text-lg mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-purple-400" />
            Practice Exercise
          </h5>
          <p className="text-gray-300 mb-4">{lesson.exercise}</p>
          <textarea
            placeholder="Write your improved prompt here..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none transition-all duration-300"
            rows={3}
          />
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 button-3d transform hover:scale-105">
              Get AI Hint
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg transition-all duration-300 button-3d transform hover:scale-105">
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (selectedModule) {
    const lessons = selectedModule.id === 1 ? promptFundamentalsLessons : [];
    const currentLessonData = lessons[currentLesson];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Enhanced Header */}
        <div className="p-6 border-b border-white/10 backdrop-blur-md bg-white/5">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12 nav-button-3d"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{selectedModule.title}</h1>
                  <p className="text-gray-400">Lesson {currentLesson + 1} of {selectedModule.lessons}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 button-3d ${
                    isVoiceEnabled 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                {isAISpeaking && (
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">AI Speaking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentLessonData ? (
                <LessonContent lesson={currentLessonData} />
              ) : (
                <div className="bg-white/5 rounded-2xl p-8 text-center card-3d">
                  <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Lesson Coming Soon</h3>
                  <p className="text-gray-400">This lesson is being prepared for you!</p>
                </div>
              )}

              {/* Enhanced Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => goToLesson(Math.max(0, currentLesson - 1))}
                  disabled={currentLesson === 0}
                  className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed button-3d transform hover:scale-105"
                >
                  Previous Lesson
                </button>
                <button
                  onClick={() => {
                    setCompletedLessons(new Set([...completedLessons, currentLesson]));
                    const nextLesson = Math.min(selectedModule.lessons - 1, currentLesson + 1);
                    goToLesson(nextLesson);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg transition-all duration-300 button-3d transform hover:scale-105"
                >
                  {currentLesson === selectedModule.lessons - 1 ? 'Complete Module' : 'Next Lesson'}
                </button>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Progress */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 card-3d">
                <h3 className="text-lg font-bold mb-4">Progress</h3>
                <div className="space-y-3">
                  {Array.from({ length: selectedModule.lessons }, (_, i) => (
                    <div
                      key={i}
                      onClick={() => goToLesson(i)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        i === currentLesson
                          ? 'bg-cyan-500/20 border border-cyan-500/30'
                          : completedLessons.has(i)
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        completedLessons.has(i)
                          ? 'bg-green-500 text-white'
                          : i === currentLesson
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/20 text-gray-400'
                      }`}>
                        {completedLessons.has(i) ? '✓' : i + 1}
                      </div>
                      <span className="text-sm">
                        {i < promptFundamentalsLessons.length 
                          ? promptFundamentalsLessons[i].title 
                          : `Lesson ${i + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Prompt Analyzer */}
              <PromptAnalyzer />
            </div>
          </div>
        </div>
        
        {/* Enhanced styles */}
        <style jsx global>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in { animation: fade-in 0.5s ease-out; }
          
          .card-3d {
            transform-style: preserve-3d;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1);
          }
          .card-3d:hover {
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.2);
          }
          
          .button-3d {
            transform-style: preserve-3d;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          .button-3d:hover {
            box-shadow: 
              0 15px 45px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          
          .nav-button-3d {
            transform-style: preserve-3d;
            box-shadow: 
              0 5px 15px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          .nav-button-3d:hover {
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                Advanced AI Learning
              </h1>
              <p className="text-gray-400 text-lg">Master the art of AI communication and prompt engineering</p>
            </div>
            <button
              onClick={() => navigateTo('/')}
              className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12 nav-button-3d"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Enhanced Learning Path */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Your Learning Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer border border-white/10 relative card-3d group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${module.color} rounded-3xl flex items-center justify-center mb-4 text-3xl shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 icon-3d`}>
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">{module.title}</h3>
                <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300">{module.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                    module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' :
                    module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30' :
                    module.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30' :
                    'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
                  }`}>
                    {module.difficulty}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{module.lessons} lessons</span>
                </div>

                <div className="space-y-1 mb-4">
                  {module.topics.slice(0, 3).map((topic, i) => (
                    <div key={i} className="text-xs text-gray-400 flex items-center group-hover:text-gray-300 transition-colors duration-300">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                      {topic}
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-sm font-semibold hover:shadow-2xl transition-all duration-300 button-3d transform hover:scale-105">
                  Start Learning
                </button>

                {index < modules.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Tools */}
        <div className="grid md:grid-cols-2 gap-8">
          <PromptAnalyzer />
          
          {/* Enhanced AI Insights */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 card-3d">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              AI Learning Insights
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Token Efficiency',
                  description: 'Learn how to get better results with fewer tokens',
                  progress: 75,
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Response Quality',
                  description: 'Techniques to improve AI response accuracy',
                  progress: 60,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Creative Prompting',
                  description: 'Unlock AI\'s creative potential',
                  progress: 40,
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((insight, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 card-3d transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <span className="text-sm text-gray-400">{insight.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${insight.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${insight.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-gradient-x { animation: gradient-x 8s ease infinite; }
        
        .icon-3d {
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}