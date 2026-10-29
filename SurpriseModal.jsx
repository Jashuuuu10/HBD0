import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles, X, RotateCcw, Wind } from 'lucide-react';
import { lockBodyScroll, unlockBodyScroll } from '../utils/lockBodyScroll';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TWO-STAGE CINEMATIC SURPRISE EXPERIENCE 🎁
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STAGE 1 — THE PERSONAL LETTER
 * An intimate, heartfelt love letter connecting our relationship to cinema
 * (Mikasa/Eren, Eleven/Mike, Roopa/Anandan, MJ/Peter Parker) naturally,
 * celebrating her smile, cute anger, childish silliness, and peace.
 *
 * STAGE 2 — THE REBUILT BIRTHDAY CAKE 🎂
 * Beautifully crafted realistic multi-tier cake (ivory frosting, blush pink,
 * cherry piping, detailed cake pedestal) with 5 individual interactive candles,
 * realistic flame fade, "Blow Out All Candles" button, and celebratory reveal.
 */
export default function SurpriseModal({ isOpen, onClose }) {
  const [surpriseStage, setSurpriseStage] = useState(1); // 1: Letter | 2: Cake
  const [candles, setCandles] = useState([true, true, true, true, true]); // 5 candles
  const [celebrationFired, setCelebrationFired] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const cakeContainerRef = useRef(null);

  // Close and reset
  const handleClose = useCallback(() => {
    setSurpriseStage(1);
    setCandles([true, true, true, true, true]);
    setCelebrationFired(false);
    onClose();
  }, [onClose]);

  // Lock scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        unlockBodyScroll();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClose]);

  const handleRelight = () => {
    setCandles([true, true, true, true, true]);
    setCelebrationFired(false);
  };

  // Blow out single candle
  const blowOutCandle = (index) => {
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  // Blow out all candles
  const blowOutAllCandles = () => {
    setCandles([false, false, false, false, false]);
  };

  const allCandlesOff = candles.every((c) => !c);

  useEffect(() => {
    if (allCandlesOff && !celebrationFired) {
      const timer = setTimeout(() => {
        setCelebrationFired(true);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [allCandlesOff, celebrationFired]);

  // Keyboard accessibility on cake scene
  const handleCakeKeyDown = (e) => {
    if (surpriseStage === 2 && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      const firstLitIdx = candles.findIndex((c) => c);
      if (firstLitIdx !== -1) {
        blowOutCandle(firstLitIdx);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="surprise-overlay-v2"
      role="dialog"
      aria-modal="true"
      aria-label="Final Birthday Surprise"
    >
      {/* Background ambient stars */}
      <div className="surprise-starfield" aria-hidden="true">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="surprise-star-dot"
            style={{
              left: `${(i * 17 + 7) % 100}%`,
              top: `${(i * 23 + 11) % 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Top Close Control */}
      <button
        type="button"
        className="surprise-close-btn-v2"
        onClick={handleClose}
        aria-label="Close surprise"
      >
        <X size={22} />
      </button>

      
      {/* STAGE 1: PERSONAL LETTER */}
      {surpriseStage === 1 && (
        <motion.div
          key="letter-stage"
          className="surprise-content-box-v2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-shine" aria-hidden="true" />

          <div className="surprise-letter-header">
            <span className="surprise-stage-badge">
              A LETTER FOR YOUR BIRTHDAY
            </span>
            <h2 className="surprise-letter-title">Dearest Manisha,</h2>
          </div>

          <div className="surprise-letter-body">
            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              My dearest Manisha, ❤️🥹 Sometimes I wonder how one person can
              mean so much to another. Your smile makes my worst days feel
              lighter, your voice calms my mind, and knowing you're in my life
              makes everything more beautiful. 🌷🤍 I can't imagine my life
              without you. 🫶🏻💗
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              If you could see yourself through my eyes, you'd understand why
              I fall for you a little more every day. 🥹💘 I love your smile,
              expressions, laugh, childish and naughty side, your anger, and
              that adorable little pout when you're annoyed. 😂❤️ I love all
              of you, exactly as you are. You never have to be perfect to be
              precious to me. 🫂💕
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              You're my favourite part of every day. 💗✨ You're the first
              person I want to tell my stories to, the person whose messages
              can change my mood, and the person I miss even when we've only
              been apart for a little while. 🥺💌 I want more conversations,
              silly arguments that end in smiles, hugs that make everything
              feel okay, and memories that belong only to us. ❤️‍🩹🌸
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              With you, I want to be someone you can always be yourself
              around. 🤍 You don't have to hide your tears, fears, or
              insecurities. I want to understand you, hold you close when life
              feels heavy, and remind you how special you are whenever you
              forget. Your happiness and dreams matter to me because you
              matter to me. 🌷🫶🏻
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              When I think about my future, I wish for more days with you.
              🥹💍 I imagine us growing together, celebrating little victories,
              laughing over silly things, and making memories we'll never
              forget. I can't promise every day will be perfect, but I promise
              to keep learning how to love you better, listen to you, stand
              beside you, and choose us even when life gets difficult. ♾️❤️
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Happy Birthday, my beautiful girl. 🎂🎀❤️ Today is your special
              day, but I feel lucky because life brought me you. I wish you
              could feel everything my heart is trying to say. When I tell
              you I love you, I mean that your happiness matters to me, your
              pain matters to me, and there will always be a special place
              in my heart that belongs to you. 🥹💗
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
            >
              I hope this new year of your life brings you happiness,
              beautiful opportunities, peaceful days, and countless reasons
              to smile. 🌸✨ Through all the birthdays, changes, and ordinary
              moments life brings us, I hope I get to keep holding your hand
              and reminding you how deeply you are loved. 🫶🏻💞
            </motion.p>

            <motion.p
              className="surprise-letter-p"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              I love you, Manisha. ❤️ More than I know how to explain and
              more than these words can hold. No matter how many times I say
              it, there will always be more love left in my heart for you.
              Today, tomorrow, and every day I get to love you, I'll be
              grateful that it's you. ♾️🥹💗
              <br /><br />
              Forever yours, my love. 🫂❤️‍🩹
            </motion.p>
          </div>

          <motion.div
            className="surprise-letter-closing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35 }}
          >
            <p className="surprise-letter-signoff">
              Happy Birthday, my beautiful girl, na bangaram. ❤️
            </p>
            <span className="surprise-letter-signature">
              Always yours, with all my love.
            </span>
          </motion.div>

          <motion.div
            className="surprise-stage1-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <button
              type="button"
              className="hero-btn-primary-v2 surprise-cta-btn"
              onClick={() => setSurpriseStage(2)}
            >
              <Sparkles size={18} />
              <span>Make a Birthday Wish 🎂</span>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STAGE 2: REBUILT REALISTIC BIRTHDAY CAKE EXPERIENCE 🎂
         ═══════════════════════════════════════════════════════════════════ */}
      {surpriseStage === 2 && (
        <motion.div
          key="cake-stage"
          className="surprise-cake-container-v2"
          ref={cakeContainerRef}
          tabIndex={0}
          onKeyDown={handleCakeKeyDown}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-shine" aria-hidden="true" />
          <div className="cake-spotlight" aria-hidden="true" />

          {/* Headings */}
          <div className="cake-header-block">
            <h3 className="cake-main-heading">Make a wish, Manisha.</h3>
            <p className="cake-sub-heading">Some wishes are too precious to say out loud.</p>
          </div>

          {/* Illustrated Multi-Layer Cake with Pedestal & Interactive Candles */}
          <div className="cake-stage-art-wrap">
            {/* Candles Array */}
            <div className="cake-candles-array" role="group" aria-label="Birthday candles">
              {candles.map((isLit, idx) => (
                <button
                  key={`candle-${idx}`}
                  type="button"
                  className={`realistic-candle ${isLit ? 'realistic-candle--lit' : 'realistic-candle--out'}`}
                  onClick={() => blowOutCandle(idx)}
                  aria-label={`Candle ${idx + 1}: ${isLit ? 'Lit. Tap to extinguish.' : 'Extinguished.'}`}
                  disabled={!isLit}
                >
                  {/* Candle Flame */}
                  <div className="candle-flame-zone">
                    {isLit ? (
                      <div className="realistic-flame">
                        <span className="flame-outer" />
                        <span className="flame-inner" />
                        <span className="flame-halo" />
                      </div>
                    ) : (
                      <div className="realistic-smoke">
                        <span className="smoke-wisp" />
                      </div>
                    )}
                  </div>

                  {/* Wick */}
                  <div className="candle-wick-realistic" />

                  {/* Candle Wax Stick (Blush pink & pearl stripes) */}
                  <div className="candle-body-realistic">
                    <div className="candle-wax-highlight" />
                  </div>
                </button>
              ))}
            </div>

            {/* SVG Illustrated Multi-Tier Cake with Depth, Stand, and Details */}
            <svg
              className="cake-vector-art"
              viewBox="0 0 380 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                {/* Gradients for Cake Stand */}
                <linearGradient id="standGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="60%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>

                {/* Top Tier (Blush Pink Frosting) */}
                <linearGradient id="topTierGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fdf2f8" />
                  <stop offset="40%" stopColor="#fbcfe8" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>

                {/* Middle Tier (Ivory & Warm Cream) */}
                <linearGradient id="midTierGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>

                {/* Bottom Tier (Deep Velvet & Cherry Accents) */}
                <linearGradient id="botTierGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>

                {/* Shadow Gradient */}
                <radialGradient id="cakeShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Base Drop Shadow on table */}
              <ellipse cx="190" cy="225" rx="140" ry="12" fill="url(#cakeShadow)" />

              {/* ─── CAKE STAND ─── */}
              {/* Stand Pedestal Base */}
              <path
                d="M135 224C135 218 155 214 190 214C225 214 245 218 245 224L240 228C240 229 215 232 190 232C165 232 140 229 140 228Z"
                fill="url(#standGrad)"
              />
              <path d="M178 214H202L200 188H180L178 214Z" fill="url(#standGrad)" />
              {/* Stand Plate Top */}
              <ellipse cx="190" cy="188" rx="165" ry="14" fill="#e2e8f0" />
              <ellipse cx="190" cy="186" rx="160" ry="12" fill="url(#standGrad)" />

              {/* ─── BOTTOM TIER ─── */}
              {/* Bottom tier body */}
              <path
                d="M50 148C50 148 50 178 50 178C50 190 110 196 190 196C270 196 330 190 330 178C330 178 330 148 330 148Z"
                fill="url(#botTierGrad)"
              />
              {/* Bottom tier top rim */}
              <ellipse cx="190" cy="148" rx="140" ry="15" fill="#fecdd3" />
              {/* Bottom tier decorative cherry pearls */}
              <circle cx="85" cy="178" r="4" fill="#881337" />
              <circle cx="120" cy="184" r="4" fill="#881337" />
              <circle cx="155" cy="187" r="4" fill="#881337" />
              <circle cx="190" cy="188" r="4.5" fill="#881337" />
              <circle cx="225" cy="187" r="4" fill="#881337" />
              <circle cx="260" cy="184" r="4" fill="#881337" />
              <circle cx="295" cy="178" r="4" fill="#881337" />

              {/* ─── MIDDLE TIER ─── */}
              {/* Middle tier body */}
              <path
                d="M85 96C85 96 85 138 85 138C85 148 130 154 190 154C250 154 295 148 295 138C295 138 295 96 295 96Z"
                fill="url(#midTierGrad)"
              />
              {/* Middle tier top rim */}
              <ellipse cx="190" cy="96" rx="105" ry="12" fill="#fffbeb" />
              {/* Middle tier decorative scallop piping */}
              <path
                d="M85 110Q95 120 105 112Q115 122 125 113Q135 123 145 114Q155 124 165 115Q175 125 185 116Q195 125 205 116Q215 124 225 115Q235 123 245 114Q255 122 265 113Q275 120 285 112Q295 118 295 110"
                stroke="#f59e0b"
                strokeWidth="2.5"
                fill="none"
              />

              {/* ─── TOP TIER ─── */}
              {/* Top tier body */}
              <path
                d="M120 48C120 48 120 90 120 90C120 98 150 102 190 102C230 102 260 98 260 90C260 90 260 48 260 48Z"
                fill="url(#topTierGrad)"
              />
              {/* Top tier top rim */}
              <ellipse cx="190" cy="48" rx="70" ry="9" fill="#fdf2f8" />
              {/* Ivory Frosting Drips on Top Tier */}
              <path
                d="M120 52C123 60 126 65 130 55C135 68 140 72 145 56C150 70 158 75 165 57C172 72 180 78 190 58C200 78 208 72 215 57C222 75 230 70 235 56C240 72 245 68 250 55C254 65 257 60 260 52"
                fill="#ffffff"
                opacity="0.9"
              />
              {/* Golden edible sparkle stars */}
              <circle cx="150" cy="75" r="2" fill="#fbbf24" />
              <circle cx="170" cy="82" r="2.5" fill="#fbbf24" />
              <circle cx="190" cy="85" r="3" fill="#fbbf24" />
              <circle cx="210" cy="82" r="2.5" fill="#fbbf24" />
              <circle cx="230" cy="75" r="2" fill="#fbbf24" />
            </svg>
          </div>

          {/* Controls: Blow Out All / Relight / Back */}
          <div className="cake-action-bar">
            {!allCandlesOff && (
              <button
                type="button"
                className="cake-blow-btn-v2"
                onClick={blowOutAllCandles}
              >
                <Wind size={18} />
                <span>Blow Out All Candles 💨</span>
              </button>
            )}

            {allCandlesOff && (
              <button
                type="button"
                className="cake-relight-btn-v2"
                onClick={handleRelight}
              >
                <RotateCcw size={16} />
                <span>Relight Candles 🎂</span>
              </button>
            )}

            <button
              type="button"
              className="cake-return-btn-v2"
              onClick={handleClose}
            >
              <span>Back to Website</span>
            </button>
          </div>

          {/* Short, Intimate Final Celebration Reveal Message */}
          <AnimatePresence>
            {allCandlesOff && (
              <motion.div
                className="cake-celebration-box"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                  {!prefersReducedMotion && (
                    <div className="cake-particles-field" aria-hidden="true">
                      {[...Array(14)].map((_, i) => (
                        <span
                          key={i}
                          className="cake-confetti-dot"
                          style={{
                            left: `${8 + i * 6.5}%`,
                            top: `${(i % 3) * 20}%`,
                            animationDelay: `${(i % 4) * 0.25}s`,
                          }}
                        >
                          {i % 2 === 0 ? '✨' : '💖'}
                        </span>
                      ))}
                    </div>
                  )}

                <div className="cake-intimate-wish-card">
                  <div className="cake-wish-heart-glow">
                    <Heart size={32} fill="#f43f5e" color="#fecdd3" />
                  </div>

                  <p className="cake-intimate-wish-text">
                    Wish for everything your heart is quietly hoping for, Manisha.
                    I hope this next chapter gives you reasons to laugh until your cheeks hurt,
                    courage for the days that feel heavy, and people who remind you how special
                    you are. And I hope I get to share many of those little moments with you.
                  </p>

                  <p className="cake-intimate-signoff">
                    Happy Birthday, my love. ❤️
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
