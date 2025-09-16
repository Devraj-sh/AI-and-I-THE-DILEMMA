const achievements = [
  {
    title: "First Steps",
    desc: "Complete your first game",
    icon: "🎯",
    unlocked: true,
  },
  {
    title: "Pattern Master",
    desc: "Solve 10 pattern puzzles",
    icon: "🔍",
    unlocked: false,
  },
  {
    title: "AI Whisperer",
    desc: "Understand AI thinking 50 times",
    icon: "🤖",
    unlocked: false,
  },
  {
    title: "Champion",
    desc: "Beat AI in all games",
    icon: "👑",
    unlocked: false,
  },
];

export default function Achievements() {
  return (
    <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 card-3d">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Your Achievements
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border transition-all duration-500 transform hover:scale-105 card-3d ${
              achievement.unlocked
                ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:shadow-yellow-500/20"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="text-4xl mb-3 transform hover:scale-125 transition-transform duration-300">
              {achievement.icon}
            </div>
            <h4 className="font-bold mb-2 text-lg">{achievement.title}</h4>
            <p className="text-sm text-gray-400">{achievement.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
