import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { memoryMatchData } from '../data/games';

function generateShuffledDeck() {
  const rawPairs = [...memoryMatchData.cardIcons, ...memoryMatchData.cardIcons];
  return rawPairs
    .map((item, index) => ({ ...item, uniqueId: `${item.type}-${index}` }))
    .sort(() => Math.random() - 0.5);
}

/**
 * GAME B — FIND THE MATCHING HEARTS
 * 6 pairs of romantic symbols (12 cards total) memory matching game
 */
export default function MemoryMatch() {
  const [cards, setCards] = useState(() => generateShuffledDeck());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Re-initialize and shuffle deck
  const initializeGame = useCallback(() => {
    setCards(generateShuffledDeck());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsLocked(false);
  }, []);

  const handleCardClick = (index) => {
    // If locked, already matched, or already flipped, ignore
    if (isLocked) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairs.includes(cards[index].type)) return;

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;
      setFlippedIndices([firstIndex, secondIndex]);
      setMoves((m) => m + 1);

      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.type === secondCard.type) {
        // Matched!
        setMatchedPairs((prev) => [...prev, firstCard.type]);
        setFlippedIndices([]);
      } else {
        // Mismatch, lock and flip back after 900ms
        setIsLocked(true);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const isGameComplete = matchedPairs.length === memoryMatchData.cardIcons.length && cards.length > 0;

  return (
    <div className="game-container">
      {/* Status Bar */}
      <div className="game-status-bar">
        <div className="game-stat-pill">
          <Sparkles size={16} className="game-stat-icon" />
          <span>Pairs: <strong>{matchedPairs.length} / 6</strong></span>
        </div>
        <div className="game-stat-pill">
          <span>Moves: <strong>{moves}</strong></span>
        </div>
        <button
          type="button"
          className="game-reset-mini-btn"
          onClick={initializeGame}
          title="Restart Deck"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Card Grid Area */}
      {!isGameComplete ? (
        <div className="memory-grid">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.type);
            const isMatched = matchedPairs.includes(card.type);

            return (
              <motion.button
                key={card.uniqueId}
                type="button"
                className={`memory-card ${isFlipped ? 'memory-card--flipped' : ''} ${isMatched ? 'memory-card--matched' : ''}`}
                onClick={() => handleCardClick(idx)}
                whileHover={{ scale: isFlipped ? 1 : 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label={isFlipped ? card.label : 'Hidden mystery card'}
              >
                <div className="memory-card__inner">
                  {/* Card Front (Hidden Mystery) */}
                  <div className="memory-card__front">
                    <span className="memory-card__mystery-icon">✨</span>
                  </div>

                  {/* Card Back (Revealed Icon) */}
                  <div className="memory-card__back">
                    <span className="memory-card__symbol">{card.symbol}</span>
                    <span className="memory-card__label">{card.label}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div className="game-ended-overlay">
          <Trophy size={48} className="game-trophy-icon" />
          <h4 className="game-arena-title">All Pairs Matched! ✨</h4>
          <p className="game-arena-desc">
            You completed the puzzle in <strong>{moves} moves</strong>. You have a sharp
            eye and a heart full of intuition!
          </p>
          <p className="game-result-quote">
            “No matter how the cards are dealt, you and I are always a match. ❤️”
          </p>
          <button type="button" className="game-action-btn" onClick={initializeGame}>
            <RotateCcw size={18} />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
