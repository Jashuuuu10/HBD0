import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { whichOneIsYouQuestions, quizConclusionMessage } from '../data/games';

/**
 * GAME C — WHICH ONE IS YOU?
 * 5-question personality quiz celebrating Manisha
 */
export default function WhichOneIsYou() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = whichOneIsYouQuestions[currentIndex];

  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice);
    const answerFeedback = currentQuestion.responses[choice] || 'You are simply wonderful! ❤️';
    setFeedback(answerFeedback);
  };

  const handleNextQuestion = () => {
    if (currentIndex < whichOneIsYouQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedChoice(null);
      setFeedback(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="game-container">
      {/* Progress header */}
      <div className="game-status-bar">
        <div className="game-stat-pill">
          <Sparkles size={16} className="game-stat-icon" />
          <span>Question: <strong>{currentIndex + 1} of {whichOneIsYouQuestions.length}</strong></span>
        </div>
        <button
          type="button"
          className="game-reset-mini-btn"
          onClick={handleRestart}
          title="Restart Quiz"
        >
          <RotateCcw size={14} />
          <span>Restart</span>
        </button>
      </div>

      {!isCompleted ? (
        <div className="quiz-card-wrapper">
          {/* Question title */}
          <h4 className="quiz-question-title">{currentQuestion.question}</h4>

          {/* Choices */}
          <div className="quiz-choices-list">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice;
              return (
                <button
                  key={choice}
                  type="button"
                  className={`quiz-choice-btn ${isSelected ? 'quiz-choice-btn--selected' : ''}`}
                  onClick={() => handleSelectChoice(choice)}
                >
                  <span className="quiz-choice-indicator" />
                  <span className="quiz-choice-text">{choice}</span>
                </button>
              );
            })}
          </div>

          {/* Answer Reaction Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                className="quiz-feedback-box"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="quiz-feedback-text">
                  <Heart size={16} className="quiz-feedback-heart" />
                  {feedback}
                </p>

                <button
                  type="button"
                  className="game-action-btn quiz-next-btn"
                  onClick={handleNextQuestion}
                >
                  <span>
                    {currentIndex === whichOneIsYouQuestions.length - 1
                      ? 'See Final Reveal ✨'
                      : 'Next Question'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="game-ended-overlay">
          <div className="quiz-end-heart-wrap">
            <Heart size={44} className="game-trophy-icon" fill="#f43f5e" />
          </div>
          <h4 className="game-arena-title">My Beautiful Manisha ✨</h4>
          <div className="quiz-final-quote-card">
            <p className="game-result-quote">{quizConclusionMessage}</p>
          </div>
          <button type="button" className="game-action-btn" onClick={handleRestart}>
            <RotateCcw size={18} />
            <span>Play Quiz Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
