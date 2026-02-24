import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(6);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Aumentei o tempo inicial para 60 segundos
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("highScore")) || 0;
    } catch (e) {
      return 0;
    }
  });

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    // chosen category and word

    return { category, word };
  }, [words]);

  // start the game
  const startGame = useCallback(() => {
    // clear all letters
    clearLettersStates();

    // choose a word
    const { category, word } = pickWordAndCategory();

    // starting game with selected word

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // console.log(category, word);

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGuesses(6);
    setTimeLeft(60);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // process letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
      setScore((s) => s + 10);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // wrong letters updated

  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses(6);
    setTimeLeft(60); // Reinicia o temporizador
    setGameStage(stages[0].name);
  };

  // clear letters state
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setPickedWord("");
    setPickedCategory("");
    setLetters([]);
  };

  // check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name); // Fim de jogo ao esgotar tentativas
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // check win condition

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => actualScore + 100);

      // restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // persist high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem("highScore", String(score));
      } catch (e) {}
    }
  }, [score, highScore]);

  // buy a hint: reveal first letter and deduct points
  const buyHint = (word) => {
    if (!word) return;
    if (score < 10) return;
    setScore((s) => s - 10);
    const first = word[0].toLowerCase();
    setGuessedLetters((prev) => (prev.includes(first) ? prev : [...prev, first]));
  };

  // temporizador
  useEffect(() => {
    if (gameStage === "game" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameStage("end");
    }
  }, [gameStage, timeLeft]);


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          timeLeft={timeLeft} // Passando o temporizador para o componente Game
          buyHint={buyHint}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} highScore={highScore} />}
    </div>
  );
}

export default App;