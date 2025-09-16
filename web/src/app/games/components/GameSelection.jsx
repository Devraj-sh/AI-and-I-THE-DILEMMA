import GameCard from "./GameCard";
import Achievements from "./Achievements";
import { games } from "../data";

export default function GameSelection({ onSelectGame }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="p-6 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
            AI Games Arena
          </h1>
          <p className="text-gray-400 text-lg">
            Choose a game and watch AI vs Human thinking in action!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onSelectGame={onSelectGame} />
          ))}
        </div>
        <Achievements />
      </div>
    </div>
  );
}
