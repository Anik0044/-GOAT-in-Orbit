import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, HelpCircle, Image, User, Home, Sparkles, BookOpen } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'trophies', label: 'Trophies', icon: Trophy },
    { id: 'wiki', label: 'Messi Wiki', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-argentina/10 border border-argentina/40 group-hover:border-gold transition-colors duration-300">
            {/* Orbit ring around logo */}
            <div className="absolute inset-0 rounded-full border border-gold/40 animate-spin-slow" />
            <Sparkles className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-argentina transition-colors">
              GOAT <span className="text-gold">in Orbit</span>
            </span>
            <span className="text-[10px] tracking-widest text-argentina-light/70 uppercase font-mono">
              Lionel Messi #10
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-space-dark font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-gradient-to-r from-argentina to-gold rounded-full -z-10 shadow-glow-blue"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-space-dark' : 'text-argentina-light'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Quiz button in Navbar (Desktop) */}
        <div className="hidden lg:block">
          <button
            onClick={() => handleNavClick('quiz')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold to-amber-500 text-space-darker font-heading font-bold text-sm shadow-glow-gold hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Play Quiz</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-argentina-light" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0a0a1a]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer min-h-[44px] ${
                      isActive
                        ? 'bg-gradient-to-r from-argentina/30 to-gold/20 border border-gold/40 text-gold font-bold'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-argentina-light'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick('quiz')}
                className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-amber-400 to-yellow-300 text-space-darker font-heading font-bold text-center shadow-glow-gold min-h-[44px] cursor-pointer"
              >
                🚀 Start GOAT Quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
