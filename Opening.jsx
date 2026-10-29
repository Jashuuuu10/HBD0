import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * PHASE 1 — Full-Screen Cinematic Opening Photograph
 *
 * Immersive edge-to-edge opening photograph for Manisha.
 * Features a slow cinematic zoom-in, dark vignette overlay,
 * and ambient floating light particles. Automatically transitions
 * to the welcome message upon completion.
 *
 * Props:
 *   - onComplete: () => void — invoked when cinematic zoom finishes
 *   - duration:   number   — zoom duration in milliseconds (default 5200ms)
 */
export default function Opening({ onComplete, duration = 5200 }) {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Floating ambient particles (stable across renders)
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      bottom: `${-((i * 13) % 25)}%`,
      size: `${1.5 + (i % 3) * 1.2}px`,
      duration: `${9 + (i % 5) * 2.5}s`,
      delay: `${(i % 7) * 0.8}s`,
    }));
  }, []);

  // Auto-advance to welcome screen after cinematic zoom
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <motion.section
      className="opening"
      aria-label="Opening cinematic photograph"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={() => onComplete?.()}
      title="Click anywhere to skip opening"
    >
      <div className={`opening__image-wrapper ${imageError ? 'opening__image-wrapper--fallback' : ''}`}>
        {!imageError ? (
          <motion.img
            className="opening__photo"
            src="/assets/manisha.jpg"
            alt="A photograph of Manisha"
            onError={() => setImageError(true)}
            initial={{
              scale: 1,
              filter: 'brightness(0.32)',
            }}
            animate={
              prefersReducedMotion
                ? { filter: 'brightness(1)' }
                : {
                    scale: 1.13,
                    filter: 'brightness(1)',
                  }
            }
            transition={{
              duration: duration / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ) : (
          <div className="opening__fallback-message">
            <span className="opening__fallback-heart">❤️</span>
            <p>For Manisha</p>
          </div>
        )}
      </div>

      {/* Cinematic vignette & dark gradient overlay */}
      <div className="opening__overlay" />

      {/* Floating ambient particles */}
      {!prefersReducedMotion && (
        <div className="particles" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle skip indicator in corner */}
      <div className="opening__skip-hint" aria-hidden="true">
        <span>Click anywhere to continue →</span>
      </div>
    </motion.section>
  );
}
