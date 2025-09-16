import { useState } from "react";

const creativePrompts = [
  "Design a new way to solve traffic jams in busy cities",
  "Invent a device that helps people sleep better at night", 
  "Create a new form of entertainment for the future",
  "Design a solution for ocean plastic pollution",
  "Invent a way to make learning more fun for children",
  "Create a new social media platform that promotes positivity",
  "Design a sustainable transportation system for Mars",
  "Invent a tool that helps elderly people stay connected"
];

const aiCreativeResponses = [
  "Pneumatic tube networks beneath cities that transport individual pods using air pressure, eliminating surface traffic while being powered entirely by renewable energy captured from pedestrian footsteps.",
  "Smart pillows that emit personalized frequencies based on your brainwave patterns, combined with aromatherapy chambers that release scents proven to enhance REM sleep cycles for your specific genetic profile.",
  "Immersive dream-sharing theaters where multiple people can join the same lucid dream narrative, experiencing stories together in a completely new dimension of entertainment that engages all senses.",
  "Self-assembling bio-plastic-eating organisms that can be deployed from satellites, programmed to consume only plastic waste and convert it into coral reef building materials.",
  "Augmented reality learning worlds where children can walk through ancient Rome, touch dinosaurs, or manipulate molecular structures with their hands while learning through interactive storytelling.",
  "A platform where users must solve real-world problems in their community to unlock social features, gamifying positive action and making helping others the currency of connection.",
  "Magnetic levitation highways that use Mars' mineral composition for propulsion, with enclosed tubes protecting travelers from radiation while generating power from temperature differences.",
  "AI companion robots that learn from family memories and traditions, helping elderly maintain connections by facilitating meaningful video calls and shared virtual experiences with loved ones."
];

const initialGameData = {
  creativePrompt: creativePrompts[0],
  humanCreativeAnswer: "",
  aiCreativeAnswer: "",
  humanAnswer: "",
  aiAnswer: "",
  humanThinking: "",
  aiThinking: "",
  round: 1,
};

export function useCreativeChallenge(isVoiceEnabled) {
  const [score, setScore] = useState({ human: 0, ai: 0 });
  const [currentTurn, setCurrentTurn] = useState("human");
  const [gameData, setGameData] = useState(initialGameData);

  const speakText = (text, voice = "default") => {
    if (!isVoiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voice === "ai" ? 0.7 : 0.8;
    utterance.pitch = voice === "ai" ? 0.7 : 1.0;
    utterance.volume = 0.8;

    window.speechSynthesis.speak(utterance);
  };

  const generateCreativeResponse = (promptIndex) => {
    return aiCreativeResponses[promptIndex % aiCreativeResponses.length];
  };

  const executeAIMove = (humanAnswer) => {
    setCurrentTurn("ai");

    const thinkingSteps = [
      "Activating creative neural networks across multiple domains...",
      "Scanning knowledge base for cross-domain inspirations",
      "Generating semantic associations from diverse fields",
      "Applying divergent thinking algorithms to explore novel combinations",
      "Cross-pollinating ideas from biology, technology, and social systems",
      "Evaluating novelty scores and feasibility metrics",
      "Synthesizing optimal creative solution with maximum innovation potential"
    ];

    let stepIndex = 0;
    const thinkingInterval = setInterval(() => {
      setGameData(prev => ({
        ...prev,
        aiThinking: thinkingSteps[stepIndex]
      }));

      speakText(thinkingSteps[stepIndex], "ai");
      stepIndex++;

      if (stepIndex >= thinkingSteps.length) {
        clearInterval(thinkingInterval);
        setTimeout(() => {
          const promptIndex = gameData.round - 1;
          const aiAnswer = generateCreativeResponse(promptIndex);
          
          setGameData(prev => ({
            ...prev,
            aiCreativeAnswer: aiAnswer,
            aiAnswer: aiAnswer,
            aiThinking: "Creative synthesis complete. Novel solution generated through cross-domain inspiration."
          }));
          
          speakText("I generate creativity by combining unexpected elements from my vast training data. I use attention mechanisms to find novel connections between concepts from different domains - like combining biology with technology, or social systems with physics. This allows me to create solutions that humans might not consider by bridging knowledge gaps across disciplines.", "ai");

          setTimeout(() => {
            checkRoundWinner(humanAnswer, aiAnswer);
          }, 2000);
        }, 1000);
      }
    }, 1600);
  };

  const checkRoundWinner = (humanAns, aiAns) => {
    // In creativity, both substantial answers are considered good
    const humanCreative = humanAns && humanAns.length > 20;
    const aiCreative = aiAns && aiAns.length > 20;

    if (humanCreative && aiCreative) {
      setScore(prev => ({ ...prev, human: prev.human + 1, ai: prev.ai + 1 }));
      speakText("Both players showed excellent creativity! Everyone wins when we create together.");
    } else if (humanCreative) {
      setScore(prev => ({ ...prev, human: prev.human + 1 }));
      speakText("Wonderful creative thinking from the human player!");
    } else if (aiCreative) {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      speakText("AI demonstrates innovative cross-domain creative synthesis!");
    } else {
      speakText("Creativity takes time. Let's try another challenge!");
    }

    setTimeout(() => {
      nextRound();
    }, 3000);
  };

  const nextRound = () => {
    const nextPrompt = creativePrompts[gameData.round % creativePrompts.length];
    
    setGameData({
      creativePrompt: nextPrompt,
      humanCreativeAnswer: "",
      aiCreativeAnswer: "",
      humanAnswer: "",
      aiAnswer: "",
      humanThinking: "",
      aiThinking: "",
      round: gameData.round + 1
    });
    setCurrentTurn("human");
  };

  const submitHumanAnswer = () => {
    if (!gameData.humanCreativeAnswer || gameData.humanCreativeAnswer.length < 10) return;

    setGameData(prev => ({
      ...prev,
      humanAnswer: prev.humanCreativeAnswer,
      humanThinking: `My creative solution: ${prev.humanCreativeAnswer}`
    }));

    speakText("Here's my creative solution to this challenge");

    setTimeout(() => {
      executeAIMove(gameData.humanCreativeAnswer);
    }, 2000);
  };

  const setHumanCreativeAnswer = (answer) => {
    setGameData(prev => ({ ...prev, humanCreativeAnswer: answer }));
  };

  return {
    score,
    currentTurn,
    gameData,
    submitHumanAnswer,
    setHumanCreativeAnswer
  };
}