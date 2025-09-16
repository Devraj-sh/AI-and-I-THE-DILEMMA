import { Trophy, Play } from "lucide-react";

export default function GameCard({ game, onSelectGame }) {
  return (
    <div
      onClick={() => onSelectGame(game)}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer border border-white/10 card-3d group"
    >
      <div
        className={`w-24 h-24 bg-gradient-to-r ${game.color} rounded-3xl flex items-center justify-center mb-6 text-4xl shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 icon-3d`}
      >
        {game.icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors duration-300">
        {game.title}
      </h3>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
        {game.description}
      </p>
      <div className="flex items-center justify-between mb-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
            game.difficulty === "Easy"
              ? "bg-green-500/20 text-green-400 group-hover:bg-green-500/30"
              : game.difficulty === "Medium"
              ? "bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30"
              : "bg-red-500/20 text-red-400 group-hover:bg-red-500/30"
          }`}
        >
          {game.difficulty}
        </span>
        <div className="flex items-center text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
          <Trophy className="w-4 h-4 mr-1" />
          {game.levels} levels
        </div>
      </div>
      <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 button-3d transform hover:scale-105">
        <Play className="w-5 h-5" />
        <span>Start Game</span>
      </button>
    </div>
  );
}
