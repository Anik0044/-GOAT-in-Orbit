import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Sparkles, ChevronRight, Tag } from 'lucide-react';
import { getQuestionById, getRelatedQuestions } from '../../data/wiki';

export default function WikiArticle({ articleId, onBack, onSelectArticle }) {
  const article = getQuestionById(articleId);

  if (!article) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-400">Article not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 rounded-xl bg-gold text-space-dark font-bold">
          Back
        </button>
      </div>
    );
  }

  const related = getRelatedQuestions(article, 4);

  return (
    <div className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          Back
        </button>

        <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold font-mono text-xs font-bold">
          {article.category}
        </span>
      </div>

      {/* Main Article Container */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-argentina/40 shadow-glow-blue mb-12 backdrop-blur-2xl"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-argentina-light uppercase mb-4">
          <BookOpen className="w-4 h-4 text-gold" />
          Wiki Knowledge Article
        </div>

        {/* Title Question */}
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
          {article.question}
        </h1>

        {/* Rich Answer Text */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
          {article.answer}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-gold mr-1" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-gold text-xs font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.article>

      {/* Related Questions Section */}
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            Related Questions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectArticle(item.id)}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-gold/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-gold uppercase mb-1 block">
                    {item.category}
                  </span>
                  <h4 className="font-heading font-semibold text-white text-sm group-hover:text-gold transition-colors line-clamp-2">
                    {item.question}
                  </h4>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-400 group-hover:text-gold transition-colors">
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
