import { motion } from 'framer-motion';

/**
 * Bottom-center slide indicators (01, 02, 03) matching the reference screenshot
 */
export default function HeroCenterBottom({ activeIndex = 0, onSelect }) {
  const slides = ['01', '02', '03'];

  return (
    <motion.div
      className="hero-center-bottom"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.8 }}
      aria-label="Slide Indicator"
    >
      {slides.map((num, i) => (
        <button
          key={num}
          type="button"
          className={`hero-center-bottom__num ${i === activeIndex ? 'hero-center-bottom__num--active' : ''}`}
          onClick={() => onSelect?.(i)}
        >
          {num}
        </button>
      ))}
    </motion.div>
  );
}
