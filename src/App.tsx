// src/App.tsx
import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(5); // default to 5

  return (
    <div className="app-container">
      {!gameStarted ? (
        <WelcomeScreen 
          onStart={() => setGameStarted(true)} 
          setWordLength={setWordLength}
          wordLength={wordLength}
        />
      ) : (
        <GameScreen wordLength={wordLength} goBack={() => setGameStarted(false)} />
      )}
    </div>
  );
};

export default App;