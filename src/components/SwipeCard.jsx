import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function SwipeCard({ card, nextCard, onSwipe, disabled }) {
  const [exitDirection, setExitDirection] = useState(null);
  const x = useMotionValue(0);

  // Dynamic rotation and indicator opacity on drag
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
  const leftOpacity = useTransform(x, [-120, -30], [1, 0]);
  const rightOpacity = useTransform(x, [30, 120], [0, 1]);

  // Reset internal exit state when the card changes
  useEffect(() => {
    setExitDirection(null);
    x.set(0);
  }, [card?.id]);

  const handleDragEnd = (_, info) => {
    if (disabled || exitDirection) return;
    const threshold = 85;
    if (info.offset.x > threshold) {
      triggerSwipe("right");
    } else if (info.offset.x < -threshold) {
      triggerSwipe("left");
    }
  };

  const triggerSwipe = (dir) => {
    if (disabled || exitDirection) return;
    setExitDirection(dir);
    onSwipe(dir);
  };

  return (
    <div className="relative w-full max-w-sm h-[440px] flex items-center justify-center">
      {/* 1. Underlying Stack "Ghost" Card (shows depth) */}
      {nextCard && (
        <div
          aria-hidden="true"
          className="absolute w-full h-[410px] bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between select-none pointer-events-none transition-transform duration-300 transform translate-y-3 scale-95 opacity-60"
        >
          <div className="flex justify-between items-center opacity-30">
            <span className="text-xs uppercase font-semibold text-slate-400">← {nextCard.left.label}</span>
            <span className="text-xs uppercase font-semibold text-slate-400">{nextCard.right.label} →</span>
          </div>
          <div className="my-auto text-center px-4 opacity-40">
            <p className="text-lg font-medium text-slate-300 line-clamp-3">
              "{nextCard.scenario}"
            </p>
          </div>
          <div className="w-full h-8 opacity-20 border-t border-slate-700" />
        </div>
      )}

      {/* 2. Top Active Interactive Card */}
      <motion.div
        className="absolute w-full h-[420px] bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing select-none z-10"
        style={{ x, rotate }}
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        animate={
          exitDirection === "left"
            ? { x: -460, opacity: 0, rotate: -25 }
            : exitDirection === "right"
            ? { x: 460, opacity: 0, rotate: 25 }
            : { x: 0, opacity: 1 }
        }
        transition={{ duration: 0.22 }}
      >
        {/* Top Badges */}
        <div className="flex justify-between items-center w-full pointer-events-none">
          <motion.div
            style={{ opacity: leftOpacity }}
            className="px-3 py-1 bg-rose-500/20 border border-rose-500 text-rose-300 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            ← {card.left.label}
          </motion.div>
          <motion.div
            style={{ opacity: rightOpacity }}
            className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            {card.right.label} →
          </motion.div>
        </div>

        {/* Card Scenario */}
        <div className="my-auto text-center px-2 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-700/60 text-slate-300 rounded-full text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Classify the scenario</span>
          </div>
          <p className="text-xl font-medium leading-relaxed text-slate-100">
            "{card.scenario}"
          </p>
        </div>

        {/* Bottom Actions with Keyboard Hints */}
        <div className="w-full flex items-center justify-between gap-3 pt-4 border-t border-slate-700/50">
          <button
            type="button"
            disabled={disabled}
            onClick={() => triggerSwipe("left")}
            className="flex-1 py-2.5 px-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-400" />
            <span>{card.left.label}</span>
            <kbd className="hidden sm:inline-block ml-1 text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-600">←</kbd>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => triggerSwipe("right")}
            className="flex-1 py-2.5 px-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-300 transition-colors"
          >
            <kbd className="hidden sm:inline-block mr-1 text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-600">→</kbd>
            <span>{card.right.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}