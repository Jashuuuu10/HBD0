import { motion, useReducedMotion } from 'framer-motion';

/**
 * SCREEN 2: THE BLACK MESSAGE SCREEN
 *
 * Requirements:
 * - Pure black background (#000000)
 * - One centered Liquid Glass message card
 * - Exact English message:
 *   "Before the world sees what I made for you, I want you to know something.
 *    You came into my life and made ordinary moments feel special. You became
 *    my peace, my favourite person, and the one I keep choosing, even on the
 *    difficult days. This little world is made with love, for you and only you.
 *    Happy Birthday, Manisha. ❤️"
 * - Below message: "Inka Start Chedama? ❤️"
 * - One functional button: "Enter Your World ✨"
 * - Fade + upward reveal
 * - Transitions to Screen 3 on button click (NO auto advance)
 * - Absolutely NO other navigation or unrelated controls
 */
export default function Stage2Welcome({ onStart }) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 32,
      scale: prefersReducedMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      scale: prefersReducedMotion ? 1 : 0.97,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      className="stage-2-container"
      aria-label="Welcome message screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <motion.div
        className="stage-2-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Specular glass highlight reflection */}
        <div className="glass-shine" aria-hidden="true" />

        {/* Exact English Message */}
        <div className="stage-2-card__body">
          <p className="stage-2-card__message-text">
            Before the world sees what I made for you, I want you to know something.
            You came into my life and made ordinary moments feel special.
            You became my peace, my favourite person, and the one I keep choosing,
            even on the difficult days. This little world is made with love,
            for you and only you. Happy Birthday, Manisha. ❤️
          </p>

          <p className="stage-2-card__prompt-text">
            Inka Start Chedama? ❤️
          </p>
        </div>

        {/* One functional button */}
        <motion.button
          className="stage-2-card__btn"
          type="button"
          onClick={onStart}
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
          <span className="stage-2-card__btn-shine" aria-hidden="true" />
          <span className="stage-2-card__btn-text">Enter Your World ✨</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
