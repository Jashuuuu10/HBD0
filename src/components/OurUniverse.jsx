import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, X, Sparkles, Check, Info } from 'lucide-react';
import { universeStars } from '../data/universe';

/**
 * FEATURE ONE — INTERACTIVE OUR UNIVERSE
 * Interactive Star Map with constellation lines and detail cards
 */
export default function OurUniverse({
  visitedStarIds = [],
  onVisitStar,
  onDiscoverSecret,
  discoveredSecretIds = [],
}) {
  const [selectedStar, setSelectedStar] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const isSecret2Found = discoveredSecretIds.includes('secret-2');

  // Handle escape key to close star detail card
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedStar) {
        setSelectedStar(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStar]);

  const handleStarClick = (star) => {
    setSelectedStar(star);
    onVisitStar(star.id);
    if (showHint) setShowHint(false);
  };

  const discoveredCount = visitedStarIds.length;
  const totalStars = universeStars.length;

  return (
    <section id="our-universe" className="universe-section" aria-label="Interactive Our Universe">
      <div className="section-header">
        <span className="section-eyebrow">
          <Sparkles size={14} /> FEATURE ONE &bull; COSMIC MAP
        </span>
        <h2 className="section-title">Our Interactive Universe</h2>
        <p className="section-subtitle">
          Six guiding stars illuminate our journey. Click or tap each star to read its
          tucked-away message.
        </p>

        {/* Discovery Progress Meter */}
        <div className="universe-progress-bar-wrap">
          <div className="universe-progress-text">
            <span>Progress: <strong>{discoveredCount} of {totalStars}</strong> stars discovered</span>
            {discoveredCount === totalStars && (
              <span className="universe-completed-badge">All Discovered! ✨</span>
            )}
          </div>
          <div className="universe-progress-track">
            <div
              className="universe-progress-fill"
              style={{ width: `${(discoveredCount / totalStars) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* First-visit hint banner */}
      {showHint && discoveredCount < 2 && (
        <div className="universe-hint-toast">
          <Info size={16} />
          <span>Tap any glowing star below to discover what it holds...</span>
          <button
            type="button"
            className="universe-hint-close"
            onClick={() => setShowHint(false)}
            aria-label="Dismiss hint"
          >
            &times;
          </button>
        </div>
      )}

      {/* Star Map Canvas Container */}
      <div className="universe-canvas-container">
        {/* Constellation SVG Lines connecting the stars */}
        <svg className="constellation-svg" aria-hidden="true">
          <defs>
            <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(92, 225, 230, 0.45)" />
              <stop offset="50%" stopColor="rgba(45, 212, 168, 0.6)" />
              <stop offset="100%" stopColor="rgba(167, 139, 250, 0.45)" />
            </linearGradient>
          </defs>
          {universeStars.map((star, idx) => {
            if (idx === universeStars.length - 1) return null;
            const nextStar = universeStars[idx + 1];
            return (
              <line
                key={`line-${star.id}-${nextStar.id}`}
                x1={`${star.x}%`}
                y1={`${star.y}%`}
                x2={`${nextStar.x}%`}
                y2={`${nextStar.y}%`}
                stroke="url(#constellationGrad)"
                strokeWidth="1.6"
                strokeDasharray="4 6"
                className={prefersReducedMotion ? '' : 'constellation-line'}
              />
            );
          })}
        </svg>

        {/* Clickable Star Buttons */}
        {universeStars.map((star, idx) => {
          const isVisited = visitedStarIds.includes(star.id);
          const isSelected = selectedStar?.id === star.id;

          return (
            <div
              key={star.id}
              className="star-wrapper"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
            >
              <button
                type="button"
                className={`star-button ${isVisited ? 'star-button--visited' : ''} ${isSelected ? 'star-button--selected' : ''}`}
                onClick={() => handleStarClick(star)}
                aria-label={`Star ${idx + 1}: ${star.title}. ${isVisited ? 'Already visited.' : 'Not yet visited.'}`}
                aria-expanded={isSelected}
              >
                <div
                  className="star-button__glow"
                  style={{ backgroundColor: star.color }}
                  aria-hidden="true"
                />
                <Star
                  size={isVisited ? 18 : 22}
                  className="star-button__icon"
                  style={{ color: isVisited ? '#2dd4a8' : star.color }}
                />
                {isVisited && (
                  <span className="star-button__check" aria-hidden="true">
                    <Check size={10} />
                  </span>
                )}
              </button>

              <span className="star-label-badge">{star.title}</span>
            </div>
          );
        })}

        {/* Hidden Message #2 embedded in constellation space */}
        <div className="secret-2-wrapper" style={{ left: '46%', top: '48%' }}>
          <button
            type="button"
            className={`secret-trigger-btn ${isSecret2Found ? 'secret-trigger-btn--found' : ''}`}
            onClick={() => onDiscoverSecret('secret-2')}
            aria-label={isSecret2Found ? 'Secret 2 discovered' : 'Hidden cosmic whisper'}
            title={isSecret2Found ? 'Secret found!' : 'A faint shimmer in the sky...'}
          >
            <Sparkles size={14} className="secret-star-icon" />
            <span className="secret-pulse-ring" />
          </button>
        </div>
      </div>

      {/* Star Detail Modal Card */}
      <AnimatePresence>
        {selectedStar && (
          <div
            className="star-modal-backdrop"
            onClick={() => setSelectedStar(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="star-modal-title"
          >
            <motion.div
              className="star-detail-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-shine" aria-hidden="true" />

              <button
                type="button"
                className="star-detail-card__close"
                onClick={() => setSelectedStar(null)}
                aria-label="Close star details"
              >
                <X size={18} />
              </button>

              <div className="star-detail-card__icon-wrap">
                <Star size={28} style={{ color: selectedStar.color }} />
              </div>

              <h3 id="star-modal-title" className="star-detail-card__title">
                {selectedStar.title}
              </h3>
              <p className="star-detail-card__subtitle">
                {selectedStar.subtitle}
              </p>

              <div className="star-detail-card__quote-box">
                <p className="star-detail-card__quote">
                  “{selectedStar.message}”
                </p>
              </div>

              <div className="star-detail-card__footer">
                <span className="star-detail-card__status">
                  ✓ Star recorded in your universe
                </span>
                <button
                  type="button"
                  className="star-detail-card__done-btn"
                  onClick={() => setSelectedStar(null)}
                >
                  Continue Exploring ✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
