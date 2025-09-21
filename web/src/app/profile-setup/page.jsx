"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Brain, Zap, User, Palette, Shield, ArrowRight } from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation } from "@tanstack/react-query";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: "",
    avatar_url: "",
    age_group: "",
    parental_consent: false,
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) throw new Error('Failed to create profile');
      return response.json();
    },
    onSuccess: () => {
      window.location.href = '/dashboard';
    },
  });

  const avatarOptions = [
    { id: 'avatar1', url: '🧑‍💻', name: 'Tech Explorer' },
    { id: 'avatar2', url: '🎨', name: 'Creative Mind' },
    { id: 'avatar3', url: '🔬', name: 'Science Enthusiast' },
    { id: 'avatar4', url: '🎮', name: 'Game Master' },
    { id: 'avatar5', url: '📚', name: 'Knowledge Seeker' },
    { id: 'avatar6', url: '🚀', name: 'Future Builder' },
  ];

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!user) {
    window.location.href = '/account/signin';
    return null;
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    createProfileMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-400" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>
              <h1 className="text-2xl font-bold text-white">AI & I</h1>
            </motion.div>
            <p className="text-cyan-200 text-sm">Let's set up your profile</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-sm">Step {step} of 3</span>
              <span className="text-white/60 text-sm">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="min-h-[400px]">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <User className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white mb-2">What should we call you?</h2>
                  <p className="text-white/70">Choose a nickname for your AI & I journey</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Nickname
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    placeholder="Enter your nickname"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    maxLength={50}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Palette className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white mb-2">Choose your avatar</h2>
                  <p className="text-white/70">Pick an avatar that represents you</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {avatarOptions.map((avatar) => (
                    <motion.button
                      key={avatar.id}
                      onClick={() => setFormData({ ...formData, avatar_url: avatar.url })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.avatar_url === avatar.url
                          ? "border-cyan-400 bg-cyan-400/20"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl mb-2">{avatar.url}</div>
                      <div className="text-white text-sm">{avatar.name}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white mb-2">Almost ready!</h2>
                  <p className="text-white/70">Confirm your age group and privacy settings</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Age Group
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "10-12", label: "10-12 years" },
                        { value: "13-17", label: "13-17 years" },
                        { value: "18+", label: "18+ years" },
                      ].map((group) => (
                        <label
                          key={group.value}
                          className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                            formData.age_group === group.value
                              ? "bg-white/20 border-2 border-cyan-400"
                              : "bg-white/5 border border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <input
                            type="radio"
                            name="ageGroup"
                            value={group.value}
                            checked={formData.age_group === group.value}
                            onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                            className="sr-only"
                          />
                          <span className="text-white font-medium">{group.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {(formData.age_group === "10-12" || formData.age_group === "13-17") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4"
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.parental_consent}
                          onChange={(e) => setFormData({ ...formData, parental_consent: e.target.checked })}
                          className="mt-1 w-4 h-4 text-cyan-400 bg-transparent border-2 border-white/30 rounded focus:ring-cyan-400"
                        />
                        <div className="text-sm text-white/90">
                          <strong>Parental Consent Required:</strong> I confirm that I have parental permission to use this platform and understand that my gameplay data will be used to provide personalized learning experiences.
                        </div>
                      </label>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-2 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              whileHover={{ scale: step > 1 ? 1.05 : 1 }}
              whileTap={{ scale: step > 1 ? 0.95 : 1 }}
            >
              Back
            </motion.button>

            <motion.button
              onClick={step === 3 ? handleSubmit : handleNext}
              disabled={
                (step === 1 && !formData.nickname) ||
                (step === 2 && !formData.avatar_url) ||
                (step === 3 && (!formData.age_group || 
                  ((formData.age_group === "10-12" || formData.age_group === "13-17") && !formData.parental_consent)
                )) ||
                createProfileMutation.isLoading
              }
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {createProfileMutation.isLoading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating...
                </>
              ) : step === 3 ? (
                <>
                  Complete Setup
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MainComponent;