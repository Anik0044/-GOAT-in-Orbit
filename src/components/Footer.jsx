import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer({ setActiveSection }) {
  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 bg-[#060612] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Info */}
        <div className="md:col-span-6 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-9 h-9 rounded-full bg-argentina/20 border border-argentina/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <span className="font-heading text-xl font-bold tracking-wider text-white">
              GOAT <span className="text-gold">in Orbit</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mb-4 leading-relaxed">
            "Defy gravity. Prove you know the GOAT." A premier anti-gravity fan website celebrating Lionel Andrés Messi.
          </p>
          <div className="text-xs text-argentina-light font-mono">
            Inter Miami CF • Argentina #10 • FC Barcelona Legend
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gold mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {['hero', 'about', 'trophies', 'gallery', 'quiz'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="hover:text-gold transition-colors capitalize cursor-pointer text-left"
                >
                  {id === 'hero' ? 'Home' : id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Fan Note */}
        <div className="md:col-span-3">
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-argentina-light mb-4">
            Messi Fan Club
          </h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            Created for millions of Messi fans worldwide. Defying gravity and football physics since 2004.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span>Made with 🐐 by a Messi fan</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          &copy; 2026 GOAT in Orbit. All rights reserved.
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span>Designed with anti-gravity passion</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </div>
      </div>
    </footer>
  );
}
