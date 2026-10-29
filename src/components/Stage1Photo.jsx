import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SCREEN 1: CINEMATIC INTRODUCTION
 *
 * Requirements:
 * - Asset: /assets/manisha-intro.jpg (falls back to /assets/manisha.jpg or gradient)
 * - Absolutely NO text, navigation, buttons, cards, or other UI over the photograph
 * - Edge-to-edge full viewport fill without distortion
 * - Slow cinematic zoom (5.5s), subtle fade, gentle depth
 * - Respects prefers-reduced-motion
 * - Auto-transitions to Screen 2
 */
const SCREEN_1_DURATION_MS = 5500;

export default function Stage1Photo({ onComplete }) {
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState('/assets/manisha-intro.jpg');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, SCREEN_1_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleImageError = () => {
    if (imgSrc === '/assets/manisha-intro.jpg') {
      // Try secondary path if intro named file is not found
      setImgSrc('/assets/manisha.jpg');
    } else {
      // Both paths failed, display elegant gradient fallback
      setImageError(true);
    }
  };

  return (
    <motion.section
      className="stage-1-container"
      aria-label="Cinematic photograph intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.0, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      {!imageError ? (
        <motion.img
          className="stage-1-photo"
          src={imgSrc}
          alt="Manisha"
          onError={handleImageError}
          initial={{
            scale: 1.0,
            filter: 'brightness(0.88)',
          }}
          animate={
            prefersReducedMotion
              ? { scale: 1.0, filter: 'brightness(1.0)' }
              : { scale: 1.12, filter: 'brightness(1.0)' }
          }
          transition={{
            duration: SCREEN_1_DURATION_MS / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ) : (
        <div className="stage-1-fallback-gradient" />
      )}
      {/* Subtle cinematic edge vignette transition */}
      <div className="stage-1-vignette" aria-hidden="true" />
    </motion.section>
  );
}
