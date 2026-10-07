import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Maximize2, Calendar } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'World Cup', 'Trophies', 'FC Barcelona', 'Argentina', 'Inter Miami'];

  const filteredImages = activeTab === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((img) => img.category === activeTab);

  return (
    <section id="gallery" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-argentina/10 border border-argentina/30 text-argentina-light text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-blue"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          MESSI'S ICONIC MOMENTS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6"
        >
          Messi <span className="text-gradient-argentina">Gallery</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-base sm:text-lg"
        >
          Immerse yourself in iconic moments from Lionel Messi's extraordinary career.
        </motion.p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer min-h-[40px] ${
              activeTab === cat
                ? 'bg-gradient-to-r from-argentina to-blue-600 text-space-dark font-bold shadow-glow-blue scale-105'
                : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((img, idx) => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setSelectedImage(img)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-white/15 cursor-pointer shadow-lg hover:shadow-glow-blue transition-all duration-500 hover:-translate-y-2 flex flex-col justify-end"
          >
            <div className={`w-full ${img.heightRatio} overflow-hidden relative bg-black/40`}>
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/barcelona.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />
            </div>

            {/* Floating Info Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-gold uppercase">
                  {img.category}
                </span>
                <span className="text-[10px] font-mono text-gray-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/15 backdrop-blur-md">
                  {img.year}
                </span>
              </div>
              <h3 className="font-heading text-base font-bold text-white group-hover:text-argentina-light transition-colors mb-1">
                {img.title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2">
                {img.caption}
              </p>
            </div>

            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              <Maximize2 className="w-4 h-4 text-gold" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-[#0a0a1a]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full glass-panel-glow rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black/50">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/barcelona.png';
                  }}
                />
              </div>

              <div className="p-6 bg-[#0a0a1a]/95 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gold uppercase">{selectedImage.category}</span>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {selectedImage.year}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedImage.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
