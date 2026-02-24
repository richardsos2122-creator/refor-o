import { useEffect, useState } from "react";
import "./StartScreen.css";

const GameStart = ({ startGame }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`start ${mounted ? "fadeIn" : ""}`} role="region" aria-label="Tela inicial do jogo">
      <h1>Secret Word</h1>
      <p>Pronto? Vamos começar — boa sorte!</p>
      <button onClick={startGame} aria-label="Iniciar jogo">Começar jogo</button>
    </div>
  );
};

export default GameStart;