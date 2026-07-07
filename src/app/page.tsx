'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import Collections from './components/Collections';
import ContactForm from './components/ContactForm';
import SellPropertyModal from './components/SellPropertyModal';
import { PROPERTIES, Property } from './data';
import { getProperties, getTeamMembers, TeamMember, getHeroBanners, HeroBanner } from './utils/db';
import GallerySection from './components/GallerySection';
import Image from 'next/image';
import { Mail, Shield, Award, MapPin, Home as HomeIcon, Key, Building2, TrendingUp, Coins, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  useEffect(() => {
    getProperties().then(setProperties);
    getTeamMembers().then(setTeamMembers);
    getHeroBanners().then(setHeroBanners);
  }, []);

  useEffect(() => {
    const handleOpenSellModal = () => {
      setIsSellModalOpen(true);
    };
    window.addEventListener('open-sell-modal', handleOpenSellModal);
    return () => {
      window.removeEventListener('open-sell-modal', handleOpenSellModal);
    };
  }, []);

  // Filter state
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    priceRange: '',
  });

  // Status filter state
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');

  // FAQ open accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Selected property for modal detail view
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Dynamically resolve board members from the database with hardcoded fallback
  const directors = useMemo(() => {
    const defaultBoard = [
      {
        id: 'fallback-sumit',
        name: 'Mr. Sumit Rajput',
        role: 'CEO & Founder',
        initials: 'SR',
        desc: 'Visionary founder of Dreamland Associates. Directs development programs, zoning clearance checks, and private client brokerage advisory desks.',
        phone: '8057932926',
        email: 'dreamlandassociate7@gmail.com',
        image: ''
      },
      {
        id: 'fallback-nitin',
        name: 'Mr. Nitin Katoch',
        role: 'Director',
        initials: 'NK',
        desc: 'Oversees strategic portfolio growth, builder alliances, and coordinates direct investments along premium Dehradun bypass corridors.',
        phone: '9258884941',
        email: 'dreamlandassociate7@gmail.com',
        image: ''
      },
      {
        id: 'fallback-suhail',
        name: 'Mr. Suhail',
        role: 'Managing Director',
        initials: 'S',
        desc: 'Steers day-to-day desk operations, buyer title registries, bank loan integrations, and local land administration coordinates.',
        phone: '7906953585',
        email: 'dreamlandassociate7@gmail.com',
        image: ''
      }
    ];

    if (!teamMembers || teamMembers.length === 0) return defaultBoard;

    const boardFromDb = teamMembers.filter(m => {
      const roleLower = m.role.toLowerCase();
      return roleLower.includes('ceo') || roleLower.includes('director') || roleLower.includes('founder');
    });

    if (boardFromDb.length === 0) return defaultBoard;

    return boardFromDb.sort((a, b) => {
      const aCEO = a.role.toLowerCase().includes('ceo') || a.role.toLowerCase().includes('founder');
      const bCEO = b.role.toLowerCase().includes('ceo') || b.role.toLowerCase().includes('founder');
      if (aCEO && !bCEO) return -1;
      if (!aCEO && bCEO) return 1;
      
      const aMD = a.role.toLowerCase().includes('managing');
      const bMD = b.role.toLowerCase().includes('managing');
      if (aMD && !bMD) return 1;
      if (!aMD && bMD) return -1;
      
      return 0;
    }).slice(0, 3);
  }, [teamMembers]);

  // Scroll reveal Observer Setup — re-runs on statusFilter change so newly rendered cards are observed
  useEffect(() => {
    // Small delay so React finishes rendering the new list before we observe
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      revealElements.forEach((el) => {
        // If already in viewport (e.g. after tab switch), activate immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('reveal-active');
        }
        observer.observe(el);
      });

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [statusFilter, properties]);

  // Smooth scroll handler for Navbar links with offset to prevent header overlay
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const offset = 85; // navbar height + buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Search filter handler from SearchBar
  const handleSearch = (newFilters: { type: string; location: string; priceRange: string }) => {
    setFilters(newFilters);
  };

  // Nav filter handler (sets type and resets others)
  const handleTypeFilter = (type: string) => {
    setFilters({
      type,
      location: '',
      priceRange: '',
    });
  };

  // Handler for collection cards
  const handleSelectCollection = (tag: string) => {
    setFilters({
      type: tag,
      location: '',
      priceRange: '',
    });
  };

  // Filter listings based on active filters
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      // Filter by type
      if (filters.type && property.type !== filters.type) {
        return false;
      }
      // Filter by location (case-insensitive substring check to support Dehradun enclaves)
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      // Filter by price range
      if (filters.priceRange) {
        const price = property.price;
        if (filters.priceRange === 'under-20' && price >= 2000000) {
          return false;
        }
        if (filters.priceRange === '20-25' && (price < 2000000 || price > 2500000)) {
          return false;
        }
        if (filters.priceRange === 'over-25' && price <= 2500000) {
          return false;
        }
      }
      // Filter by status (Completed vs Ongoing)
      if (statusFilter !== 'All' && property.status !== statusFilter) {
        return false;
      }
      return true;
    });

    // Sort: Ongoing projects first, then Completed/others
    return [...filtered].sort((a, b) => {
      if (a.status === 'Ongoing' && b.status !== 'Ongoing') return -1;
      if (a.status !== 'Ongoing' && b.status === 'Ongoing') return 1;
      return 0;
    });
  }, [filters, statusFilter, properties]);

  // Helper to construct repeating items for seamless infinite marquee scroll
  const getMarqueeItems = (arr: Property[]) => {
    if (arr.length === 0) return [];
    let repeated = [...arr];
    while (repeated.length < 8) {
      repeated = [...repeated, ...arr];
    }
    return repeated;
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const resetFilters = () => {
    setFilters({
      type: '',
      location: '',
      priceRange: '',
    });
    setStatusFilter('All');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-stone-950 text-stone-800 dark:text-stone-200 transition-colors duration-300 relative overflow-hidden">
      <title>Dreamland Associates | Discover Legally Clear Gated Plots in Dehradun</title>
      <meta name="description" content="Dreamland Associates is Dehradun's premier real estate consultancy offering legally verified gated residential plots and premium township land projects on Shimla Bypass Road." />
      
      {/* Dynamic Glowing Ambient Blobs for Dark Mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Blob 1: Top Right */}
        <div className="absolute top-[12%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gold-500/10 to-blue-500/10 blur-[130px] opacity-0 dark:opacity-40 transition-opacity duration-1000 animate-float-1" />
        
        {/* Blob 2: Middle Left */}
        <div className="absolute top-[35%] left-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-600/10 to-gold-600/10 blur-[150px] opacity-0 dark:opacity-30 transition-opacity duration-1000 animate-float-2" />
        
        {/* Blob 3: Bottom Right */}
        <div className="absolute bottom-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-gold-600/10 to-blue-600/10 blur-[130px] opacity-0 dark:opacity-35 transition-opacity duration-1000 animate-float-1" />
      </div>
      {/* Navbar with smooth scroll triggers */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Hero Section */}
      <Hero onExploreClick={() => handleScrollToSection('properties-section')} banners={heroBanners} />

      {/* Search Bar Overlay */}
      <SearchBar
        onSearch={handleSearch}
        initialType={filters.type}
        initialLocation={filters.location}
        initialPriceRange={filters.priceRange}
      />

      {/* Featured Listings Section */}
      <section className="pt-10 pb-20 max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10" id="properties-section">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-2 block">
              Our Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
              Featured Listings
            </h2>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors"
            >
              <span>Clear Filters ({activeFiltersCount})</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Project Status Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-850 mb-8 max-w-md">
          {[
            { id: 'All', label: 'All Projects' },
            { id: 'Completed', label: 'Completed' },
            { id: 'Ongoing', label: 'Ongoing (New)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`flex-1 pb-3 text-xs uppercase font-bold tracking-wider text-center border-b-2 transition-all duration-300 cursor-pointer ${statusFilter === tab.id
                  ? 'border-gold-500 text-stone-900 dark:text-white font-bold'
                  : 'border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Marquee Ticker */}
        {filteredProperties.length > 0 ? (
          (() => {
            const row1 = filteredProperties.filter((_, idx) => idx % 2 === 0);
            const row2 = filteredProperties.filter((_, idx) => idx % 2 !== 0);
            const finalRow2 = row2.length > 0 ? row2 : row1;

            return (
              <div className="space-y-8 overflow-hidden marquee-container py-4 relative">
                
                {/* Custom Marquee CSS */}
                <style>{`
                  @keyframes marqueeLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                  }
                  @keyframes marqueeRight {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0); }
                  }
                  .animate-marquee-l {
                    display: flex;
                    width: max-content;
                    gap: 1.5rem;
                    animation: marqueeLeft 35s linear infinite;
                  }
                  .animate-marquee-r {
                    display: flex;
                    width: max-content;
                    gap: 1.5rem;
                    animation: marqueeRight 35s linear infinite;
                  }
                  .marquee-container:hover .animate-marquee-l,
                  .marquee-container:hover .animate-marquee-r {
                    animation-play-state: paused;
                  }
                  .mask-gradient-x {
                    mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
                  }
                `}</style>

                {/* Row 1: Moving Left */}
                <div className="relative w-full overflow-hidden mask-gradient-x">
                  <div className="animate-marquee-l">
                    {getMarqueeItems(row1).map((property, idx) => (
                      <div key={`${property.id}-r1-${idx}`} className="w-[280px] sm:w-[360px] shrink-0 select-none px-2">
                        <PropertyCard
                          property={property}
                          onSelect={setSelectedProperty}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Moving Right */}
                <div className="relative w-full overflow-hidden mask-gradient-x">
                  <div className="animate-marquee-r">
                    {getMarqueeItems(finalRow2).map((property, idx) => (
                      <div key={`${property.id}-r2-${idx}`} className="w-[280px] sm:w-[360px] shrink-0 select-none px-2">
                        <PropertyCard
                          property={property}
                          onSelect={setSelectedProperty}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            );
          })()
        ) : (
          <div className="text-center py-20 border border-dashed border-stone-200 rounded-lg">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-sm font-bold text-stone-700 uppercase mb-1">No Matching Properties</h4>
            <p className="text-xs text-stone-400 max-w-xs mx-auto mb-6">
              We couldn't find any properties matching your current search parameters.
            </p>
            <Button
              onClick={resetFilters}
              className="bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm px-6 h-10 cursor-pointer"
            >
              Reset Search Filters
            </Button>
          </div>
        )}
      </section>

      {/* Curated Collections Section */}
      <Collections onSelectCollection={handleSelectCollection} properties={properties} />

      {/* Services Section */}
      <section className="py-24 border-t border-stone-200/40 dark:border-stone-850/40 relative overflow-hidden bg-stone-50 dark:bg-stone-950 transition-colors duration-300 z-10" id="services-section">
        
        {/* Real Estate Background Floor Plan Sketch Image */}
        <div className="absolute inset-0 z-0 opacity-[0.09] dark:opacity-[0.035] pointer-events-none select-none dark:invert dark:brightness-125 transition-opacity duration-300">
          <Image
            src="/images/services_bg.png"
            alt="Real Estate Floor Plan Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Soft gradient edge overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 dark:from-stone-950/90 via-transparent to-stone-50/90 dark:to-stone-950/90 z-1 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header based on mockup */}
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="font-sans text-3xl font-bold tracking-widest text-stone-900 dark:text-white uppercase">
              OUR SERVICES
            </h2>
            {/* Elegant horizontal underline divider */}
            <div className="w-24 h-[3px] bg-stone-900 dark:bg-stone-300 mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Sales & Purchases',
                desc: 'Helping clients buy and sell homes with expert market insight and negotiation skills.',
                icon: <HomeIcon className="w-7 h-7 text-stone-900 group-hover:text-gold-650 transition-colors duration-300" />,
              },
              {
                title: 'Property Leasing & Rentals',
                desc: 'Assisting landlords and tenants in securing rental agreements that meet their needs.',
                icon: <Key className="w-7 h-7 text-stone-900 group-hover:text-gold-650 transition-colors duration-300" />,
              },
              {
                title: 'Commercial Real Estate',
                desc: 'Supporting businesses in finding, buying, or leasing commercial spaces.',
                icon: <Building2 className="w-7 h-7 text-stone-900 group-hover:text-gold-650 transition-colors duration-300" />,
              },
              {
                title: 'Real Estate Investment Consulting',
                desc: 'Providing strategic advice for investors to identify profitable opportunities and maximize returns.',
                icon: <TrendingUp className="w-7 h-7 text-stone-900 group-hover:text-gold-650 transition-colors duration-300" />,
              },
              {
                title: 'Market Analysis & Property Valuation',
                desc: 'Delivering accurate pricing insights based on current market trends and property assessments.',
                icon: <Coins className="w-7 h-7 text-stone-900 group-hover:text-gold-650 transition-colors duration-300" />,
              },
              {
                title: 'Property Management',
                desc: 'Full-service management for residential and commercial properties, including tenant screening, rent collection, and maintenance coordination.',
                icon: <Wrench className="w-7 h-7 text-stone-900 group-hover:text-gold-650 transition-colors duration-300" />,
              },
            ].map((service, idx) => {
              // Mousemove event tracking for spotlight beam effect
              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              };

              return (
                <div
                  key={idx}
                  onMouseMove={handleMouseMove}
                  className="magic-card group p-8 md:p-10 flex flex-col items-center text-center shadow-sm relative cursor-default select-none overflow-hidden bg-white/70 dark:bg-stone-900/80 backdrop-blur-md reveal"
                  style={{ transitionDelay: `${(idx % 3) * 120}ms` } as any}
                >
                  {/* Spotlight shine layer */}
                  <div className="magic-card-shine" />

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-gold-300 group-hover:bg-gold-50/20 dark:group-hover:bg-gold-950/20 relative z-10 shrink-0 [&_svg]:text-stone-900 dark:[&_svg]:text-stone-100 [&_svg]:group-hover:text-gold-650 dark:[&_svg]:group-hover:text-gold-400">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-lg text-stone-900 dark:text-stone-100 font-bold mb-3 tracking-wide relative z-10">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm relative z-10">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-white dark:bg-transparent border-t border-stone-200/40 dark:border-stone-850/40 transition-colors duration-300 relative z-10" id="about-us-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/40 dark:border-stone-850/40 reveal-left">
            <Image
              src="/images/hero_villa.png"
              alt="Dreamland Associates Legacy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/10 dark:bg-stone-900/30" />
          </div>

          <div className="w-full md:w-1/2 reveal-right">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Our Legacy
            </span>
            <h2 className="font-serif text-4xl text-stone-900 dark:text-white font-normal tracking-wide mb-6">
              A home is more than a place. It is a legacy.
            </h2>
            <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed mb-6">
              At Dream Land Associates, we handle the curation and transaction of prime residential assets worldwide. With private client advisors in major global hubs, we connect elite properties with global citizens.
            </p>
            <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
              We leverage exclusive global networks and deep data analytics to discover architectural masterpieces that match the vision of our clients.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-stone-100 dark:border-stone-850">
              <div>
                <span className="block font-serif text-3xl text-gold-600 font-medium">10k+</span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 mt-1.5 block">
                  Satisfied Customers
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl text-gold-600 font-medium">5k+</span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 mt-1.5 block">
                  Verified Properties
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl text-gold-600 font-medium">15+</span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 mt-1.5 block">
                  Years Experience
                </span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center font-serif text-3xl text-gold-600 font-medium">
                  4.9<span className="text-xl text-amber-500 ml-1">★</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 mt-1.5 block">
                  Customer Rating
                </span>
              </div>
            </div>
            
            <div className="pt-8">
              <Link href="/about">
                <button className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-stone-950 bg-transparent rounded-sm text-[10px] uppercase font-bold tracking-widest px-6 py-3 cursor-pointer transition-all duration-300">
                  Read Corporate Story & Location Map
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founders & Board Directors Section */}
      <section className="py-24 bg-gradient-to-b from-stone-50 via-stone-100/60 to-stone-50 dark:from-stone-950 dark:via-stone-900/30 dark:to-stone-950 border-t border-b border-stone-200/50 dark:border-stone-850/60 transition-colors duration-300 relative overflow-hidden z-10" id="our-team-section">
        {/* Dynamic Background Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#88736108_1px,transparent_1px),linear-gradient(to_bottom,#88736108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60 dark:opacity-30 z-0" />
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.03] pointer-events-none mix-blend-overlay">
          <Image
            src="/images/team_bg.png"
            alt="Office background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        
        {/* Glowing Ambient Color Orbs */}
        <div className="absolute top-10 left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-gold-500/10 via-transparent to-transparent blur-[120px] pointer-events-none z-0 dark:from-gold-600/5 animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-10 right-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-blue-500/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0 dark:from-blue-600/3 animate-pulse duration-[8000ms]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Company Board
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
              Founders & Board Directors
            </h2>
            <p className="text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed mt-4">
              Our founding directors steer the vision, acquisitions, and operations of Dreamland Associates, assuring absolute legal security and premium development standards.
            </p>
          </div>

          {/* 3-Column Grid for Board Directors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {directors.map((member, idx) => (
              <div
                key={member.name}
                className="group relative bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/80 rounded-2xl p-8 shadow-md flex flex-col justify-between items-center text-center hover:shadow-xl hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Background decorative gradient glow on hover */}
                <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gold-400/5 blur-[40px] pointer-events-none group-hover:bg-gold-500/10 transition-colors duration-500" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gold-400/5 blur-[40px] pointer-events-none group-hover:bg-gold-500/10 transition-colors duration-500" />

                <div className="w-full flex flex-col items-center relative z-10">
                  
                  {/* Portrait frame with double gold ring & hover scale */}
                  {member.image ? (
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gold-400/80 mb-6 p-1 bg-white dark:bg-stone-950 shadow-[0_4px_20px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform duration-500">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-full border-2 border-dashed border-gold-400/80 bg-gold-50/40 dark:bg-gold-950/15 flex items-center justify-center text-gold-600 font-serif text-3xl font-bold mb-6 select-none shadow-[0_4px_20px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform duration-500">
                      {member.initials || member.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}

                  <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100 font-bold tracking-wide transition-colors group-hover:text-gold-600 duration-300">
                    {member.name}
                  </h4>
                  
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600 block mt-2 mb-4 bg-gold-500/10 dark:bg-gold-500/5 px-3 py-1 rounded-full">
                    {member.role}
                  </span>
                  
                  <p className="text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm mx-auto">
                    {member.desc}
                  </p>
                </div>

                {/* Footer details & social buttons */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-850 mt-6 w-full flex flex-col items-center space-y-3.5 relative z-10">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400 dark:text-stone-500">
                    Dreamland Private Desk
                  </span>
                  
                  <div className="flex items-center justify-center gap-3 w-full">
                    <a
                      href={`mailto:${member.email || 'dreamlandassociate7@gmail.com'}`}
                      className="flex-1 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-900 border border-stone-200/50 dark:border-stone-800/80 py-2 px-3 rounded-lg text-stone-600 dark:text-stone-400 hover:text-gold-500 dark:hover:text-gold-500 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                    
                    <a
                      href={`https://wa.me/91${member.phone || '9258884941'}?text=Hello%20${encodeURIComponent(member.name)}%2C%20I%20am%20inquiring%20regarding%20property%20listings%20with%20Dreamland%20Associates.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 border border-transparent py-2 px-3 rounded-lg text-white text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.407-.003 9.806-4.414 9.809-9.83.001-2.624-1.01-5.092-2.85-6.937C16.378 1.993 13.91 1.017 11.281 1.017c-5.418 0-9.821 4.415-9.824 9.836 0 1.52.41 3.01 1.189 4.316L1.586 20.68l5.061-1.526zM17.65 14.86c-.348-.174-2.062-1.018-2.38-1.134-.318-.116-.55-.174-.78.174-.23.348-.898 1.134-1.101 1.366-.203.232-.406.261-.754.087-1.464-.73-2.58-1.272-3.582-3.003-.263-.453.263-.42.753-.873.08-.073.16-.16.23-.23.072-.07.12-.116.18-.174.06-.058.087-.116.13-.174.044-.058.02-.116-.01-.174-.03-.058-.78-1.879-1.07-2.576-.28-.675-.562-.582-.78-.582-.2-.008-.43-.008-.66-.008-.23 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.72 1.248 3.377 1.422 3.608.174.232 2.457 3.75 5.952 5.26.83.36 1.48.57 1.98.73.84.27 1.61.23 2.21.14.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.51.2-1.65-.09-.14-.32-.23-.67-.4z" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action to Team Page */}
          <div className="mt-12 flex justify-center">
            <Link href="/team">
              <Button className="group bg-stone-950 hover:bg-stone-850 text-white font-semibold text-xs uppercase tracking-wider px-8 h-12 rounded-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center cursor-pointer">
                <span>Meet Our Sales & Advisory Team</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section (Magic UI Marquee) */}
      <section className="py-24 bg-white dark:bg-transparent overflow-hidden border-t border-stone-200/40 dark:border-stone-850/40 transition-colors duration-300 relative z-10" id="reviews-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
            What Our Clients Say
          </h2>
          <p className="text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed mt-4 max-w-xl mx-auto">
            Read certified transaction reviews from buyers who purchased gated plots in Dehradun with our private office.
          </p>
        </div>

        {/* Horizontal Marquee Container */}
        <div className="relative w-full overflow-hidden py-4 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-150/30 dark:border-stone-850/30 flex">
          {/* Left Gradient Fade */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white dark:from-stone-950 to-transparent z-10 pointer-events-none" />
          {/* Right Gradient Fade */}
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white dark:from-stone-950 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee-horizontal flex space-x-6">
            {[...Array(3)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex space-x-6">
                {[
                  {
                    name: 'Rajesh Sharma',
                    role: 'Lachiwalla Greens Buyer',
                    text: 'Found my dream plot in Lachiwalla Greens. Registry was smooth and mutation support was outstanding. Highly recommend Sumit ji and team!',
                    rating: 5,
                  },
                  {
                    name: 'Preeti Rawat',
                    role: 'Bhadraj Colony Buyer',
                    text: 'Acquired a forest plot in Bhadraj Colony. The 360-degree mountain views are breathtaking. Extremely reliable services.',
                    rating: 5,
                  },
                  {
                    name: 'Vikram Singh',
                    role: 'Dev Enclave Buyer',
                    text: 'Excellent registry process at Dev Enclave. Clear titles and great bank loan assistance up to 90%.',
                    rating: 5,
                  },
                  {
                    name: 'Anil Dobhal',
                    role: 'Balaji Enclave Buyer',
                    text: 'Bought an ongoing plot in Balaji Enclave. The RCC road work and boundary walls are highly professional.',
                    rating: 5,
                  },
                  {
                    name: 'Sandeep Negi',
                    role: 'Paonta Highway Buyer',
                    text: 'Smooth booking experience for Paonta Highway Enclave. Great investment potential on Doon-Chandigarh corridor.',
                    rating: 5,
                  },
                  {
                    name: 'Meenakshi Thapa',
                    role: 'Acquisitions Client',
                    text: 'Great guidance by Devika and the sales team. The documentation and mutation tracking were completely transparent.',
                    rating: 5,
                  },
                ].map((review, rIdx) => (
                  <div
                    key={`${loopIdx}-${rIdx}`}
                    className="w-[280px] sm:w-[350px] bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 p-6 rounded-lg shadow-sm flex flex-col justify-between shrink-0 hover:shadow-md transition-shadow duration-300"
                  >
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(review.rating)].map((_, sIdx) => (
                          <span key={sIdx} className="text-amber-500 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-xs font-light text-stone-600 dark:text-stone-300 leading-relaxed italic">
                        "{review.text}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-stone-800 dark:text-stone-200">{review.name}</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-gold-600">
                        {review.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection id="gallery-section" />

      {/* FAQ Section */}
      <section className="py-24 border-t border-stone-200/40 dark:border-stone-850/40 relative overflow-hidden bg-stone-50 dark:bg-stone-950 transition-colors duration-300 z-10" id="faq-section">
        
        {/* Real Estate Background Elevation Sketch Image */}
        <div className="absolute inset-0 z-0 opacity-[0.09] dark:opacity-[0.035] pointer-events-none select-none dark:invert dark:brightness-125 transition-opacity duration-300">
          <Image
            src="/images/faq_bg.png"
            alt="Real Estate Elevation Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Soft gradient edge overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 dark:from-stone-950/90 via-transparent to-stone-50/90 dark:to-stone-950/90 z-1 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Inquiries
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-normal tracking-wide">
              Frequently Asked Questions
            </h2>
            <p className="text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed mt-4">
              Get direct answers to common queries regarding registry, mutations, bank loans, and colony infrastructures.
            </p>
          </div>

          {/* Collapsible Accordions */}
          <div className="space-y-4">
            {[
              {
                q: 'What documents are provided for title verification?',
                a: 'We provide complete registry documents, mutation records (Dakhil Kharij), copy of Khatauni, and official boundary demarcation certificates for all gated enclaves.',
              },
              {
                q: 'Can I get bank loan support on residential plots?',
                a: 'Yes, bank loan support up to 90% is available on all our residential projects from top nationalized and private banking partners (SBI, HDFC, ICICI, etc.).',
              },
              {
                q: 'What is the road width inside your gated colonies?',
                a: 'All our enclaves feature 25 Ft to 30 Ft wide Cemented/RCC (Reinforced Concrete) internal roads with integrated side drainage grids.',
              },
              {
                q: 'Are the plots immediate registry and mutation ready?',
                a: 'Yes, all our completed projects are immediate registry and mutation (Dakhil Kharij) ready. For ongoing projects, pre-bookings are open with clear legal schedules.',
              },
              {
                q: 'Where is your office located in Dehradun?',
                a: 'Our office is located at Gorakhpur, Shimla Bypass Road, Near Jio Petrol Pump, Dehradun, Uttarakhand – 248007.',
              },
            ].map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-white/70 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/60 dark:border-stone-850/80 rounded-md overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-sm sm:text-base text-stone-850 dark:text-stone-200 hover:text-gold-600 dark:hover:text-gold-450 transition-colors font-medium cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xs text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-500' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-stone-100 dark:border-stone-800 p-5' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                  >
                    <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two-column Contact Section */}
      <ContactForm id="contact-section" />

      {/* Footer */}
      <Footer />

      {/* Property Details Modal Overlay */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {isSellModalOpen && (
        <SellPropertyModal
          onClose={() => setIsSellModalOpen(false)}
        />
      )}

      {/* WhatsApp Chat Floating Widget */}
      <WhatsAppWidget />
    </div>
  );
}
