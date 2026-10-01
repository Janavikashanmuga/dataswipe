import React from "react";
import { BookOpen, CheckCircle, ChevronRight, Sparkles } from "lucide-react";

export default function DeckSelector({ decks, completedDeckIds, onSelectDeck }) {
  return (
    <div className="w-full max-w-md flex flex-col gap-4 animate-in fade-in duration-300">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-slate-100">Select a Learning Deck</h2>
        <p className="text-xs text-slate-400 mt-1">
          Master core intuition across data science domains
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {decks.map((deck) => {
          const isDone = completedDeckIds.includes(deck.id);

          return (
            <button
              key={deck.id}
              onClick={() => onSelectDeck(deck)}
              className="w-full text-left p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all shadow-lg flex items-center justify-between group"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isDone
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <BookOpen className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {deck.category}
                    </span>
                    {isDone && (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                        Mastered
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-100 text-sm mt-0.5 group-hover:text-indigo-300 transition-colors">
                    {deck.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {deck.description}
                  </p>
                  <span className="inline-block mt-2 text-[11px] text-slate-400">
                    {deck.cards.length} cards
                  </span>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </button>
          );
        })}
      </div>
    </div>
  );
}