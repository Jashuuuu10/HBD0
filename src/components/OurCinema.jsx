import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Clapperboard,
  Search,
  Heart,
  Sparkles,
  X,
  ArrowLeft,
  ArrowRight,
  Dices,
  Calendar,
  Film,
} from 'lucide-react';
import { cinemaUniversesList } from '../data/cinemaUniverses';
import { lockBodyScroll, unlockBodyScroll } from '../utils/lockBodyScroll';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * OUR CINEMA — PARALLEL UNIVERSES 🎬
 * ═══════════════════════════════════════════════════════════════════════════
 * Subtitle: "Different stories. Different worlds. Somehow, every story reminds me of you."
 *
 * Features:
 * - 36 curated movies & series spanning Telugu, Indian, Hollywood, Anime, Series (1989–2026)
 * - Category filters: All, Telugu, Indian, International, Anime, Series
 * - Live search by title or character name
 * - Timeline toggle (chronological view 1989-2026)
 * - Interactive Favourites toggle (heart icon on cards)
 * - "Surprise Me" random movie selector
 * - Detailed modal with unique personal romantic reflections
 * - Escape key to close modal
 */
export default function OurCinema() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineSort, setTimelineSort] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set(['aot', 'sakhi', 'stranger-things', 'sita-ramam']));
  const [selectedUniverse, setSelectedUniverse] = useState(null);

  const prefersReducedMotion = useReducedMotion();

  const categories = ['All', 'Telugu', 'Indian', 'International', 'Anime', 'Series'];

  // Toggle favorite
  const toggleFavorite = useCallback((e, id) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Filter and sort items
  const filteredUniverses = useMemo(() => {
    return cinemaUniversesList
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.characters.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFav = onlyFavorites ? favorites.has(item.id) : true;

        return matchesCategory && matchesSearch && matchesFav;
      })
      .sort((a, b) => {
        if (timelineSort) return a.year - b.year;
        return 0; // default curated order
      });
  }, [activeCategory, searchQuery, timelineSort, onlyFavorites, favorites]);

  // Surprise Me handler
  const handleSurpriseMe = useCallback(() => {
    const pool = filteredUniverses.length > 0 ? filteredUniverses : cinemaUniversesList;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setSelectedUniverse(pool[randomIndex]);
  }, [filteredUniverses]);

  // Lock scroll and Escape key handler
  useEffect(() => {
    if (selectedUniverse) {
      lockBodyScroll();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedUniverse(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlockBodyScroll();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedUniverse]);

  // Navigation inside modal
  const currentIndex = selectedUniverse
    ? filteredUniverses.findIndex((u) => u.id === selectedUniverse.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredUniverses.length - 1) {
      setSelectedUniverse(filteredUniverses[currentIndex + 1]);
    } else {
      setSelectedUniverse(filteredUniverses[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedUniverse(filteredUniverses[currentIndex - 1]);
    } else {
      setSelectedUniverse(filteredUniverses[filteredUniverses.length - 1]);
    }
  };

  return (
    <section id="our-cinema" className="cinema-section-v2" aria-label="Our Cinema — Parallel Universes">
      {/* Anchor for backward compatibility */}
      <div id="our-universe" style={{ position: 'relative', top: '-80px' }} />

      {/* Header Banner */}
      <div className="section-header">
        <span className="section-eyebrow">
          <Clapperboard size={14} /> FEATURE ONE &bull; CINEMATIC MULTIVERSE
        </span>

        <h2 className="section-title">OUR CINEMA — PARALLEL UNIVERSES</h2>
        <p className="section-subtitle">
          “Different stories. Different worlds. Somehow, every story reminds me of you.”
        </p>

        {/* Controls Toolbar: Search, Filters, Favourites, Surprise Me */}
        <div className="cinema-toolbar">
          {/* Search Box */}
          <div className="cinema-search-wrapper">
            <Search size={16} className="cinema-search-icon" />
            <input
              type="text"
              className="cinema-search-input"
              placeholder="Search movie or characters (e.g. Sakhi, Mikasa, Geet, Jack)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search movies or characters"
            />
            {searchQuery && (
              <button
                type="button"
                className="cinema-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="cinema-quick-actions">
            <button
              type="button"
              className={`cinema-action-btn ${timelineSort ? 'cinema-action-btn--active' : ''}`}
              onClick={() => setTimelineSort(!timelineSort)}
              title="Sort chronologically by release year"
            >
              <Calendar size={15} />
              <span>{timelineSort ? '1989 → 2026' : 'Timeline View'}</span>
            </button>

            <button
              type="button"
              className={`cinema-action-btn ${onlyFavorites ? 'cinema-action-btn--active' : ''}`}
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              title="Show only favourited films"
            >
              <Heart
                size={15}
                fill={onlyFavorites ? '#f43f5e' : 'none'}
                color={onlyFavorites ? '#f43f5e' : 'currentColor'}
              />
              <span>Favourites ({favorites.size})</span>
            </button>

            <button
              type="button"
              className="cinema-action-btn cinema-action-btn--surprise"
              onClick={handleSurpriseMe}
              title="Pick a random universe"
            >
              <Dices size={15} />
              <span>Surprise Me</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="cinema-category-pills" role="tablist" aria-label="Movie Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`cinema-category-pill ${activeCategory === cat ? 'cinema-category-pill--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="cinema-results-count">
          Showing <strong>{filteredUniverses.length}</strong> of {cinemaUniversesList.length} cinematic universes
        </div>
      </div>

      {/* Grid of 36 Cinematic Glass Cards */}
      <div className="cinema-cards-grid-v2">
        {filteredUniverses.map((item) => {
          const isFav = favorites.has(item.id);

          return (
            <motion.div
              key={item.id}
              className="cinema-card-v2"
              onClick={() => setSelectedUniverse(item)}
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.015 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
              transition={{ duration: 0.2 }}
              style={{
                '--item-accent': item.accentColor,
              }}
            >
              <div className="glass-shine" aria-hidden="true" />

              {/* Card Header */}
              <div className="cinema-card-v2__header">
                <span className="cinema-card-v2__symbol" aria-hidden="true">
                  {item.symbol}
                </span>

                <div className="cinema-card-v2__badges">
                  <span className="cinema-card-v2__cat">{item.category}</span>
                  <span className="cinema-card-v2__year">{item.year}</span>
                </div>

                {/* Heart / Favourite Button */}
                <button
                  type="button"
                  className={`cinema-card-v2__fav-btn ${isFav ? 'cinema-card-v2__fav-btn--active' : ''}`}
                  onClick={(e) => toggleFavorite(e, item.id)}
                  aria-label={isFav ? `Remove ${item.title} from favourites` : `Add ${item.title} to favourites`}
                >
                  <Heart size={15} fill={isFav ? '#f43f5e' : 'none'} color={isFav ? '#f43f5e' : 'rgba(255,255,255,0.7)'} />
                </button>
              </div>

              {/* Title & Characters */}
              <div className="cinema-card-v2__body">
                <h3 className="cinema-card-v2__title">{item.title}</h3>
                <span className="cinema-card-v2__characters">{item.characters}</span>
                <p className="cinema-card-v2__tagline">“{item.tagline}”</p>
                <p className="cinema-card-v2__interp">{item.interpretation}</p>
              </div>

              {/* Card Footer Action */}
              <div className="cinema-card-v2__footer">
                <span className="cinema-card-v2__action">
                  <span>Read Parallel Reflection</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No results fallback */}
      {filteredUniverses.length === 0 && (
        <div className="cinema-no-results">
          <Film size={36} className="cinema-no-results-icon" />
          <h4>No cinematic universes found</h4>
          <p>Try searching for a different title or resetting your category filters.</p>
          <button
            type="button"
            className="hero-btn-primary-v2"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setOnlyFavorites(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Cinematic Detail Modal */}
      <AnimatePresence>
        {selectedUniverse && (
          <div
            className="cinema-modal-backdrop"
            onClick={() => setSelectedUniverse(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cinema-modal-title"
          >
            <motion.div
              className="cinema-modal-window"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                '--universe-accent': selectedUniverse.accentColor,
              }}
            >
              <div className="glass-shine" aria-hidden="true" />

              {/* Modal Header */}
              <div className="cinema-modal-header">
                <div className="cinema-modal-header__left">
                  <div className="cinema-modal-header-meta">
                    <span className="cinema-modal-symbol" aria-hidden="true">
                      {selectedUniverse.symbol}
                    </span>
                    <span className="cinema-modal-badge">{selectedUniverse.category} &bull; {selectedUniverse.year}</span>
                  </div>
                  <h3 id="cinema-modal-title" className="cinema-modal-title">
                    {selectedUniverse.title}
                  </h3>
                  <span className="cinema-modal-char-names">
                    {selectedUniverse.characters}
                  </span>
                </div>

                <button
                  type="button"
                  className="game-modal-close-btn-v2"
                  onClick={() => setSelectedUniverse(null)}
                  aria-label="Close cinematic universe view"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="cinema-modal-content">
                <div className="cinema-modal-theme-box">
                  <Sparkles size={18} className="cinema-modal-sparkle" />
                  <div>
                    <h4 className="cinema-modal-tagline-title">{selectedUniverse.tagline}</h4>
                    <p className="cinema-modal-theme-text">
                      “{selectedUniverse.interpretation}”
                    </p>
                  </div>
                </div>

                {/* Unique Personal Romantic Reflection */}
                <div className="cinema-modal-reflection">
                  <h4 className="cinema-modal-subheading">
                    How This Story Reminds Me of You, Manisha:
                  </h4>
                  <p className="cinema-modal-p">
                    {selectedUniverse.message}
                  </p>
                </div>
              </div>

              {/* Modal Footer Navigation */}
              <div className="cinema-modal-footer">
                <div className="cinema-modal-nav-btns">
                  <button
                    type="button"
                    className="cinema-nav-btn"
                    onClick={handlePrev}
                    aria-label="Previous Universe"
                  >
                    <ArrowLeft size={16} />
                    <span>Prev</span>
                  </button>
                  <span className="cinema-modal-nav-pos">
                    {currentIndex + 1} / {filteredUniverses.length}
                  </span>
                  <button
                    type="button"
                    className="cinema-nav-btn"
                    onClick={handleNext}
                    aria-label="Next Universe"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  className="cinema-done-btn"
                  onClick={() => setSelectedUniverse(null)}
                >
                  Return to Our Cinema
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
