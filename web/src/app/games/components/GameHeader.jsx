import { ArrowLeft, Pause, Volume2, VolumeX } from "lucide-react";

export default function GameHeader({
  game,
  onBack,
  score,
  isVoiceEnabled,
  onToggleVoice,
  currentLevel,
}) {
  return (
    <div className="p-6 border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12 nav-button-3d"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {game.title}
            </h1>
            <p className="text-gray-400">
              Level {currentLevel} of {game.levels}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Score</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {score.human} - {score.ai}
            </p>
          </div>
          <button
            onClick={onToggleVoice}
            className={`px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isVoiceEnabled
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {isVoiceEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 nav-button-3d">
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
