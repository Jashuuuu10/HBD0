import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Heart } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Responsive Liquid Glass Navbar for Screen 3
 * ═══════════════════════════════════════════════════════════════════════════
 * Navigation links:
 * - For Manisha
 * - Home
 * - Our Story
 * - Our Cinema
 * - 100 Reasons
 * - Memories ("The Little Things I Remember")
 * - Games
 * - Make a Wish
 * - Read Letter (Action)
 * - Surprise (Action)
 */
export default function Navbar({ onOpenSurprise, onOpenLetter }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'For Manisha', href: '#hero' },
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Our Cinema', href: '#our-cinema' },
    { label: '100 Reasons', href: '#reasons' },
    { label: 'Memories', href: '#little-things' },
    { label: 'Games', href: '#games' },
    { label: 'Make a Wish', href: '#make-a-wish' },
  ];

  // Observe active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'our-story', 'our-cinema', 'reasons', 'memories', 'little-things', 'games', 'make-a-wish'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="navbar-v2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-v2__inner">
        {/* Brand */}
        <a
          href="#hero"
          className="navbar-v2__brand"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <div className="navbar-v2__logo-icon" aria-hidden="true">
            <Heart size={18} className="navbar-heart-icon" />
          </div>
          <span className="navbar-v2__brand-text">MANISHA &bull; 2027</span>
        </a>

        {/* Desktop Nav Pill */}
        <nav className="navbar-v2__nav-pill" aria-label="Main Navigation">
          {navItems.map((item, idx) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId || (sectionId === 'hero' && activeSection === '');
            return (
              <a
                key={`${item.label}-${idx}`}
                href={item.href}
                className={`navbar-v2__link ${isActive ? 'navbar-v2__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="navbar-v2__actions">
          {onOpenLetter && (
            <button
              className="navbar-v2__pill-btn navbar-v2__pill-btn--letter"
              type="button"
              onClick={onOpenLetter}
              title="Read Birthday Letter"
            >
              <span>Read Letter 💌</span>
            </button>
          )}

          {onOpenSurprise && (
            <button
              className="navbar-v2__surprise-btn"
              type="button"
              onClick={onOpenSurprise}
              title="A Little Surprise"
            >
              <Sparkles size={16} />
              <span>Surprise ✨</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="navbar-v2__mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="navbar-v2__mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="navbar-v2__mobile-links">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-${item.label}-${idx}`}
                  href={item.href}
                  className="navbar-v2__mobile-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <div className="navbar-v2__mobile-ctas">
                {onOpenLetter && (
                  <button
                    className="navbar-v2__mobile-cta-btn"
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLetter();
                    }}
                  >
                    Read Birthday Letter 💌
                  </button>
                )}
                {onOpenSurprise && (
                  <button
                    className="navbar-v2__mobile-cta-btn navbar-v2__mobile-cta-btn--primary"
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSurprise();
                    }}
                  >
                    A Little Surprise ✨
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
