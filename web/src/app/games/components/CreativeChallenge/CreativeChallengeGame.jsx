import { Zap } from "lucide-react";

export default function CreativeChallengeGame({ gameData, currentTurn, onAnswerChange, onSubmitAnswer }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-6 animate-fade-in">
          Round {gameData.round}: Creative Challenge!
        </h3>
        
        <div className="bg-white/10 rounded-2xl p-6 mb-6 card-3d">
          <h4 className="text-xl font-bold mb-4 text-cyan-400">🎨 Creative Challenge:</h4>
          <p className="text-lg text-yellow-400 font-semibold bg-white/5 rounded-lg p-4">
            {gameData.creativePrompt}
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
            <h4 className="text-xl font-bold mb-4 text-blue-400">💡 Your Creative Solution:</h4>
            <p className="text-gray-300 mb-4">Think outside the box! Describe your innovative solution:</p>
            <textarea
              value={gameData.humanCreativeAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none transition-all duration-300"
              rows={5}
              placeholder="Describe your creative solution... Be innovative and think beyond conventional approaches!"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">
                {gameData.humanCreativeAnswer.length}/500 characters
              </span>
              <button
                onClick={onSubmitAnswer}
                disabled={!gameData.humanCreativeAnswer || gameData.humanCreativeAnswer.length < 20}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed button-3d transform hover:scale-105"
              >
                Submit Solution
              </button>
            </div>
          </div>
        )}

        {currentTurn === 'ai' && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d animate-fade-in">
            <h4 className="text-xl font-bold mb-4 text-purple-400 flex items-center justify-center">
              <Zap className="w-6 h-6 mr-2 animate-pulse" />
              AI Creative Processing...
            </h4>
            <div className="bg-black/30 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
              <p className="text-white text-center animate-pulse">
                {gameData.aiThinking || "Generating creative solutions..."}
              </p>
            </div>
          </div>
        )}

        {/* Show solutions after both have answered */}
        <div className="space-y-6">
          {gameData.humanAnswer && (
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 card-3d">
              <h4 className="text-xl font-bold mb-4 text-blue-400">👤 Human Creative Solution:</h4>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-gray-300">{gameData.humanAnswer}</p>
              </div>
            </div>
          )}

          {gameData.aiCreativeAnswer && (
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d">
              <h4 className="text-xl font-bold mb-4 text-purple-400">🤖 AI Creative Solution:</h4>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-gray-300">{gameData.aiCreativeAnswer}</p>
              </div>
              <div className="mt-4 text-sm text-purple-300 bg-white/5 rounded-lg p-3">
                <strong>🧠 AI Process:</strong> Cross-domain synthesis combining technology, biology, and social systems
              </div>
            </div>
          )}
        </div>

        {/* Creative Tips */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 card-3d">
          <h4 className="text-lg font-bold mb-3 text-cyan-400">💡 Creative Thinking Tips:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-white">🔄 <strong>Combine Ideas:</strong> Mix concepts from different fields</div>
              <div className="text-white">🎭 <strong>Think Differently:</strong> Question assumptions</div>
            </div>
            <div className="space-y-2">
              <div className="text-white">🌍 <strong>Consider Impact:</strong> Think about real-world effects</div>
              <div className="text-white">🚀 <strong>Be Bold:</strong> Don't limit yourself to current technology</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}