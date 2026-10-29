import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gamepad2, X, Heart, Clapperboard, HelpCircle } from 'lucide-react';
import MissionFindMyHeart from './games/MissionFindMyHeart';
import HowWellDoYouKnowUs from './games/HowWellDoYouKnowUs';
import ChooseOurMovieUniverse from './games/ChooseOurMovieUniverse';
import { lockBodyScroll, unlockBodyScroll } from '../utils/lockBodyScroll';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FEATURE THREE — THREE FUNCTIONAL ROMANTIC MINI-GAMES
 * ═══════════════════════════════════════════════════════════════════════════
 * Games:
 * 1. "Mission: Find My Heart" 💗
 * 2. "How Well Do You Know Us?" 🎬
 * 3. "Choose Our Movie Universe" 🎥
 *
 * Robust Modal Architecture:
 * - Separate header, scrollable content area, footer
 * - Zero overlap between titles, questions, progress bars, and buttons
 * - Escape key to close & restores body scroll
 * - Retains Secret #5 trigger
 */
export default function GamesSection({ onDiscoverSecret, discoveredSecretIds = [] }) {
  const [activeGame, setActiveGame] = useState(null); // 'maze' | 'quiz' | 'movie' | null

  const isSecret5Found = discoveredSecretIds.includes('secret-5');

  // Lock body scroll and attach Escape key listener
  useEffect(() => {
    if (activeGame) {
      lockBodyScroll();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveGame(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlockBodyScroll();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeGame]);

  const gamesList = [
    {
      id: 'maze',
      title: 'Mission: Find My Heart',
      subtitle: 'Romantic Mini-Adventure',
      description: 'Guide me through starry mazes and obstacles across three cosmic levels to reach your glowing heart.',
      badge: 'Mini-Adventure',
      icon: Heart,
      color: '#f43f5e',
    },
    {
      id: 'quiz',
      title: 'How Well Do You Know Us?',
      subtitle: 'Relationship Quiz',
      description: 'A 9-question playful quiz about who is more dramatic, who gets angry first, and who gives warmer hugs.',
      badge: 'Couple Quiz',
      icon: HelpCircle,
      color: '#5ce1e6',
    },
    {
      id: 'movie',
      title: 'Choose Our Movie Universe',
      subtitle: 'Cinematic Choice Game',
      description: 'Which fictional universe represents us? Explore Attack on Titan, Stranger Things, Telugu Cinema, and Spider-Man.',
      badge: 'Multiverse Choice',
      icon: Clapperboard,
      color: '#a78bfa',
    },
  ];

  const currentGame = gamesList.find((g) => g.id === activeGame);

  return (
    <section id="games" className="games-section" aria-label="Games Section">
      {/* Header */}
      <div className="section-header">
        <span className="section-eyebrow">
          <Gamepad2 size={14} /> FEATURE THREE &bull; ROMANTIC MINI-GAMES
        </span>

        <div className="section-title-wrap">
          <h2 className="section-title">Games Made For You</h2>

          {/* Hidden Message #5 Trigger */}
          <button
            type="button"
            className={`secret-trigger-btn ${isSecret5Found ? 'secret-trigger-btn--found' : ''}`}
            onClick={() => onDiscoverSecret('secret-5')}
            aria-label={isSecret5Found ? 'Secret 5 discovered' : 'Hidden playful note'}
            title={isSecret5Found ? 'Secret found!' : 'Something playful is hidden here...'}
          >
            <Sparkles size={14} className="secret-star-icon" />
            <span className="secret-pulse-ring" />
          </button>
        </div>

        <p className="section-subtitle">
          Take a sweet break and play these three interactive games crafted to make you smile,
          laugh, and feel how much you are cherished, Manisha!
        </p>
      </div>

      {/* 3 Game Showcase Cards */}
      <div className="games-grid">
        {gamesList.map((game) => {
          const IconComp = game.icon;
          return (
            <div key={game.id} className="game-card">
              <div className="glass-shine" aria-hidden="true" />
              <div className="game-card__header">
                <div
                  className="game-card__icon-wrap"
                  style={{ backgroundColor: `${game.color}22`, borderColor: `${game.color}55` }}
                >
                  <IconComp size={24} style={{ color: game.color }} />
                </div>
                <span className="game-card__badge">{game.badge}</span>
              </div>

              <h3 className="game-card__title">{game.title}</h3>
              <p className="game-card__desc">{game.description}</p>

              <button
                type="button"
                className="game-card__play-btn"
                onClick={() => setActiveGame(game.id)}
              >
                <span>Play Game</span>
                <span className="hero-btn-arrow" aria-hidden="true">&rarr;</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Robust Game Modal Window */}
      <AnimatePresence>
        {activeGame && currentGame && (
          <div
            className="game-modal-backdrop-v2"
            onClick={() => setActiveGame(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-modal-title"
          >
            <motion.div
              className="game-modal-window-v2"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-shine" aria-hidden="true" />

              {/* Strict Separated Header: Zero Overlap */}
              <div className="game-modal-header-v2">
                <div className="game-modal-header-v2__info">
                  <span className="game-modal-header-v2__badge">
                    {currentGame.badge}
                  </span>
                  <h3 id="game-modal-title" className="game-modal-header-v2__title">
                    {currentGame.title}
                  </h3>
                </div>

                <button
                  type="button"
                  className="game-modal-close-btn-v2"
                  onClick={() => setActiveGame(null)}
                  aria-label="Close game modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Strict Separated Scrollable Content */}
              <div className="game-modal-body-v2">
                {activeGame === 'maze' && (
                  <MissionFindMyHeart onClose={() => setActiveGame(null)} />
                )}
                {activeGame === 'quiz' && (
                  <HowWellDoYouKnowUs onClose={() => setActiveGame(null)} />
                )}
                {activeGame === 'movie' && (
                  <ChooseOurMovieUniverse onClose={() => setActiveGame(null)} />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
