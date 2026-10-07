import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { searchWiki } from '../../data/wiki';

export default function WikiSearch({ initialQuery = '', onBack, onSelectArticle }) {
  const [query, setQuery] = useState(initialQuery);
  const results = searchWiki(query);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          Back to Wiki Home
        </button>
      </div>

      {/* Search Bar Input Header */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-glow-gold mb-10">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
          Search Messi Wiki
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, answers, or tags..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-all text-base"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
        </form>

        <div className="mt-4 text-xs font-mono text-gray-300">
          Found <span className="text-gold font-bold">{results.length}</span> matching search results for "{query}"
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelectArticle(q.id)}
            className="glass-panel rounded-2xl p-6 border border-white/15 hover:border-gold/50 transition-all cursor-pointer group hover:shadow-glow-blue"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold font-mono text-xs font-bold">
                {q.category}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors mb-2">
              {q.question}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
              {q.answer}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {q.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-gray-400 text-xs font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {results.length === 0 && (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/15">
            <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-white mb-2">No matching questions found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              Try searching with keywords like <span className="text-gold">"World Cup"</span>, <span className="text-gold">"Barcelona"</span>, <span className="text-gold">"Free Kicks"</span>, or <span className="text-gold">"91 goals"</span>.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
