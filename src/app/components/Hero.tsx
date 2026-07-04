'use client';

import { useState } from 'react';
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

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const [buzonEmail, setBuzonEmail] = useState('');
  const [buzonSubmitted, setBuzonSubmitted] = useState(false);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  const handleBuzonConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (buzonEmail) {
      setBuzonSubmitted(true);
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-start overflow-hidden py-20 md:py-28 px-6 lg:px-12 bg-stone-950" id="hero-section">
      {/* Background Hero Image - fully clear and visible */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_villa.png"
          alt="Dreamland Associates Luxury Estate"
          fill
          priority
          className="object-cover object-center scale-100"
        />
        {/* Premium dark-to-transparent gradient for text contrast and background image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Left Aligned Transparent Content */}
      <div className="relative z-10 w-full max-w-4xl space-y-5 text-left text-white mt-8 md:mt-12">
        <div className="inline-flex items-center space-x-2 border border-gold-500/30 bg-gold-950/20 px-3.5 py-1 rounded-full animate-fade-in-down">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold-300">
            Delivering Trust Globally
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.05] tracking-wide text-white animate-fade-in-up delay-100">
          Dream Land <span className="block italic text-gold-400 font-light mt-2">Associates</span>
        </h1>

        {/* Subheading */}
        <p className="font-serif text-xl sm:text-2xl font-light italic text-stone-300 tracking-wide animate-fade-in-up delay-200">
          "Building Dreams, Delivering Trust"
        </p>
        
        <p className="font-sans text-xs sm:text-sm font-light text-stone-400 leading-relaxed max-w-xl animate-fade-in-up delay-300">
          Representing exclusive architectural masterpieces, waterfront estates, and elite private penthouses across the world's most desired locations.
        </p>

        {/* Dynamic Buzon Connect Widget */}
        <div className="max-w-md bg-stone-900/60 backdrop-blur-md border border-stone-800 p-6 rounded-md shadow-lg text-left animate-fade-in-up delay-400">
          <div className="flex items-center space-x-2.5 mb-4">
            <Mail className="w-4 h-4 text-gold-400" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white">
              Buzón Connect
            </span>
          </div>
          
          {buzonSubmitted ? (
            <div className="py-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
              <h4 className="text-xs uppercase font-bold text-white tracking-wider">
                Connection Established
              </h4>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed mt-1">
                We have received your private inquiry. An advisor will message you shortly.
              </p>
              <Button
                variant="link"
                onClick={() => setBuzonSubmitted(false)}
                className="text-[10px] text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider mt-3 p-0 h-auto cursor-pointer"
              >
                Reset Connection
              </Button>
            </div>
          ) : (
            <form onSubmit={handleBuzonConnect} className="flex gap-2">
              <Input
                type="email"
                required
                placeholder="Enter email for private brochure"
                value={buzonEmail}
                onChange={(e) => setBuzonEmail(e.target.value)}
                className="bg-stone-950/60 border-stone-850 text-white placeholder-stone-500 text-xs focus:ring-gold-500 focus:border-gold-500 h-10 w-full"
              />
              <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-wider px-5 h-10 rounded-sm shrink-0 cursor-pointer">
                Connect
              </Button>
            </form>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-up delay-500">
          <Button
            onClick={onExploreClick}
            className="group bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm px-8 h-12 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center shadow-[0_4px_20px_rgba(136,115,97,0.35)] hover:shadow-[0_8px_25px_rgba(136,115,97,0.5)]"
          >
            <span>Get in Touch</span>
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
    </section>
  );
}
