import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Stage1Photo from './components/Stage1Photo';
import Stage2Welcome from './components/Stage2Welcome';
import Stage3AOTWebsite from './components/Stage3AOTWebsite';

/**
 * ═══════════════════════════════════════════════════════════════════
 * Manisha's Birthday Experience — Exact 3-Screen Sequence
 * ═══════════════════════════════════════════════════════════════════
 *
 * SCREEN 1: Cinematic Introduction
 *   - Only Manisha's photograph (/assets/manisha-intro.jpg)
 *   - Edge-to-edge, slow cinematic zoom (5.5s), no UI/text
 *   - Auto-transitions to Screen 2
 *
 * SCREEN 2: The Black Message Screen
 *   - Pure black background with centered Liquid Glass card
 *   - Exact English message + "Inka Start Chedama? ❤️"
 *   - Button: "Enter Your World ✨" -> transitions to Screen 3
 *   - No auto advance
 *
 * SCREEN 3: The Main Birthday Experience
 *   - Visual theme background: public/assets/aot.PNG (clearly visible)
 *   - Rich Liquid Glass design
 *   - All sections: Universe star map, Hidden messages, 3 Games, Wish, Climax
 * ═══════════════════════════════════════════════════════════════════
 */
export default function App() {
  const [stage, setStage] = useState(1); // 1 | 2 | 3

  const handleStage1Complete = useCallback(() => {
    setStage(2);
  }, []);

  const handleStage2Start = useCallback(() => {
    setStage(3);
  }, []);

  const handleReplay = useCallback(() => {
    setStage(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Manage body scroll based on stage
  useEffect(() => {
    if (stage === 3) {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [stage]);

  return (
    <main className={`cinematic-canvas ${stage === 3 ? 'cinematic-canvas--scrollable' : ''}`}>
      <AnimatePresence mode="wait">
        {stage === 1 && (
          <Stage1Photo key="stage-1" onComplete={handleStage1Complete} />
        )}

        {stage === 2 && (
          <Stage2Welcome key="stage-2" onStart={handleStage2Start} />
        )}

        {stage === 3 && (
          <Stage3AOTWebsite key="stage-3" onReplay={handleReplay} />
        )}
      </AnimatePresence>
    </main>
  );
}
