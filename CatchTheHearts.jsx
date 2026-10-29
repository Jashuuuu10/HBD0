import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, RotateCcw, Timer, Trophy } from 'lucide-react';
import { catchTheHeartsData } from '../data/games';

/**
 * GAME A — CATCH THE HEARTS
 * 20-second controlled game where user catches falling hearts
 */
export default function CatchTheHearts() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'ended'
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [collectedEffect, setCollectedEffect] = useState(null);

  const heartIdCounter = useRef(0);
  const effectCounter = useRef(0);
  const spawnTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  // Stop and clean up all timers
  const clearTimers = useCallback(() => {
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const startGame = () => {
    clearTimers();
    setScore(0);
    setTimeLeft(20);
    setFallingHearts([]);
    setGameState('playing');

    // Countdown timer
    countdownTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimers();
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn falling hearts periodically
    spawnTimerRef.current = setInterval(() => {
      heartIdCounter.current += 1;
      const newHeart = {
        id: heartIdCounter.current,
        left: Math.floor(Math.random() * 80) + 10, // 10% to 90%
        speed: 2.2 + Math.random() * 1.5,
        size: 24 + Math.random() * 16,
      };

      setFallingHearts((current) => [...current.slice(-12), newHeart]);
    }, 700);
  };

  const handleCatchHeart = (heartId, e) => {
    e.stopPropagation();
    setScore((prev) => prev + 1);

    // Trigger visual pop effect
    const rect = e.currentTarget.getBoundingClientRect();
    effectCounter.current += 1;
    setCollectedEffect({ x: rect.left, y: rect.top, id: effectCounter.current });
    setTimeout(() => setCollectedEffect(null), 600);

    // Remove caught heart
    setFallingHearts((current) => current.filter((h) => h.id !== heartId));
  };

  const getResultFeedback = (finalScore) => {
    for (const fb of catchTheHeartsData.scoreFeedback) {
      if (finalScore >= fb.min && finalScore <= fb.max) {
        return fb.text;
      }
    }
    return 'You caught my heart! ❤️';
  };

  return (
    <div className="game-container">
      {/* Game Header Bar */}
      <div className="game-status-bar">
        <div className="game-stat-pill">
          <Timer size={16} className="game-stat-icon" />
          <span>Time: <strong>{timeLeft}s</strong></span>
        </div>
        <div className="game-stat-pill">
          <Heart size={16} className="game-stat-icon" />
          <span>Hearts: <strong>{score}</strong></span>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="game-catch-arena">
        {gameState === 'idle' && (
          <div className="game-idle-overlay">
            <Heart size={48} className="game-idle-heart" />
            <h4 className="game-arena-title">Catch The Hearts!</h4>
            <p className="game-arena-desc">
              Hearts will float down from above. Tap or click as many as you can before the 20-second timer runs out!
            </p>
            <button type="button" className="game-action-btn" onClick={startGame}>
              <Play size={18} />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="game-falling-area">
            {fallingHearts.map((heart) => (
              <motion.button
                key={heart.id}
                type="button"
                className="falling-heart-btn"
                style={{
                  left: `${heart.left}%`,
                  width: `${heart.size}px`,
                  height: `${heart.size}px`,
                }}
                initial={{ top: '-10%', opacity: 1, scale: 0.8 }}
                animate={{ top: '95%', opacity: 0.9, scale: 1 }}
                transition={{ duration: heart.speed, ease: 'linear' }}
                onAnimationComplete={() => {
                  setFallingHearts((current) =>
                    current.filter((h) => h.id !== heart.id)
                  );
                }}
                onClick={(e) => handleCatchHeart(heart.id, e)}
                aria-label="Catch floating heart"
              >
                <Heart size={heart.size} fill="#f43f5e" color="#fda4af" />
              </motion.button>
            ))}

            {/* Little pop indicator */}
            {collectedEffect && (
              <div
                className="collected-heart-pop"
                style={{ left: collectedEffect.x, top: collectedEffect.y }}
              >
                +1 ❤️
              </div>
            )}
          </div>
        )}

        {gameState === 'ended' && (
          <div className="game-ended-overlay">
            <Trophy size={48} className="game-trophy-icon" />
            <h4 className="game-arena-title">Time's Up!</h4>
            <div className="game-final-score">
              <span>You Caught</span>
              <strong>{score} Hearts</strong>
            </div>
            <p className="game-result-quote">{getResultFeedback(score)}</p>
            <button type="button" className="game-action-btn" onClick={startGame}>
              <RotateCcw size={18} />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
