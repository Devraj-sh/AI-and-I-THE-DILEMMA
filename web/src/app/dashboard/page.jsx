"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Zap,
  Gamepad2,
  TrendingUp,
  User,
  Trophy,
  Target,
  BookOpen,
  LogOut,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery } from "@tanstack/react-query";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  FloatingBrain,
  SkillOrb,
  GameIcon3D,
  FloatingParticles,
} from "@/components/3DWidget";
import getTTS from "@/utils/tts";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [tts] = useState(() => getTTS());
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Fetch user profile
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    enabled: !!user,
  });

  // Fetch user skills
  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await fetch("/api/skills");
      if (!response.ok) throw new Error("Failed to fetch skills");
      return response.json();
    },
    enabled: !!user,
  });

  // Fetch game sessions
  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await fetch("/api/games");
      if (!response.ok) throw new Error("Failed to fetch games");
      return response.json();
    },
    enabled: !!user,
  });

  // Welcome message when profile loads
  useEffect(() => {
    if (profileData?.profile && soundEnabled) {
      tts.welcomeMessage(profileData.profile.nickname);
    }
  }, [profileData?.profile, tts, soundEnabled]);

  if (userLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FloatingBrain size={120} color="#0ea5e9" />
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Dashboard...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/account/signin";
    return null;
  }

  if (!profileData?.profile) {
    window.location.href = "/profile-setup";
    return null;
  }

  const profile = profileData.profile;
  const skills = skillsData?.skills || [];
  const gameSessions = gamesData?.sessions || [];

  // Determine mode based on age group
  const isStudentMode =
    profile.age_group === "10-12" || profile.age_group === "13-17";
  const isAdultMode = profile.age_group === "18+";

  // Prepare skill data for radar chart
  const skillChartData = skills.map((skill) => ({
    skill: skill.skill_name.replace("_", " ").toUpperCase(),
    value: Math.round(skill.skill_value * 100),
    fullMark: 100,
  }));

  const gameTypes = isStudentMode
    ? [
        {
          id: "spot-ai",
          name: "Spot the AI",
          icon: "🔍",
          description: "Identify AI vs Human content",
          color: "#06b6d4",
        },
        {
          id: "puzzle-duel",
          name: "Puzzle Duel",
          icon: "🧩",
          description: "Solve logic puzzles vs AI",
          color: "#8b5cf6",
        },
        {
          id: "story-battle",
          name: "Story Battle",
          icon: "📝",
          description: "Creative writing challenge",
          color: "#10b981",
        },
        {
          id: "fact-check",
          name: "Fact Check Arena",
          icon: "✅",
          description: "Identify real vs fake news",
          color: "#f59e0b",
        },
        {
          id: "teach-off",
          name: "Teaching Challenge",
          icon: "🎓",
          description: "Explain concepts clearly",
          color: "#ef4444",
        },
        {
          id: "pattern-game",
          name: "Pattern Master",
          icon: "🔢",
          description: "Predict data patterns",
          color: "#6366f1",
        },
      ]
    : [
        {
          id: "prompt-battles",
          name: "Prompt Battles",
          icon: "⚡",
          description: "Master prompt engineering techniques",
          color: "#06b6d4",
        },
        {
          id: "case-simulations",
          name: "Case Simulations",
          icon: "💼",
          description: "Solve real-world AI problems",
          color: "#8b5cf6",
        },
        {
          id: "ai-mentor",
          name: "AI Mentor Roleplay",
          icon: "👥",
          description: "Advanced AI collaboration tasks",
          color: "#10b981",
        },
        {
          id: "co-creation",
          name: "Co-Creation Lab",
          icon: "🔬",
          description: "Collaborate with AI on projects",
          color: "#f59e0b",
        },
        {
          id: "ethical-dilemmas",
          name: "Ethical AI Scenarios",
          icon: "⚖️",
          description: "Navigate AI ethics challenges",
          color: "#ef4444",
        },
      ];

  const toggleSound = () => {
    const newState = tts.toggle();
    setSoundEnabled(newState);
    if (newState) {
      tts.speak("Sound enabled!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative">
      {/* Floating Particles */}
      <FloatingParticles count={20} />

      {/* Header */}
      <header className="bg-white/60 backdrop-blur-lg border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <FloatingBrain size={50} color="#0ea5e9" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI & I
              </h1>
            </motion.div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={toggleSound}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-xl bg-white/50 hover:bg-white/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="text-2xl">{profile.avatar_url}</div>
                <div>
                  <div className="text-gray-800 font-medium">
                    {profile.nickname}
                  </div>
                  <div className="text-blue-600 text-sm">
                    {profile.age_group} years •{" "}
                    {isAdultMode ? "AI Mastery Mode" : "Student Mode"}
                  </div>
                </div>
              </div>
              <a
                href="/account/logout"
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-xl bg-white/50 hover:bg-white/70"
              >
                <LogOut className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation tabs */}
        <div className="flex gap-2 mb-8 relative z-10">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            {
              id: "games",
              label: isAdultMode ? "AI Mastery Lab" : "Game Arena",
              icon: Gamepad2,
            },
            { id: "skills", label: "3D Skill Map", icon: Target },
            { id: "career", label: "Career Path", icon: BookOpen },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (soundEnabled) {
                    tts.speak(`Switching to ${tab.label}`);
                  }
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-blue-500/25"
                    : "bg-white/60 text-gray-700 hover:bg-white/70 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Welcome card */}
              <div className="lg:col-span-2 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome back, {profile.nickname}! 👋
                </h2>
                <p className="text-gray-600 mb-6">
                  {isAdultMode
                    ? "Ready to advance your AI mastery? Explore prompt engineering, ethical AI scenarios, and collaborative challenges!"
                    : "Ready to continue your AI literacy journey? Let's see what challenges await you today."}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl p-4 border border-green-500/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <span className="text-gray-800 font-medium">
                        Games Played
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {gameSessions.length}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-6 h-6 text-cyan-500" />
                      <span className="text-gray-800 font-medium">
                        Skills Developing
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {skills.length}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Start
                </h3>
                <div className="space-y-3">
                  <motion.button
                    onClick={() => setActiveTab("games")}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl border border-cyan-500/30 text-gray-800 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span>{isAdultMode ? "Enter AI Lab" : "Play Games"}</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setActiveTab("skills")}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl border border-purple-500/30 text-gray-800 hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-pink-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Target className="w-5 h-5" />
                    <span>View 3D Skills</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setActiveTab("career")}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl border border-green-500/30 text-gray-800 hover:bg-gradient-to-r hover:from-green-400/30 hover:to-emerald-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Explore Careers</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "games" && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {isAdultMode ? "AI Mastery Laboratory" : "Game Arena"}
                </h2>
                <p className="text-gray-600">
                  {isAdultMode
                    ? "Master advanced AI collaboration, prompt engineering, and ethical decision-making through sophisticated challenges."
                    : "Challenge the AI in fun, educational games that build your skills!"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameTypes.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/70 transition-all group cursor-pointer shadow-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (soundEnabled) {
                        tts.speak(`Starting ${game.name}`);
                      }
                      window.location.href = `/games/${game.id}`;
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <GameIcon3D size={60} color={game.color} />
                    </div>
                    <div className="text-4xl mb-4 text-center">{game.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                      {game.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center text-sm">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="mr-2 font-medium">
                        {isAdultMode ? "Enter Lab" : "Play Now"}
                      </span>
                      <motion.div
                        className="w-4 h-4"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  3D Skill Map
                </h2>
                <p className="text-gray-600">
                  Track your progress across different AI literacy and career
                  skills with interactive 3D visualizations.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* 3D Skill Orbs */}
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Interactive Skill Orbs
                  </h3>
                  {skills.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 justify-items-center">
                      {skills.map((skill) => (
                        <SkillOrb
                          key={skill.id}
                          skill={skill.skill_name.replace("_", " ")}
                          value={skill.skill_value}
                          size={80}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-60 flex items-center justify-center text-gray-500">
                      Play some games to see your skill development!
                    </div>
                  )}
                </div>

                {/* Radar chart */}
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Skill Radar Chart
                  </h3>
                  {skillChartData.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={skillChartData}>
                          <PolarGrid stroke="#9ca3af" />
                          <PolarAngleAxis
                            dataKey="skill"
                            tick={{ fill: "#4b5563", fontSize: 12 }}
                          />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: "#6b7280", fontSize: 10 }}
                          />
                          <Radar
                            name="Skills"
                            dataKey="value"
                            stroke="#06b6d4"
                            fill="#06b6d4"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-80 flex items-center justify-center text-gray-500">
                      Play some games to see your skill development!
                    </div>
                  )}
                </div>
              </div>

              {/* Skill breakdown */}
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Detailed Progress
                </h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-medium capitalize">
                          {skill.skill_name.replace("_", " ")}
                        </span>
                        <span className="text-blue-600 font-bold">
                          {Math.round(skill.skill_value * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.skill_value * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "career" && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  AI Career Advisory
                </h2>
                <p className="text-gray-600">
                  Discover career paths that match your skills and interests
                  with our AI-powered recommendations.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/30 text-center shadow-lg">
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="text-6xl">🚀</div>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Career Recommendations Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI-powered career advisory system is being fine-tuned to
                  provide you with personalized career recommendations based on
                  your unique skill profile and learning progress.
                </p>
                <div className="text-blue-600 font-medium">
                  Keep{" "}
                  {isAdultMode ? "mastering AI challenges" : "playing games"} to
                  build your skill profile!
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MainComponent;
