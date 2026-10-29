import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Phase 3 — Journey Screen (Revealed upon clicking "Inka Start Chedama? ❤️")
 *
 * Requirements:
 * - Uses public/assets/aot.PNG as a separate image asset for the later experience
 * - Keeps aspect ratio preserved in the showcase frame
 * - Liquid Glass aesthetic matching the reference image
 */
export default function JourneyView({ onReplay }) {
  const [heroError, setHeroError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="journey-view"
      aria-label="Birthday journey experience"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Background with aot.PNG + rich teal cinematic vignette */}
      <div className="journey-bg">
        <motion.img
          src="/assets/aot.PNG"
          alt="Cinematic landscape"
          className="journey-bg__img"
          initial={{ scale: 1.05 }}
          animate={
            prefersReducedMotion
              ? { scale: 1.0 }
              : {
                  scale: [1.05, 1.01, 1.04],
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  },
                }
          }
        />
        <div className="journey-bg__overlay" />
      </div>

      <div className="journey-content">
        <motion.div
          className="liquid-glass-card liquid-glass-card--journey"
          initial={{
            opacity: 0,
            y: prefersReducedMotion ? 0 : 36,
            scale: prefersReducedMotion ? 1 : 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25,
            },
          }}
        >
          <div className="glass-shine" aria-hidden="true" />

          <h2 className="liquid-glass-card__heading">Our Journey Begins… ✨</h2>
          <p className="journey-content__text">
            This is just the beginning, Manisha. The best parts are still being
            written…
          </p>

          {/* Central image showcase frame preserving aspect ratio */}
          <div className="journey-showcase">
            <div className="journey-showcase__frame">
              {!heroError ? (
                <img
                  src="/assets/aot.PNG"
                  alt="A special moment for Manisha"
                  className="journey-showcase__img"
                  onError={() => setHeroError(true)}
                />
              ) : (
                <div className="journey-showcase__fallback">
                  <span>✨ Our Special Moment ✨</span>
                </div>
              )}
            </div>
          </div>

          <p className="journey-content__subtext">
            More memories, more surprises… coming soon 💫
          </p>

          {/* Action button to replay opening sequence */}
          <div style={{ marginTop: '30px' }}>
            <motion.button
              className="liquid-glass-btn liquid-glass-btn--secondary"
              type="button"
              onClick={onReplay}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            >
              <span className="liquid-glass-btn__text">Replay Opening ↺</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
