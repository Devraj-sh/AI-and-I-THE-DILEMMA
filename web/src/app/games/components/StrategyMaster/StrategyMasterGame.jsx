import { Target } from "lucide-react";

export default function StrategyMasterGame({ gameData, currentTurn, onMakeMove }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-6 animate-fade-in">
          Round {gameData.round}: Strategic Battle!
        </h3>
        
        <div className="mb-6">
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold transition-all duration-500 ${
            currentTurn === 'human' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          }`}>
            {currentTurn === 'human' ? "👤 Your Turn" : "🤖 AI's Turn"}
          </div>
        </div>

        {/* Strategic Board */}
        <div className="mb-8">
          <p className="text-lg mb-4 text-cyan-400">🎯 Strategic Positioning Game</p>
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
            {gameData.board.map((cell, index) => (
              <button
                key={index}
                onClick={() => onMakeMove(index)}
                className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 card-3d transform hover:scale-105 ${
                  cell === null 
                    ? 'bg-white/10 hover:bg-white/20 border-2 border-dashed border-gray-400' 
                    : cell === 'Human' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                }`}
                disabled={cell !== null || currentTurn !== 'human'}
              >
                {cell === 'Human' && '👤'}
                {cell === 'AI' && '🤖'}
                {cell === null && currentTurn === 'human' && (
                  <span className="text-gray-400 text-lg">◯</span>
                )}
                {cell === null && currentTurn === 'ai' && (
                  <span className="text-gray-600 text-lg">•</span>
                )}
              </button>
            ))}
          </div>
          
          {/* Position Labels */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {Array.from({length: 9}, (_, i) => (
              <div key={i} className="text-center text-xs text-gray-500">
                Pos {i + 1}
              </div>
            ))}
          </div>
        </div>

        {currentTurn === 'human' && gameData.board.some(cell => cell === null) && (
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 card-3d animate-fade-in">
            <h4 className="text-xl font-bold mb-4 text-blue-400">Your Strategic Move</h4>
            <p className="text-gray-300">Click on any empty position to place your marker strategically</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-400 max-w-md mx-auto">
              <div>🏰 Corners: Strong positions</div>
              <div>🎯 Center: Control hub</div>
              <div>⚡ Edges: Flexible options</div>
            </div>
          </div>
        )}

        {currentTurn === 'ai' && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 card-3d animate-fade-in">
            <h4 className="text-xl font-bold mb-4 text-purple-400 flex items-center justify-center">
              <Target className="w-6 h-6 mr-2 animate-spin" />
              AI Strategy Analysis...
            </h4>
            <div className="bg-black/30 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
              <p className="text-white text-center animate-pulse">
                {gameData.aiThinking || "Computing optimal strategy..."}
              </p>
            </div>
          </div>
        )}

        {/* Game Status */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-blue-500/20 rounded-lg p-3 card-3d">
              <h5 className="font-bold text-blue-400 mb-1">👤 Human</h5>
              <p className="text-sm text-gray-300">
                Positions: {gameData.board.filter(cell => cell === 'Human').length}
              </p>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-3 card-3d">
              <h5 className="font-bold text-purple-400 mb-1">🤖 AI</h5>
              <p className="text-sm text-gray-300">
                Positions: {gameData.board.filter(cell => cell === 'AI').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}