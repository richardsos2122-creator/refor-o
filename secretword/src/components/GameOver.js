import "./GameOver.css";

import { useEffect, useState } from "react";
import "./GameOver.css";

const GameOver = ({ retry, score, highScore }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`gameover ${mounted ? "fadeIn" : ""}`} role="region" aria-label="Tela de fim de jogo">
      <h1>Fim de jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>!
      </h2>
      <div className="meta">Maior pontuação: <strong>{highScore}</strong></div>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

export default GameOver;