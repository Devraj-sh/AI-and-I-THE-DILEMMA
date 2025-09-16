import { useState } from "react";

const sequences = [
    { seq: [1, 4, 9, 16, 25], answer: 36 },
    { seq: [2, 6, 12, 20, 30], answer: 42 },
    { seq: [1, 1, 2, 3, 5], answer: 8 },
    { seq: [5, 10, 20, 40, 80], answer: 160 },
];

const initialGameData = {
    sequence: sequences[1].seq,
    humanAnswer: "",
    aiAnswer: "",
    humanThinking: "",
    aiThinking: "",
    correctAnswer: sequences[1].answer,
    round: 1,
};

export function usePatternDetective(isVoiceEnabled) {
    const [score, setScore] = useState({ human: 0, ai: 0 });
    const [currentTurn, setCurrentTurn] = useState("human");
    const [gameData, setGameData] = useState(initialGameData);

    const speakText = (text, voice = "default") => {
        if (!isVoiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = voice === "ai" ? 0.8 : 1.0;
        utterance.volume = 0.7;

        window.speechSynthesis.speak(utterance);
    };
    
    const checkRoundWinner = (humanAns, aiAns) => {
        const humanCorrect = parseInt(humanAns) === gameData.correctAnswer;
        const aiCorrect = parseInt(aiAns) === gameData.correctAnswer;

        if (humanCorrect && aiCorrect) {
            speakText("Both players got it right! It's a tie this round.");
        } else if (humanCorrect) {
            setScore((prev) => ({ ...prev, human: prev.human + 1 }));
            speakText("Human player wins this round!");
        } else if (aiCorrect) {
            setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
            speakText("AI wins this round!");
        } else {
            speakText("Neither player got it right this time.");
        }

        setTimeout(() => {
            nextRound();
        }, 3000);
    };
    
    const executeAIMove = (humanAnswer) => {
        setCurrentTurn("ai");

        const thinkingSteps = [
            "Analyzing sequence pattern...",
            "Calculating differences: 4, 6, 8, 10",
            "Identifying arithmetic progression",
            "Next difference should be 12",
            "Computing: 30 + 12 = 42",
            "Confidence: 99.2%",
        ];

        let stepIndex = 0;
        const thinkingInterval = setInterval(() => {
            setGameData((prev) => ({
                ...prev,
                aiThinking: thinkingSteps[stepIndex],
            }));
            speakText(thinkingSteps[stepIndex], "ai");
            stepIndex++;

            if (stepIndex >= thinkingSteps.length) {
                clearInterval(thinkingInterval);
                setTimeout(() => {
                    const aiFinalAnswer = "42";
                    setGameData((prev) => ({
                        ...prev,
                        aiAnswer: aiFinalAnswer,
                        aiThinking: "Analysis complete. The answer is 42.",
                    }));
                    speakText("Analysis complete. The answer is 42.", "ai");
                    setTimeout(() => {
                        checkRoundWinner(humanAnswer, aiFinalAnswer);
                    }, 1000);
                }, 1000);
            }
        }, 1500);
    };

    const nextRound = () => {
        const nextSeq = sequences[gameData.round % sequences.length];
        setGameData({
            sequence: nextSeq.seq,
            humanAnswer: "",
            aiAnswer: "",
            humanThinking: "",
            aiThinking: "",
            correctAnswer: nextSeq.answer,
            round: gameData.round + 1,
        });
        setCurrentTurn("human");
    };

    const submitHumanAnswer = () => {
        if (!gameData.humanAnswer) return;
        const currentHumanAnswer = gameData.humanAnswer;

        setGameData((prev) => ({
            ...prev,
            humanThinking: `Looking at ${prev.sequence.join(", ")}... I think the pattern is... My answer: ${currentHumanAnswer}`,
        }));
        speakText(`I think the answer is ${currentHumanAnswer}`);

        setTimeout(() => {
            executeAIMove(currentHumanAnswer);
        }, 2000);
    };

    const setHumanAnswer = (answer) => {
        setGameData(prev => ({ ...prev, humanAnswer: answer }));
    };

    return {
        score,
        currentTurn,
        gameData,
        submitHumanAnswer,
        setHumanAnswer
    };
}
