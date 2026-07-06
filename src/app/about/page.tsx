'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { 
  Building2, ShieldCheck, Landmark, MapPin, 
  PhoneCall, Mail, Clock, Compass, Award, Users 
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-850 dark:bg-stone-950 dark:text-stone-300 font-sans transition-colors duration-300">
      <title>About Us | Dreamland Associates - Gated Plots in Dehradun</title>
      <meta name="description" content="Learn about Dreamland Associates, the leading private client real estate advisory desk in Dehradun, Uttarakhand. Legally secure gated colonies and premium bypass road developments." />
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#0d1527] text-white overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-4 block animate-pulse">
            Corporate Profile
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight max-w-4xl mx-auto">
            The Legacy of <span className="text-gold-500 font-normal">Dreamsland Associates</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-stone-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Pioneering premium residential land developments, transparent title verifications, and gated enclaves along Dehradun’s fastest-growing corridors.
          </p>
        </div>
      </section>

      {/* Corporate Overview (Philosophy) */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 block">
              Our Identity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
              Securing land ownership coordinates since day one.
            </h2>
            <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-450 leading-relaxed">
              At Dreamland Associates, we operate as a premium real estate acquisition and development desk in Uttarakhand. Our primary focus is solving the critical challenge of land verification—providing completely verified, registry-ready gated residential and commercial plots.
            </p>
            <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-455 leading-relaxed">
              Every project launched under the Dreamsland banner undergoes strict layout approvals and document screening. We secure clean mutation records (Dakhil Kharij), copy of Khatauni, and official boundary demarcation certificates for all gated communities before pre-bookings open.
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-stone-200/60 dark:border-stone-850/60">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-500 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-stone-900 dark:text-white">Legal Protection</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">100% registry & mutation clearance guarantees.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-500 shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-stone-900 dark:text-white">Bank Integrations</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Partnerships up to 90% loan approvals with top banks.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-500 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-stone-900 dark:text-white">Prime Corridors</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5"> Shimla Bypass & Premnagar highway access points.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-500 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-stone-900 dark:text-white">RCC Infrastructure</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">25 to 30 Ft wide roads with internal drains & power lines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legacy Visual Frame */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-200/40 dark:border-stone-850/40 bg-stone-100 dark:bg-stone-900 shadow-lg">
            <Image
              src="/images/hero_villa.png"
              alt="Dreamsland Legacy"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-stone-900/90 backdrop-blur-sm border border-neutral-700/50 text-white p-4 rounded-sm">
              <p className="font-serif text-2xl font-semibold text-gold-450">15+</p>
              <p className="text-[9px] uppercase tracking-widest font-bold text-stone-400 mt-0.5">Years of Land Stewardship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Leadership Team (Static Section matching database directors) */}
      <section className="py-24 bg-stone-100/50 dark:bg-stone-900/20 border-t border-b border-stone-200/40 dark:border-stone-850/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Founding Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
              Meet Our Board Directors
            </h2>
            <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-400 mt-3 leading-relaxed">
              Under the strategic coordinates of our directors, Dreamsland Associates has grown to represent trust and verified ownership in Dehradun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mr. Sumit Rajput',
                role: 'CEO & Founder',
                desc: 'Guides acquisition strategies, zoning verification setups, and oversees luxury estate development portfolios across Shimla Bypass corridors.',
                initials: 'SR'
              },
              {
                name: 'Mr. Nitin Katoch',
                role: 'Director',
                desc: 'Drives strategic corporate partnerships, builder alliances, and coordinates investment models along premium residential corridors.',
                initials: 'NK'
              },
              {
                name: 'Mr. Suhail',
                role: 'Managing Director',
                desc: 'Coordinates client land registrations, local administration liaisoning, bank loan tie-ups, and daily site operations desk.',
                initials: 'S'
              }
            ].map((director, idx) => (
              <div 
                key={director.name}
                className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-850/80 rounded-lg p-8 text-center shadow-sm flex flex-col justify-between items-center transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-gold-450 bg-gold-500/10 flex items-center justify-center text-gold-500 font-serif text-xl font-bold mb-6 select-none shadow-sm">
                    {director.initials}
                  </div>
                  <h4 className="font-serif text-lg text-stone-900 dark:text-stone-100 font-bold tracking-wide">{director.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold-600 block mt-1 mb-4">{director.role}</span>
                  <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
                    {director.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Office Address Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12" id="office-location">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Address Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#111111] text-white p-8 md:p-10 rounded-lg shadow-xl border border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-2.5 block">
                  Find Us
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white font-normal tracking-wide">
                  Dreamsland Headquarters
                </h3>
              </div>

              <div className="h-px bg-neutral-800/80" />

              {/* Direct coordinates */}
              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-sm bg-neutral-900 border border-neutral-850 text-gold-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-normal">
                    <p className="font-semibold text-white uppercase tracking-wider text-[10px] mb-1">Office Address</p>
                    <p className="text-stone-400">
                      Gorakhpur, Shimla Bypass Road,<br />
                      Near Jio Petrol Pump, Dehradun,<br />
                      Uttarakhand – 248007
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-sm bg-neutral-900 border border-neutral-850 text-gold-500 shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-normal">
                    <p className="font-semibold text-white uppercase tracking-wider text-[10px] mb-1">Direct Desk Phone</p>
                    <p className="text-stone-400 font-mono">+91 9927502248, +91 8057932926</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-sm bg-neutral-900 border border-neutral-850 text-gold-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-normal">
                    <p className="font-semibold text-white uppercase tracking-wider text-[10px] mb-1">Official Email</p>
                    <p className="text-stone-400 font-mono">dreamlandassociate7@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-sm bg-neutral-900 border border-neutral-850 text-gold-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-normal">
                    <p className="font-semibold text-white uppercase tracking-wider text-[10px] mb-1">Working Hours</p>
                    <p className="text-stone-400">10:00 AM – 7:00 PM (7 Days Open)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://maps.google.com/?q=Gorakhpur,+Shimla+Bypass+Road,+Dehradun,+Uttarakhand+248007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gold-500 hover:bg-gold-600 text-stone-955 py-3 rounded-sm shadow-md font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Navigate via GPS</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Map Integration */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-4 border border-stone-200/80 dark:border-stone-850/80 rounded-lg shadow-sm flex flex-col justify-between">
            <div className="relative flex-1 min-h-[350px] w-full rounded-md overflow-hidden border border-stone-150 dark:border-stone-800">
              <iframe
                title="Dreamsland Associates HQ Map Coordinate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.5492476569106!2d77.96205737536965!3d30.25010620880315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092bd9d42f7411%3A0xe96c4d7ec4839598!2sGorakhpur%2C%20Dehradun%2C%20Uttarakhand%20248002!5e0!3m2!1sen!2sin!4v1719245123456!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-3 flex items-center space-x-2 text-[10px] text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Google Map loaded via secure web pipeline (Scroll/Pinch to zoom)</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Chat floating widget */}
      <WhatsAppWidget />
    </div>
  );
}
