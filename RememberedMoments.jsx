import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, ChevronDown, ChevronUp, BookHeart } from 'lucide-react';
import { rememberedMomentsList } from '../data/rememberedMoments';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE LITTLE THINGS I REMEMBER 💌
 * ═══════════════════════════════════════════════════════════════════════════
 * Replaces the old "Hidden Messages" treasure hunt.
 * 14 interactive relationship-themed memory cards with personal reflections,
 * soft reveal animations, and editable placeholders in `src/data/rememberedMoments.js`.
 */
export default function RememberedMoments() {
  const [expandedId, setExpandedId] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="little-things" className="remembered-section" aria-label="The Little Things I Remember">
      {/* Anchor for any old references */}
      <div id="hidden-messages" style={{ position: 'relative', top: '-80px' }} />

      <div className="section-header">
        <span className="section-eyebrow">
          <BookHeart size={14} /> PIECES OF OUR JOURNEY
        </span>

        <h2 className="section-title">The Little Things I Remember</h2>
        <p className="section-subtitle">
          Not just the big milestones, but the quiet glances, the funny arguments, and the small
          moments where I fell for you all over again, Manisha.
        </p>
      </div>

      {/* Grid of Memory Cards */}
      <div className="remembered-grid">
        {rememberedMomentsList.map((moment) => {
          const isExpanded = expandedId === moment.id;

          return (
            <motion.div
              key={moment.id}
              className={`remembered-card ${isExpanded ? 'remembered-card--expanded' : ''}`}
              onClick={() => toggleExpand(moment.id)}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                '--moment-accent': moment.accentColor,
              }}
            >
              <div className="glass-shine" aria-hidden="true" />

              <div className="remembered-card__header">
                <div className="remembered-card__tag-wrap">
                  <span className="remembered-card__symbol" aria-hidden="true">
                    {moment.symbol}
                  </span>
                  <span className="remembered-card__tag">{moment.tag}</span>
                </div>

                <button
                  type="button"
                  className="remembered-card__toggle-btn"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? `Collapse ${moment.title}` : `Expand ${moment.title}`}
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              <h3 className="remembered-card__title">{moment.title}</h3>

              <p className="remembered-card__reflection">
                {moment.reflection}
              </p>

              {/* Expandable Intimate Memory Note */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="remembered-card__expanded-note"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="remembered-card__note-inner">
                      <div className="remembered-card__note-header">
                        <Heart size={13} fill="#f43f5e" color="#f43f5e" />
                        <span>A Personal Memory</span>
                      </div>
                      <p className="remembered-card__note-text">
                        “{moment.personalNote}”
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="remembered-card__footer">
                <span className="remembered-card__hint">
                  {isExpanded ? 'Tap to close note' : 'Tap to read memory ✨'}
                </span>
                <span className="remembered-card__num">0{moment.id < 10 ? `0${moment.id}` : moment.id}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
