import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import OurStory from './OurStory';
import OurCinema from './OurCinema';
import ReasonsSection from './ReasonsSection';
import MemoriesGallery from './MemoriesGallery';
import HiddenMessages from './HiddenMessages';
import GamesSection from './GamesSection';
import MakeAWish from './MakeAWish';
import SurpriseModal from './SurpriseModal';
import BirthdayWishModal from './BirthdayWishModal';
import Footer from './Footer';
import { hiddenMessages } from '../data/messages';

/**
 * SCREEN 3: THE MAIN BIRTHDAY EXPERIENCE
 *
 * Requirements:
 * - Full-page visible theme background using public/assets/aot.PNG
 * - Artwork remains clearly recognizable while text is readable
 * - Custom Liquid Glass design system
 * - Integrates all features and retained sections:
 *   1. Feature One: Our Cinema — Parallel Universes
 *   2. Feature Two: Hidden Romantic Messages (8 secrets)
 *   3. Feature Three: Three Functional Mini-Games
 *   4. Feature Four: Interactive Make a Wish
 *   5. Feature Five: Two-Stage Cinematic Surprise & Birthday Cake
 *   - Our Story, 100 Little Reasons I Love You, Memories Gallery, Birthday Letter
 */
export default function Stage3AOTWebsite({ onReplay }) {
  const prefersReducedMotion = useReducedMotion();

  // Session state for secrets
  const [discoveredSecretIds, setDiscoveredSecretIds] = useState([]);
  const [activeSecretModal, setActiveSecretModal] = useState(null);

  // Modals state
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  // Hidden secret discovery callback
  const handleDiscoverSecret = useCallback((secretId) => {
    setDiscoveredSecretIds((prev) => (prev.includes(secretId) ? prev : [...prev, secretId]));
    const foundSecret = hiddenMessages.find((m) => m.id === secretId);
    if (foundSecret) {
      setActiveSecretModal(foundSecret);
    }
  }, []);

  return (
    <div className="stage-3-page">
      {/* ─── 1. Persistent Visible AOT Theme Background Layer ─── */}
      <div className="stage-3-fixed-bg" aria-hidden="true">
        <motion.img
          className="stage-3-fixed-bg__img"
          src="/assets/aot.PNG"
          alt="Attack on Titan Sunset Theme Vista for Manisha"
          initial={{ scale: 1.04 }}
          animate={
            prefersReducedMotion
              ? { scale: 1.0 }
              : {
                  scale: [1.04, 1.01, 1.03],
                  transition: {
                    duration: 28,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  },
                }
          }
        />

        {/* Cinematic translucent ocean-teal gradient vignettes that keep art visible */}
        <div className="stage-3-fixed-bg__overlay" />
        <div className="stage-3-fixed-bg__glow" />
      </div>

      {/* ─── 2. Top Navigation Bar ─── */}
      <Navbar
        onOpenSurprise={() => setSurpriseOpen(true)}
        onOpenLetter={() => setLetterOpen(true)}
        secretCount={discoveredSecretIds.length}
      />

      {/* ─── 3. Main Scrollable Sections ─── */}
      <main className="stage-3-main-content">
        {/* Hero Section */}
        <HeroSection
          onOpenSurprise={() => setSurpriseOpen(true)}
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* Our Story Milestones */}
        <OurStory
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* Feature 1: Our Cinema — Parallel Universes */}
        <OurCinema
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* 100 Little Reasons I Love You */}
        <ReasonsSection
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* Memories Gallery */}
        <MemoriesGallery
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* Feature 2: Hidden Romantic Messages Drawer / Tracker */}
        <HiddenMessages
          discoveredSecretIds={discoveredSecretIds}
          onDiscoverSecret={handleDiscoverSecret}
          activeSecretModal={activeSecretModal}
          onCloseSecretModal={() => setActiveSecretModal(null)}
        />

        {/* Feature 3: Three Mini-Games */}
        <GamesSection
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* Feature 4: Interactive Make a Wish */}
        <MakeAWish
          onDiscoverSecret={handleDiscoverSecret}
          discoveredSecretIds={discoveredSecretIds}
        />

        {/* Climax Call-To-Action Card Before Footer */}
        <section className="climax-trigger-section">
          <div className="climax-trigger-card">
            <div className="glass-shine" aria-hidden="true" />
            <h2 className="climax-trigger-title">One Last Thing For You... ✨</h2>
            <p className="climax-trigger-desc">
              Whenever you are ready, step inside the final surprise I prepared for your
              birthday.
            </p>
            <button
              type="button"
              className="hero-btn-primary-v2"
              onClick={() => setSurpriseOpen(true)}
            >
              <span>Open Final Surprise</span>
              <span className="hero-btn-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </section>
      </main>

      {/* ─── 4. Footer ─── */}
      <Footer onReplay={onReplay} />

      {/* ─── 5. Modals ─── */}
      {/* Feature 5: Final Cinematic Surprise Modal */}
      <SurpriseModal
        isOpen={surpriseOpen}
        onClose={() => setSurpriseOpen(false)}
        onDiscoverSecret={handleDiscoverSecret}
        discoveredSecretIds={discoveredSecretIds}
      />

      {/* Birthday Letter Modal */}
      <BirthdayWishModal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
      />
    </div>
  );
}

