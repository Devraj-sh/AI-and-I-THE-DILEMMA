"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Zap,
  User,
  Bot,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Volume2,
  VolumeX,
  Trophy,
  Target,
  Clock,
  Award,
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FloatingBrain, FloatingParticles } from "@/components/3DWidget";
import getTTS from "@/utils/tts";

function MainComponent() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const [gameState, setGameState] = useState("intro"); // intro, playing, results
  const [currentRound, setCurrentRound] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [aiAnswers, setAiAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [tts] = useState(() => getTTS());

  // Sample content for the game
  const gameContent = [
    {
      id: 1,
      text: "The sunset painted the sky in brilliant shades of orange and pink, casting a warm glow over the peaceful lake where children played while their parents watched from nearby benches.",
      isAI: false,
      explanation:
        "This is human-written text. Notice the emotional language, vivid imagery, and natural flow that comes from personal observation and experience.",
      aiAnswer: false,
      aiExplanation:
        "I can detect natural emotional resonance and descriptive flow typical of human writing. The scene feels observed rather than generated.",
    },
    {
      id: 2,
      text: "Based on comprehensive data analysis, quarterly revenue metrics indicate a 15.3% increase compared to the previous reporting period, demonstrating positive market performance indicators.",
      isAI: true,
      explanation:
        "This is AI-generated text. The formal structure, business jargon, and data-focused language are characteristic of AI writing patterns.",
      aiAnswer: true,
      aiExplanation:
        "The formal tone, structured presentation, and corporate terminology strongly suggest algorithmic generation rather than human composition.",
    },
    {
      id: 3,
      text: "I can't believe how absolutely incredible that concert was last night! My ears are still ringing but in the best possible way. The energy in the crowd was electric and I'm still buzzing from the whole experience.",
      isAI: false,
      explanation:
        "Human-written text with personal experience, emotional expression, and colloquial language that AI typically struggles to replicate authentically.",
      aiAnswer: false,
      aiExplanation:
        "The personal enthusiasm, colloquial expressions, and authentic emotional language indicate human authorship with genuine experience.",
    },
    {
      id: 4,
      text: "The implementation of sustainable practices in corporate environments has demonstrated significant improvements in operational efficiency metrics while maintaining cost-effective resource allocation.",
      isAI: true,
      explanation:
        "AI-generated text with formal business language, structured presentation, and buzzword density typical of AI writing patterns.",
      aiAnswer: true,
      aiExplanation:
        "The corporate jargon density, formal structure, and efficiency-focused language are consistent with algorithmic text generation.",
    },
    {
      id: 5,
      text: "My grandmother's secret apple pie recipe has been passed down through three generations in our family, and every single bite brings back warm memories of Sunday afternoons in her cozy kitchen.",
      isAI: false,
      explanation:
        "Human-written with personal narrative, emotional connection, and family history that reflects authentic human experience and memory.",
      aiAnswer: false,
      aiExplanation:
        "The personal family narrative, emotional connections to memory, and authentic storytelling suggest human authorship with genuine experience.",
    },
  ];

  const saveGameMutation = useMutation({
    mutationFn: async (gameData) => {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });
      if (!response.ok) throw new Error("Failed to save game");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["games"]);
      queryClient.invalidateQueries(["skills"]);
    },
  });

  const updateSkillsMutation = useMutation({
    mutationFn: async (skillUpdates) => {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill_updates: skillUpdates }),
      });
      if (!response.ok) throw new Error("Failed to update skills");
      return response.json();
    },
  });

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === "playing" && startTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    // Sound feedback - in real implementation, use actual audio files
    console.log(`Playing ${type} sound`);
  };

  const startGame = async () => {
    setGameState("playing");
    setCurrentRound(0);
    setUserScore(0);
    setAiScore(0);
    setUserAnswers([]);
    setAiAnswers([]);
    setStartTime(Date.now());
    setCurrentTime(0);

    // Generate AI answers (simulated)
    const aiAnswers = gameContent.map((content) => ({
      id: content.id,
      answer: content.aiAnswer,
      explanation: content.aiExplanation,
    }));
    setAiAnswers(aiAnswers);

    // AI narration
    if (soundEnabled) {
      await tts.speak(
        "Let's begin! I'll present text samples, and we'll both try to identify whether they're written by humans or AI. Good luck!",
      );
    }
  };

  const handleAnswer = async (isAI) => {
    const currentContent = gameContent[currentRound];
    const isCorrect = isAI === currentContent.isAI;

    const newAnswer = {
      round: currentRound,
      userAnswer: isAI,
      correct: isCorrect,
      content: currentContent,
    };

    setUserAnswers([...userAnswers, newAnswer]);

    if (isCorrect) {
      setUserScore(userScore + 1);
      playSound("correct");
      if (soundEnabled) {
        await tts.encouragement(true);
      }
    } else {
      playSound("incorrect");
      if (soundEnabled) {
        await tts.encouragement(false);
      }
    }

    // AI gets this one right (simulated with some variability)
    const aiCorrect = aiAnswers[currentRound]?.answer === currentContent.isAI;
    if (aiCorrect) {
      setAiScore(aiScore + 1);
    }

    setShowExplanation(true);

    // AI thinking process
    if (soundEnabled) {
      setTimeout(async () => {
        await tts.thinkingMessage();
        setTimeout(async () => {
          await tts.explanationIntro();
        }, 1000);
      }, 1000);
    }
  };

  const nextRound = () => {
    setShowExplanation(false);
    if (currentRound < gameContent.length - 1) {
      setCurrentRound(currentRound + 1);
    } else {
      endGame();
    }
  };

  const endGame = async () => {
    setGameState("results");

    // Calculate skill improvements
    const accuracy = userScore / gameContent.length;
    const skillUpdates = [
      { skill_name: "critical_thinking", skill_value: accuracy * 0.2 },
      { skill_name: "digital_literacy", skill_value: accuracy * 0.15 },
      { skill_name: "pattern_recognition", skill_value: accuracy * 0.1 },
    ];

    // Save game session
    const gameData = {
      game_type: "spot-ai",
      mode: "student",
      score: userScore,
      ai_score: aiScore,
      responses: userAnswers,
      ai_explanations: aiAnswers,
      duration_seconds: Math.round(currentTime / 1000),
    };

    saveGameMutation.mutate(gameData);
    updateSkillsMutation.mutate(skillUpdates);

    // AI completion message
    if (soundEnabled) {
      await tts.gameComplete(userScore, gameContent.length);
    }
  };

  const toggleSound = () => {
    const newState = tts.toggle();
    setSoundEnabled(newState);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-lg">
          <p className="text-gray-800 mb-4 text-lg">
            Please sign in to play games
          </p>
          <a
            href="/account/signin"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative">
      {/* Floating Particles */}
      <FloatingParticles count={15} />

      {/* Header */}
      <header className="bg-white/60 backdrop-blur-lg border-b border-white/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.a
                href="/dashboard"
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-xl bg-white/50 hover:bg-white/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.a>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔍</div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Spot the AI
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {gameState === "playing" && (
                <div className="flex items-center gap-2 text-gray-600 bg-white/50 px-3 py-2 rounded-xl">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{formatTime(currentTime)}</span>
                </div>
              )}
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
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {gameState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/30 mb-8 shadow-lg">
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="text-6xl">🔍</div>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Spot the AI Challenge
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                  Can you tell the difference between human and AI-generated
                  content? Read each text carefully and decide whether it was
                  written by a human or AI. I'll be competing alongside you!
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30 shadow-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      You
                    </h3>
                    <p className="text-gray-600">
                      Use your intuition and critical thinking to identify AI
                      content
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30 shadow-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Bot className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      AI Opponent
                    </h3>
                    <p className="text-gray-600">
                      Advanced AI that analyzes patterns and language structures
                    </p>
                  </motion.div>
                </div>

                <motion.button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Challenge
                </motion.button>
              </div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Score display */}
              <div className="flex justify-between items-center mb-8">
                <motion.div
                  className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="text-gray-800 font-medium">You</div>
                      <div className="text-2xl font-bold text-gray-800">
                        {userScore}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="text-center">
                  <div className="text-gray-600 text-sm">Round</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {currentRound + 1}/{gameContent.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-[200px]">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                      animate={{
                        width: `${((currentRound + 1) / gameContent.length) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <motion.div
                  className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="text-gray-800 font-medium">AI</div>
                      <div className="text-2xl font-bold text-gray-800">
                        {aiScore}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content to analyze */}
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/30 mb-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Is this text written by a human or AI?
                </h3>
                <motion.div
                  className="bg-white/50 rounded-xl p-6 mb-6 border border-white/20 shadow-inner"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {gameContent[currentRound]?.text}
                  </p>
                </motion.div>

                {!showExplanation ? (
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={() => handleAnswer(false)}
                      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User className="w-6 h-6" />
                      Human
                    </motion.button>
                    <motion.button
                      onClick={() => handleAnswer(true)}
                      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bot className="w-6 h-6" />
                      AI
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* User result */}
                    <motion.div
                      className={`p-4 rounded-xl border shadow-lg ${
                        userAnswers[userAnswers.length - 1]?.correct
                          ? "bg-green-400/20 border-green-500/30"
                          : "bg-red-400/20 border-red-500/30"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {userAnswers[userAnswers.length - 1]?.correct ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <span className="text-gray-800 font-medium">
                          {userAnswers[userAnswers.length - 1]?.correct
                            ? "Correct!"
                            : "Incorrect"}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {gameContent[currentRound]?.explanation}
                      </p>
                    </motion.div>

                    {/* AI explanation */}
                    <motion.div
                      className="bg-purple-400/20 p-4 rounded-xl border border-purple-500/30 shadow-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Bot className="w-6 h-6 text-purple-600" />
                        <span className="text-gray-800 font-medium">
                          AI's Analysis
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {aiAnswers[currentRound]?.explanation}
                      </p>
                    </motion.div>

                    <motion.button
                      onClick={nextRound}
                      className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentRound < gameContent.length - 1
                        ? "Next Round"
                        : "View Results"}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-lg">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-6xl mb-6"
                >
                  {userScore > aiScore
                    ? "🏆"
                    : userScore === aiScore
                      ? "🤝"
                      : "🤖"}
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {userScore > aiScore
                    ? "Victory!"
                    : userScore === aiScore
                      ? "Tie Game!"
                      : "AI Wins!"}
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    className="bg-blue-400/20 rounded-xl p-6 border border-blue-500/30 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {userScore}
                    </div>
                    <div className="text-gray-600">Your Score</div>
                    <div className="text-sm text-blue-600 mt-2">
                      {Math.round((userScore / gameContent.length) * 100)}%
                      Accuracy
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-purple-400/20 rounded-xl p-6 border border-purple-500/30 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Bot className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {aiScore}
                    </div>
                    <div className="text-gray-600">AI Score</div>
                    <div className="text-sm text-purple-600 mt-2">
                      {Math.round((aiScore / gameContent.length) * 100)}%
                      Accuracy
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="bg-cyan-400/20 rounded-xl p-6 border border-cyan-500/30 mb-8 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <Award className="w-8 h-8 mx-auto mb-3 text-cyan-600" />
                  <div className="text-gray-800 font-medium mb-2">
                    Skills Improved
                  </div>
                  <div className="text-sm text-gray-600">
                    Critical Thinking • Digital Literacy • Pattern Recognition
                  </div>
                  <div className="text-xs text-cyan-600 mt-2">
                    Time: {formatTime(currentTime)}
                  </div>
                </motion.div>

                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={startGame}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    Play Again
                  </motion.button>
                  <motion.a
                    href="/dashboard"
                    className="px-6 py-3 bg-white/60 text-gray-800 font-bold rounded-xl border border-white/30 hover:bg-white/70 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    Back to Dashboard
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MainComponent;
