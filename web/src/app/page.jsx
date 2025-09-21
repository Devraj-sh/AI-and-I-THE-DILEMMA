"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Zap,
  Gamepad2,
  TrendingUp,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery } from "@tanstack/react-query";
import { FloatingBrain, FloatingParticles } from "@/components/3DWidget";
import getTTS from "@/utils/tts";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tts] = useState(() => getTTS());

  // Fetch user profile if authenticated
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    enabled: !!user,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // AI Welcome message on first visit
  useEffect(() => {
    if (!user) {
      tts.speak(
        "Welcome to AI and I: The Dilemma! An innovative platform where you'll master AI literacy through exciting challenges. Ready to start your journey?",
      );
    }
  }, [user, tts]);

  if (userLoading) {
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
            Loading...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // If user is authenticated but no profile, redirect to profile setup
  if (user && !profileData?.profile) {
    window.location.href = "/profile-setup";
    return null;
  }

  // If user has profile, redirect to dashboard
  if (user && profileData?.profile) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 overflow-hidden relative">
      {/* Animated cursor follower */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-sm pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating Particles */}
      <FloatingParticles count={30} />

      {/* Geometric shapes background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-200 to-pink-300 rounded-lg opacity-20"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full opacity-20"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/30 border-b border-white/20">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <FloatingBrain size={40} color="#0ea5e9" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI & I
            </h1>
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href="/account/signin"
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.a>
            <motion.a
              href="/account/signup"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </motion.div>
        </header>

        {/* Hero section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                className="flex justify-center mb-8"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <FloatingBrain size={150} color="#0ea5e9" />
              </motion.div>

              <motion.h2
                className="text-6xl md:text-8xl font-bold text-gray-800 mb-6"
                animate={{
                  textShadow: [
                    "0 0 0px #0ea5e9",
                    "0 0 20px #0ea5e9",
                    "0 0 0px #0ea5e9",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                THE{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  DILEMMA
                </span>
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Master AI literacy through{" "}
                <motion.span
                  className="text-blue-600 font-semibold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  gamified challenges
                </motion.span>
                . Compete with AI, discover your skills, and unlock your future
                career path.
              </motion.p>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <FeatureCard
                icon={Gamepad2}
                title="Interactive Games"
                description="6 unique Human vs AI challenges that teach critical thinking and creativity"
                gradient="from-green-400 to-blue-500"
                delay={0}
              />
              <FeatureCard
                icon={TrendingUp}
                title="3D Skill Mapping"
                description="Real-time skill tracking with interactive 3D visualizations and personalized insights"
                gradient="from-purple-400 to-pink-500"
                delay={0.1}
              />
              <FeatureCard
                icon={Brain}
                title="AI Career Advisory"
                description="AI-powered career recommendations with voice narration and interactive guidance"
                gradient="from-cyan-400 to-blue-500"
                delay={0.2}
              />
            </motion.div>

            {/* Age group selection */}
            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AgeGroupCard
                icon={GraduationCap}
                title="Students"
                subtitle="Ages 10-17"
                description="Learn AI basics through fun games and interactive challenges"
                href="/account/signup"
                color="from-blue-400 to-cyan-500"
              />
              <AgeGroupCard
                icon={Users}
                title="Adults"
                subtitle="Ages 18+"
                description="Master prompt engineering, AI collaboration & advanced techniques"
                href="/account/signup"
                color="from-purple-400 to-pink-500"
              />
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-gray-600 backdrop-blur-sm bg-white/20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            &copy; 2024 AI & I: THE DILEMMA. Empowering the next generation with
            AI literacy.
          </motion.p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, gradient, delay }) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/70 transition-all group shadow-lg"
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <motion.div
        className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function AgeGroupCard({
  icon: Icon,
  title,
  subtitle,
  description,
  href,
  color,
}) {
  return (
    <motion.a
      href={href}
      className="block bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/70 transition-all group min-w-[300px] shadow-lg"
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() =>
        getTTS().speak(`Learn more about our ${title.toLowerCase()} program`)
      }
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-blue-600 text-sm font-medium">{subtitle}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
        <span className="mr-2 font-medium">Start Learning</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.a>
  );
}

export default MainComponent;
