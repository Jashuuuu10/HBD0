import { ArrowUp, Heart, RotateCcw } from 'lucide-react';

/**
 * FINAL FOOTER
 * Displays "Made with love for Manisha ❤️" and working "Back to Top"
 */
export default function Footer({ onReplay }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-v2">
      <div className="footer-v2__inner">
        <div className="footer-v2__brand">
          <p className="footer-v2__tagline">
            Made with love for Manisha <Heart size={16} className="footer-heart-icon" fill="#f43f5e" />
          </p>
          <span className="footer-v2__subtext">
            October 31, 2026 &bull; A cinematic universe crafted just for you
          </span>
        </div>

        <div className="footer-v2__actions">
          {onReplay && (
            <button
              type="button"
              className="footer-v2__btn"
              onClick={onReplay}
              title="Replay cinematic opening"
            >
              <RotateCcw size={14} />
              <span>Replay Intro</span>
            </button>
          )}

          <button
            type="button"
            className="footer-v2__top-btn"
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
