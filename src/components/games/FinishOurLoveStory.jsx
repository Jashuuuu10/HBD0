import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, Heart, BookOpen, Check } from 'lucide-react';
import { storyDecisions, storyEndings } from '../../data/storyGame';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GAME C — FINISH OUR LOVE STORY ✍️❤️
 * ═══════════════════════════════════════════════════════════════════════════
 * Replaces "Choose Our Movie Universe".
 * Interactive romantic story-building game:
 * - 5 sequential decision points
 * - Choices determine the accumulated story path
 * - Evaluates choices to reveal 1 of 4 distinct endings:
 *   1. The Quiet Kind of Forever
 *   2. Across Every Universe
 *   3. The Unexpected Cinema
 *   4. A Love That Keeps Growing
 */
export default function FinishOurLoveStory({ onClose: _onClose }) {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4 (decisions), 5 (final reveal)
  const [selectedChoices, setSelectedChoices] = useState([]); // array of chosen options
  const [activeChoice, setActiveChoice] = useState(null);

  const totalSteps = storyDecisions.length;
  const decision = storyDecisions[currentStep];

  const handleSelectOption = (choice) => {
    setActiveChoice(choice);
  };

  const handleNextStep = () => {
    if (!activeChoice) return;

    const nextChoices = [...selectedChoices, activeChoice];
    setSelectedChoices(nextChoices);
    setActiveChoice(null);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setCurrentStep(totalSteps); // Move to ending reveal screen
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const prevChoices = [...selectedChoices];
      prevChoices.pop();
      setSelectedChoices(prevChoices);
      setActiveChoice(null);
      setCurrentStep((s) => s - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedChoices([]);
    setActiveChoice(null);
  };

  // Determine which ending was earned based on choices made
  const determineEnding = () => {
    const traitCounts = { quiet: 0, universe: 0, cinema: 0, growth: 0 };
    selectedChoices.forEach((c) => {
      if (traitCounts[c.trait] !== undefined) {
        traitCounts[c.trait]++;
      }
    });

    let topTrait = 'quiet';
    let maxCount = -1;
    for (const [trait, count] of Object.entries(traitCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topTrait = trait;
      }
    }

    return storyEndings[topTrait] || storyEndings.quiet;
  };

  const isEndingScreen = currentStep >= totalSteps;
  const finalEnding = isEndingScreen ? determineEnding() : null;

  return (
    <div className="story-game-container">
      {/* Progress Bar & Header */}
      <div className="story-game-status-bar">
        <div className="story-game-status-info">
          <span className="story-game-step-counter">
            <BookOpen size={15} />
            {isEndingScreen ? (
              <span>Story Complete ✨</span>
            ) : (
              <span>Chapter <strong>{currentStep + 1}</strong> of {totalSteps}</span>
            )}
          </span>
          <span className="story-game-progress-pct">
            {isEndingScreen ? '100%' : `${Math.round((currentStep / totalSteps) * 100)}% Written`}
          </span>
        </div>
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-bar"
            style={{ width: `${(Math.min(currentStep, totalSteps) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {!isEndingScreen ? (
        <div className="story-step-card">
          <span className="story-step-badge">DECISION POINT {decision.step}</span>
          <h4 className="story-step-prompt">{decision.prompt}</h4>
          <p className="story-step-intro">{decision.intro}</p>

          {/* Options */}
          <div className="story-choices-list">
            {decision.choices.map((choice) => {
              const isSelected = activeChoice?.id === choice.id;

              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`story-choice-btn ${isSelected ? 'story-choice-btn--selected' : ''}`}
                  onClick={() => handleSelectOption(choice)}
                >
                  <div className="story-choice-radio">
                    {isSelected ? <Check size={14} /> : null}
                  </div>
                  <div className="story-choice-text-wrap">
                    <span className="story-choice-label">{choice.label}</span>
                    {isSelected && (
                      <motion.p
                        className="story-choice-narrative-preview"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.25 }}
                      >
                        “{choice.narrative}”
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="story-step-controls">
            {currentStep > 0 && (
              <button
                type="button"
                className="cinema-nav-btn"
                onClick={handlePrevStep}
              >
                <ArrowLeft size={16} />
                <span>Previous Chapter</span>
              </button>
            )}

            <button
              type="button"
              className="hero-btn-primary-v2 story-next-btn"
              onClick={handleNextStep}
              disabled={!activeChoice}
            >
              <span>{currentStep === totalSteps - 1 ? 'Reveal Our Ending ✨' : 'Continue Story'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Ending Screen */
        <motion.div
          className="story-ending-view"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            '--ending-accent': finalEnding.accentColor,
          }}
        >
          <div className="story-ending-halo">
            <span className="story-ending-symbol" aria-hidden="true">
              {finalEnding.symbol}
            </span>
          </div>

          <span className="story-ending-badge">{finalEnding.badge}</span>
          <h3 className="story-ending-title">{finalEnding.title}</h3>

          <div className="story-ending-desc-box">
            <Heart size={20} className="story-ending-heart" fill="#f43f5e" />
            <p className="story-ending-desc-text">
              {finalEnding.description}
            </p>
          </div>

          {/* Chapters Recap */}
          <div className="story-chapters-recap">
            <h5 className="story-recap-heading">How Our Story Unfolded:</h5>
            <div className="story-recap-list">
              {selectedChoices.map((c, i) => (
                <div key={i} className="story-recap-item">
                  <span className="story-recap-num">{i + 1}</span>
                  <p className="story-recap-narrative">{c.narrative}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="story-ending-actions">
            <button
              type="button"
              className="hero-btn-primary-v2"
              onClick={handleRestart}
            >
              <RotateCcw size={18} />
              <span>Write Another Love Story</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
