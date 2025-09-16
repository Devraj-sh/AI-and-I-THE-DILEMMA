import { useState } from "react";

const logicPuzzles = [
  {
    premise: "All cats are mammals. Fluffy is a cat.",
    question: "What can we conclude about Fluffy?",
    options: ["Fluffy is a mammal", "Fluffy is not a mammal", "Cannot determine", "Fluffy is a dog"],
    correct: 0
  },
  {
    premise: "If it rains, the ground gets wet. The ground is not wet.",
    question: "What can we conclude?",
    options: ["It rained", "It didn't rain", "Cannot determine", "The ground is dry"],
    correct: 1
  },
  {
    premise: "All birds can fly. Penguins are birds.",
    question: "Can penguins fly?",
    options: ["Yes, all birds fly", "No, this is a logical contradiction", "Only some penguins", "Need more information"],
    correct: 1
  },
  {
    premise: "If John studies, he passes. John passed.",
    question: "Did John study?",
    options: ["Yes, definitely", "No, definitely not", "Cannot determine from given information", "Maybe"],
    correct: 2
  }
];

const initialGameData = {
  logicPuzzle: logicPuzzles[0],
  humanLogicAnswer: "",
  humanAnswer: "",
  aiAnswer: "",
  humanThinking: "",
  aiThinking: "",
  round: 1,
};

export function useLogicPuzzler(isVoiceEnabled) {
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

  const executeAIMove = (humanAnswer) => {
    setCurrentTurn("ai");

    const thinkingSteps = [
      "Parsing logical statements and premises...",
      "Converting natural language to formal logic notation",
      "Building truth table matrix for all propositions",
      "Applying modus ponens and modus tollens inference rules",
      "Checking for logical consistency and contradictions",
      "Evaluating each option against derived conclusions",
      "Computing logical validity scores for each answer"
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
          const aiAnswer = String(gameData.logicPuzzle.correct);
          setGameData(prev => ({
            ...prev,
            aiAnswer: aiAnswer,
            aiThinking: `Logical deduction complete. Option ${gameData.logicPuzzle.correct + 1} is logically valid with 100% certainty.`
          }));
          
          speakText(`I use formal logic systems with propositional calculus. Each statement gets parsed into logical operators like AND, OR, NOT, and IMPLIES. Then I apply inference rules like modus ponens to derive valid conclusions automatically. The correct answer is option ${gameData.logicPuzzle.correct + 1}.`, "ai");

          setTimeout(() => {
            checkRoundWinner(humanAnswer, aiAnswer);
          }, 2000);
        }, 1000);
      }
    }, 1800);
  };

  const checkRoundWinner = (humanAns, aiAns) => {
    const humanCorrect = parseInt(humanAns) === gameData.logicPuzzle.correct;
    const aiCorrect = parseInt(aiAns) === gameData.logicPuzzle.correct;

    if (humanCorrect && aiCorrect) {
      speakText("Both players applied correct logical reasoning!");
    } else if (humanCorrect) {
      setScore(prev => ({ ...prev, human: prev.human + 1 }));
      speakText("Excellent logical reasoning by the human player!");
    } else if (aiCorrect) {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      speakText("AI wins with perfect logical deduction!");
    } else {
      speakText("This is a challenging logic problem for both players.");
    }

    setTimeout(() => {
      nextRound();
    }, 3000);
  };

  const nextRound = () => {
    const nextPuzzle = logicPuzzles[gameData.round % logicPuzzles.length];
    
    setGameData({
      logicPuzzle: nextPuzzle,
      humanLogicAnswer: "",
      humanAnswer: "",
      aiAnswer: "",
      humanThinking: "",
      aiThinking: "",
      round: gameData.round + 1
    });
    setCurrentTurn("human");
  };

  const submitHumanAnswer = (answerIndex) => {
    setGameData(prev => ({
      ...prev,
      humanLogicAnswer: String(answerIndex),
      humanThinking: `Analyzing the logical structure... I believe the answer is option ${answerIndex + 1}.`
    }));

    speakText(`I think the answer is option ${answerIndex + 1}`);

    setTimeout(() => {
      executeAIMove(String(answerIndex));
    }, 2000);
  };

  return {
    score,
    currentTurn,
    gameData,
    submitHumanAnswer
  };
}