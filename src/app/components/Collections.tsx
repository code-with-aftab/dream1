'use client';

import Image from 'next/image';
import { COLLECTIONS } from '../data';

interface CollectionsProps {
  onSelectCollection: (tag: string) => void;
}

export default function Collections({ onSelectCollection }: CollectionsProps) {
  const handleCollectionClick = (tag: string) => {
    onSelectCollection(tag);
    
    // Smooth scroll down to properties
    const propertiesSec = document.getElementById('properties-section');
    if (propertiesSec) {
      propertiesSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white" id="locations-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8 font-normal tracking-wide reveal">
          Curated Collections
        </h2>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => handleCollectionClick(col.tag)}
              className="group hover-zoom-container relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-200/40 reveal-scale"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Image Background */}
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover-zoom-img"
              />

              {/* Rich overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/20 to-transparent transition-opacity duration-300 group-hover:from-stone-950/80" />

              {/* Info content overlay */}
              <div className="absolute bottom-0 left-0 p-6 z-10 w-full flex flex-col justify-end text-white">
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-gold-400 mb-1.5 opacity-90">
                  {col.count} Properties
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-light text-white mb-2 leading-tight">
                  {col.title}
                </h3>
                <p className="text-[11px] font-light text-stone-200 line-clamp-2 max-w-[90%] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {col.description}
                </p>
              </div>

              {/* Floating gold accent tag */}
              <div className="absolute top-4 right-4 z-10 bg-gold-500 text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                View All
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
