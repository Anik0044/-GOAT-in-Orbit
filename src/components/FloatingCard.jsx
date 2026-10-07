import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FloatingCard({
  children,
  className = '',
  floatDelay = 0,
  floatDuration = 5,
  glow = 'blue',
  onClick,
  hoverScale = 1.03,
}) {
  const shouldReduceMotion = useReducedMotion();

  const glowStyles = {
    blue: 'glass-panel-glow hover:border-argentina/50 hover:shadow-glow-blue',
    gold: 'glass-panel-gold hover:border-gold/60 hover:shadow-glow-gold',
    none: 'glass-panel hover:border-white/30',
  };

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -12, 0],
        rotate: [0, 0.5, -0.5, 0],
        transition: {
          duration: floatDuration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: floatDelay,
        },
      };

  return (
    <motion.div
      animate={floatAnimation}
      whileHover={{
        scale: hoverScale,
        y: shouldReduceMotion ? 0 : -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-2xl p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-md cursor-pointer ${
        glowStyles[glow] || glowStyles.blue
      } ${className}`}
    >
      {/* Subtle background shine line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
}
