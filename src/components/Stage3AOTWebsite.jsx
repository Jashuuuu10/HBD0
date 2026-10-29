import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import OurStory from './OurStory';
import OurCinema from './OurCinema';
import ReasonsSection from './ReasonsSection';
import MemoriesGallery from './MemoriesGallery';
import RememberedMoments from './RememberedMoments';
import GamesSection from './GamesSection';
import MakeAWish from './MakeAWish';
import SurpriseModal from './SurpriseModal';
import BirthdayWishModal from './BirthdayWishModal';
import Footer from './Footer';

/**
 * SCREEN 3: THE MAIN BIRTHDAY EXPERIENCE
 *
 * Requirements:
 * - Full-page visible theme background using public/assets/aot.PNG
 * - Artwork remains clearly recognizable while text is readable
 * - Custom Liquid Glass design system
 * - Integrates all features:
 *   1. Feature One: Our Cinema — Parallel Universes (36 films & series)
 *   2. Feature Two: The Little Things I Remember (14 editable memory reflections)
 *   3. Feature Three: Three Functional Mini-Games (including "Finish Our Love Story")
 *   4. Feature Four: Interactive Make a Wish
 *   5. Feature Five: Two-Stage Cinematic Surprise & Rebuilt Birthday Cake
 *   - Our Story, 100 Little Reasons I Love You, Memories Gallery, Birthday Letter
 */
export default function Stage3AOTWebsite({ onReplay }) {
  const prefersReducedMotion = useReducedMotion();

  // Modals state
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

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
      />

      {/* ─── 3. Main Scrollable Sections ─── */}
      <main className="stage-3-main-content">
        {/* Hero Section */}
        <HeroSection
          onOpenSurprise={() => setSurpriseOpen(true)}
        />

        {/* Our Story Milestones */}
        <OurStory />

        {/* Feature 1: Our Cinema — Parallel Universes */}
        <OurCinema />

        {/* 100 Little Reasons I Love You */}
        <ReasonsSection />

        {/* Memories Gallery */}
        <MemoriesGallery />

        {/* Feature 2: The Little Things I Remember */}
        <RememberedMoments />

        {/* Feature 3: Three Mini-Games */}
        <GamesSection />

        {/* Feature 4: Interactive Make a Wish */}
        <MakeAWish />

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
      {/* Feature 5: Two-Stage Final Surprise Modal & Rebuilt Cake */}
      <SurpriseModal
        isOpen={surpriseOpen}
        onClose={() => setSurpriseOpen(false)}
      />

      {/* Birthday Letter Modal */}
      <BirthdayWishModal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
      />
    </div>
  );
}
