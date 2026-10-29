import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles, Compass } from 'lucide-react';

/**
 * Hero Section for Screen 3
 * Exact requirements:
 * - Small label: "A LITTLE UNIVERSE, MADE WITH LOVE"
 * - Main heading: "Happy Birthday, Manisha ❤️"
 * - Subtitle: "A little universe, made just for you."
 * - Buttons: "Explore Your World" & "A Little Surprise"
 * - Floating subtle hearts and small particles
 * - Keeps reference aesthetic with metrics & right thumbnails
 * - Includes Hidden Secret #1
 */
export default function HeroSection({ onOpenSurprise }) {
  const prefersReducedMotion = useReducedMotion();
  const [thumbActive, setThumbActive] = useState(1);

  const scrollToUniverse = () => {
    const el = document.getElementById('our-cinema') || document.getElementById('our-universe');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const decorativeTags = ['I', 'LOVE', 'U', 'SO', 'MUCH♥️'];

  const thumbnails = [
    { id: 0, src: '/assets/IMG_8259 2.jpg', alt: 'Manisha portrait' },
    { id: 1, src: '/assets/IMG_4341.jpg', alt: 'AOT Vista theme' },
    { id: 2, src: '/assets/IMG_0774.jpg', alt: 'Celebration moment' },
  ];

  return (
    <section id="hero" className="hero-section" aria-label="Birthday Hero Introduction">
      {/* Floating subtle ambient particles & hearts */}
      {!prefersReducedMotion && (
        <div className="hero-floating-decor" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="hero-floating-heart"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.25, 0.6, 0.25],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 5 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart size={14 + (i % 3) * 4} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="hero-content-grid">
        {/* Left Hero Content */}
        <div className="hero-left-v2">
          {/* Eyebrow Label */}
          <motion.div
            className="hero-eyebrow-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="hero-eyebrow-badge">
              <Sparkles size={13} className="hero-eyebrow-icon" />
              A LITTLE UNIVERSE, MADE WITH LOVE
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="hero-main-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Happy Birthday,<br />
            <span className="hero-heading-gradient">Manisha</span>{' '}
            <span className="hero-heart-accent">❤️</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A little universe, made just for you. Every star, every word, and every
            hidden secret here was crafted to make you smile.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="hero-actions-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              className="hero-btn-primary-v2"
              type="button"
              onClick={scrollToUniverse}
            >
              <Compass size={18} />
              <span>Explore Your World</span>
              <span className="hero-btn-arrow" aria-hidden="true">&rarr;</span>
            </button>

            <button
              className="hero-btn-secondary-v2"
              type="button"
              onClick={onOpenSurprise}
            >
              <Sparkles size={16} />
              <span>A Little Surprise</span>
            </button>
          </motion.div>

          {/* Metrics / Love Stats */}
          <motion.div
            className="hero-metrics-v2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="metric-pill">
              <span className="metric-value">Infinite ❤️</span>
              <span className="metric-label">Cherished Moments</span>
            </div>
            <div className="metric-pill">
              <span className="metric-value">Oct 31 🌙</span>
              <span className="metric-label">Queen’s Day</span>
            </div>
            <div className="metric-pill">
              <span className="metric-value">1 Universe 🌌</span>
              <span className="metric-label">Made For You</span>
            </div>
          </motion.div>
        </div>

        {/* Right Preview Panel (Recreating Reference Artistry) */}
        <div className="hero-right-v2">
          {/* Vertical Decorative Tags */}
          <div className="hero-vertical-tags">
            {decorativeTags.map((tag) => (
              <span key={tag} className="hero-tag-text">{tag}</span>
            ))}
          </div>

          {/* Stacked Thumbnails */}
          <div className="hero-stacked-thumbs">
            {thumbnails.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                className={`hero-thumb-card ${thumbActive === idx ? 'hero-thumb-card--active' : ''}`}
                onClick={() => setThumbActive(idx)}
                aria-label={`Preview ${t.alt}`}
              >
                <img src={t.src} alt={t.alt} />
                <div className="hero-thumb-overlay" />
              </button>
            ))}
          </div>

          {/* Scroll to explore pill */}
          <div
            className="hero-scroll-pill"
            role="button"
            tabIndex={0}
            onClick={scrollToUniverse}
            onKeyDown={(e) => e.key === 'Enter' && scrollToUniverse()}
          >
            <span className="hero-scroll-text">SCROLL TO DISCOVER</span>
            <span className="hero-scroll-arrow">&darr;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

