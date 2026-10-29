import { motion } from 'framer-motion';

/**
 * Left-aligned hero content matching the reference blueprint:
 * - Spaced uppercase eyebrow heading
 * - Large multi-line serif headline ("Worlds Beyond Boundaries")
 * - Supporting paragraph
 * - Two action buttons ("Explore Now →" and "▶ Watch Showreel")
 * - Bottom metrics: 3 statistics columns
 * - Avatar cluster + text badge + circle arrow
 */
export default function HeroLeft({ onExplore }) {
  const avatars = [
    '/assets/manisha.jpg',
    '/assets/aot.PNG',
    '/assets/manisha.jpg',
    '/assets/aot.PNG',
  ];

  return (
    <div className="hero-left">
      <div className="hero-left__top">
        {/* 1. Uppercase Eyebrow */}
        <motion.p
          className="hero-left__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          E X P L O R E &nbsp; T H E &nbsp; U N S E E N
        </motion.p>

        {/* 2. Large Elegant Multi-line Serif Headline */}
        <motion.h1
          className="hero-left__headline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Worlds<br />
          Beyond<br />
          Boundaries
        </motion.h1>

        {/* 3. Supporting Paragraph */}
        <motion.p
          className="hero-left__description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Breathtaking destinations, serene landscapes and unforgettable experiences
          crafted with love for modern explorers.
        </motion.p>

        {/* 4. Action Buttons Row */}
        <motion.div
          className="hero-left__buttons"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Primary Pill Button with Arrow Circle */}
          <button
            className="hero-btn-primary"
            type="button"
            onClick={onExplore}
          >
            <span>Explore Now</span>
            <span className="hero-btn-primary__circle" aria-hidden="true">
              &rarr;
            </span>
          </button>

          {/* Play Showreel Button */}
          <button
            className="hero-btn-secondary"
            type="button"
            onClick={onExplore}
          >
            <span className="hero-btn-secondary__play-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>Watch Showreel</span>
          </button>
        </motion.div>
      </div>

      {/* 5. Bottom Metrics */}
      <motion.div
        className="hero-left__bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {/* Statistics Row */}
        <div className="hero-stats">
          <div className="hero-stats__item">
            <span className="hero-stats__value">250+</span>
            <span className="hero-stats__label">Destinations</span>
          </div>
          <div className="hero-stats__item">
            <span className="hero-stats__value">50K+</span>
            <span className="hero-stats__label">Happy Travelers</span>
          </div>
          <div className="hero-stats__item">
            <span className="hero-stats__value">4.9 ★</span>
            <span className="hero-stats__label">User Rating</span>
          </div>
        </div>

        {/* Avatars & Community Badge */}
        <div className="hero-community">
          <div className="hero-community__avatars">
            {avatars.map((img, i) => (
              <div
                key={i}
                className="hero-community__avatar"
                style={{ zIndex: 4 - i }}
              >
                <img src={img} alt="Moment preview" />
              </div>
            ))}
          </div>
          <span className="hero-community__text">
            Join a community of explorers worldwide
          </span>
          <button
            className="hero-community__btn"
            type="button"
            onClick={onExplore}
            aria-label="Explore more"
          >
            &rarr;
          </button>
        </div>
      </motion.div>
    </div>
  );
}
