import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { findMyHeartLevels, findMyHeartVictoryMessage } from '../../data/games';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GAME A — MISSION: FIND MY HEART 💗
 * ═══════════════════════════════════════════════════════════════════════════
 * Romantic maze mini-adventure:
 * - 3 levels with increasing complexity
 * - Player avatar navigating cosmic obstacles toward glowing heart
 * - Keyboard (Arrows / WASD) + Mobile Touch D-pad
 * - Timer, pause, restart, victory reveal
 */
export default function MissionFindMyHeart({ onClose: _onClose }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameState, setGameState] = useState('intro'); // 'intro' | 'playing' | 'paused' | 'level-win' | 'victory'
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [movesCount, setMovesCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const currentLevel = findMyHeartLevels[levelIndex] || findMyHeartLevels[0];
  const timerRef = useRef(null);

  // Initialize level position
  const initLevel = useCallback((lvlIdx) => {
    const lvl = findMyHeartLevels[lvlIdx];
    if (lvl) {
      setPlayerPos({ ...lvl.start });
      setMovesCount(0);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Start / restart game
  const handleStartGame = () => {
    setLevelIndex(0);
    setSeconds(0);
    initLevel(0);
    setGameState('playing');
  };

  const handleRestartCurrentLevel = () => {
    initLevel(levelIndex);
    setGameState('playing');
  };

  // Movement logic with collision detection
  const movePlayer = useCallback(
    (dx, dy) => {
      if (gameState !== 'playing') return;

      setPlayerPos((prev) => {
        const newX = prev.x + dx;
        const newY = prev.y + dy;
        const grid = currentLevel.grid;

        // Boundary check
        if (
          newY < 0 ||
          newY >= grid.length ||
          newX < 0 ||
          newX >= grid[0].length
        ) {
          return prev;
        }

        // Wall collision check (1 = wall)
        if (grid[newY][newX] === 1) {
          return prev;
        }

        // Check if reached heart
        if (newX === currentLevel.heart.x && newY === currentLevel.heart.y) {
          // Reached the heart!
          if (levelIndex < findMyHeartLevels.length - 1) {
            setTimeout(() => {
              setGameState('level-win');
            }, 150);
          } else {
            setTimeout(() => {
              setGameState('victory');
            }, 150);
          }
        }

        setMovesCount((m) => m + 1);
        return { x: newX, y: newY };
      });
    },
    [gameState, currentLevel, levelIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, gameState]);

  // Next level handler
  const handleNextLevel = () => {
    const nextLvl = levelIndex + 1;
    setLevelIndex(nextLvl);
    initLevel(nextLvl);
    setGameState('playing');
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="maze-game-container">
      {/* Game Status Bar */}
      <div className="maze-status-bar">
        <div className="maze-stat-group">
          <span className="maze-stat-pill">
            <Sparkles size={14} className="maze-stat-icon" />
            Level: <strong>{levelIndex + 1} of {findMyHeartLevels.length}</strong>
          </span>
          <span className="maze-stat-pill">
            Time: <strong>{formatTime(seconds)}</strong>
          </span>
          <span className="maze-stat-pill">
            Moves: <strong>{movesCount}</strong>
          </span>
        </div>

        <div className="maze-controls-top">
          {gameState === 'playing' && (
            <button
              type="button"
              className="maze-btn-mini"
              onClick={() => setGameState('paused')}
              title="Pause Game"
            >
              <Pause size={14} />
              <span>Pause</span>
            </button>
          )}

          {gameState === 'paused' && (
            <button
              type="button"
              className="maze-btn-mini"
              onClick={() => setGameState('playing')}
              title="Resume Game"
            >
              <Play size={14} />
              <span>Resume</span>
            </button>
          )}

          <button
            type="button"
            className="maze-btn-mini"
            onClick={handleRestartCurrentLevel}
            title="Restart Level"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Arena / Maze View */}
      <div className="maze-arena-wrap">
        {/* Intro Overlay */}
        {gameState === 'intro' && (
          <div className="maze-overlay">
            <div className="maze-overlay-card">
              <div className="maze-intro-heart">
                <Heart size={44} fill="#f43f5e" color="#fecdd3" />
              </div>
              <h3 className="maze-overlay-title">Mission: Find My Heart</h3>
              <p className="maze-overlay-desc">
                Navigate me through the cosmic stars and winding paths to reach your glowing heart,
                Manisha! Use Arrow keys or WASD on desktop, or the on-screen controls below.
              </p>
              <button
                type="button"
                className="hero-btn-primary-v2"
                onClick={handleStartGame}
              >
                <Play size={18} />
                <span>Start Adventure ✨</span>
              </button>
            </div>
          </div>
        )}

        {/* Paused Overlay */}
        {gameState === 'paused' && (
          <div className="maze-overlay">
            <div className="maze-overlay-card">
              <h3 className="maze-overlay-title">Game Paused</h3>
              <p className="maze-overlay-desc">Take a breath. Your heart is waiting!</p>
              <button
                type="button"
                className="hero-btn-primary-v2"
                onClick={() => setGameState('playing')}
              >
                <Play size={18} />
                <span>Resume Journey</span>
              </button>
            </div>
          </div>
        )}

        {/* Level Complete Overlay */}
        {gameState === 'level-win' && (
          <div className="maze-overlay">
            <div className="maze-overlay-card">
              <Sparkles size={40} className="maze-win-star" />
              <h3 className="maze-overlay-title">Path Discovered! ✨</h3>
              <p className="maze-overlay-desc">
                You successfully crossed {currentLevel.title}! One step closer to my entire heart.
              </p>
              <button
                type="button"
                className="hero-btn-primary-v2"
                onClick={handleNextLevel}
              >
                <span>Enter Level {levelIndex + 2} &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* Final Victory Overlay */}
        {gameState === 'victory' && (
          <div className="maze-overlay">
            <div className="maze-overlay-card maze-overlay-card--victory">
              <div className="maze-victory-halo">
                <Heart size={48} fill="#f43f5e" color="#fecdd3" />
              </div>
              <span className="maze-victory-badge">MISSION COMPLETE ❤️</span>
              <h3 className="maze-overlay-title">You Found My Heart!</h3>
              <div className="maze-victory-quote-box">
                <p className="maze-victory-quote">
                  “{findMyHeartVictoryMessage}”
                </p>
              </div>
              <p className="maze-victory-stats">
                Completed in <strong>{formatTime(seconds)}</strong> with{' '}
                <strong>{movesCount}</strong> total moves.
              </p>
              <button
                type="button"
                className="hero-btn-primary-v2"
                onClick={handleStartGame}
              >
                <RotateCcw size={18} />
                <span>Play Adventure Again</span>
              </button>
            </div>
          </div>
        )}

        {/* The Starry Maze Grid */}
        <div
          className="maze-grid"
          style={{
            gridTemplateColumns: `repeat(${currentLevel.gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${currentLevel.gridSize.rows}, 1fr)`,
          }}
        >
          {currentLevel.grid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isWall = cell === 1;
              const isPlayer = playerPos.x === cIdx && playerPos.y === rIdx;
              const isHeart = currentLevel.heart.x === cIdx && currentLevel.heart.y === rIdx;

              return (
                <div
                  key={`cell-${rIdx}-${cIdx}`}
                  className={`maze-cell ${isWall ? 'maze-cell--wall' : 'maze-cell--path'}`}
                >
                  {/* Cosmic Stardust in Walls */}
                  {isWall && <div className="maze-wall-spark" />}

                  {/* Player Avatar */}
                  {isPlayer && (
                    <motion.div
                      className="maze-player"
                      layoutId="mazePlayer"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <span className="maze-player-avatar" title="Me searching for you">
                        🚀
                      </span>
                      <span className="maze-player-glow" />
                    </motion.div>
                  )}

                  {/* Goal: Glowing Heart for Manisha */}
                  {isHeart && (
                    <div className="maze-heart-goal">
                      <Heart size={20} fill="#f43f5e" color="#fecdd3" className="maze-heart-icon" />
                      <span className="maze-heart-pulse-ring" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* On-Screen Mobile Touch D-Pad Controls */}
      <div className="maze-mobile-dpad" aria-label="Touch Navigation Controls">
        <div className="maze-dpad-row">
          <button
            type="button"
            className="maze-dpad-btn maze-dpad-up"
            onClick={() => movePlayer(0, -1)}
            aria-label="Move Up"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        <div className="maze-dpad-row maze-dpad-mid">
          <button
            type="button"
            className="maze-dpad-btn maze-dpad-left"
            onClick={() => movePlayer(-1, 0)}
            aria-label="Move Left"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="maze-dpad-center">
            <Heart size={14} className="maze-dpad-center-icon" />
          </div>
          <button
            type="button"
            className="maze-dpad-btn maze-dpad-right"
            onClick={() => movePlayer(1, 0)}
            aria-label="Move Right"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="maze-dpad-row">
          <button
            type="button"
            className="maze-dpad-btn maze-dpad-down"
            onClick={() => movePlayer(0, 1)}
            aria-label="Move Down"
          >
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
