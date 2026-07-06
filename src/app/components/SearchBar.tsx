'use client';

import { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';

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
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-850 p-6 md:p-8 rounded-xl shadow-[0_8px_30px_rgba(136,115,97,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(136,115,97,0.09)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-1.5 block">
          Private Acquisition Search
        </span>
        
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-white font-normal tracking-wide mb-6">
          Find Your Luxury Property<span className="text-gold-500 italic font-light">...</span>
        </h2>

        <form onSubmit={handleExplore} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Property Type Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-[9px] uppercase font-bold tracking-widest text-stone-400 dark:text-stone-500 pl-1">
              Property Type
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white/70 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded py-3 px-4 text-xs font-semibold text-stone-800 dark:text-stone-250 focus:outline-none focus:border-gold-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Types (Plots / Villas)</option>
                <option value="Plot">Plot (Freehold)</option>
                <option value="Premium Plot">Premium Plot</option>
                <option value="Forest Plot">Forest Plot</option>
                <option value="Highway Plot">Highway Plot</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400 dark:text-stone-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-[9px] uppercase font-bold tracking-widest text-stone-400 dark:text-stone-500 pl-1">
              Location Corridor
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/70 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded py-3 px-4 text-xs font-semibold text-stone-800 dark:text-stone-250 focus:outline-none focus:border-gold-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Dehradun Locations</option>
                <option value="Doiwala">Doiwala Enclave</option>
                <option value="Bhauwala">Bhauwala Corridor</option>
                <option value="Shimla Bypass">Shimla Bypass Rd</option>
                <option value="Sahastradhara">Sahastradhara Corridor</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400 dark:text-stone-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Range Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-[9px] uppercase font-bold tracking-widest text-stone-400 dark:text-stone-500 pl-1">
              Max Budget
            </label>
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-white/70 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded py-3 px-4 text-xs font-semibold text-stone-800 dark:text-stone-250 focus:outline-none focus:border-gold-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">No Budget Limit</option>
                <option value="under-20">Under ₹20.00 Lakhs</option>
                <option value="20-25">₹20.00 Lakhs - ₹25.00 Lakhs</option>
                <option value="over-25">Over ₹25.00 Lakhs</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400 dark:text-stone-600">
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
              className="w-full py-3.5 text-xs font-bold uppercase tracking-widest bg-stone-900 hover:bg-gold-500 text-white hover:text-stone-955 dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-stone-955 rounded transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Listings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
