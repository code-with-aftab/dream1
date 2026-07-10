'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { getProperties } from '../utils/db';
import { Property } from '../data';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  IndianRupee, 
  Maximize2, 
  Compass, 
  Road, 
  FileCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Home as HomeIcon,
  Layers,
  Shield
} from 'lucide-react';

function InventoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Plots');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Sync active category with URL param
  useEffect(() => {
    if (catParam) {
      const matched = ['Plots', 'Houses', 'Flats', 'Resales'].find(
        c => c.toLowerCase() === catParam.toLowerCase()
      );
      if (matched) {
        setActiveCategory(matched);
      }
    }
  }, [catParam]);

  // Load properties from DB
  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const categories = ['Plots', 'Houses', 'Flats', 'Resales'];

  // Helper to resolve property category (defaulting empty categories to 'Plots')
  const getPropCategory = (prop: Property) => {
    return prop.category || 'Plots';
  };

  // Filter properties by active category
  const filteredProperties = properties.filter(p => getPropCategory(p) === activeCategory);

  // Price Formatter (Lakh / Crore)
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    router.push(`/inventory?cat=${cat}`, { scroll: false });
  };

  const openDetails = (prop: Property) => {
    setSelectedProperty(prop);
    setActiveImageIndex(0);
  };

  const getSecondaryImages = (prop: Property) => {
    return prop.secondaryImages || [];
  };

  const getAllImages = (prop: Property) => {
    return [prop.image, ...getSecondaryImages(prop)].filter(Boolean);
  };

  const nextImage = (imagesCount: number) => {
    setActiveImageIndex((prev) => (prev + 1) % imagesCount);
  };

  const prevImage = (imagesCount: number) => {
    setActiveImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex flex-col justify-between font-sans relative overflow-hidden transition-colors duration-300">
      <title>Premium Plot & Villa Inventory | Dreamland Associates</title>
      <meta name="description" content="Browse our curated real estate inventory of gated residential plots and premium developments in Dehradun. Select from fully clear mutation and ready registry sites." />
      
      {/* Architectural blueprint background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 text-left">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-600 hover:text-gold-700 transition-colors mb-6 group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
            Dreamland Inventory Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-white font-normal tracking-wide">
            Real Estate <span className="italic text-gold-500 font-light">Collections</span>
          </h1>
          <p className="text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed mt-4 max-w-3xl">
            Explore verified premium plots, modern luxury houses, elegant flat suites, and high-yield resale listings across Dehradun. 
            Click on any listing card to access the full details panel and browse multi-angle image galleries.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap gap-2.5 justify-start border-b border-stone-200 dark:border-stone-850 pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2.5 text-[10px] tracking-wider uppercase font-bold border transition-all duration-300 cursor-pointer rounded-full ${
                activeCategory === cat
                  ? 'bg-gold-500 text-stone-955 border-gold-500 shadow-sm shadow-gold-500/10'
                  : 'bg-white dark:bg-stone-900 text-stone-500 hover:text-stone-900 dark:hover:text-white border-stone-200 dark:border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-stone-900/50 rounded-2xl border border-stone-200/60 dark:border-stone-850 shadow-sm">
            <Layers className="w-12 h-12 mx-auto mb-4 text-stone-300 dark:text-stone-700 animate-pulse" />
            <h3 className="font-serif text-lg text-stone-700 dark:text-stone-300">No properties available</h3>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1.5">We are currently updating our {activeCategory} inventory. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => openDetails(prop)}
                className="group bg-white dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200/80 dark:border-stone-850 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                {/* Image block */}
                <div className="relative w-full aspect-[16/10] bg-stone-100 dark:bg-stone-950 overflow-hidden">
                  <Image
                    src={prop.image || '/images/hero_villa.png'}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  
                  {/* Category overlay badge */}
                  <div className="absolute top-4 left-4 bg-stone-900/80 dark:bg-stone-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-gold-400 rounded-sm">
                    {activeCategory}
                  </div>
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 bg-stone-950/90 text-gold-450 border border-gold-500/35 px-3.5 py-1.5 text-xs font-serif italic font-bold uppercase tracking-wider rounded shadow-[0_0_15px_rgba(202,138,4,0.25)] transition-all duration-300 group-hover:bg-stone-900 group-hover:border-gold-500">
                    {formatPrice(prop.price)}
                  </div>
                </div>

                {/* Details text */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-lg text-stone-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors truncate">
                      {prop.title}
                    </h3>
                    <div className="flex items-center text-[10px] text-stone-400 mt-1.5 space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>
                  </div>

                  {/* Amenities/Metrics Ribbon */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-[10px] font-medium text-stone-600 dark:text-stone-300">
                    <div className="flex items-center space-x-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{prop.size}</span>
                    </div>
                    {prop.roadWidth && (
                      <div className="flex items-center space-x-1.5">
                        <Road className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{prop.roadWidth}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA button */}
                  <button className="w-full text-center bg-stone-900 dark:bg-stone-950 hover:bg-gold-500 dark:hover:bg-gold-500 hover:text-stone-955 text-white py-2.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors duration-300">
                    View Complete Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Dynamic Multi-image Details Modal */}
      {selectedProperty && (
        (() => {
          const images = getAllImages(selectedProperty);
          const hasMultipleImages = images.length > 1;

          return (
            <div 
              className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto"
              onClick={() => setSelectedProperty(null)}
            >
              <div 
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-y-auto flex flex-col animate-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-stone-850">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gold-600 dark:text-gold-500">
                      Inventory details & gallery
                    </span>
                    <h3 className="font-serif text-xl text-stone-900 dark:text-white">
                      {selectedProperty.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Top segment: Gallery Carousel */}
                  <div className="relative w-full aspect-[16/9] bg-stone-100 dark:bg-stone-950 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800">
                    <Image
                      src={images[activeImageIndex]}
                      alt={`${selectedProperty.title} View ${activeImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Carousel controls */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={() => prevImage(images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white hover:scale-105 transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => nextImage(images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white hover:scale-105 transition-all cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Image indicator count */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[9px] font-mono text-white rounded-md">
                      {activeImageIndex + 1} / {images.length}
                    </div>

                    {/* Price tag */}
                    <div className="absolute bottom-4 right-4 bg-gold-500 text-stone-950 px-3.5 py-1.5 text-xs font-serif italic font-bold uppercase tracking-wider rounded shadow-md">
                      {formatPrice(selectedProperty.price)}
                    </div>
                  </div>

                  {/* Thumbnail selectors */}
                  {hasMultipleImages && (
                    <div className="flex gap-2 overflow-x-auto pb-1.5">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`relative w-20 aspect-[16/10] rounded overflow-hidden border-2 shrink-0 transition-all ${
                            activeImageIndex === index
                              ? 'border-gold-500 scale-103'
                              : 'border-transparent opacity-65 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Grid details specifications */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850/60 rounded-lg">
                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-wider text-stone-400 font-bold">Category</span>
                      <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold uppercase tracking-wider">{activeCategory}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-wider text-stone-400 font-bold">Total Size</span>
                      <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold">{selectedProperty.size}</p>
                    </div>
                    {selectedProperty.rate > 0 && (
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-stone-400 font-bold">Rate / Gaj</span>
                        <p className="text-xs font-bold font-serif italic text-gold-650 dark:text-gold-450">₹{selectedProperty.rate.toLocaleString('en-IN')}</p>
                      </div>
                    )}
                    {selectedProperty.roadWidth && (
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-stone-400 font-bold">Road Access</span>
                        <p className="text-xs text-stone-800 dark:text-stone-200 font-semibold">{selectedProperty.roadWidth}</p>
                      </div>
                    )}
                  </div>

                  {/* Overview description */}
                  <div className="space-y-2 text-left text-xs">
                    <span className="text-[9px] uppercase font-black tracking-widest text-gold-600 dark:text-gold-400 block border-b border-stone-100 dark:border-stone-800 pb-1.5">
                      Property Dossier Description
                    </span>
                    <p className="font-light text-stone-500 dark:text-stone-400 leading-relaxed">
                      {selectedProperty.description}
                    </p>
                  </div>

                  {/* Amenities List */}
                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                    <div className="space-y-2 text-left text-xs">
                      <span className="text-[9px] uppercase font-black tracking-widest text-gold-600 dark:text-gold-400 block border-b border-stone-100 dark:border-stone-800 pb-1.5">
                        Inventory Amenities & Details
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1.5">
                        {selectedProperty.amenities.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-stone-600 dark:text-stone-300">
                            <FileCheck className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registry status */}
                  <div className="flex items-center gap-2 p-3 bg-gold-50/50 dark:bg-gold-950/10 border border-gold-200/30 rounded text-[10px] text-stone-600 dark:text-stone-300 font-medium">
                    <Shield className="w-4 h-4 text-gold-500" />
                    <span>Registry status: <strong className="text-stone-900 dark:text-white font-bold">{selectedProperty.mutationStatus || 'Registry & Mutation Ready'}</strong></span>
                  </div>

                  {/* Quick CTAs */}
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+919258884941"
                      className="flex-1 bg-stone-900 dark:bg-stone-950 hover:bg-gold-500 text-white hover:text-stone-955 py-3 rounded text-center font-bold uppercase tracking-wider text-[9px] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Advisor Hotline</span>
                    </a>
                    <a
                      href={`mailto:dreamlandassociate7@gmail.com?subject=Inquiry:%20${encodeURIComponent(selectedProperty.title)}&body=Hello%20Dreamland%20Team,%20I%20am%20interested%20in%20your%2520listing:%20${encodeURIComponent(selectedProperty.title)}%20located%20at%20${encodeURIComponent(selectedProperty.location)}.%20Please%20provide%20more%20details.`}
                      className="flex-1 bg-stone-100 dark:bg-stone-800 hover:bg-gold-500 text-stone-600 dark:text-stone-300 hover:text-stone-955 py-3 rounded text-center font-bold uppercase tracking-wider text-[9px] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Inquiry</span>
                    </a>
                    <a
                      href={`https://wa.me/919258884941?text=${encodeURIComponent(`Hello, I am interested in your inventory listing: ${selectedProperty.title} (${selectedProperty.location}) priced at ${formatPrice(selectedProperty.price)}. Please share more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gold-500 hover:bg-gold-600 text-stone-955 py-3 rounded text-center font-bold uppercase tracking-wider text-[9px] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          );
        })()
      )}

      {/* Floating Widgets */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center">
        <div className="text-stone-400 animate-pulse text-xs uppercase font-bold tracking-widest">
          Loading Dreamland Collections...
        </div>
      </div>
    }>
      <InventoryContent />
    </Suspense>
  );
}
