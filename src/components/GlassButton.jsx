import React from 'react';
import { motion } from 'framer-motion';

export default function GlassButton({
  children,
  onClick,
  variant = 'gold',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  icon: Icon,
}) {
  const variants = {
    gold: 'bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-space-darker font-bold shadow-glow-gold hover:from-yellow-400 hover:to-amber-300 border border-yellow-300/40',
    blue: 'bg-gradient-to-r from-argentina-dark via-argentina to-argentina-light text-space-darker font-bold shadow-glow-blue hover:brightness-110 border border-argentina-light/40',
    outline: 'bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/40 backdrop-blur-md',
    glass: 'bg-white/10 border border-argentina/30 text-white hover:bg-argentina/20 hover:border-argentina/60 backdrop-blur-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg min-h-[40px]',
    md: 'px-6 py-3 text-base rounded-xl min-h-[48px]',
    lg: 'px-8 py-4 text-lg rounded-2xl min-h-[56px]',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center gap-2 font-heading tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
        variants[variant] || variants.gold
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />}
      <span>{children}</span>
    </motion.button>
  );
}
