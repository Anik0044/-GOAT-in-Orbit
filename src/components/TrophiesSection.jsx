import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Shirt, X, Award, Sparkles, ChevronRight, Star } from 'lucide-react';
import { CLUB_CAREER_DATA } from '../data/clubCareerData';

export default function TrophiesSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedClub, setSelectedClub] = useState(null);

  const filterTabs = ['All', 'FC Barcelona', 'Paris Saint-Germain', 'Inter Miami CF', 'Argentina', 'Newell\'s Old Boys'];

  const filteredClubs = activeTab === 'All'
    ? CLUB_CAREER_DATA
    : CLUB_CAREER_DATA.filter((club) => club.name.toLowerCase().includes(activeTab.toLowerCase()) || activeTab.toLowerCase().includes(club.name.toLowerCase().split(' ')[0]));

  return (
    <section id="trophies" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-gold"
        >
          <Trophy className="w-3.5 h-3.5" />
          Club & National Career Silverware
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6"
        >
          Club Trophy <span className="text-gradient-gold">Cabinet</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg"
        >
          Explore Messi's legendary journey across FC Barcelona, PSG, Inter Miami, Argentina, and Newell's Old Boys. Click any club card to open full details.
        </motion.p>
      </div>

      {/* Club Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-medium transition-all duration-300 cursor-pointer min-h-[44px] ${
              activeTab === tab
                ? 'bg-gradient-to-r from-gold via-amber-400 to-yellow-300 text-space-darker font-bold shadow-glow-gold scale-105'
                : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Floating Club Cards List */}
      <div className="flex flex-col gap-10">
        <AnimatePresence mode="popLayout">
          {filteredClubs.map((club, idx) => (
            <motion.div
              key={club.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                layout: { duration: 0.4 },
                y: { duration: 5 + idx, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 },
              }}
              whileHover={{ scale: 1.015, y: -10 }}
              onClick={() => setSelectedClub(club)}
              className={`glass-panel rounded-3xl overflow-hidden border ${club.borderColor} cursor-pointer transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,215,0,0.25)] group relative`}
            >
              {/* Outer Subtle Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                style={{ background: `radial-gradient(circle at 30% 50%, ${club.glowColor}, transparent 70%)` }}
              />

              {/* Responsive Layout: Mobile = Column (Image Top), Desktop = Row (Image Left, Trophy Right) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                
                {/* Left Side: Jersey Picture & Club Header */}
                <div className="md:col-span-5 relative overflow-hidden flex flex-col justify-end min-h-[280px] md:min-h-[380px] bg-black/40">
                  <img
                    src={club.image}
                    alt={`${club.name} Lionel Messi`}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = club.fallbackImage;
                    }}
                    loading="lazy"
                  />
                  
                  {/* Image Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${club.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                  {/* Floating Jersey Badge */}
                  <div className="relative z-10 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase ${club.badgeColor}`}>
                        {club.jersey}
                      </span>
                      <span className="text-xs text-gray-300 font-mono flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                        <Calendar className="w-3 h-3 text-gold" />
                        {club.period}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white group-hover:text-gold transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-light mt-1">
                      {club.tagline}
                    </p>
                  </div>
                </div>

                {/* Right Side: Trophy Breakdown & Years */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white/[0.02]">
                  <div>
                    {/* Header: Total Trophy Counter */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-gold animate-bounce" />
                        <span className="font-heading text-lg font-bold text-white">Trophies Won</span>
                      </div>
                      <div className="text-2xl font-heading font-extrabold text-gradient-gold">
                        {typeof club.totalTrophies === 'number' ? `${club.totalTrophies} Trophies` : club.totalTrophies}
                      </div>
                    </div>

                    {/* Trophy Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {club.trophies.map((item, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/40 transition-colors flex items-center justify-between group/item"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-bold text-xs">
                              {typeof item.count === 'number' ? `${item.count}x` : '🏆'}
                            </div>
                            <div>
                              <div className="font-heading font-semibold text-white text-xs sm:text-sm group-hover/item:text-gold transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-gray-400 font-mono">
                                {Array.isArray(item.years) ? `${item.years.length} Titles` : item.years[0]}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA hint */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-mono">Click card for complete breakdown</span>
                    <div className="inline-flex items-center gap-1 text-gold font-medium group-hover:translate-x-1 transition-transform">
                      <span>Full Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive Detail Modal on Card Click */}
      <AnimatePresence>
        {selectedClub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClub(null)}
              className="fixed inset-0 bg-[#0a0a1a]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-glow-gold z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedClub(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5 text-gold" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gold/50 shrink-0">
                  <img
                    src={selectedClub.image}
                    alt={selectedClub.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = selectedClub.fallbackImage;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">{selectedClub.name}</h3>
                  <div className="text-gold font-mono text-xs flex items-center gap-2 mt-1">
                    <span>{selectedClub.period}</span>
                    <span>•</span>
                    <span>{selectedClub.jersey} Jersey</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-between">
                <span className="text-sm font-heading font-semibold text-gray-200">Total Career Silverware</span>
                <span className="font-heading text-2xl font-extrabold text-gradient-gold">
                  {typeof selectedClub.totalTrophies === 'number' ? `${selectedClub.totalTrophies} Trophies` : selectedClub.totalTrophies}
                </span>
              </div>

              {/* Full Trophy & Year Lists */}
              <div className="space-y-4 mb-8">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Detailed Trophy Breakdown
                </h4>
                {selectedClub.trophies.map((trophy, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-bold text-white text-base flex items-center gap-2">
                        <Award className="w-4 h-4 text-argentina-light" />
                        {trophy.name}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-mono font-bold border border-gold/30">
                        {typeof trophy.count === 'number' ? `${trophy.count} Wins` : trophy.count}
                      </span>
                    </div>

                    {/* Winning Years Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {trophy.years.map((year, yIdx) => (
                        <span key={yIdx} className="px-2.5 py-1 rounded-lg bg-white/10 text-gray-300 text-xs font-mono">
                          🏆 {year}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedClub(null)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-amber-500 text-space-darker font-heading font-bold text-sm shadow-glow-gold cursor-pointer"
              >
                Close Club Overview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
