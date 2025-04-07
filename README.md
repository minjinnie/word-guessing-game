# Word Guessing Game

A simple word guessing game built with **React + TypeScript** using the **Datamuse API**.  
You have 7 chances to guess the word one letter at a time!

## Features

- **Random word fetching** using the Datamuse API
- **Difficulty selection** (Easy: 4-letter words / Hard: 8-letter words)
- **Definition revealed** after the game ends — learn what the word means!
- Smooth UI with status messages, dynamic input handling, and replayability

## How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/minjinnie/word-guessing-game.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will run at `http://localhost:5173/` by default.

## Tech Stack

- React (with Vite)
- TypeScript
- Axios
- Datamuse API

## 💡 Notes

- All words are fetched dynamically from the [Datamuse API](https://www.datamuse.com/api/).
- You can choose the difficulty level on the welcome screen.
- After the game ends, the definition of the word is shown so you can learn new vocabulary too!

---

Enjoy the game! 🎮