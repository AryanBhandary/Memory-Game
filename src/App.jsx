import { useState, useEffect } from "react";
import "./App.css";

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🥝", "🍒", "🍑"];

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  // Initialize & shuffle cards
  useEffect(() => {
    startGame();
  }, []);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const startGame = () => {
    const shuffled = shuffle([...emojis, ...emojis]);
    setCards(shuffled.map((emoji, index) => ({ id: index, emoji })));
    setFlipped([]);
    setMatched([]);
    setScore(0);
  };

  const handleFlip = (card) => {
    if (flipped.length < 2 && !flipped.includes(card.id) && !matched.includes(card.id)) {
      setFlipped([...flipped, card.id]);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setScore(score + 1);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards, matched, score]);

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <p className="score">Score: {score}</p>
      <div className="game-container">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <div
                key={card.id}
                className={`card ${flipped.includes(card.id) || matched.includes(card.id) ? "flipped" : ""} ${matched.includes(card.id) ? "matched" : ""}`}
                onClick={() => handleFlip(card)}
              >
                <div className="card-inner">
                  <div className="card-front">❓</div>
                  <div className="card-back">{card.emoji}</div>
                </div>
              </div>
          );
        })}
      </div>
      <button className="restart-btn" onClick={startGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
