import { Users, Sparkles } from "lucide-react";
import GameHeader from "./GameHeader";
import LevelProgress from "./LevelProgress";
import PatternDetectiveGame from "./PatternDetective/PatternDetectiveGame";
import MemoryPalaceGame from "./MemoryPalace/MemoryPalaceGame";
import LogicPuzzlerGame from "./LogicPuzzler/LogicPuzzlerGame";
import StrategyMasterGame from "./StrategyMaster/StrategyMasterGame";
import CreativeChallengeGame from "./CreativeChallenge/CreativeChallengeGame";
import ThinkingDisplay from "./PatternDetective/ThinkingDisplay";
import { usePatternDetective } from "../usePatternDetective";
import { useMemoryPalace } from "../useMemoryPalace";
import { useLogicPuzzler } from "../useLogicPuzzler";
import { useStrategyMaster } from "../useStrategyMaster";
import { useCreativeChallenge } from "../useCreativeChallenge";

export default function GameView({
  game,
  onBack,
  isVoiceEnabled,
  onToggleVoice,
}) {
  const currentLevel = 1; // This is hardcoded for now

  // Use the appropriate hook based on game type
  const patternDetectiveHook = usePatternDetective(isVoiceEnabled);
  const memoryPalaceHook = useMemoryPalace(isVoiceEnabled);
  const logicPuzzlerHook = useLogicPuzzler(isVoiceEnabled);
  const strategyMasterHook = useStrategyMaster(isVoiceEnabled);
  const creativeChallengeHook = useCreativeChallenge(isVoiceEnabled);

  // Select the appropriate game hook
  const getGameHook = () => {
    switch (game.id) {
      case 1:
        return patternDetectiveHook;
      case 2:
        return memoryPalaceHook;
      case 3:
        return logicPuzzlerHook;
      case 4:
        return strategyMasterHook;
      case 5:
        return creativeChallengeHook;
      default:
        return patternDetectiveHook;
    }
  };

  const { score, currentTurn, gameData } = getGameHook();

  // Render the appropriate game component
  const renderGameComponent = () => {
    switch (game.id) {
      case 1: // Pattern Detective
        return (
          <PatternDetectiveGame
            gameData={gameData}
            currentTurn={currentTurn}
            onAnswerChange={patternDetectiveHook.setHumanAnswer}
            onSubmitAnswer={patternDetectiveHook.submitHumanAnswer}
          />
        );
      case 2: // Memory Palace
        return (
          <MemoryPalaceGame
            gameData={gameData}
            currentTurn={currentTurn}
            onNumberSelect={memoryPalaceHook.addHumanInput}
          />
        );
      case 3: // Logic Puzzler
        return (
          <LogicPuzzlerGame
            gameData={gameData}
            currentTurn={currentTurn}
            onAnswerSelect={logicPuzzlerHook.submitHumanAnswer}
          />
        );
      case 4: // Strategy Master
        return (
          <StrategyMasterGame
            gameData={gameData}
            currentTurn={currentTurn}
            onMakeMove={strategyMasterHook.makeHumanMove}
          />
        );
      case 5: // Creative Challenge
        return (
          <CreativeChallengeGame
            gameData={gameData}
            currentTurn={currentTurn}
            onAnswerChange={creativeChallengeHook.setHumanCreativeAnswer}
            onSubmitAnswer={creativeChallengeHook.submitHumanAnswer}
          />
        );
      default:
        return (
          <PatternDetectiveGame
            gameData={gameData}
            currentTurn={currentTurn}
            onAnswerChange={patternDetectiveHook.setHumanAnswer}
            onSubmitAnswer={patternDetectiveHook.submitHumanAnswer}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <GameHeader
        game={game}
        onBack={onBack}
        score={score}
        isVoiceEnabled={isVoiceEnabled}
        onToggleVoice={onToggleVoice}
        currentLevel={currentLevel}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 card-3d">
            {renderGameComponent()}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ThinkingDisplay
              player="Human Player"
              thinking={gameData.humanThinking}
              avatar={<Users className="w-6 h-6 text-blue-400" />}
              color="from-blue-500/20 to-cyan-500/20"
              isActive={currentTurn === "human"}
            />
            <ThinkingDisplay
              player="AI Player"
              thinking={gameData.aiThinking}
              avatar={<Sparkles className="w-6 h-6 text-purple-400" />}
              color="from-purple-500/20 to-pink-500/20"
              isActive={currentTurn === "ai"}
            />
          </div>
        </div>
        <LevelProgress currentLevel={currentLevel} />
      </div>
    </div>
  );
}
