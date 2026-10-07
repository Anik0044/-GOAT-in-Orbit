import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Award, Flame, Sparkles } from 'lucide-react';
import FloatingCard from './FloatingCard';

export default function AboutSection() {
  const stats = [
    {
      id: 1,
      number: "800+",
      label: "Career Goals",
      subtext: "For Club & Argentina",
      icon: Target,
      glow: "gold",
      floatDelay: 0,
    },
    {
      id: 2,
      number: "8",
      label: "Ballon d'Or Awards",
      subtext: "All-Time Record",
      icon: Award,
      glow: "blue",
      floatDelay: 0.8,
    },
    {
      id: 3,
      number: "1",
      label: "FIFA World Cup",
      subtext: "Qatar 2022 Champion",
      icon: Trophy,
      glow: "gold",
      floatDelay: 1.6,
    },
    {
      id: 4,
      number: "4",
      label: "UEFA Champions League",
      subtext: "FC Barcelona Masterpieces",
      icon: Flame,
      glow: "blue",
      floatDelay: 2.4,
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-argentina/10 border border-argentina/30 text-argentina-light text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Legacy of Greatness
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6"
        >
          Who is the <span className="text-gradient-gold">GOAT?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed"
        >
          Lionel Andrés Messi, born on June 24, 1987 in Rosario, Argentina, has redefined the boundaries of football. From overcoming growth hormone deficiency as a child to capturing the World Cup in Qatar, his journey is pure magic.
        </motion.p>
      </div>

      {/* Main Biography Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel-glow rounded-3xl p-6 sm:p-10 mb-16 border border-argentina/30 relative overflow-hidden backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-argentina/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-gold animate-ping" />
              A Career Written in the Stars
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              With unmatched vision, extraordinary dribbling, and lethal finishing, Messi spent over two decades dominating European football at FC Barcelona and Paris Saint-Germain before bringing his brilliance to Inter Miami CF.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              In 2022, he fulfilled his lifelong dream of bringing the FIFA World Cup trophy back to Argentina, scoring 7 goals during the tournament and earning his second Golden Ball award.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex justify-center">
            <div className="glass-panel-gold p-6 rounded-2xl border border-gold/30 text-center w-full max-w-xs">
              <div className="text-xs text-gold uppercase font-mono tracking-widest mb-1">National Team</div>
              <div className="font-heading text-2xl font-bold text-white mb-2">Argentina #10</div>
              <div className="text-xs text-gray-400">180+ Appearances • 100+ International Goals</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Floating Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <FloatingCard
              key={stat.id}
              floatDelay={stat.floatDelay}
              floatDuration={4.5}
              glow={stat.glow}
              className="flex flex-col justify-between items-center text-center p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <Icon className={`w-7 h-7 ${stat.glow === 'gold' ? 'text-gold' : 'text-argentina-light'}`} />
              </div>
              <div className={`font-heading text-4xl sm:text-5xl font-extrabold mb-2 ${stat.glow === 'gold' ? 'text-gradient-gold' : 'text-gradient-argentina'}`}>
                {stat.number}
              </div>
              <div className="font-heading font-bold text-white text-lg mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">
                {stat.subtext}
              </div>
            </FloatingCard>
          );
        })}
      </div>
    </section>
  );
}
