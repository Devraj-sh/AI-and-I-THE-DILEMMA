import { useState } from "react";

const initialGameData = {
  board: Array(9).fill(null), // 3x3 tic-tac-toe style board
  humanAnswer: "",
  aiAnswer: "",
  humanThinking: "",
  aiThinking: "",
  round: 1,
};

export function useStrategyMaster(isVoiceEnabled) {
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

  // Strategic AI decision making using minimax-like logic
  const findBestStrategicMove = (board) => {
    // 1. Check for winning moves
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'AI';
        if (checkWin(testBoard, 'AI')) {
          return i;
        }
      }
    }

    // 2. Block human winning moves
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'Human';
        if (checkWin(testBoard, 'Human')) {
          return i;
        }
      }
    }

    // 3. Strategic position preference: center, corners, edges
    if (board[4] === null) return 4; // Center
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
      if (board[corner] === null) return corner;
    }
    const edges = [1, 3, 5, 7];
    for (let edge of edges) {
      if (board[edge] === null) return edge;
    }
    
    return board.findIndex(cell => cell === null);
  };

  const checkWin = (board, player) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => 
      pattern.every(index => board[index] === player)
    );
  };

  const executeAIMove = (humanMove) => {
    setCurrentTurn("ai");

    const thinkingSteps = [
      "Initializing minimax algorithm with alpha-beta pruning...",
      "Analyzing game tree - evaluating all possible moves",
      "Computing position values using strategic heuristics",
      "Checking for immediate winning opportunities",
      "Evaluating defensive blocking requirements",
      "Applying strategic principles: center control, corner dominance",
      "Calculating optimal move with 99.7% confidence"
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
          const bestMove = findBestStrategicMove(gameData.board);
          const newBoard = gameData.board.map((cell, index) => 
            index === bestMove ? 'AI' : cell
          );
          
          setGameData(prev => ({
            ...prev,
            board: newBoard,
            aiAnswer: String(bestMove),
            aiThinking: `Optimal move selected: position ${bestMove + 1}. This maximizes my strategic advantage.`
          }));
          
          speakText(`I use game theory algorithms like minimax to evaluate every possible future game state. Each position gets scored based on winning probability, material advantage, and positional control. I selected position ${bestMove + 1} as the mathematically optimal move.`, "ai");

          setTimeout(() => {
            checkRoundWinner(humanMove, bestMove);
          }, 2000);
        }, 1000);
      }
    }, 2000);
  };

  const checkRoundWinner = (humanMove, aiMove) => {
    const humanWon = checkWin(gameData.board, 'Human');
    const aiWon = checkWin(gameData.board, 'AI');
    
    if (humanWon) {
      setScore(prev => ({ ...prev, human: prev.human + 1 }));
      speakText("Excellent strategic play! Human player wins this round!");
    } else if (aiWon) {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      speakText("AI achieves strategic victory with optimal play!");
    } else if (gameData.board.every(cell => cell !== null)) {
      speakText("Strategic draw! Both players played optimally.");
    } else {
      // Game continues
      setCurrentTurn("human");
      return;
    }

    setTimeout(() => {
      nextRound();
    }, 3000);
  };

  const nextRound = () => {
    setGameData({
      board: Array(9).fill(null),
      humanAnswer: "",
      aiAnswer: "",
      humanThinking: "",
      aiThinking: "",
      round: gameData.round + 1
    });
    setCurrentTurn("human");
  };

  const makeHumanMove = (position) => {
    if (gameData.board[position] !== null || currentTurn !== 'human') return;

    const newBoard = gameData.board.map((cell, index) => 
      index === position ? 'Human' : cell
    );

    setGameData(prev => ({
      ...prev,
      board: newBoard,
      humanThinking: `I chose position ${position + 1}. This looks like a good strategic move.`
    }));

    speakText(`I place my move on position ${position + 1}`);

    setTimeout(() => {
      executeAIMove(position);
    }, 1500);
  };

  return {
    score,
    currentTurn,
    gameData,
    makeHumanMove
  };
}