import { RotateCcw } from "lucide-react";

export default function LevelProgress({ currentLevel }) {
  return (
    <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 card-3d">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Level Progress</h3>
        <span className="text-sm text-gray-400">{currentLevel}/10</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-4">
        <div
          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
          style={{ width: `${(currentLevel / 10) * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 button-3d">
          <RotateCcw className="w-4 h-4 mr-2 inline" />
          Restart Level
        </button>
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 button-3d">
          Next Level
        </button>
      </div>
    </div>
  );
}
