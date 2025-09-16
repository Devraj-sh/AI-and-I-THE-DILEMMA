import { useState, useEffect } from "react";
import {
  Brain,
  Zap,
  Users,
  Gamepad2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sections = [
    { id: "hero", title: "Welcome to AI & I" },
    { id: "games", title: "AI Games Arena" },
    { id: "playground", title: "AI Playground" },
    { id: "advanced", title: "Advanced Learning" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSection((prev) => (prev + 1) % sections.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Enhanced Animated Background with 3D effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-slow"
          style={{
            top: "-10%",
            right: "-10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-medium"
          style={{
            bottom: "-10%",
            left: "-10%",
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-fast"
          style={{
            top: "40%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        ></div>

        {/* 3D Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Navigation with 3D effects */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transform hover:rotate-12 transition-all duration-300 animate-pulse-glow">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-cyan-400 transition-all duration-500">
            AI & I : THE DILEMMA
          </h1>
        </div>
        <div className="flex space-x-6">
          <button
            onClick={() => navigateTo("/games")}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-2xl nav-button-3d"
          >
            Games
          </button>
          <button
            onClick={() => navigateTo("/playground")}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-2xl nav-button-3d"
          >
            Playground
          </button>
          <button
            onClick={() => navigateTo("/advanced")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-cyan-500/50 nav-button-3d"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Enhanced Hero Section with 3D elements */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x transform hover:scale-105 transition-all duration-500">
            Discover How AI Thinks
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up transform hover:scale-105 transition-all duration-300">
            Journey through interactive games and challenges to understand
            artificial intelligence. Compare human vs AI thinking patterns in a
            fun, engaging way!
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigateTo("/games")}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-300 flex items-center space-x-3 button-3d hover:shadow-cyan-500/50"
            >
              <Play className="w-6 h-6" />
              <span>Start Playing</span>
            </button>
            <button
              onClick={() => navigateTo("/advanced")}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-2xl button-3d"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Enhanced Feature Cards with 3D effects */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Games for Kids */}
          <div
            onClick={() => navigateTo("/games")}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer border border-white/10 card-3d group"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 icon-3d">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-green-400 group-hover:text-green-300 transition-colors duration-300">
              AI Games Arena
            </h3>
            <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
              5 exciting games with 10 levels each! Watch AI and human
              characters think step-by-step. Perfect for ages 10-17 to learn AI
              basics through play.
            </p>
            <div className="flex items-center text-green-400 font-semibold group-hover:text-green-300 transition-colors duration-300">
              <span>Play Now</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>

          {/* AI Playground */}
          <div
            onClick={() => navigateTo("/playground")}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer border border-white/10 card-3d group"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 icon-3d">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
              AI Playground
            </h3>
            <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
              Connect your own AI tools (ChatGPT, Gemini) and experiment! See
              how different AIs respond to the same prompts.
            </p>
            <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors duration-300">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>

          {/* Advanced Learning */}
          <div
            onClick={() => navigateTo("/advanced")}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer border border-white/10 card-3d group"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 icon-3d">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
              Prompt Engineering
            </h3>
            <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
              Master the art of AI communication. Learn advanced prompting
              techniques and understand how AI processes your requests.
            </p>
            <div className="flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors duration-300">
              <span>Learn</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Demo Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 card-3d">
          <h3 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            See AI vs Human Thinking
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Human Side */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 transform hover:scale-105 transition-all duration-300 card-3d">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-400 mr-3" />
                <h4 className="text-xl font-bold text-blue-400">
                  Human Player
                </h4>
              </div>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300">Thinking process:</p>
                <p className="text-white">
                  "I need to consider all possible moves... This looks risky but
                  might pay off..."
                </p>
              </div>
              <div className="w-full bg-blue-500/30 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Confidence: 75%</p>
            </div>

            {/* AI Side */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 transform hover:scale-105 transition-all duration-300 card-3d">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400 mr-3 animate-spin-slow" />
                <h4 className="text-xl font-bold text-purple-400">AI Player</h4>
              </div>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300">Processing:</p>
                <p className="text-white">
                  "Analyzing 10,000 scenarios... Optimal path found with 94.7%
                  success rate..."
                </p>
              </div>
              <div className="w-full bg-purple-500/30 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Confidence: 94.7%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button
          onClick={() => navigateTo("/games")}
          className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-125 hover:rotate-12 transition-all duration-300 fab-3d animate-bounce"
        >
          <Zap className="w-10 h-10 text-white" />
        </button>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-20px) rotateZ(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-15px) rotateZ(-3deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-25px) rotateZ(8deg); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 8s ease infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-fade-in { animation: fade-in-up 1.5s ease-out; }
        
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
        
        .icon-3d {
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
        
        .fab-3d {
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.3),
            0 5px 15px rgba(6, 182, 212, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
