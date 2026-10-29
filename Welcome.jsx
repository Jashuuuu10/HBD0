import { motion, useReducedMotion } from 'framer-motion';

/**
 * PHASE 2 — Liquid Glass Welcome Message Card
 *
 * Displays a translucent, floating liquid glass card with:
 * - Backdrop blur and subtle specular reflection streaks
 * - The exact heartfelt welcome message for Manisha
 * - The glowing "Inka Start Chedama? ❤️" action button
 *
 * Props:
 *   - onStart: () => void — callback when the journey button is clicked
 */
export default function Welcome({ onStart }) {
  const prefersReducedMotion = useReducedMotion();

  // Card reveal animation config
  const cardVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 36,
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25,
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -24,
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Staggered text variants for subtle cinematic polish
  const itemVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      className="welcome welcome--visible"
      aria-label="Welcome message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <motion.div
        className="welcome__glass-card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Subtle glass reflection sheen */}
        <div className="glass-card__shine" aria-hidden="true" />

        {/* Romantic Heading */}
        <motion.h1
          className="glass-card__heading"
          variants={itemVariants}
          transition={{ delay: 0.35 }}
        >
          Hey, My Favorite Person… ❤️
        </motion.h1>

        {/* Exact welcome message body */}
        <div className="glass-card__body">
          <motion.p
            variants={itemVariants}
            transition={{ delay: 0.45 }}
          >
            Some people make life beautiful just by being in it. And for me,
            that person will always be you.
          </motion.p>
          <motion.p
            variants={itemVariants}
            transition={{ delay: 0.55 }}
          >
            I made this little world just for you, filled with feelings that
            words can never fully explain and moments I wish I could keep
            forever.
          </motion.p>
          <motion.p
            variants={itemVariants}
            transition={{ delay: 0.65 }}
          >
            So, my love… shall we begin our little journey? ✨
          </motion.p>
        </div>

        {/* Liquid Glass Interactive Button */}
        <motion.button
          className="glass-btn"
          type="button"
          onClick={onStart}
          variants={itemVariants}
          transition={{ delay: 0.75 }}
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  scale: 1.03,
                  boxShadow:
                    '0 6px 32px rgba(45, 212, 168, 0.42), 0 0 70px rgba(56, 189, 248, 0.22)',
                }
          }
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        >
          <span className="glass-btn__shine" aria-hidden="true" />
          <span className="glass-btn__text">Inka Start Chedama? ❤️</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
