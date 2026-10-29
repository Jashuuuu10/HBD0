import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Maximize2 } from 'lucide-react';
import { galleryMemories } from '../data/memories';
import { lockBodyScroll, unlockBodyScroll } from '../utils/lockBodyScroll';

/**
 * RETAINED & IMPROVED SECTION: MEMORIES GALLERY
 * Responsive photo gallery with interactive lightbox modal and image fallbacks
 */
export default function MemoriesGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (activePhoto) {
      lockBodyScroll();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActivePhoto(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlockBodyScroll();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activePhoto]);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="memories" className="memories-section" aria-label="Memories Gallery">
      <div className="section-header">
        <span className="section-eyebrow">
          <Camera size={14} /> PHOTO ARCHIVE
        </span>
        <h2 className="section-title">Memories Gallery</h2>
        <p className="section-subtitle">
          Moments frozen in time. Click any photo to view it in full detail.
        </p>
      </div>

      <div className="memories-grid">
        {galleryMemories.map((photo) => {
          const hasError = imageErrors[photo.id];
          const displaySrc = hasError ? photo.fallbackSrc : photo.src;

          return (
            <div
              key={photo.id}
              className="memory-card-wrap"
              onClick={() => setActivePhoto(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActivePhoto(photo)}
            >
              <div className="memory-img-frame">
                <img
                  src={displaySrc}
                  alt={photo.alt}
                  loading="lazy"
                  onError={() => handleImageError(photo.id)}
                  className="memory-img"
                />
                <div className="memory-hover-overlay">
                  <Maximize2 size={22} className="memory-zoom-icon" />
                </div>
              </div>
              <div className="memory-info-box">
                <span className="memory-date-tag">{photo.date}</span>
                <p className="memory-caption">{photo.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="lightbox-backdrop"
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
          >
            <motion.div
              className="lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              <div className="lightbox-image-wrap">
                <img
                  src={imageErrors[activePhoto.id] ? activePhoto.fallbackSrc : activePhoto.src}
                  alt={activePhoto.alt}
                  className="lightbox-main-img"
                />
              </div>

              <div className="lightbox-caption-bar">
                <span className="memory-date-tag">{activePhoto.date}</span>
                <p className="lightbox-caption-text">{activePhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
