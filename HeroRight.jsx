import { motion } from 'framer-motion';

/**
 * Right-side vertical panel matching the reference blueprint:
 * - Vertical decorative labels (NATURE, TRAVEL, CULTURE, ADVENTURE, HARMONY)
 * - Stacked 3 image thumbnails with slider track
 * - Scroll to explore badge with circular arrow
 */
export default function HeroRight({ onExplore }) {
  const decorativeTags = ['NATURE', 'TRAVEL', 'CULTURE', 'ADVENTURE', 'HARMONY'];

  const thumbnails = [
    { id: 1, src: '/assets/manisha.jpg', alt: 'Portrait preview', active: false },
    { id: 2, src: '/assets/aot.PNG', alt: 'Sunset vista preview', active: true },
    { id: 3, src: '/assets/manisha.jpg', alt: 'Moment preview', active: false },
  ];

  return (
    <aside className="hero-right" aria-label="Decorative gallery navigation">
      {/* 1. Top Vertical Decorative Labels */}
      <motion.div
        className="hero-right__tags"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        {decorativeTags.map((tag) => (
          <span key={tag} className="hero-right__tag">
            {tag}
          </span>
        ))}
      </motion.div>

      {/* 2. Middle Stacked Thumbnails with vertical slider track */}
      <motion.div
        className="hero-right__carousel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <div className="hero-right__thumbs">
          {thumbnails.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`hero-right__thumb ${t.active ? 'hero-right__thumb--active' : ''}`}
              onClick={onExplore}
              aria-label={`View ${t.alt}`}
            >
              <img src={t.src} alt={t.alt} />
            </button>
          ))}
        </div>

        {/* Vertical slider scrollbar pill */}
        <div className="hero-right__track" aria-hidden="true">
          <div className="hero-right__thumb-handle" />
        </div>
      </motion.div>

      {/* 3. Bottom Scroll to Explore Indicator */}
      <motion.div
        className="hero-right__scroll"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        onClick={onExplore}
        role="button"
        tabIndex={0}
      >
        <div className="hero-right__scroll-text">
          <span>SCROLL</span>
          <span>TO EXPLORE</span>
        </div>
        <div className="hero-right__scroll-btn" aria-hidden="true">
          &darr;
        </div>
      </motion.div>
    </aside>
  );
}
