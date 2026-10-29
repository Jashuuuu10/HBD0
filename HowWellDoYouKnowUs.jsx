import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight, Heart, Award } from 'lucide-react';
import { relationshipQuizQuestions, quizConclusionMessage } from '../../data/games';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GAME B — HOW WELL DO YOU KNOW US? 🎬
 * ═══════════════════════════════════════════════════════════════════════════
 * Interactive relationship quiz:
 * - 9 editable questions with playful options ("You", "Manisha", "Both")
 * - Visible progress bar
 * - Animated explanation cards for each selection
 * - Fun, heartwarming couple personality result + replay
 */
export default function HowWellDoYouKnowUs({ onClose: _onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = relationshipQuizQuestions[currentIndex];
  const totalQuestions = relationshipQuizQuestions.length;
  const progressPercent = Math.round(((currentIndex + (showExplanation ? 1 : 0)) / totalQuestions) * 100);

  const handleSelectChoice = (choice) => {
    setSelectedOption(choice);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setIsFinished(false);
  };

  return (
    <div className="quiz-game-container">
      {/* Quiz Progress & Stats Bar */}
      <div className="quiz-status-bar">
        <div className="quiz-status-info">
          <span className="quiz-question-counter">
            Question <strong>{currentIndex + 1}</strong> of {totalQuestions}
          </span>
          <span className="quiz-progress-text">{progressPercent}% complete</span>
        </div>
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {!isFinished ? (
        <div className="quiz-active-card">
          {/* Question Text */}
          <h4 className="quiz-card-question">{currentQ.question}</h4>

          {/* Choices List */}
          <div className="quiz-options-list">
            {currentQ.choices.map((choice, idx) => {
              const isSelected = selectedOption?.text === choice.text;
              return (
                <button
                  key={`${choice.text}-${idx}`}
                  type="button"
                  className={`quiz-option-button ${isSelected ? 'quiz-option-button--selected' : ''}`}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={showExplanation}
                >
                  <span className="quiz-option-letter">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="quiz-option-text">{choice.text}</span>
                  {isSelected && <Heart size={16} className="quiz-option-selected-heart" fill="#f43f5e" />}
                </button>
              );
            })}
          </div>

          {/* Reveal Commentary */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="quiz-commentary-box"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="quiz-commentary-text">
                  <Sparkles size={16} className="quiz-commentary-sparkle" />
                  <p>{currentQ.explanation}</p>
                </div>

                <button
                  type="button"
                  className="quiz-next-action-btn"
                  onClick={handleNextQuestion}
                >
                  <span>
                    {currentIndex === totalQuestions - 1
                      ? 'Reveal Our Verdict ✨'
                      : 'Next Question'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Final Result Reveal Screen */
        <motion.div
          className="quiz-result-screen"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="quiz-result-trophy">
            <Award size={48} className="quiz-trophy-icon" />
          </div>

          <span className="quiz-result-badge">CERTIFIED BEST TEAM EVER ❤️</span>
          <h4 className="quiz-result-heading">The Manisha & Me Verdict</h4>

          <div className="quiz-result-quote-card">
            <p className="quiz-result-quote-text">{quizConclusionMessage}</p>
          </div>

          <div className="quiz-result-actions">
            <button
              type="button"
              className="hero-btn-primary-v2"
              onClick={handleRestart}
            >
              <RotateCcw size={18} />
              <span>Play Quiz Again</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
