import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, ArrowLeft, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { CATEGORIES, getCategoryBySlug } from '../../data/wiki';

export default function WikiCategory({ categorySlug, onBack, onSelectArticle, onSelectCategory }) {
  const category = getCategoryBySlug(categorySlug) || CATEGORIES[0];
  const [expandedId, setExpandedId] = useState(null);
  const [filterText, setFilterText] = useState('');

  const questions = category.data || [];

  const filteredQuestions = questions.filter((q) => {
    if (!filterText.trim()) return true;
    const query = filterText.toLowerCase();
    return (
      q.question.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query) ||
      q.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const relatedCategories = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 5);

  return (
    <div className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          Back to Wiki Home
        </button>

        <div className="text-xs font-mono text-gray-400 hidden sm:block">
          Wiki &gt; <span className="text-gold font-bold">{category.name}</span>
        </div>
      </div>

      {/* Category Header Card */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold/30 mb-12 shadow-glow-gold relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-4xl shadow-inner shrink-0">
              {category.emoji}
            </div>
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                {category.name}
              </h1>
              <p className="text-gray-300 text-sm mt-1 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-gold font-mono font-bold text-sm shrink-0">
            {questions.length} Total Questions
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Column: Search & Accordion List */}
        <div className="lg:col-span-8">
          
          {/* Category Filter Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder={`Search within ${category.name}...`}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-all text-sm backdrop-blur-md"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;

              return (
                <div
                  key={q.id}
                  className="glass-panel rounded-2xl border border-white/15 overflow-hidden transition-all duration-300"
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => toggleAccordion(q.id)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-snug flex items-start gap-2">
                      <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      {q.question}
                    </h3>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectArticle(q.id);
                        }}
                        className="p-2 rounded-lg bg-white/10 text-gray-300 hover:text-gold hover:bg-white/20 transition-colors text-xs flex items-center gap-1 min-h-[36px]"
                        title="Open Full Article"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Article</span>
                      </button>

                      <ChevronDown
                        className={`w-5 h-5 text-gold transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 pt-2 border-t border-white/10 bg-white/[0.02]"
                      >
                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4">
                          {q.answer}
                        </p>

                        {/* Tags list */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          <span className="text-[10px] font-mono text-gray-400 uppercase mr-1">Tags:</span>
                          {q.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg bg-white/10 text-gold text-xs font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="glass-panel p-8 text-center rounded-2xl">
                <p className="text-gray-400 text-sm">No questions matched your search criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column: Related Categories */}
        <div className="lg:col-span-4">
          <div className="glass-panel-glow rounded-3xl p-6 border border-argentina/30 sticky top-28">
            <h3 className="font-heading text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              Related Categories
            </h3>

            <div className="space-y-3">
              {relatedCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.slug)}
                  className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/10 transition-all flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.emoji}</span>
                    <div>
                      <div className="font-heading font-semibold text-white text-sm group-hover:text-gold transition-colors">
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        {cat.questionsCount} Questions
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
