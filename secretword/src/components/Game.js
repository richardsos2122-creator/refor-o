import { useState, useRef, useEffect } from "react";

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
  buyHint,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  // play simple tones using Web Audio API
  const playTone = (type = "click") => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type === "success" ? "sine" : type === "error" ? "square" : "triangle";
      o.frequency.value = type === "success" ? 880 : type === "error" ? 220 : 440;
      g.gain.value = 0.06;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 120);
    } catch (err) {
      // fall back silently if AudioContext unavailable
    }
  };

  // play feedback when guessed/wrong letters change
  const prevGuessedRef = useRef(guessedLetters.length);
  const prevWrongRef = useRef(wrongLetters.length);
  const [mounted, setMounted] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  useEffect(() => {
    if (guessedLetters.length > prevGuessedRef.current) playTone("success");
    if (wrongLetters.length > prevWrongRef.current) {
      playTone("error");
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 420);
    }
    prevGuessedRef.current = guessedLetters.length;
    prevWrongRef.current = wrongLetters.length;
  }, [guessedLetters, wrongLetters]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guesses <= 0) return;

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current?.focus();
  };

  return (
    <div className={`game ${mounted ? "fadeIn" : ""} ${shakeWrong ? "shake" : ""}`} role="application" aria-label="Jogo Adivinhe a Palavra">
      <p className="points">
        <span>Pontuação</span>: {score}
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem <strong>{guesses}</strong> tentativa(s).</p>
      <p className="timer">Tempo restante: {timeLeft}s</p>

      <div className="wordContainer" aria-hidden={false}>
        {Array.isArray(letters) && letters.map((ltr, i) =>
          guessedLetters.includes(ltr) ? (
            <span className="letter" key={i} aria-label={`Letra ${ltr}`}>
              {ltr}
            </span>
          ) : (
            <span key={i} className="blankSquare" aria-hidden="true" />
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit} aria-label="Formulário de letra">
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
            aria-label="Digite uma letra"
            disabled={guesses <= 0}
          />
          <button disabled={guesses <= 0}>Jogar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {Array.isArray(wrongLetters) && wrongLetters.map((ltr, i) => (
          <span key={i}>{ltr}{i < wrongLetters.length - 1 ? ', ' : ''}</span>
        ))}
      </div>

      <button
        onClick={() => buyHint(pickedWord)}
        disabled={score < 10}
        aria-disabled={score < 10}
        aria-label="Comprar dica"
      >
        Comprar Dica (-10 pontos)
      </button>
    </div>
  );
};

export default Game;