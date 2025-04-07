import React, { useEffect, useState } from "react";
import axios from "axios";

const MAX_TRIES = 7;
interface GameScreenProps {
  wordLength: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ wordLength, goBack }) => {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [message, setMessage] = useState<string>("");
  const [definition, setDefinition] = useState<string | null>(null);

  interface WordResult {
    word: string;
  }

  const fetchWord = async () => {
    try {
      const pattern = "?".repeat(wordLength);
      const res = await axios.get(`https://api.datamuse.com/words?sp=${pattern}&max=500`);
      const words = (res.data as WordResult[])
        .map((item) => item.word)
        .filter((w) => /^[a-zA-Z]+$/.test(w));
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWord(randomWord.toLowerCase());
    } catch {
      setWord("debug"); // fallback
    }
  };

  const fetchDefinition = async (target: string) => {
    try {
      const res = await axios.get(`https://api.datamuse.com/words?sp=${target}&md=d`);
      const defs = res.data[0]?.defs;
      if (defs && defs.length > 0) {
        setDefinition(defs[0].split('\t')[1]);
      } else {
        setDefinition("No definition found.");
      }
    } catch {
      setDefinition("Failed to load definition.");
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const letter = e.currentTarget.guess.value.toLowerCase();
    if (!/^[a-zA-Z]$/.test(letter)) {
      setMessage("Please enter a single alphabetical character.");
      return;
    }
    if (guesses.includes(letter)) {
      setMessage(`You've already guessed "${letter}"! Try another letter.`);
      return;
    }

    const newGuesses = [...guesses, letter];
    setGuesses(newGuesses);
    e.currentTarget.reset();

    if (word.includes(letter)) {
      setMessage(`The letter "${letter}" is in the word.`);
    } else {
      setWrongCount((prev) => prev + 1);
      setMessage(`👾 "${letter}" is not in the word 👾`);
    }
  };

  useEffect(() => {
    if (word && word.split("").every((l) => guesses.includes(l))) {
      setStatus("won");
      fetchDefinition(word);
    } else if (wrongCount >= MAX_TRIES) {
      setStatus("lost");
      fetchDefinition(word);
    }
  }, [guesses, wrongCount, word]);

  const resetGame = async () => {
    setGuesses([]);
    setWrongCount(0);
    setStatus("playing");
    setMessage("");
    setDefinition(null);
    await fetchWord();
  };

  const maskedWord = word.split("").map((l) => (guesses.includes(l) ? l : "_"));

  return (
    <div className="card">
      <button onClick={goBack} className="btn-small">← Back</button>
      <h2 className="title">Guess the word:</h2>
      <div className="word-display">{maskedWord.join(" ")}</div>
      {status === "playing" && (
        <form onSubmit={handleGuess} className="form">
          <input type="text" name="guess" maxLength={1} className="input" />
          <button type="submit" className="btn">
            Guess
          </button>
        </form>
      )}
      <p className="message">{message}</p>
      <p className="tries">Wrong guesses: {wrongCount} / {MAX_TRIES}</p>
      {status !== "playing" && (
        <div>
          <p className="result">
            {status === "won" ? "🎉 You won!" : `You lost! The word was "${word}"`}
          </p>
          {definition && <p className="definition">Meaning: {definition}</p>}
          <button className="btn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;