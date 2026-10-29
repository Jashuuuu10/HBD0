import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, HelpCircle, X, Heart } from 'lucide-react';
import { hiddenMessages } from '../data/messages';

/**
 * FEATURE TWO — HIDDEN ROMANTIC MESSAGES OVERVIEW & DRAWER
 * Tracks and displays discovered secrets, provides hints and random reveals
 */
export default function HiddenMessages({
  discoveredSecretIds = [],
  onDiscoverSecret,
  activeSecretModal,
  onCloseSecretModal,
}) {
  const [showAllDiscovered, setShowAllDiscovered] = useState(false);
  const [hintMessage, setHintMessage] = useState(null);

  const discoveredCount = discoveredSecretIds.length;
  const totalSecrets = hiddenMessages.length;

  const handleRevealRandom = () => {
    // Find unrevealed secrets
    const unrevealed = hiddenMessages.filter(
      (m) => !discoveredSecretIds.includes(m.id)
    );

    if (unrevealed.length === 0) {
      setHintMessage('You have already uncovered every secret in our universe! ❤️');
      return;
    }

    const randomSecret = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    onDiscoverSecret(randomSecret.id);
  };

  return (
    <section id="hidden-messages" className="hidden-messages-section" aria-label="Hidden Secrets Section">
      <div className="section-header">
        <span className="section-eyebrow">
          <Sparkles size={14} /> FEATURE TWO &bull; HIDDEN ROMANTIC MESSAGES
        </span>
        <h2 className="section-title">Little Secrets For You</h2>
        <p className="section-subtitle">
          Small romantic whispers are scattered across this universe. Look out for faint
          glowing hearts and stars as you explore!
        </p>

        {/* Progress Display */}
        <div className="secrets-tracker-card">
          <div className="secrets-tracker-info">
            <span className="secrets-tracker-count">
              <strong>{discoveredCount} of {totalSecrets}</strong> little secrets found
            </span>
            <span className="secrets-tracker-sub">
              {discoveredCount === totalSecrets
                ? 'All secrets discovered! My heart is completely yours. ❤️'
                : 'Keep exploring to find the remaining treasures...'}
            </span>
          </div>

          <div className="secrets-tracker-actions">
            <button
              type="button"
              className="secrets-btn-secondary"
              onClick={() => setShowAllDiscovered(true)}
              disabled={discoveredCount === 0}
            >
              <Eye size={16} />
              <span>View Discovered ({discoveredCount})</span>
            </button>

            <button
              type="button"
              className="secrets-btn-primary"
              onClick={handleRevealRandom}
            >
              <HelpCircle size={16} />
              <span>Reveal a Random Secret</span>
            </button>
          </div>
        </div>

        {hintMessage && (
          <p className="secrets-hint-text">{hintMessage}</p>
        )}
      </div>

      {/* Discovered Secrets Collection Modal */}
      <AnimatePresence>
        {showAllDiscovered && (
          <div
            className="star-modal-backdrop"
            onClick={() => setShowAllDiscovered(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="discovered-secrets-title"
          >
            <motion.div
              className="discovered-secrets-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-shine" aria-hidden="true" />

              <div className="discovered-modal-header">
                <div>
                  <h3 id="discovered-secrets-title" className="discovered-modal-title">
                    Your Discovered Secrets ({discoveredCount}/{totalSecrets})
                  </h3>
                  <p className="discovered-modal-desc">
                    Every message you have uncovered in this session:
                  </p>
                </div>
                <button
                  type="button"
                  className="star-detail-card__close"
                  onClick={() => setShowAllDiscovered(false)}
                  aria-label="Close secrets modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="discovered-secrets-list">
                {hiddenMessages
                  .filter((m) => discoveredSecretIds.includes(m.id))
                  .map((secret) => (
                    <div key={secret.id} className="secret-item-card">
                      <div className="secret-item-badge">
                        <Heart size={14} className="secret-item-icon" />
                        <span>Found in: {secret.location}</span>
                      </div>
                      <p className="secret-item-message">“{secret.message}”</p>
                    </div>
                  ))}
              </div>

              <div className="discovered-modal-footer">
                <button
                  type="button"
                  className="star-detail-card__done-btn"
                  onClick={() => setShowAllDiscovered(false)}
                >
                  Close Collection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Individual Secret Reveal Modal (When a secret icon is clicked) */}
      <AnimatePresence>
        {activeSecretModal && (
          <div
            className="star-modal-backdrop"
            onClick={onCloseSecretModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="active-secret-title"
          >
            <motion.div
              className="secret-popup-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-shine" aria-hidden="true" />

              <button
                type="button"
                className="star-detail-card__close"
                onClick={onCloseSecretModal}
                aria-label="Close message"
              >
                <X size={18} />
              </button>

              <div className="secret-popup-icon-wrap">
                <Heart size={26} className="secret-popup-heart-icon" />
              </div>

              <span className="secret-popup-tag">
                Secret Found in {activeSecretModal.location}
              </span>

              <h3 id="active-secret-title" className="secret-popup-title">
                {activeSecretModal.title}
              </h3>

              <div className="secret-popup-quote-box">
                <p className="secret-popup-quote">
                  “{activeSecretModal.message}”
                </p>
              </div>

              <button
                type="button"
                className="star-detail-card__done-btn"
                onClick={onCloseSecretModal}
              >
                Keep Exploring ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
