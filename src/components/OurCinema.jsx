import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Clapperboard, Film, Sparkles, X, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { cinemaUniverses } from '../data/cinema';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * OUR CINEMA — PARALLEL UNIVERSES 🎞️
 * ═══════════════════════════════════════════════════════════════════════════
 * Replaces the old comic/map experience.
 * Displays four large interactive cinematic glass cards:
 * 1. Eren x Mikasa (Attack on Titan)
 * 2. Mike x Eleven (Stranger Things)
 * 3. Anandan x Rupa (Telugu Cinema)
 * 4. Peter Parker x MJ (Spider-Man)
 */
export default function OurCinema({ onDiscoverSecret, discoveredSecretIds = [] }) {
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const isSecret2Found = discoveredSecretIds.includes('secret-2');

  // Handle escape key to close active modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedUniverse) {
        setSelectedUniverse(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedUniverse]);

  const currentIndex = selectedUniverse
    ? cinemaUniverses.findIndex((u) => u.id === selectedUniverse.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < cinemaUniverses.length - 1) {
      setSelectedUniverse(cinemaUniverses[currentIndex + 1]);
    } else {
      setSelectedUniverse(cinemaUniverses[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedUniverse(cinemaUniverses[currentIndex - 1]);
    } else {
      setSelectedUniverse(cinemaUniverses[cinemaUniverses.length - 1]);
    }
  };

  return (
    <section id="our-cinema" className="cinema-section" aria-label="Our Cinema — Parallel Universes">
      {/* Anchor for backward compatibility with old hero/nav #our-universe */}
      <div id="our-universe" style={{ position: 'relative', top: '-80px' }} />

      <div className="section-header">
        <span className="section-eyebrow">
          <Clapperboard size={14} /> FEATURE ONE &bull; CINEMATIC MULTIVERSE
        </span>

        <div className="section-title-wrap">
          <h2 className="section-title">Our Cinema — Parallel Universes</h2>

          {/* Hidden Message #2 embedded in cinema section */}
          <button
            type="button"
            className={`secret-trigger-btn ${isSecret2Found ? 'secret-trigger-btn--found' : ''}`}
            onClick={() => onDiscoverSecret('secret-2')}
            aria-label={isSecret2Found ? 'Secret 2 discovered' : 'Hidden cinematic whisper'}
            title={isSecret2Found ? 'Secret found!' : 'A whisper between parallel reels...'}
          >
            <Star size={14} className="secret-star-icon" />
            <span className="secret-pulse-ring" />
          </button>
        </div>

        <p className="section-subtitle">
          If our love lived across four different fictional worlds, this is how I would keep
          finding and choosing you, Manisha. Click each universe to step inside.
        </p>
      </div>

      {/* 4 Large Interactive Glass Cards */}
      <div className="cinema-grid">
        {cinemaUniverses.map((universe, idx) => {
          return (
            <motion.div
              key={universe.id}
              className="cinema-card"
              onClick={() => setSelectedUniverse(universe)}
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
              transition={{ duration: 0.25 }}
              style={{
                '--universe-accent': universe.accentColor,
                '--universe-glow': universe.borderGlow,
              }}
            >
              <div className="glass-shine" aria-hidden="true" />

              <div
                className="cinema-card__gradient-bg"
                style={{ background: universe.gradient }}
                aria-hidden="true"
              />

              <div className="cinema-card__header">
                <span className="cinema-card__tag">
                  <Film size={12} /> {universe.cinematicTag}
                </span>
                <span className="cinema-card__symbol" aria-hidden="true">
                  {universe.symbol}
                </span>
              </div>

              <div className="cinema-card__body">
                <span className="cinema-card__badge">{universe.badge}</span>
                <h3 className="cinema-card__pair">{universe.pair}</h3>
                <p className="cinema-card__franchise">{universe.franchise}</p>
                <blockquote className="cinema-card__theme">
                  “{universe.theme}”
                </blockquote>
              </div>

              <div className="cinema-card__footer">
                <span className="cinema-card__cta">
                  Step Inside Story <ArrowRight size={14} />
                </span>
                <span className="cinema-card__num">0{idx + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Detail Modal */}
      <AnimatePresence>
        {selectedUniverse && (
          <div
            className="cinema-modal-backdrop"
            onClick={() => setSelectedUniverse(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cinema-modal-title"
          >
            <motion.div
              className="cinema-modal-window"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                '--universe-accent': selectedUniverse.accentColor,
                '--universe-glow': selectedUniverse.borderGlow,
              }}
            >
              <div className="glass-shine" aria-hidden="true" />

              {/* Modal Header */}
              <div className="cinema-modal-header">
                <div className="cinema-modal-header__left">
                  <span className="cinema-modal-symbol" aria-hidden="true">
                    {selectedUniverse.symbol}
                  </span>
                  <div>
                    <span className="cinema-modal-badge">{selectedUniverse.cinematicTag}</span>
                    <h3 id="cinema-modal-title" className="cinema-modal-title">
                      {selectedUniverse.pair}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  className="star-detail-card__close"
                  onClick={() => setSelectedUniverse(null)}
                  aria-label="Close cinematic universe view"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="cinema-modal-content">
                <div className="cinema-modal-franchise-bar">
                  <span>{selectedUniverse.franchise}</span>
                  <span className="cinema-modal-badge-alt">{selectedUniverse.badge}</span>
                </div>

                {/* Theme banner */}
                <div className="cinema-modal-theme-box">
                  <Sparkles size={18} className="cinema-modal-sparkle" />
                  <p className="cinema-modal-theme-text">
                    “{selectedUniverse.theme}”
                  </p>
                </div>

                {/* Personal romantic reflections */}
                <div className="cinema-modal-reflection">
                  <h4 className="cinema-modal-subheading">
                    Why This Universe Reminds Me of You, Manisha:
                  </h4>
                  {selectedUniverse.personalReflection.map((paragraph, i) => (
                    <p key={i} className="cinema-modal-p">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="cinema-modal-footer">
                <div className="cinema-modal-nav-btns">
                  <button
                    type="button"
                    className="cinema-nav-btn"
                    onClick={handlePrev}
                    aria-label="Previous Universe"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    className="cinema-nav-btn"
                    onClick={handleNext}
                    aria-label="Next Universe"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  className="cinema-done-btn"
                  onClick={() => setSelectedUniverse(null)}
                >
                  Return to Our World
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
