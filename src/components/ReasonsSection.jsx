import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, X, ArrowLeft, ArrowRight, Dices, BookOpen, Check } from 'lucide-react';
import { reasonsList } from '../data/reasons';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 100 LITTLE REASONS I LOVE YOU ❤️
 * ═══════════════════════════════════════════════════════════════════════════
 * Section title: "100 Little Reasons I Love You"
 * Subtitle: "100 little things, one endless love — for Manisha. ❤️"
 *
 * Features:
 * - Exactly 100 interactive Liquid Glass boxes (01 to 100)
 * - Session discovery tracker ("23 / 100 discovered" + progress bar)
 * - "Surprise Me" randomizer button
 * - "Read All" modal list view
 * - Modal with prev/next navigation, escape key handling, close button
 * - Preserves Secret #4 trigger
 */
export default function ReasonsSection() {
  const [openedIds, setOpenedIds] = useState(() => new Set());
  const [activeReason, setActiveReason] = useState(null);
  const [showReadAll, setShowReadAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Open a specific reason and mark as discovered in session
  const openReason = useCallback((reason) => {
    setActiveReason(reason);
    setOpenedIds((prev) => {
      const next = new Set(prev);
      next.add(reason.id);
      return next;
    });
  }, []);

  // Surprise Me - picks a random reason
  const handleSurpriseMe = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * reasonsList.length);
    openReason(reasonsList[randomIndex]);
  }, [openReason]);

  // Keyboard navigation & escape handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeReason) setActiveReason(null);
        if (showReadAll) setShowReadAll(false);
      } else if (activeReason) {
        if (e.key === 'ArrowRight') {
          const nextId = activeReason.id === 100 ? 1 : activeReason.id + 1;
          openReason(reasonsList[nextId - 1]);
        } else if (e.key === 'ArrowLeft') {
          const prevId = activeReason.id === 1 ? 100 : activeReason.id - 1;
          openReason(reasonsList[prevId - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReason, showReadAll, openReason]);

  const discoveredCount = openedIds.size;
  const totalCount = reasonsList.length;
  const progressPercent = Math.round((discoveredCount / totalCount) * 100);

  // Previous and next handlers
  const handleNextReason = () => {
    if (!activeReason) return;
    const nextIndex = activeReason.id === 100 ? 0 : activeReason.id;
    openReason(reasonsList[nextIndex]);
  };

  const handlePrevReason = () => {
    if (!activeReason) return;
    const prevIndex = activeReason.id === 1 ? 99 : activeReason.id - 2;
    openReason(reasonsList[prevIndex]);
  };

  return (
    <section id="reasons" className="reasons-section-v2" aria-label="100 Little Reasons I Love You">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-eyebrow">
          <Heart size={14} /> 100 LITTLE PIECES OF MY HEART
        </span>

        <h2 className="section-title">100 Little Reasons I Love You</h2>

        <p className="section-subtitle">
          100 little things, one endless love — for Manisha. ❤️
        </p>

        {/* Tracker & Action Controls */}
        <div className="reasons-controls-bar">
          <div className="reasons-progress-wrap">
            <div className="reasons-progress-labels">
              <span className="reasons-progress-count">
                <strong>{discoveredCount}</strong> / {totalCount} discovered
              </span>
              <span className="reasons-progress-pct">{progressPercent}%</span>
            </div>
            <div className="reasons-progress-track">
              <div
                className="reasons-progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="reasons-action-btns">
            <button
              type="button"
              className="reasons-action-btn reasons-action-btn--surprise"
              onClick={handleSurpriseMe}
            >
              <Dices size={16} />
              <span>Surprise Me</span>
            </button>

            <button
              type="button"
              className="reasons-action-btn reasons-action-btn--readall"
              onClick={() => setShowReadAll(true)}
            >
              <BookOpen size={16} />
              <span>Read All</span>
            </button>
          </div>
        </div>
      </div>

      {/* 100 Numbered Interactive Boxes Grid */}
      <div className="reasons-100-grid">
        {reasonsList.map((reason) => {
          const isOpened = openedIds.has(reason.id);
          const numFormatted = reason.id < 10 ? `0${reason.id}` : `${reason.id}`;

          return (
            <motion.button
              key={reason.id}
              type="button"
              className={`reason-box ${isOpened ? 'reason-box--opened' : ''}`}
              onClick={() => openReason(reason)}
              whileHover={prefersReducedMotion ? {} : { scale: 1.08, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
              aria-label={`Reason ${numFormatted}: ${reason.title}. ${isOpened ? 'Discovered.' : 'Not yet opened.'}`}
            >
              <div className="reason-box__glass-shine" aria-hidden="true" />
              <span className="reason-box__num">{numFormatted}</span>
              <span className="reason-box__icon" aria-hidden="true">
                {isOpened ? (
                  <Check size={11} className="reason-box__check" />
                ) : (
                  <Heart size={10} className="reason-box__heart" />
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Single Reason Modal Dialog */}
      <AnimatePresence>
        {activeReason && (
          <div
            className="reason-modal-backdrop"
            onClick={() => setActiveReason(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reason-modal-title"
          >
            <motion.div
              className="reason-modal-window"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-shine" aria-hidden="true" />

              {/* Modal Header */}
              <div className="reason-modal-header">
                <div className="reason-modal-header__left">
                  <div className="reason-modal-num-badge">
                    Reason #{activeReason.id < 10 ? `0${activeReason.id}` : activeReason.id}
                  </div>
                  <span className="reason-modal-category-tag">
                    {activeReason.category}
                  </span>
                </div>

                <button
                  type="button"
                  className="star-detail-card__close"
                  onClick={() => setActiveReason(null)}
                  aria-label="Close reason modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="reason-modal-body">
                <div className="reason-modal-heart-icon">
                  <Heart size={32} fill="#f43f5e" color="#fecdd3" />
                </div>
                <h3 id="reason-modal-title" className="reason-modal-title">
                  {activeReason.title}
                </h3>
                <div className="reason-modal-quote-wrapper">
                  <p className="reason-modal-quote-text">
                    “{activeReason.text}”
                  </p>
                </div>
              </div>

              {/* Modal Footer with Prev/Next Navigation */}
              <div className="reason-modal-footer">
                <div className="reason-modal-nav">
                  <button
                    type="button"
                    className="cinema-nav-btn"
                    onClick={handlePrevReason}
                    aria-label="Previous reason"
                  >
                    <ArrowLeft size={16} />
                    <span>Prev</span>
                  </button>
                  <span className="reason-modal-position">
                    {activeReason.id} of 100
                  </span>
                  <button
                    type="button"
                    className="cinema-nav-btn"
                    onClick={handleNextReason}
                    aria-label="Next reason"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  className="reasons-action-btn reasons-action-btn--surprise"
                  onClick={handleSurpriseMe}
                >
                  <Dices size={15} />
                  <span>Random</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Read All 100 Reasons Modal */}
      <AnimatePresence>
        {showReadAll && (
          <div
            className="readall-modal-backdrop"
            onClick={() => setShowReadAll(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="readall-modal-title"
          >
            <motion.div
              className="readall-modal-window"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-shine" aria-hidden="true" />

              <div className="readall-modal-header">
                <div>
                  <h3 id="readall-modal-title" className="readall-modal-title">
                    All 100 Reasons I Love You ❤️
                  </h3>
                  <p className="readall-modal-subtitle">
                    A complete little library of why you mean the world to me, Manisha.
                  </p>
                </div>

                <button
                  type="button"
                  className="star-detail-card__close"
                  onClick={() => setShowReadAll(false)}
                  aria-label="Close all reasons view"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="readall-modal-scroll-area">
                <div className="readall-reasons-list">
                  {reasonsList.map((reason) => {
                    const numFormatted = reason.id < 10 ? `0${reason.id}` : `${reason.id}`;
                    return (
                      <div key={reason.id} className="readall-reason-item">
                        <div className="readall-reason-item__header">
                          <span className="readall-reason-item__num">{numFormatted}</span>
                          <h4 className="readall-reason-item__title">{reason.title}</h4>
                        </div>
                        <p className="readall-reason-item__text">{reason.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="readall-modal-footer">
                <button
                  type="button"
                  className="hero-btn-primary-v2"
                  onClick={() => setShowReadAll(false)}
                >
                  <span>Close Reasons</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
