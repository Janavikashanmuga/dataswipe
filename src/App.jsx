import React, { useState, useEffect, useCallback } from "react";
import { DECKS } from "./data/cards";
import SwipeCard from "./components/SwipeCard";
import DeckSelector from "./components/DeckSelector";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Flame,
  ArrowLeft,
  LayoutGrid,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  // Persistent metrics
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem("dataswipe_xp") || "0", 10);
  });

  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("dataswipe_streak") || "1", 10);
  });

  const [completedDeckIds, setCompletedDeckIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dataswipe_completed") || "[]");
    } catch {
      return [];
    }
  });

  // Session state
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // Track correct swipes per round

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("dataswipe_xp", score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem("dataswipe_streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("dataswipe_completed", JSON.stringify(completedDeckIds));
  }, [completedDeckIds]);

  const activeCard = selectedDeck ? selectedDeck.cards[currentIndex] : null;
  const nextCard = selectedDeck ? selectedDeck.cards[currentIndex + 1] : null;
  const isDeckFinished = selectedDeck
    ? currentIndex >= selectedDeck.cards.length
    : false;

  // Passing criteria: at least 80% correct
  const passingScoreNeeded = selectedDeck
    ? Math.ceil(selectedDeck.cards.length * 0.8)
    : 0;
  const isMastered = selectedDeck ? correctCount >= passingScoreNeeded : false;

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    setCurrentIndex(0);
    setCorrectCount(0);
    setFeedback(null);
  };

  const handleBackToDecks = () => {
    setSelectedDeck(null);
    setCurrentIndex(0);
    setCorrectCount(0);
    setFeedback(null);
  };

  const handleSwipe = useCallback(
    (direction) => {
      if (!activeCard || feedback) return;

      const chosenOption =
        direction === "right" ? activeCard.right : activeCard.left;
      const isCorrect = chosenOption.isCorrect;

      if (isCorrect) {
        setScore((prev) => prev + 10);
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => Math.max(prev, 1));
      }

      setFeedback({
        isCorrect,
        explanation: activeCard.explanation,
        choice: chosenOption.label,
      });
    },
    [activeCard, feedback]
  );

  const handleNextCard = useCallback(() => {
    setFeedback(null);
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);

    // If all cards finished
    if (nextIdx === selectedDeck.cards.length) {
      const willPass = correctCount >= passingScoreNeeded;
      if (willPass) {
        if (!completedDeckIds.includes(selectedDeck.id)) {
          setCompletedDeckIds((prev) => [...prev, selectedDeck.id]);
        }
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  }, [currentIndex, selectedDeck, correctCount, passingScoreNeeded, completedDeckIds]);

  const restartDeck = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setFeedback(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (feedback) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNextCard();
        }
        return;
      }

      if (selectedDeck && !isDeckFinished) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleSwipe("left");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleSwipe("right");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, selectedDeck, isDeckFinished, handleSwipe, handleNextCard]);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between items-center p-4">
      {/* Top Header */}
      <header className="w-full max-w-md flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          {selectedDeck ? (
            <button
              onClick={handleBackToDecks}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Decks</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
                <LayoutGrid className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-sm text-slate-200 tracking-wide">
                DataSwipe
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{streak}d</span>
            </div>
            <div className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-medium">
              {score} XP
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        {selectedDeck && (
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700/60">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{
                width: `${(currentIndex / selectedDeck.cards.length) * 100}%`,
              }}
            />
          </div>
        )}
      </header>

      {/* Main View */}
      <section className="w-full max-w-md flex-1 flex flex-col items-center justify-center my-4">
        {!selectedDeck ? (
          <DeckSelector
            decks={DECKS}
            completedDeckIds={completedDeckIds}
            onSelectDeck={handleSelectDeck}
          />
        ) : !isDeckFinished ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-center mb-3">
              <h1 className="text-lg font-bold text-slate-200">
                {selectedDeck.title}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Card {currentIndex + 1} of {selectedDeck.cards.length}
              </p>
            </div>

            <SwipeCard
              key={activeCard.id}
              card={activeCard}
              nextCard={nextCard}
              onSwipe={handleSwipe}
              disabled={Boolean(feedback)}
            />
          </div>
        ) : (
          /* Completion Screen with Mastery Validation */
          <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center flex flex-col items-center shadow-xl animate-in zoom-in-95 duration-200">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${
                isMastered
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-400 border-amber-500/30"
              }`}
            >
              {isMastered ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>

            <h2 className="text-2xl font-bold text-slate-100">
              {isMastered ? "Deck Mastered!" : "Needs Review"}
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              You scored <span className="font-semibold text-slate-200">{correctCount}</span> out of{" "}
              <span className="font-semibold text-slate-200">{selectedDeck.cards.length}</span> correct.
              {!isMastered && (
                <span className="block text-xs text-amber-300/80 mt-1">
                  You need at least {passingScoreNeeded} correct answers to earn the Mastered badge.
                </span>
              )}
            </p>

            <div className="w-full flex flex-col gap-2 mt-6">
              <button
                onClick={restartDeck}
                className={`w-full py-3 text-white rounded-xl text-sm font-semibold transition-colors shadow-md flex items-center justify-center gap-2 ${
                  isMastered ? "bg-slate-700 hover:bg-slate-600" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={handleBackToDecks}
                className="w-full py-2.5 bg-slate-700/40 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Back to Decks
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Slide-Up Feedback Bottom Sheet */}
      {feedback && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-end justify-center z-50 p-4">
          <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
              )}
              <div>
                <h3
                  className={`font-bold text-base ${
                    feedback.isCorrect ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {feedback.isCorrect ? "Spot on! (+10 XP)" : "Not quite right"}
                </h3>
                <p className="text-xs text-slate-400">
                  Your selection:{" "}
                  <span className="font-semibold text-slate-200">
                    {feedback.choice}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-700/50">
              {feedback.explanation}
            </p>

            <button
              onClick={handleNextCard}
              className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                feedback.isCorrect
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              <span>Continue</span>
              <kbd className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-white/90">
                Space ↵
              </kbd>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}