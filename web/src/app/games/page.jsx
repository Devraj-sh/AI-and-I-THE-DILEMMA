"use client";

import { useState } from "react";
import GameSelection from "./components/GameSelection";
import GameView from "./components/GameView";
import GameStyles from "./components/GameStyles";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  if (!selectedGame) {
    return (
      <>
        <GameSelection onSelectGame={setSelectedGame} />
        <GameStyles />
      </>
    );
  }

  return (
    <>
      <GameView
        game={selectedGame}
        onBack={() => setSelectedGame(null)}
        isVoiceEnabled={isVoiceEnabled}
        onToggleVoice={() => setIsVoiceEnabled(!isVoiceEnabled)}
      />
      <GameStyles />
    </>
  );
}
