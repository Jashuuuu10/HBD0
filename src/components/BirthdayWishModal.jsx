import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { birthdayLetter } from '../data/birthdayContent';
import { lockBodyScroll, unlockBodyScroll } from '../utils/lockBodyScroll';

/**
 * Accessible Liquid Glass Modal for the Heartfelt Birthday Letter
 */
export default function BirthdayWishModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlockBodyScroll();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="star-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-modal-title"
    >
      <motion.div
        className="birthday-letter-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass-shine" aria-hidden="true" />

        {/* Close Button */}
        <button
          type="button"
          className="star-detail-card__close"
          onClick={onClose}
          aria-label="Close letter"
        >
          <X size={20} />
        </button>

        {/* Letter Header */}
        <div className="letter-header">
          <div className="letter-header-icon-wrap">
            <Heart size={24} fill="#f43f5e" color="#fda4af" />
          </div>
          <span className="letter-date-badge">{birthdayLetter.date}</span>
          <h3 id="letter-modal-title" className="letter-salutation">
            {birthdayLetter.salutation}
          </h3>
        </div>

        {/* Letter Body */}
        <div className="letter-body">
          {birthdayLetter.paragraphs.map((p, idx) => (
            <p key={idx} className="letter-paragraph">
              {p}
            </p>
          ))}
        </div>

        {/* Letter Footer */}
        <div className="letter-footer">
          <p className="letter-closing">{birthdayLetter.closing}</p>
          <p className="letter-signature">{birthdayLetter.signature}</p>
        </div>

        <button
          type="button"
          className="star-detail-card__done-btn letter-close-btn"
          onClick={onClose}
        >
          Close Letter 🤍
        </button>
      </motion.div>
    </div>
  );
}
