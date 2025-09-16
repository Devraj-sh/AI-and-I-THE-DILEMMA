import { Brain } from "lucide-react";

export default function MemoryPalaceGame({ gameData, currentTurn, onNumberSelect }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-6 animate-fade-in">
          Round {gameData.round}: Memory Challenge!
        </h3>
        
        {gameData.showSequence ? (
          <div className="mb-8">
            <p className="text-lg mb-4 text-cyan-400">📖 Memorize this sequence:</p>
            <div className="flex justify-center space-x-4">
              {gameData.memorySequence.map((num, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-500 card-3d ${
                    index <= gameData.sequenceIndex 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white scale-110 shadow-2xl' 
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {index <= gameData.sequenceIndex ? num : '?'}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Position {Math.min(gameData.sequenceIndex + 1, gameData.memorySequence.length)} of {gameData.memorySequence.length}
            </p>
          </div>
        ) : (
          <>
            <p className="text-lg mb-4 text-blue-400">🧠 Now recall the sequence:</p>
            <div className="flex justify-center space-x-4 mb-6">
              {gameData.humanMemoryInput.map((num, index) => (
                <div key={index} className="w-16 h-16 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-xl flex items-center justify-center text-xl font-bold card-3d border border-blue-400/50">
                  {num}
                </div>
              ))}
              {gameData.humanMemoryInput.length < gameData.memorySequence.length && (
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold animate-pulse card-3d border-2 border-dashed border-cyan-400">
                  ?
                </div>
              )}
            </div>
            
            {currentTurn === 'human' && gameData.humanMemoryInput.length < gameData.memorySequence.length && (
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 card-3d">
                <h4 className="text-xl font-bold mb-4 text-blue-400">Enter Next Number</h4>
                <p className="text-gray-300 mb-4">Select the number at position {gameData.humanMemoryInput.length + 1}:</p>
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {[1,2,3,4,5,6,7,8,9].map(num => (
                    <button
                      key={num}
                      onClick={() => onNumberSelect(num)}
                      className="w-12 h-12 bg-white/10 rounded-lg hover:bg-blue-500/30 transition-all duration-300 button-3d transform hover:scale-110 text-lg font-bold"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {currentTurn === 'ai' && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d animate-fade-in">
            <h4 className="text-xl font-bold mb-4 text-purple-400 flex items-center justify-center">
              <Brain className="w-6 h-6 mr-2 animate-pulse" />
              AI Memory Processing...
            </h4>
            <div className="bg-black/30 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
              <p className="text-white text-center animate-pulse">
                {gameData.aiThinking || "Accessing memory banks..."}
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold transition-all duration-500 ${
            currentTurn === 'human' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          }`}>
            {currentTurn === 'human' ? "👤 Your Turn" : "🤖 AI's Turn"}
          </div>
        </div>
      </div>
    </div>
  );
}