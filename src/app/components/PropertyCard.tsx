'use client';

import Image from 'next/image';
import { Property } from '../data';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className="group hover-zoom-container bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850/80 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Property Image with Zoom Effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover-zoom-img"
        />
        {/* Type Badge */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
          <span className="bg-white/90 dark:bg-stone-950/90 backdrop-blur-sm text-stone-900 dark:text-stone-100 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 sm:py-1 rounded-sm border border-stone-200/50 dark:border-stone-850/50">
            {property.type}
          </span>
        </div>

        {/* Status Badge (Ongoing / Completed) */}
        {property.status === 'Ongoing' && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
            <span className="bg-rose-600 text-white text-[8px] sm:text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 sm:py-1 rounded-sm border border-rose-700 shadow-sm animate-pulse">
              Ongoing Project
            </span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-3 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Header uppercase layout from design */}
          <h3 className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] font-bold text-stone-800 dark:text-stone-200 uppercase mb-0.5 sm:mb-1 line-clamp-1">
            {property.title}, {property.location}
          </h3>
          
          {/* Price */}
          <p className="text-xs sm:text-sm font-bold text-[#957258] dark:text-[#a68369] mb-2 sm:mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#957258] dark:bg-[#a68369] animate-pulse" />
            <span>{formatPrice(property.price)}</span>
          </p>

          {/* Short description preview - hidden on mobile for grid spacing */}
          <p className="hidden sm:block text-xs font-light text-stone-500 dark:text-stone-400 line-clamp-2 mb-6">
            {property.description}
          </p>
        </div>

        {/* Stats footer (Size, Road Width, Rate) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-2 sm:pt-4 text-stone-600 dark:text-stone-400 gap-1.5 sm:gap-0">
          <div className="flex items-center space-x-1 sm:space-x-1.5" title="Plot Area">
            <svg className="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span className="text-[8px] sm:text-[10px] font-medium">{property.size}</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1.5" title="Internal Roads">
            <svg className="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-[8px] sm:text-[10px] font-medium">{property.roadWidth}</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1.5" title="Rate per Gaj">
            <span className="text-[8px] sm:text-[10px] font-bold text-gold-600 shrink-0">₹{property.rate.toLocaleString()}/Gaj</span>
          </div>
        </div>
      </div>
    </div>
  );
}
