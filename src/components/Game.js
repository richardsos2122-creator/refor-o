import { useState, useRef } from "react";

// styles
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  timeLeft,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação</span>: {score}
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <p className="timer">Tempo restante: {timeLeft}s</p> {/* Exibindo o temporizador */}
      <div className="wordContainer">
        {/* Verifica se letters é um array antes de usar map */}
        {Array.isArray(letters) && letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivnhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {/* Verifica se wrongLetters é um array antes de usar map */}
        {Array.isArray(wrongLetters) && wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
      <button onClick={() => alert("Dica: A primeira letra é " + pickedWord[0])}>
        Comprar Dica (-10 pontos)
      </button>
    </div>
  );
};

export default Game;