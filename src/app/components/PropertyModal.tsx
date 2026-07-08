'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Property } from '../data';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`I would like to request more information about ${property.title} in ${property.location}.`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setFormSubmitted(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 p-2 rounded-full shadow-md z-30 transition-all duration-200 focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Large Image */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[500px] bg-stone-100">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
          {/* Accent Gold Gradient Bottom Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 luxury-gold-gradient" />
        </div>

        {/* Right Side: Details Scrollable Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[90vh] md:max-h-[500px] lg:max-h-[600px] scrollbar-thin">
          <div>
            {/* Tag & Type & Status */}
            <div className="flex items-center space-x-2.5 mb-2 flex-wrap gap-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-600">
                Exclusive {property.type}
              </span>
              {property.status === 'Ongoing' ? (
                <span className="bg-rose-50 text-rose-600 text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm border border-rose-200 shadow-sm">
                  Ongoing Development
                </span>
              ) : (
                <span className="bg-emerald-50 text-emerald-600 text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm border border-emerald-200 shadow-sm">
                  Completed Project
                </span>
              )}
            </div>

            {/* Title & Location */}
            <h2 className="font-serif text-3xl text-stone-900 leading-tight mb-2">
              {property.title}
            </h2>
            <p className="text-xs font-semibold text-stone-400 tracking-wider uppercase mb-4">
              {property.location}
            </p>

            {/* Price */}
            <p className="text-2xl font-bold text-[#957258] dark:text-[#a68369] mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#957258] dark:bg-[#a68369] animate-pulse" />
              <span>{formatPrice(property.price)}</span>
            </p>

            {/* Key Specs Row */}
            <div className="grid grid-cols-4 gap-2 py-4 border-y border-stone-100 mb-6 text-center">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Plot Area</span>
                <span className="text-xs font-semibold text-stone-800 mt-1">{property.size}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Rate / Gaj</span>
                <span className="text-xs font-semibold text-stone-800 mt-1">₹{property.rate.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Road Width</span>
                <span className="text-xs font-semibold text-stone-800 mt-1">{property.roadWidth}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Legal Status</span>
                <span className="text-[9px] font-semibold text-stone-800 mt-1.5 leading-tight">{property.mutationStatus}</span>
              </div>
            </div>

            {/* Description */}
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-700 mb-2">About Property</h4>
            <p className="text-xs text-stone-500 font-light leading-relaxed mb-6">
              {property.description}
            </p>

            {/* Amenities Grid */}
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-700 mb-2">Amenities</h4>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2 text-stone-500">
                  <svg className="w-3.5 h-3.5 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-stone-50 border border-stone-200/50 p-5 rounded-md mt-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-stone-700 mb-4">Request Private Viewing</h4>
            
            {formSubmitted ? (
              <div className="text-center py-4 animate-fade-in">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold-100 text-gold-600 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h5 className="text-xs font-bold text-stone-800 uppercase mb-1">Inquiry Sent Successfully</h5>
                <p className="text-[10px] text-stone-500">Our luxury agent will contact you shortly to schedule your viewing.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-sm py-2 px-3 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-sm py-2 px-3 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-sm py-2 px-3 text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-gold-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-[10px] font-bold uppercase tracking-wider text-white luxury-gold-gradient hover:luxury-gold-gradient-hover rounded-sm shadow-sm transition-all duration-300"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
