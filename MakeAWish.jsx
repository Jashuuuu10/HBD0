import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sparkles, Heart, Send, RotateCcw } from 'lucide-react';

/**
 * FEATURE FOUR — INTERACTIVE MAKE A WISH
 * Emotional birthday wish-making experience with rising orb animation
 */
export default function MakeAWish() {
  const [step, setStep] = useState('initial'); // 'initial' | 'writing' | 'releasing' | 'released'
  const [wishText, setWishText] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const handleReady = () => {
    setStep('writing');
  };

  const handleRelease = () => {
    setStep('releasing');
    // Animate rising orb for 2.4s, then show blessings
    setTimeout(() => {
      setStep('released');
    }, prefersReducedMotion ? 600 : 2400);
  };

  const handleReset = () => {
    setWishText('');
    setStep('initial');
  };

  return (
    <section id="make-a-wish" className="wish-section" aria-label="Make a Wish Section">
      <div className="section-header">
        <span className="section-eyebrow">
          <Moon size={14} /> FEATURE FOUR &bull; BIRTHDAY WISH
        </span>
        <h2 className="section-title">A Wishing Well in the Stars</h2>
      </div>

      <div className="wish-card-container">
        <div className="wish-glass-card">
          <div className="glass-shine" aria-hidden="true" />

          {/* Step 1: Initial Prompt */}
          {step === 'initial' && (
            <motion.div
              className="wish-step-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="wish-moon-orb" aria-hidden="true">
                <Moon size={40} className="wish-moon-icon" />
                <div className="wish-moon-glow" />
              </div>

              <h3 className="wish-heading">Make a Wish, Manisha 🌙</h3>
              <p className="wish-instructions">
                Close your eyes for a moment. Think of something your heart wishes for.
              </p>

              <button
                type="button"
                className="wish-ready-btn"
                onClick={handleReady}
              >
                <span>I'm Ready ✨</span>
              </button>
            </motion.div>
          )}

          {/* Step 2: Writing Wish (Optional Textarea) */}
          {step === 'writing' && (
            <motion.div
              className="wish-step-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="wish-star-glow" aria-hidden="true" />
              <h3 className="wish-heading">Whisper it to the Night</h3>
              <p className="wish-subtext">
                You can write your wish below, or simply keep it in your heart.
              </p>

              <div className="wish-textarea-wrap">
                <textarea
                  className="wish-textarea"
                  placeholder="Write your wish here, if you want..."
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  rows={4}
                  maxLength={500}
                />
              </div>

              <div className="wish-actions-row">
                <button
                  type="button"
                  className="wish-release-btn"
                  onClick={handleRelease}
                >
                  <Send size={16} />
                  <span>Release My Wish</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Rising Orb Animation */}
          {step === 'releasing' && (
            <div className="wish-releasing-stage" aria-live="polite">
              <motion.div
                className="wish-rising-orb"
                initial={{ y: 80, scale: 0.8, opacity: 1 }}
                animate={{
                  y: prefersReducedMotion ? -30 : -220,
                  scale: [0.8, 1.4, 0.4],
                  opacity: [1, 0.9, 0],
                }}
                transition={{ duration: 2.3, ease: 'easeOut' }}
              >
                <Heart size={36} fill="#5ce1e6" color="#ffffff" />
                <div className="wish-orb-halo" />
              </motion.div>
              <p className="wish-releasing-text">Releasing your wish to the stars...</p>
            </div>
          )}

          {/* Step 4: Released Blessing Revealed */}
          {step === 'released' && (
            <motion.div
              className="wish-step-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="wish-released-badge">
                <Sparkles size={24} className="wish-sparkle-icon" />
              </div>

              <h3 className="wish-blessing-one">
                May life bring beautiful things to your heart. ❤️
              </h3>

              <div className="wish-blessing-two-card">
                <p className="wish-blessing-two">
                  “And if I could make one wish too, it would be for more beautiful days with you.”
                </p>
              </div>

              <button
                type="button"
                className="wish-again-btn"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                <span>Make Another Wish</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
