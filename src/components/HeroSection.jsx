import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Trophy, Award, Sparkles, ChevronDown, Flame } from 'lucide-react';
import GlassButton from './GlassButton';

export default function HeroSection({ onStartQuiz, onExploreCareer }) {
  const shouldReduceMotion = useReducedMotion();

  // Floating animation for Messi image
  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -18, 0],
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between items-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Nebula Gradient Blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-gradient-to-tr from-argentina/20 via-blue-600/10 to-gold/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Side: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-argentina/30 backdrop-blur-md mb-6 shadow-glow-blue"
          >
            <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-argentina-light uppercase">
              Official Fan Website & Interactive Quiz
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6"
          >
            GOAT <span className="text-gradient-argentina">in Orbit</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl text-gray-300 font-light max-w-2xl mb-8 leading-relaxed"
          >
            "Defy gravity. <span className="text-gold font-medium">Prove you know the GOAT.</span>"
          </motion.p>

          {/* Tagline details */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-gray-400 max-w-xl mb-10"
          >
            Experience Lionel Messi's career in anti-gravity physics. Take the ultimate 10-question challenge, challenge your friends, and top the leaderboard.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
          >
            <GlassButton
              variant="gold"
              size="lg"
              onClick={onStartQuiz}
              className="w-full sm:w-auto shadow-glow-gold"
              icon={Flame}
            >
              Take the Quiz
            </GlassButton>

            <GlassButton
              variant="outline"
              size="lg"
              onClick={onExploreCareer}
              className="w-full sm:w-auto"
              icon={Trophy}
            >
              Explore Career
            </GlassButton>
          </motion.div>

          {/* Key Quick Stats Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/10 w-full max-w-lg"
          >
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-gold">800+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Career Goals</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-argentina-light">8</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Ballon d'Or</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-white">1</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">World Cup</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Central Floating Messi Image with Orbiting Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative z-10 py-6">
          <div className="relative w-[280px] sm:w-[380px] md:w-[420px] aspect-square flex items-center justify-center">

            {/* Orbiting Ring 1 (Outer Gold Ring) */}
            <div className="absolute inset-0 rounded-full border border-gold/30 animate-spin-slow pointer-events-none" style={{ animationDuration: '28s' }} />

            {/* Orbiting Ring 2 (Inner Argentina Blue Ring) */}
            <div className="absolute inset-4 rounded-full border border-argentina/40 animate-spin-reverse pointer-events-none" style={{ animationDuration: '22s' }} />

            {/* Glowing Halo Background behind image */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-argentina to-gold rounded-full opacity-30 blur-3xl -z-10 animate-pulse-glow" />

            {/* Main Floating Image Container */}
            <motion.div
              animate={floatAnimation}
              className="relative w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full p-2 bg-gradient-to-tr from-argentina/40 via-gold/40 to-argentina/40 border border-white/30 shadow-[0_0_50px_rgba(117,170,219,0.4)] backdrop-blur-lg overflow-hidden group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                alt="Lionel Messi Argentina World Cup Champion"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              
              {/* Overlay Gradient inside frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0a0a1a]/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Orbit Badge 1: World Cup (Top Right) */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
              className="absolute -top-2 right-2 sm:right-6 p-3 rounded-2xl bg-[#0a0a1a]/80 border border-gold/50 shadow-glow-gold backdrop-blur-xl flex items-center gap-2"
            >
              <Trophy className="w-5 h-5 text-gold" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-gray-400 font-mono">WORLD CUP</div>
                <div className="text-xs font-bold text-white">Qatar 2022</div>
              </div>
            </motion.div>

            {/* Floating Orbit Badge 2: Ballon d'Or (Bottom Left) */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, 10, 0],
                      x: [0, -5, 0],
                      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                    }
              }
              className="absolute bottom-4 left-0 sm:left-2 p-3 rounded-2xl bg-[#0a0a1a]/80 border border-argentina/50 shadow-glow-blue backdrop-blur-xl flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-argentina-light" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-gray-400 font-mono">BALLON D'OR</div>
                <div className="text-xs font-bold text-white">8 Wins (Record)</div>
              </div>
            </motion.div>

            {/* Floating Orbit Badge 3: Inter Miami #10 (Bottom Right) */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -8, 0],
                      transition: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                    }
              }
              className="absolute -bottom-2 right-8 p-2.5 rounded-full bg-gradient-to-r from-argentina to-gold text-space-dark font-heading font-black text-xs shadow-lg flex items-center justify-center w-10 h-10 border border-white/40"
            >
              #10
            </motion.div>

          </div>
        </div>

      </div>

      {/* Scroll Down Arrow Indicator */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onExploreCareer}
        className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-gold transition-colors mt-8 z-10"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-5 h-5 text-argentina" />
      </motion.div>
    </section>
  );
}
