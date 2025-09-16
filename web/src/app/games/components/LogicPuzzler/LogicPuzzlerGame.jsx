import { Lightbulb } from "lucide-react";

export default function LogicPuzzlerGame({ gameData, currentTurn, onAnswerSelect }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-6 animate-fade-in">
          Round {gameData.round}: Logic Challenge!
        </h3>
        
        <div className="bg-white/10 rounded-2xl p-6 mb-6 card-3d">
          <h4 className="text-xl font-bold mb-4 text-cyan-400">📋 Premise:</h4>
          <p className="text-lg mb-6 text-gray-300 bg-white/5 rounded-lg p-4">
            {gameData.logicPuzzle.premise}
          </p>
          <h4 className="text-xl font-bold mb-4 text-purple-400">❓ Question:</h4>
          <p className="text-lg text-yellow-400 font-semibold bg-white/5 rounded-lg p-4">
            {gameData.logicPuzzle.question}
          </p>
        </div>

        <div className="mb-6">
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold transition-all duration-500 ${
            currentTurn === 'human' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          }`}>
            {currentTurn === 'human' ? "👤 Your Turn" : "🤖 AI's Turn"}
          </div>
        </div>

        {currentTurn === 'human' && (
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 card-3d animate-fade-in">
            <h4 className="text-xl font-bold mb-4 text-blue-400">Choose Your Answer:</h4>
            <div className="space-y-3">
              {gameData.logicPuzzle.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onAnswerSelect(index)}
                  className="w-full p-4 bg-white/10 hover:bg-blue-500/20 rounded-lg transition-all duration-300 text-left button-3d transform hover:scale-105 border border-white/20 hover:border-blue-400/50"
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </span>
                    <span className="text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentTurn === 'ai' && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d animate-fade-in">
            <h4 className="text-xl font-bold mb-4 text-purple-400 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 mr-2 animate-pulse" />
              AI Logic Processing...
            </h4>
            <div className="bg-black/30 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
              <p className="text-white text-center animate-pulse">
                {gameData.aiThinking || "Analyzing logical structure..."}
              </p>
            </div>
          </div>
        )}

        {/* Show AI's answer after it's calculated */}
        {gameData.aiAnswer && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d">
            <h4 className="text-xl font-bold mb-4 text-purple-400">🤖 AI's Logical Conclusion:</h4>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-white">
                <span className="font-bold text-purple-300">Answer:</span> Option {parseInt(gameData.aiAnswer) + 1} - {gameData.logicPuzzle.options[parseInt(gameData.aiAnswer)]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}