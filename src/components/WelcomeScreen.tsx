import React from "react";

interface Props {
  onStart: () => void;
  setWordLength: (len: number) => void;
  wordLength: number;
}

const WelcomeScreen: React.FC<Props> = ({ onStart, setWordLength, wordLength }) => {
  return (
    <div className="card">
      <h1 className="title">Welcome to Word Guess!</h1>
      <p className="description">Choose difficulty and start guessing the word!</p>

      <div className="mb-4">
        <label>
          <input 
            type="radio" 
            name="difficulty" 
            checked={wordLength === 4} 
            onChange={() => setWordLength(4)}
          /> Easy (4 letters)
        </label>
        <br />
        <label>
          <input 
            type="radio" 
            name="difficulty" 
            checked={wordLength === 8} 
            onChange={() => setWordLength(8)}
          /> Hard (8 letters)
        </label>
      </div>

      <button onClick={onStart} className="btn">
        Start Game
      </button>
    </div>
  );
};

export default WelcomeScreen;