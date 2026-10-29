import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Clapperboard, Heart, ArrowRight } from 'lucide-react';
import { movieUniverseChoices } from '../../data/games';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GAME C — CHOOSE OUR MOVIE UNIVERSE 🎥
 * ═══════════════════════════════════════════════════════════════════════════
 * Interactive cinematic romantic choice game:
 * - 4 cinematic choices (Eren/Mikasa, Mike/Eleven, Anandan/Rupa, Peter/MJ)
 * - Personalized revealed reflection
 * - "Choose Again" replay functionality
 */
export default function ChooseOurMovieUniverse({ onClose: _onClose }) {
  const [selectedUniverse, setSelectedUniverse] = useState(null);

  const handleSelect = (choice) => {
    setSelectedUniverse(choice);
  };

  const handleReset = () => {
    setSelectedUniverse(null);
  };

  return (
    <div className="choice-game-container">
      <div className="choice-game-header-area">
        <span className="choice-game-badge">
          <Clapperboard size={13} /> ROMANTIC MULTIVERSE
        </span>
        <h4 className="choice-game-heading">
          Which Fictional Couple Best Represents Us?
        </h4>
        <p className="choice-game-subtitle">
          Pick the universe that resonates most with your heart, Manisha.
        </p>
      </div>

      {!selectedUniverse ? (
        <div className="choice-cards-grid">
          {movieUniverseChoices.map((choice) => (
            <motion.button
              key={choice.id}
              type="button"
              className="choice-card-item"
              onClick={() => handleSelect(choice)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                '--choice-accent': choice.accentColor,
              }}
            >
              <div
                className="choice-card-item__bg"
                style={{ background: choice.bgGradient }}
                aria-hidden="true"
              />
              <div className="choice-card-item__content">
                <div className="choice-card-item__top">
                  <span className="choice-card-item__symbol" aria-hidden="true">
                    {choice.symbol}
                  </span>
                  <span className="choice-card-item__badge">{choice.badge}</span>
                </div>

                <h5 className="choice-card-item__title">{choice.pair}</h5>
                <span className="choice-card-item__franchise">{choice.franchise}</span>
                <p className="choice-card-item__desc">{choice.description}</p>

                <div className="choice-card-item__action">
                  <span>This Is Us</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          className="choice-revealed-view"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          style={{
            '--choice-accent': selectedUniverse.accentColor,
          }}
        >
          <div
            className="choice-revealed-bg"
            style={{ background: selectedUniverse.bgGradient }}
            aria-hidden="true"
          />

          <div className="choice-revealed-inner">
            <span className="choice-revealed-symbol" aria-hidden="true">
              {selectedUniverse.symbol}
            </span>
            <span className="choice-revealed-tag">{selectedUniverse.franchise}</span>
            <h4 className="choice-revealed-title">{selectedUniverse.pair}</h4>
            <div className="choice-revealed-theme-badge">
              <Sparkles size={14} />
              <span>{selectedUniverse.theme}</span>
            </div>

            <div className="choice-revealed-quote-box">
              <Heart size={24} className="choice-revealed-heart" fill="#f43f5e" />
              <p className="choice-revealed-text">
                “{selectedUniverse.resultReflection}”
              </p>
            </div>

            <p className="choice-revealed-footer-note">
              No matter what story or script we find ourselves in, my favourite ending is always
              staying right beside you, Manisha. ❤️
            </p>

            <button
              type="button"
              className="hero-btn-primary-v2"
              onClick={handleReset}
            >
              <RotateCcw size={18} />
              <span>Choose Another Universe</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
