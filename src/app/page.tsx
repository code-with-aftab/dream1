'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import Collections from './components/Collections';
import ContactForm from './components/ContactForm';
import { PROPERTIES, Property } from './data';
import Image from 'next/image';
import { Mail, Shield, Award, MapPin, Home as HomeIcon, Key, Building2, TrendingUp, Coins, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppWidget from './components/WhatsAppWidget';
import Footer from './components/Footer';
import Link from 'next/link';

export default function Home() {
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
  }, [statusFilter]);

  // Smooth scroll handler for Navbar links
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
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
    return PROPERTIES.filter((property) => {
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
  }, [filters, statusFilter]);

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
    <div className="flex flex-col min-h-screen bg-white text-stone-800">
      {/* Navbar with smooth scroll triggers */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Hero Section */}
      <Hero onExploreClick={() => handleScrollToSection('properties-section')} />

      {/* Search Bar Overlay */}
      <SearchBar
        onSearch={handleSearch}
        initialType={filters.type}
        initialLocation={filters.location}
        initialPriceRange={filters.priceRange}
      />

      {/* Featured Listings Section */}
      <section className="pt-10 pb-20 max-w-7xl mx-auto px-6 lg:px-12 w-full" id="properties-section">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-2 block">
              Our Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal tracking-wide">
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
        <div className="flex border-b border-stone-200 mb-8 max-w-md">
          {[
            { id: 'All', label: 'All Projects' },
            { id: 'Completed', label: 'Completed' },
            { id: 'Ongoing', label: 'Ongoing (New)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`flex-1 pb-3 text-xs uppercase font-bold tracking-wider text-center border-b-2 transition-all duration-300 cursor-pointer ${
                statusFilter === tab.id
                  ? 'border-gold-500 text-stone-900 font-bold'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProperties.map((property, idx) => (
              <div
                key={property.id}
                className="reveal"
                style={{ transitionDelay: `${(idx % 3) * 120}ms` }}
              >
                <PropertyCard
                  property={property}
                  onSelect={setSelectedProperty}
                />
              </div>
            ))}
          </div>
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
      <Collections onSelectCollection={handleSelectCollection} />

      {/* Services Section */}
      <section className="py-24 bg-stone-50 border-t border-stone-200/40" id="services-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header based on mockup */}
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="font-sans text-3xl font-bold tracking-widest text-stone-900 uppercase">
              OUR SERVICES
            </h2>
            {/* Elegant horizontal underline divider */}
            <div className="w-24 h-[3px] bg-stone-900 mt-4 rounded-full" />
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
                  className="magic-card group p-8 md:p-10 flex flex-col items-center text-center shadow-sm relative cursor-default select-none overflow-hidden reveal"
                  style={{ transitionDelay: `${(idx % 3) * 120}ms` } as any}
                >
                  {/* Spotlight shine layer */}
                  <div className="magic-card-shine" />

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-stone-50 border border-stone-150 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-gold-300 group-hover:bg-gold-50/20 relative z-10 shrink-0">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-lg text-stone-900 font-bold mb-3 tracking-wide relative z-10">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-light text-stone-500 leading-relaxed max-w-sm relative z-10">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-white border-t border-stone-200/40" id="about-us-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 border border-stone-200/40 reveal-left">
            <Image
              src="/images/hero_villa.png"
              alt="Dreamland Associates Legacy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
          </div>

          <div className="w-full md:w-1/2 reveal-right">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Our Legacy
            </span>
            <h2 className="font-serif text-4xl text-stone-900 font-normal tracking-wide mb-6">
              A home is more than a place. It is a legacy.
            </h2>
            <p className="text-xs font-light text-stone-500 leading-relaxed mb-6">
              At Dream Land Associates, we handle the curation and transaction of prime residential assets worldwide. With private client advisors in major global hubs, we connect elite properties with global citizens.
            </p>
            <p className="text-xs font-light text-stone-500 leading-relaxed mb-8">
              We leverage exclusive global networks and deep data analytics to discover architectural masterpieces that match the vision of our clients.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-stone-100">
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
          </div>
        </div>
      </section>

      {/* Founders & Board Directors Section */}
      <section className="py-24 bg-stone-50 border-t border-stone-200/40" id="our-team-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Company Board
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal tracking-wide">
              Founders & Board Directors
            </h2>
            <p className="text-sm font-light text-stone-500 leading-relaxed mt-4">
              Our founding directors steer the vision, acquisitions, and operations of Dreamland Associates, assuring absolute legal security and premium development standards.
            </p>
          </div>

          {/* 3-Column Grid for Board Directors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mr. Sumit Lodhi',
                role: 'CEO & Founder',
                initials: 'SL',
                desc: 'Visionary founder of Dreamland Associates. Directs development programs, zoning clearance checks, and private client brokerage advisory desks.',
              },
              {
                name: 'Mr. Nitin Katoch',
                role: 'Director',
                initials: 'NK',
                desc: 'Oversees strategic portfolio growth, builder alliances, and coordinates direct investments along premium Dehradun bypass corridors.',
              },
              {
                name: 'Mr. Suhail',
                role: 'Managing Director',
                initials: 'S',
                desc: 'Steers day-to-day desk operations, buyer title registries, bank loan integrations, and local land administration coordinates.',
              },
            ].map((member, idx) => (
              <div
                key={member.name}
                className="bg-white border border-stone-200/60 rounded-lg p-8 shadow-sm flex flex-col justify-between items-center text-center hover:shadow-md transition-shadow duration-300 reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-full flex flex-col items-center">
                  {/* Larger Centered Initial Frame */}
                  <div className="w-24 h-24 rounded-full border-2 border-gold-400/80 bg-gold-50/30 flex items-center justify-center text-gold-600 font-serif text-2xl font-bold mb-6 select-none shadow-[0_4px_15px_rgba(136,115,97,0.12)]">
                    {member.initials}
                  </div>
                  <h4 className="font-serif text-xl text-stone-900 font-bold tracking-wide">{member.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold-600 block mt-1.5 mb-4">
                    {member.role}
                  </span>
                  <p className="text-xs font-light text-stone-500 leading-relaxed max-w-sm mx-auto">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-6 flex flex-col items-center text-stone-400 w-full space-y-2">
                  <span className="text-[10px] font-bold text-stone-500">Dreamland Private Desk</span>
                  <a
                    href="mailto:dreamlandassociate7@gmail.com"
                    className="hover:text-gold-500 transition-colors flex items-center space-x-1.5 text-xs text-stone-500 font-semibold"
                  >
                    <Mail className="w-4 h-4 text-stone-400 hover:text-gold-500" />
                    <span>Email Desk</span>
                  </a>
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
      <section className="py-24 bg-white overflow-hidden border-t border-stone-200/40" id="reviews-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal tracking-wide">
            What Our Clients Say
          </h2>
          <p className="text-sm font-light text-stone-500 leading-relaxed mt-4 max-w-xl mx-auto">
            Read certified transaction reviews from buyers who purchased gated plots in Dehradun with our private office.
          </p>
        </div>

        {/* Horizontal Marquee Container */}
        <div className="relative w-full overflow-hidden py-4 bg-stone-50/50 border-y border-stone-150/30 flex">
          {/* Left Gradient Fade */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Right Gradient Fade */}
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

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
                    className="w-[280px] sm:w-[350px] bg-white border border-stone-200/60 p-6 rounded-lg shadow-sm flex flex-col justify-between shrink-0 hover:shadow-md transition-shadow duration-300"
                  >
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(review.rating)].map((_, sIdx) => (
                          <span key={sIdx} className="text-amber-500 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-xs font-light text-stone-600 leading-relaxed italic">
                        "{review.text}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-stone-800">{review.name}</span>
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

      {/* FAQ Section */}
      <section className="py-24 bg-stone-50 border-t border-stone-200/40" id="faq-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
              Inquiries
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal tracking-wide">
              Frequently Asked Questions
            </h2>
            <p className="text-sm font-light text-stone-500 leading-relaxed mt-4">
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
                  className="bg-white border border-stone-200/60 rounded-md overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-sm sm:text-base text-stone-850 hover:text-gold-600 transition-colors font-medium cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xs text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-500' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-40 border-t border-stone-100 p-5' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-light text-stone-500 leading-relaxed">
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

      {/* WhatsApp Chat Floating Widget */}
      <WhatsAppWidget />
    </div>
  );
}
