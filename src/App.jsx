import React, { useState, useEffect } from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TrophiesSection from './components/TrophiesSection';
import WikiSection from './components/WikiSection';
import GallerySection from './components/GallerySection';
import QuizSection from './components/QuizSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position to update active navbar highlight
  useEffect(() => {
    const sections = ['hero', 'about', 'trophies', 'wiki', 'gallery', 'quiz'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a1a] text-white selection:bg-argentina selection:text-space-deep overflow-x-hidden">
      {/* Dynamic Starfield Canvas Background */}
      <StarfieldBackground />

      {/* Fixed Glassmorphism Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          onStartQuiz={() => scrollToSection('quiz')}
          onExploreCareer={() => scrollToSection('about')}
        />
        <AboutSection />
        <TrophiesSection />
        <WikiSection />
        <GallerySection />
        <QuizSection />
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
