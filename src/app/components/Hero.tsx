'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DEFAULT_HERO_IMAGES = [
  '/images/hero_villa.png',
  '/images/azure_villa.png',
  '/images/cliffside_mansion.png',
  '/images/mountain_retreat.png',
  '/images/urban_penthouse.png',
];

interface HeroBannerItem {
  id: string;
  image: string;
  order: number;
}

interface HeroProps {
  onExploreClick: () => void;
  banners?: HeroBannerItem[];
}

const HIGHLIGHTS = [
  { name: 'Forest Enclave', location: 'Bhauwala, Dehradun', rate: '₹15,500/Gaj' },
  { name: 'Bhauwala Greens', location: 'Bhauwala Chowk, Dehradun', rate: '₹16,000/Gaj' },
  { name: 'Lachiwalla Greens', location: 'Doiwala, Dehradun', rate: '₹19,000/Gaj' },
  { name: 'Bhadraj Colony', location: 'Bhauwala, Dehradun', rate: '₹17,500/Gaj' },
  { name: 'Dev Enclave', location: 'Shimla Bypass, Dehradun', rate: '₹17,000/Gaj' },
];

export default function Hero({ onExploreClick, banners = [] }: HeroProps) {
  const [buzonEmail, setBuzonEmail] = useState('');
  const [buzonSubmitted, setBuzonSubmitted] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesList = banners.length > 0 ? banners.map(b => b.image) : DEFAULT_HERO_IMAGES;

  useEffect(() => {
    if (imagesList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imagesList.length]);

  const handleBuzonConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (buzonEmail) {
      setBuzonSubmitted(true);
    }
  };

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-start overflow-hidden py-16 md:py-24 px-6 lg:px-12 bg-stone-950" id="hero-section">
      {/* Background Hero Image Slideshow with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        {imagesList.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <Image
              src={src}
              alt={`Dreamland Associates Luxury Estate ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover object-center transition-transform duration-[5000ms] ease-out ${
                index === currentImageIndex ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}
        {/* Premium dark-to-transparent gradient for text contrast and background image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent z-10" />
      </div>

      {/* Two-Column Responsive Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-12 mt-8 md:mt-12">
        {/* Left Side: Elegant copy and minimal input */}
        <div className="w-full lg:max-w-2xl space-y-6 text-left text-white">
          <div className="inline-flex items-center space-x-2 border border-gold-500/30 bg-gold-950/20 px-3.5 py-1 rounded-full animate-fade-in-down select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-bold text-gold-300">
              Private Client Advisory Office
            </span>
          </div>

          {/* Luxury Aspirational Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-wide text-white animate-fade-in-up delay-100">
            Discover Extraordinary <span className="block italic text-gold-400 font-light mt-2">Living Spaces</span>
          </h1>

          {/* Subheading */}
          <p className="font-serif text-lg sm:text-xl font-light italic text-stone-300 tracking-wide animate-fade-in-up delay-200">
            "Delivering trust, securing your generational legacy."
          </p>
          
          <p className="font-sans text-xs sm:text-sm font-light text-stone-400 leading-relaxed max-w-lg animate-fade-in-up delay-300">
            Curated selection of premium gated residential townships, forest enclaves, and premium highway corridors across Dehradun's most coveted destinations.
          </p>

          {/* Sleek Underline Brochure Request */}
          <div className="max-w-sm pt-2 animate-fade-in-up delay-400">
            {buzonSubmitted ? (
              <div className="flex items-center space-x-2 text-gold-400 py-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-gold-400" />
                <span className="text-xs uppercase tracking-[0.14em] font-semibold font-sans">
                  Brochure request received
                </span>
              </div>
            ) : (
              <form onSubmit={handleBuzonConnect} className="flex items-center border-b border-white/20 hover:border-gold-500/50 focus-within:border-gold-500 py-2 transition-all duration-300 w-full">
                <input
                  type="email"
                  required
                  placeholder="Request private catalog / brochure..."
                  value={buzonEmail}
                  onChange={(e) => setBuzonEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-stone-500 w-full pr-4 font-sans font-light"
                />
                <button type="submit" className="text-gold-400 hover:text-white text-[10px] uppercase font-sans font-semibold tracking-[0.2em] transition-colors cursor-pointer shrink-0">
                  Request
                </button>
              </form>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up delay-500">
            <Button
              onClick={onExploreClick}
              className="group bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm px-8 h-12 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center shadow-[0_4px_20px_rgba(136,115,97,0.35)] hover:shadow-[0_8px_25px_rgba(136,115,97,0.5)]"
            >
              <span>Explore Listings</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLearnMoreOpen(true)}
              className="bg-white/10 hover:bg-white/20 border-2 border-white hover:border-gold-500 hover:text-gold-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm px-8 h-12 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            >
              Learn more
            </Button>
          </div>
        </div>

        {/* Right Side: Active Property Preview Glassmorphic Widget */}
        <div className="hidden lg:flex flex-col w-full max-w-xs animate-fade-in-right delay-300 select-none">
          <div className="bg-stone-950/40 backdrop-blur-xl border border-white/10 rounded-lg p-6 shadow-[0_15px_35px_rgba(0,0,0,0.25)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-gold-400 block mb-2">Featured Project Preview</span>
              <h3 className="font-serif text-2xl text-white font-normal mb-1 transition-all duration-300">
                {HIGHLIGHTS[currentImageIndex].name}
              </h3>
              <p className="text-xs text-stone-400 font-light mb-4">{HIGHLIGHTS[currentImageIndex].location}</p>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-stone-500 block">Investment starting at</span>
                  <span className="text-base font-serif text-gold-300 font-normal">{HIGHLIGHTS[currentImageIndex].rate}</span>
                </div>
                <button
                  onClick={onExploreClick}
                  className="bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-white border border-gold-500/30 hover:border-gold-500 p-2 rounded-full transition-all duration-300 cursor-pointer"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Dialog Modal */}
      <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
        <DialogContent className="max-w-lg bg-white rounded-lg p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="font-serif text-2xl text-stone-900 font-normal">
              About Dream Land Associates
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-500 font-light pt-2 leading-relaxed">
              Founded on the pillars of **trust, exclusivity, and precision representation**, Dream Land Associates is a premier boutique brokerage serving clients looking for gated plots in Dehradun.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4 text-left">
            <div>
              <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider">Our Core Vision</h4>
              <p className="text-xs text-stone-500 font-light mt-1.5 leading-relaxed">
                We believe that premium property acquisitions start with trust. We ensure 100% legal verification, registry checking, and mutation clearance for all our residential gated developments.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider">Dehradun Portfolio</h4>
              <p className="text-xs text-stone-500 font-light mt-1.5 leading-relaxed">
                From Lachiwalla Greens to Dev Enclave, our developments offer premium internal RCC/cemented roads, water connections, electricity setups, and high-end security.
              </p>
            </div>
          </div>
          <div className="flex justify-end border-t border-stone-100 pt-4">
            <Button
              onClick={() => setLearnMoreOpen(false)}
              className="bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold uppercase tracking-wider rounded-sm px-6 h-10 cursor-pointer"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
        {imagesList.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentImageIndex 
                ? 'w-6 bg-gold-400' 
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
