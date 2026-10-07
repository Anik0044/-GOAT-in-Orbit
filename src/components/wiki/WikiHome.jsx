import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Shuffle, BookOpen, ChevronRight } from 'lucide-react';
import { CATEGORIES, getAllWikiQuestions } from '../../data/wiki';
import FloatingCard from '../FloatingCard';

export default function WikiHome({ onSearchSubmit, onSelectCategory, onSelectArticle }) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularTags = [
    'Champions League',
    'World Cup',
    'Barcelona',
    'Free Kicks',
    'Goals',
    'Records',
    'Messi vs Ronaldo',
  ];

  const handleSearchForm = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    onSearchSubmit(tag);
  };

  const handleRandomQuestion = () => {
    const all = getAllWikiQuestions();
    if (all.length > 0) {
      const randomItem = all[Math.floor(Math.random() * all.length)];
      onSelectArticle(randomItem.id);
    }
  };

  return (
    <div className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-gold"
        >
          <BookOpen className="w-3.5 h-3.5" />
          The Ultimate Messi Knowledge Base
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Messi <span className="text-gradient-gold">Wiki</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg"
        >
          Explore answers, statistics, records, and trivia across 12 comprehensive categories.
        </motion.p>
      </div>

      {/* Large Centered Search Box (Google-style with Glowing Border) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <form onSubmit={handleSearchForm} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything about Messi... (e.g. World Cup, Free Kicks, 91 goals)"
            className="w-full pl-14 pr-32 py-4 sm:py-5 rounded-2xl bg-white/10 border border-gold/40 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/30 shadow-[0_0_30px_rgba(255,215,0,0.25)] transition-all font-body text-base sm:text-lg backdrop-blur-xl"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gold" />
          
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold to-amber-500 text-space-darker font-heading font-bold text-sm shadow-glow-gold hover:scale-105 transition-transform cursor-pointer"
          >
            Search
          </button>
        </form>
      </motion.div>

      {/* Popular Search Chips & Random Q Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto text-center"
      >
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          Popular Searches:
        </span>
        
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-gray-300 hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all cursor-pointer"
          >
            {tag}
          </button>
        ))}

        {/* Random Question Button */}
        <button
          onClick={handleRandomQuestion}
          className="ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-argentina to-gold text-space-darker font-heading font-bold text-xs shadow-glow-blue hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          🎲 Random Question
        </button>
      </motion.div>

      {/* 12 Categories Floating Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <FloatingCard
            key={cat.id}
            floatDelay={idx * 0.25}
            floatDuration={5 + (idx % 3)}
            glow={idx % 2 === 0 ? 'gold' : 'blue'}
            onClick={() => onSelectCategory(cat.slug)}
            className="flex flex-col justify-between h-full group p-6"
          >
            <div>
              {/* Category Emoji & Count Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </div>
                <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold font-mono font-bold text-xs">
                  {cat.questionsCount} Qs
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-gold transition-colors mb-2">
                {cat.name}
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-gold transition-colors">
              <span>Browse Category</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </FloatingCard>
        ))}
      </div>

    </div>
  );
}
