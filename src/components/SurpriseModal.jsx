import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles, X, Cake, RotateCcw, Wind } from 'lucide-react';
import { lockBodyScroll, unlockBodyScroll } from '../utils/lockBodyScroll';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TWO-STAGE CINEMATIC SURPRISE EXPERIENCE 🎁
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STAGE 1 — THE PERSONAL MESSAGE
 * - Dark cinematic overlay with floating stars & pulsing heart
 * - Exact romantic message revealed paragraph by paragraph
 * - Button: "One Last Surprise 🎂" -> transitions to Stage 2
 * - Secret #8 trigger preserved
 *
 * STAGE 2 — THE BIRTHDAY CAKE 🎂
 * - Illustrated birthday cake with frosting layers and 5 glowing candles
 * - Clicking/tapping individual candles turns them off with flame fade/shrink
 * - "Blow Out All Candles 💨" button
 * - Space/Enter keyboard support when focused
 * - When all candles off -> celebration burst of stars, hearts & final message
 * - "Celebrate Again" to relight candles and replay
 */
export default function SurpriseModal({
  isOpen,
  onClose,
  onDiscoverSecret,
  discoveredSecretIds = [],
}) {
  const [surpriseStage, setSurpriseStage] = useState(1); // 1: Personal Letter | 2: Cake
  const [candles, setCandles] = useState([true, true, true, true, true]); // 5 candles, true = lit
  const [celebrationFired, setCelebrationFired] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const isSecret8Found = discoveredSecretIds.includes('secret-8');
  const cakeContainerRef = useRef(null);

  // Reset when modal closes or opens
  const handleClose = useCallback(() => {
    setSurpriseStage(1);
    setCandles([true, true, true, true, true]);
    setCelebrationFired(false);
    onClose();
  }, [onClose]);

  // Lock scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlockBodyScroll();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClose]);

  const handleRelight = () => {
    setCandles([true, true, true, true, true]);
    setCelebrationFired(false);
  };

  // Turn off a specific candle
  const blowOutCandle = (index) => {
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Blow out all candles
  const blowOutAllCandles = () => {
    setCandles([false, false, false, false, false]);
  };

  // Check if all candles are extinguished
  const allCandlesOff = candles.every((c) => !c);

  useEffect(() => {
    if (allCandlesOff && !celebrationFired) {
      const timer = setTimeout(() => {
        setCelebrationFired(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allCandlesOff, celebrationFired]);

  // Keyboard accessibility for blowing out candles when in Stage 2
  const handleCakeKeyDown = (e) => {
    if (surpriseStage === 2 && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      // Blow out first lit candle, or all if only one left
      const firstLitIdx = candles.findIndex((c) => c);
      if (firstLitIdx !== -1) {
        blowOutCandle(firstLitIdx);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="surprise-overlay-v2"
      role="dialog"
      aria-modal="true"
      aria-label="Final Cinematic Surprise"
    >
      {/* Background ambient stars */}
      <div className="surprise-starfield" aria-hidden="true">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="surprise-star-dot"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 8) % 100}%`,
              animationDelay: `${(i % 6) * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Top Close Control */}
      <button
        type="button"
        className="surprise-close-btn-v2"
        onClick={handleClose}
        aria-label="Close surprise"
      >
        <X size={22} />
      </button>

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 1: THE PERSONAL MESSAGE
         ═══════════════════════════════════════════════════════════════════ */}
      {surpriseStage === 1 && (
        <motion.div
          key="stage-1"
          className="surprise-content-box-v2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-shine" aria-hidden="true" />

          {/* Glowing Central Heart */}
          <motion.div
            className="surprise-heart-halo-v2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.0 }}
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : { scale: [1, 1.12, 1] }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart size={44} fill="#f43f5e" color="#fecdd3" />
            </motion.div>
          </motion.div>

          <span className="surprise-stage-badge">A LETTER ACROSS MULTIVERSES</span>

          {/* Staggered Romantic Letter */}
          <div className="surprise-paragraphs-container">
            <motion.p
              className="surprise-p-lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Manisha, if I could step into a thousand different movie worlds, I would still look
              for you in every single one.
            </motion.p>

            <motion.div
              className="surprise-parallel-box"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <p className="surprise-parallel-line">
                <span className="surprise-line-symbol">🧣</span>
                If you were Mikasa, I would be your Eren.
              </p>
              <p className="surprise-parallel-line">
                <span className="surprise-line-symbol">📻</span>
                If you were Eleven, I would be your Mike.
              </p>
              <p className="surprise-parallel-line">
                <span className="surprise-line-symbol">🌸</span>
                If you were Rupa, I would want to be your Anandan.
              </p>
              <p className="surprise-parallel-line">
                <span className="surprise-line-symbol">🕸️</span>
                And if you were MJ, I would happily be your Peter Parker.
              </p>
            </motion.div>

            <motion.p
              className="surprise-p"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Different stories, different universes, but the same little wish in every one of
              them: to find you, understand you, make you smile, and keep choosing you.
            </motion.p>

            <motion.p
              className="surprise-p"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              You are not just my favourite part of a story. You are the person who makes my own
              life feel like a story worth remembering.
            </motion.p>

            <motion.p
              className="surprise-p-climax"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              Happy Birthday, my beautiful Manisha. ❤️
            </motion.p>
          </div>

          {/* Secret #8 Trigger */}
          <div className="surprise-secret-wrap-v2">
            <button
              type="button"
              className={`secret-trigger-btn ${isSecret8Found ? 'secret-trigger-btn--found' : ''}`}
              onClick={() => onDiscoverSecret('secret-8')}
              aria-label={isSecret8Found ? 'Final Secret discovered' : 'Hidden cosmic secret'}
              title={isSecret8Found ? 'Final Secret discovered!' : 'A secret in the climax...'}
            >
              <Sparkles size={16} className="secret-star-icon" />
              <span className="secret-pulse-ring" />
            </button>
          </div>

          {/* Transition Button to Stage 2 */}
          <motion.div
            className="surprise-stage1-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <button
              type="button"
              className="hero-btn-primary-v2 surprise-cta-btn"
              onClick={() => setSurpriseStage(2)}
            >
              <Cake size={18} />
              <span>One Last Surprise 🎂</span>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 2: THE BIRTHDAY CAKE SCENE 🎂
         ═══════════════════════════════════════════════════════════════════ */}
      {surpriseStage === 2 && (
        <motion.div
          key="stage-2"
          className="surprise-cake-container"
          ref={cakeContainerRef}
          tabIndex={0}
          onKeyDown={handleCakeKeyDown}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-shine" aria-hidden="true" />

          {/* Ambient Cake Glow */}
          <div className="cake-ambient-glow" aria-hidden="true" />

          <span className="cake-top-prompt">
            Make a little wish, Manisha…
          </span>

          <h3 className="cake-main-title">
            {allCandlesOff ? 'Your Wish Has Been Made! ✨' : 'Blow Out The Candles ✨'}
          </h3>

          <p className="cake-sub-instruction">
            {allCandlesOff
              ? 'All candles blown! May your dreams come true.'
              : 'Tap the candles to blow them out ✨ (or click Blow Out All)'}
          </p>

          {/* Interactive Illustrated Birthday Cake */}
          <div className="cake-illustration-wrapper">
            {/* Candles Row */}
            <div className="cake-candles-row" role="group" aria-label="Birthday candles">
              {candles.map((isLit, idx) => (
                <button
                  key={`candle-${idx}`}
                  type="button"
                  className={`cake-candle-unit ${isLit ? 'cake-candle-unit--lit' : 'cake-candle-unit--out'}`}
                  onClick={() => blowOutCandle(idx)}
                  aria-label={`Candle ${idx + 1}: ${isLit ? 'Lit. Click to blow out.' : 'Extinguished.'}`}
                  disabled={!isLit}
                >
                  {/* Flame with Glow */}
                  <div className="candle-flame-wrapper">
                    <div className={`candle-flame ${isLit ? 'candle-flame--active' : 'candle-flame--smoke'}`}>
                      <span className="candle-flame-inner" />
                    </div>
                    {isLit && <div className="candle-flame-glow" />}
                  </div>

                  {/* Candle Wick */}
                  <div className="candle-wick" />

                  {/* Candle Body */}
                  <div
                    className="candle-stick"
                    style={{
                      background: `repeating-linear-gradient(45deg, #f43f5e, #f43f5e 4px, #ffffff 4px, #ffffff 8px)`,
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Cake Tiers (Illustrated with pure SVG & CSS) */}
            <div className="cake-tier cake-tier--top">
              <div className="cake-frosting-drips">
                <span className="frosting-drip" />
                <span className="frosting-drip" />
                <span className="frosting-drip" />
                <span className="frosting-drip" />
                <span className="frosting-drip" />
              </div>
              <div className="cake-sprinkles" aria-hidden="true">
                <span className="sprinkle sprinkle-1" />
                <span className="sprinkle sprinkle-2" />
                <span className="sprinkle sprinkle-3" />
              </div>
            </div>

            <div className="cake-tier cake-tier--middle">
              <div className="cake-ribbon">
                <span>MANISHA ❤️</span>
              </div>
            </div>

            <div className="cake-tier cake-tier--bottom">
              <div className="cake-bottom-decor">
                <Heart size={14} fill="#f43f5e" color="#f43f5e" />
                <Heart size={16} fill="#5ce1e6" color="#5ce1e6" />
                <Heart size={14} fill="#a78bfa" color="#a78bfa" />
              </div>
            </div>

            {/* Cake Plate Stand */}
            <div className="cake-plate" />
            <div className="cake-plate-base" />
          </div>

          {/* Cake Control Buttons */}
          <div className="cake-controls-row">
            {!allCandlesOff && (
              <button
                type="button"
                className="cake-blow-btn"
                onClick={blowOutAllCandles}
              >
                <Wind size={18} />
                <span>Blow Out All Candles 💨</span>
              </button>
            )}

            {allCandlesOff && (
              <button
                type="button"
                className="cake-relight-btn"
                onClick={handleRelight}
              >
                <RotateCcw size={16} />
                <span>Celebrate Again 🎂</span>
              </button>
            )}

            <button
              type="button"
              className="cake-return-btn"
              onClick={handleClose}
            >
              <span>Back to Website</span>
            </button>
          </div>

          {/* Celebratory Particles & Final Reveal Message */}
          <AnimatePresence>
            {allCandlesOff && (
              <motion.div
                className="cake-celebration-reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Floating particle sparkles */}
                <div className="celebration-particles" aria-hidden="true">
                  {[...Array(16)].map((_, i) => (
                    <span
                      key={i}
                      className="celebration-particle"
                      style={{
                        left: `${5 + i * 6}%`,
                        top: `${(i % 4) * 25}%`,
                        animationDelay: `${(i % 5) * 0.3}s`,
                      }}
                    >
                      {i % 2 === 0 ? '✨' : '❤️'}
                    </span>
                  ))}
                </div>

                <div className="cake-final-card">
                  <div className="cake-final-heart-halo">
                    <Heart size={36} fill="#f43f5e" color="#fecdd3" />
                  </div>

                  <h4 className="cake-final-heading">Make a wish, my love. ❤️</h4>

                  <p className="cake-final-p">
                    No matter what this new year of your life brings, I hope it brings you more
                    reasons to smile, more courage to chase your dreams, and more moments that
                    remind you how deeply you are loved.
                  </p>

                  <p className="cake-final-p">
                    And if I get to be part of even a few of those moments, I’ll be grateful.
                  </p>

                  <p className="cake-final-signature">
                    Happy Birthday, Manisha. You’ll always have a special place in my heart. ❤️
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
