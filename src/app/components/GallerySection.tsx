'use client';

import { useState, useEffect } from 'react';
import { getGalleryItems, GalleryItem } from '../utils/db';
import { Camera, ChevronLeft, ChevronRight, X, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface GallerySectionProps {
  id?: string;
}

export default function GallerySection({ id = 'gallery-section' }: GallerySectionProps) {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    getGalleryItems().then((items) => {
      setGallery(items);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Layouts', 'Completed Sites', 'Plot Views'];

  const filteredItems = gallery.filter((item) => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-stone-400 font-semibold uppercase tracking-widest">Loading Premium Gallery...</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-stone-950 border-t border-stone-200/50 dark:border-stone-850/50 transition-colors duration-300 relative z-10" id={id}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
            Visual Catalog
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
            Dreamsland Site Gallery
          </h2>
          <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-400 mt-4 leading-relaxed">
            Take a virtual tour of our gated layouts, site elevations, and completed projects along Shimla Bypass Road.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-gold-500 border-gold-500 text-stone-955 shadow-sm'
                  : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-850 text-stone-500 hover:text-stone-750 dark:hover:text-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] bg-stone-100 dark:bg-stone-900 rounded-lg overflow-hidden border border-stone-200/60 dark:border-stone-850 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Visual Thumbnail */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <span className="bg-gold-500 text-stone-955 text-[8px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm self-start">
                  {item.category}
                </span>

                <div className="space-y-1 text-white">
                  <h4 className="font-serif text-base font-normal tracking-wide leading-tight">{item.title}</h4>
                  <p className="text-[10px] font-light text-stone-300 uppercase tracking-widest flex items-center space-x-1">
                    <Camera className="w-3 h-3" />
                    <span>View Image</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-stone-50 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-850/50 rounded-lg">
            <Camera className="w-12 h-12 mx-auto text-stone-300 mb-3 animate-pulse" />
            <h4 className="font-serif text-lg text-stone-600 dark:text-stone-400">No gallery items in this category</h4>
            <p className="text-xs text-stone-400 mt-1">Check back later or manage items from the admin panel.</p>
          </div>
        )}

      </div>

      {/* Lightbox Modal Overlay */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Header */}
          <div className="flex justify-between items-center px-6 py-5 bg-black/40 text-white z-10">
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold-400">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="font-serif text-lg font-normal mt-0.5 tracking-wide">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            
            {/* Prev Trigger */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Main Interactive Slide */}
            <div className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh]">
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Trigger */}
            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

          </div>

          {/* Lightbox Footer Actions */}
          <div className="px-6 py-5 bg-black/40 text-center flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
            <span className="text-xs text-stone-400 font-light">
              Image {lightboxIndex + 1} of {filteredItems.length}
            </span>
            <a
              href={`https://wa.me/919258884941?text=${encodeURIComponent(`Hello, I am interested in inquiring about your site: ${filteredItems[lightboxIndex].title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-gold-500 hover:bg-gold-600 text-stone-955 px-5 py-2.5 rounded-sm font-bold uppercase tracking-wider text-[10px] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>

        </div>
      )}
    </section>
  );
}
