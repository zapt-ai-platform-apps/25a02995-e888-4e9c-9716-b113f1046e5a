import React, { useState } from 'react';
import GameScreen from './screens/GameScreen';
import * as Sentry from '@sentry/browser';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);

  const handleStartGame = () => {
    if (!startButtonDisabled) {
      console.log('Starting AI Detective Game');
      setStartButtonDisabled(true);
      // Simulate a short delay before starting the game
      setTimeout(() => {
        setGameStarted(true);
        setStartButtonDisabled(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 flex flex-col">
      {!gameStarted && (
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <h1 className="text-5xl font-bold mb-4">AI Detective Game</h1>
          <p className="text-lg mb-8 text-center max-w-2xl">
            Solve mysteries by questioning AI-generated suspects with unique personalities.
            Use voice recognition to interrogate and uncover clues that lead to multiple thrilling endings.
          </p>
          <button
            onClick={handleStartGame}
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 active:opacity-75 disabled:opacity-50"
            disabled={startButtonDisabled}
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && <GameScreen />}
      <footer className="p-4 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="text-sm text-blue-600">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}