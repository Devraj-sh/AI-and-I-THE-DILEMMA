export default function ThinkingDisplay({ player, thinking, avatar, color, isActive }) {
    return (
        <div
          className={`bg-gradient-to-br ${color} rounded-2xl p-6 border border-white/20 card-3d transition-all duration-500 ${
            isActive ? "scale-105 shadow-2xl" : "scale-100"
          }`}
        >
          <div className="flex items-center mb-4">
            {avatar}
            <h4 className="text-xl font-bold text-white ml-3">{player}</h4>
            {isActive && (
              <div className="ml-auto w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="bg-white/10 rounded-lg p-4 min-h-[100px]">
            <p className="text-sm text-gray-300 mb-2">💭 Thinking process:</p>
            <p className="text-white text-sm leading-relaxed">
              {thinking || "Waiting for turn..."}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-white animate-pulse" : "bg-white/30"
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-xs text-gray-300">
              {isActive ? "Active" : "Waiting"}
            </span>
          </div>
        </div>
    );
}
