import React from 'react';
import { Crown, Trophy, UserCheck } from 'lucide-react';

export default function Leaderboard({ scores = [] }) {
  // BACKEND HOOK: Replace localStorage with API call here (e.g. GET /api/leaderboard)

  if (!scores || scores.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 text-center border border-white/10 mt-8">
        <Trophy className="w-8 h-8 text-gray-500 mx-auto mb-2 opacity-50" />
        <p className="text-sm text-gray-400">এখনো কোনো Leaderboard এন্ট্রি নেই। তুমিই প্রথম কুইজ খেলে রেকর্ড গড়ার সুযোগ নাও!</p>
      </div>
    );
  }

  return (
    <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold/30 mt-10 max-w-xl mx-auto shadow-glow-gold">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/20">
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-gold animate-bounce" />
          <h3 className="font-heading text-xl font-bold text-white">GOAT Leaderboard</h3>
        </div>
        <span className="text-xs font-mono text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
          Top 5 Fans
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {scores.slice(0, 5).map((entry, idx) => {
          const isFirst = idx === 0;
          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                isFirst
                  ? 'bg-gradient-to-r from-gold/20 via-amber-500/10 to-transparent border-gold/50 shadow-glow-gold'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-extrabold text-xs ${
                    isFirst
                      ? 'bg-gold text-space-darker shadow-md'
                      : idx === 1
                      ? 'bg-gray-300 text-space-darker'
                      : idx === 2
                      ? 'bg-amber-700 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {isFirst ? '👑' : `#${idx + 1}`}
                </div>
                <div className="text-left">
                  <div className="font-heading font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                    {entry.name}
                    {isFirst && <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full">GOAT Fan</span>}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    {entry.date || 'Today'}
                  </div>
                </div>
              </div>

              <div className="font-heading font-extrabold text-lg text-gold">
                {entry.score} <span className="text-xs font-normal text-gray-400">/ 10</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
