import { useState, useEffect } from "react";

const initialGameData = {
  memorySequence: [1, 4, 7, 2],
  showSequence: true,
  sequenceIndex: 0,
  humanMemoryInput: [],
  humanAnswer: "",
  aiAnswer: "",
  humanThinking: "",
  aiThinking: "",
  round: 1,
};

export function useMemoryPalace(isVoiceEnabled) {
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

  // Auto-advance sequence display
  useEffect(() => {
    if (gameData.showSequence && gameData.sequenceIndex < gameData.memorySequence.length) {
      const timer = setTimeout(() => {
        setGameData(prev => ({
          ...prev,
          sequenceIndex: prev.sequenceIndex + 1
        }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameData.showSequence && gameData.sequenceIndex >= gameData.memorySequence.length) {
      setTimeout(() => {
        setGameData(prev => ({ ...prev, showSequence: false }));
        speakText("Now it's your turn to recall the sequence!");
      }, 1000);
    }
  }, [gameData.showSequence, gameData.sequenceIndex, isVoiceEnabled]);

  const executeAIMove = (humanAnswer) => {
    setCurrentTurn("ai");

    const thinkingSteps = [
      "Activating working memory buffers...",
      "Accessing stored sequence from episodic memory matrix",
      "Cross-referencing with associative memory networks",
      "Applying chunking algorithms for perfect recall",
      "Memory consolidation complete - 100% accuracy achieved",
      "Retrieving sequence: " + gameData.memorySequence.join(", ")
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
          const aiAnswer = gameData.memorySequence.join(",");
          setGameData(prev => ({
            ...prev,
            aiAnswer: aiAnswer,
            aiThinking: "Perfect memory recall complete. Unlike human episodic memory, I store data in distributed neural networks with error correction."
          }));
          speakText("I store information differently than humans. Each number gets encoded with positional markers and semantic associations across multiple memory layers, ensuring perfect recall every time.", "ai");

          setTimeout(() => {
            checkRoundWinner(humanAnswer, aiAnswer);
          }, 2000);
        }, 1000);
      }
    }, 1500);
  };

  const checkRoundWinner = (humanAns, aiAns) => {
    const humanCorrect = humanAns === gameData.memorySequence.join(",");
    const aiCorrect = true; // AI has perfect memory

    if (humanCorrect && aiCorrect) {
      speakText("Both players got it right! Perfect memory from both!");
    } else if (humanCorrect) {
      setScore(prev => ({ ...prev, human: prev.human + 1 }));
      speakText("Amazing! Human player matched AI's perfect memory!");
    } else {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      speakText("AI wins with perfect memory recall!");
    }

    setTimeout(() => {
      nextRound();
    }, 3000);
  };

  const nextRound = () => {
    const newSequence = Array.from({length: Math.min(4 + gameData.round, 8)}, () => 
      Math.floor(Math.random() * 9) + 1
    );
    
    setGameData({
      memorySequence: newSequence,
      showSequence: true,
      sequenceIndex: 0,
      humanMemoryInput: [],
      humanAnswer: "",
      aiAnswer: "",
      humanThinking: "",
      aiThinking: "",
      round: gameData.round + 1
    });
    setCurrentTurn("human");
  };

  const addHumanInput = (num) => {
    const newInput = [...gameData.humanMemoryInput, num];
    setGameData(prev => ({
      ...prev,
      humanMemoryInput: newInput
    }));

    if (newInput.length === gameData.memorySequence.length) {
      // Complete sequence entered
      setTimeout(() => {
        submitHumanAnswer(newInput.join(","));
      }, 500);
    }
  };

  const submitHumanAnswer = (humanAnswer) => {
    setGameData(prev => ({
      ...prev,
      humanThinking: `Trying to remember the sequence... I think it was: ${humanAnswer}`
    }));

    speakText(`I remember the sequence as ${humanAnswer}`);

    setTimeout(() => {
      executeAIMove(humanAnswer);
    }, 2000);
  };

  return {
    score,
    currentTurn,
    gameData,
    addHumanInput,
    submitHumanAnswer
  };
}