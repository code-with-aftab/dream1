'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (filters: { type: string; location: string; priceRange: string }) => void;
  initialType?: string;
  initialLocation?: string;
  initialPriceRange?: string;
}

export default function SearchBar({ onSearch, initialType = '', initialLocation = '', initialPriceRange = '' }: SearchBarProps) {
  const [type, setType] = useState(initialType);
  const [location, setLocation] = useState(initialLocation);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ type, location, priceRange });
    
    // Smooth scroll down to properties
    const propertiesSec = document.getElementById('properties-section');
    if (propertiesSec) {
      propertiesSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 relative z-20 pt-12 pb-6">
      <div className="luxury-glass bg-white/80 border border-neutral-200/50 p-6 md:p-8 rounded-lg shadow-xl shadow-stone-900/[0.04]">
        <h2 className="font-serif text-2xl text-stone-900 font-medium tracking-wide mb-6">
          Find Your Luxury Property<span className="text-gold-500 italic">...</span>
        </h2>

        <form onSubmit={handleExplore} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Property Type Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 pl-1">
              Property Type
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white/70 border border-stone-200 rounded-sm py-3 px-4 text-xs font-semibold text-stone-800 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Property Types</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Mansion">Mansion</option>
                <option value="Cabin">Cabin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 pl-1">
              Location
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/70 border border-stone-200 rounded-sm py-3 px-4 text-xs font-semibold text-stone-800 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Cape Town">Cape Town</option>
                <option value="Santorini">Santorini</option>
                <option value="Aspen">Aspen</option>
                <option value="New York">New York</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Range Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 pl-1">
              Price Range
            </label>
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-white/70 border border-stone-200 rounded-sm py-3 px-4 text-xs font-semibold text-stone-800 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Price Ranges</option>
                <option value="under-9">Under ₹9,000,000</option>
                <option value="9-12">₹9,000,000 - ₹12,000,000</option>
                <option value="over-12">Over ₹12,000,000</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Explore Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white luxury-gold-gradient hover:luxury-gold-gradient-hover rounded-sm shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Explore Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
