import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * PHASE 3 — Journey Placeholder (Next Stage)
 *
 * Displays the cinematic landscape background (/assets/aot.PNG)
 * with a floating liquid glass card containing the journey introduction
 * and the central visual showcase.
 *
 * Props:
 *   - onReplay: () => void — optional callback to restart the opening experience
 */
export default function Journey({ onReplay }) {
  const [bgError, setBgError] = useState(false);
  const [heroError, setHeroError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="journey journey--visible"
      aria-label="Birthday journey"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Cinematic background image layer */}
      <div className={`journey__bg ${bgError ? 'journey__bg--fallback' : ''}`}>
        {!bgError && (
          <motion.img
            src="/assets/aot.PNG"
            alt="A cinematic landscape"
            className="journey__bg-img"
            onError={() => setBgError(true)}
            initial={{ scale: 1.08 }}
            animate={
              prefersReducedMotion
                ? { scale: 1.0 }
                : {
                    scale: [1.08, 1.02, 1.06],
                    transition: {
                      duration: 24,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                    },
                  }
            }
          />
        )}
        <div className="journey__bg-overlay" />
      </div>

      <div className="journey__content">
        <motion.div
          className="journey__glass-card"
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 32,
            scale: prefersReducedMotion ? 1 : 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            },
          }}
        >
          {/* Glass reflection sheen */}
          <div className="glass-card__shine" aria-hidden="true" />

          <h2 className="journey__heading">Our Journey Begins… ✨</h2>
          <p className="journey__text">
            This is just the beginning, Manisha. The best parts are still being
            written…
          </p>

          {/* Central image showcase preserving aspect ratio */}
          <div className="journey__image-showcase">
            <div className={`journey__image-frame ${heroError ? 'journey__image-frame--fallback' : ''}`}>
              {!heroError ? (
                <img
                  src="/assets/aot.PNG"
                  alt="A special moment"
                  className="journey__hero-img"
                  onError={() => setHeroError(true)}
                />
              ) : (
                <div className="journey__fallback-placeholder">
                  <span>✨ Our Special Moment ✨</span>
                </div>
              )}
            </div>
          </div>

          <p className="journey__subtext">
            More memories, more surprises… coming soon 💫
          </p>

          {/* Replay action */}
          {onReplay && (
            <div style={{ marginTop: '28px' }}>
              <motion.button
                className="glass-btn glass-btn--secondary"
                type="button"
                onClick={onReplay}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <span className="glass-btn__text">Replay Opening ↺</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
