import { motion, useReducedMotion } from 'framer-motion';

/**
 * Centered Liquid Glass Welcome Card
 * Revealed after the opening hero animation or upon clicking action controls.
 *
 * Requirements:
 * - Heading: "Hey, My Favorite Person… ❤️"
 * - Exact 3-paragraph message
 * - Button: "Inka Start Chedama? ❤️"
 * - Translucent teal-blue glass, backdrop blur, specular reflections, elegant borders
 * - Subtle dismiss option so user can freely admire the recreated blueprint
 */
export default function WelcomeCard({ onStart, onClose }) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 36,
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -24,
      scale: prefersReducedMotion ? 1 : 0.97,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div
      className="welcome-wrapper"
      aria-label="Welcome message overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <motion.div
        className="liquid-glass-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Specular glass reflection sheen */}
        <div className="glass-shine" aria-hidden="true" />

        {/* Optional dismiss button */}
        {onClose && (
          <button
            className="welcome-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close welcome note"
          >
            &times;
          </button>
        )}

        {/* Heading */}
        <motion.h1
          className="liquid-glass-card__heading"
          variants={itemVariants}
          custom={0.15}
          initial="hidden"
          animate="visible"
        >
          Hey, My Favorite Person… ❤️
        </motion.h1>

        {/* Exact welcome message body */}
        <div className="liquid-glass-card__body">
          <motion.p
            variants={itemVariants}
            custom={0.3}
            initial="hidden"
            animate="visible"
          >
            Some people make life beautiful just by being in it. And for me,
            that person will always be you.
          </motion.p>
          <motion.p
            variants={itemVariants}
            custom={0.45}
            initial="hidden"
            animate="visible"
          >
            I made this little world just for you, filled with feelings that
            words can never fully explain and moments I wish I could keep
            forever.
          </motion.p>
          <motion.p
            variants={itemVariants}
            custom={0.6}
            initial="hidden"
            animate="visible"
            className="liquid-glass-card__highlight"
          >
            So, my love… shall we begin our little journey? ✨
          </motion.p>
        </div>

        {/* Glowing Liquid Glass Button */}
        <motion.button
          className="liquid-glass-btn"
          type="button"
          onClick={onStart}
          variants={itemVariants}
          custom={0.75}
          initial="hidden"
          animate="visible"
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  scale: 1.03,
                  boxShadow:
                    '0 10px 40px rgba(45, 212, 168, 0.5), 0 0 80px rgba(56, 189, 248, 0.35)',
                }
          }
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        >
          <span className="liquid-glass-btn__shine" aria-hidden="true" />
          <span className="liquid-glass-btn__text">Inka Start Chedama? ❤️</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
