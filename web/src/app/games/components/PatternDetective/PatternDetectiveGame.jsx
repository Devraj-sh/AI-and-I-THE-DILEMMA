import { Sparkles } from "lucide-react";

export default function PatternDetectiveGame({ gameData, currentTurn, onAnswerChange, onSubmitAnswer }) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6 animate-fade-in">
            Round {gameData.round}: Find the Next Number!
          </h3>

          <div className="flex justify-center items-center space-x-4 mb-8">
            {gameData.sequence.map((num, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg transform hover:scale-110 transition-all duration-300 card-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="animate-fade-in">{num}</span>
              </div>
            ))}
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl animate-pulse card-3d">
              ?
            </div>
          </div>

          <div className="mb-6">
            <div
              className={`inline-block px-6 py-3 rounded-full text-lg font-bold transition-all duration-500 ${
                currentTurn === "human"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              }`}
            >
              {currentTurn === "human" ? "👤 Your Turn" : "🤖 AI's Turn"}
            </div>
          </div>

          {currentTurn === "human" && (
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 card-3d animate-fade-in">
              <h4 className="text-xl font-bold mb-4 text-blue-400">
                Human Player Input
              </h4>
              <div className="flex justify-center items-center space-x-4">
                <input
                  type="number"
                  value={gameData.humanAnswer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-32 h-12 bg-white/10 border border-white/30 rounded-xl text-center text-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-all duration-300"
                  placeholder="Your answer"
                />
                <button
                  onClick={onSubmitAnswer}
                  disabled={!gameData.humanAnswer}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed button-3d transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {currentTurn === "ai" && (
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d animate-fade-in">
              <h4 className="text-xl font-bold mb-4 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6 mr-2 animate-spin" />
                AI Processing...
              </h4>
              <div className="bg-black/30 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                <p className="text-white text-center animate-pulse">
                  {gameData.aiThinking || "Initializing analysis..."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
