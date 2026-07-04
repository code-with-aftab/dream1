'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

// Direct SVG implementation of Instagram icon to avoid resolution errors
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface NavbarProps {
  onScrollToSection?: (sectionId: string) => void;
}

export default function Navbar({ onScrollToSection = () => {} }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 1. Scrolled state check
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Hide/show logic for mobile scroll direction
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 60) {
          setVisible(false); // Scrolling down -> hide navbar
        } else {
          setVisible(true); // Scrolling up -> show navbar
        }
      } else {
        setVisible(true); // Desktop is always visible
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const router = useRouter();
  const pathname = usePathname();

  const handleNavLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'our-team-section') {
      router.push('/team');
      return;
    }
    
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      onScrollToSection(sectionId);
    }
  };

  const navItems = [
    { label: 'Home', sectionId: 'hero-section' },
    { label: 'Services', sectionId: 'services-section' },
    { label: 'About', sectionId: 'about-us-section' },
    { label: 'Our Team', sectionId: 'our-team-section' },
    { label: 'Contact Us', sectionId: 'contact-section' },
  ];

  const isDarkNavbar = pathname === '/' && !scrolled;

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 px-6 py-4 
          top-0 left-0 w-full rounded-none border-b border-x-0 border-t-0 
          lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-[92%] lg:md:w-[88%] lg:max-w-7xl lg:rounded-full lg:border lg:py-0 lg:px-10
          ${visible ? 'translate-y-0' : '-translate-y-full'} lg:translate-y-0
          ${
            isDarkNavbar
              ? 'bg-stone-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-white/10 lg:py-3.5'
              : 'bg-white/95 backdrop-blur-md shadow-md border-stone-200/80 lg:py-2.5'
          }
        `}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-32 lg:w-36 h-10 lg:h-12 shrink-0 flex items-center justify-center transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Dreamland Associates Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center / Right Links */}
          <div className="hidden lg:flex items-center lg:space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavLinkClick(item.sectionId)}
                className={`relative text-[10px] xl:text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer py-1.5 group-link ${
                  isDarkNavbar
                    ? 'text-stone-100 hover:text-gold-400'
                    : 'text-stone-850 hover:text-gold-600'
                }`}
              >
                <span>{item.label}</span>
                {/* Premium underline slide effect */}
                <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  isDarkNavbar ? 'bg-gold-400' : 'bg-gold-500'
                }`} />
              </button>
            ))}
          </div>

          {/* Instagram Icon / Action Item on Far Right */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1 hover:scale-110 transition-all duration-300 ${
                isDarkNavbar ? 'text-stone-200 hover:text-gold-400' : 'text-stone-650 hover:text-gold-500'
              }`}
              aria-label="Instagram Link"
            >
              <InstagramIcon className="w-4 h-4 xl:w-5 xl:h-5" />
            </a>
            <Button
              onClick={() => handleNavLinkClick('contact-section')}
              className={`text-[9px] xl:text-xs font-bold uppercase tracking-widest px-5 xl:px-6 h-9 xl:h-10 rounded-full cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${
                isDarkNavbar
                  ? 'bg-white text-stone-950 hover:bg-gold-500 hover:text-white shadow-[0_4px_15px_rgba(255,255,255,0.1)] border border-white/20'
                  : 'bg-stone-900 hover:bg-gold-600 text-white shadow-sm'
              }`}
            >
              Consult Desk
            </Button>
          </div>

          {/* Mobile Menu Burger Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`transition-colors cursor-pointer ${
                isDarkNavbar ? 'text-white hover:text-gold-400' : 'text-stone-850 hover:text-gold-500'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Sibling of nav to avoid translate-x transform clipping */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-80 h-screen bg-white shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 z-[110] ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="relative w-28 h-10 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Dreamland Associates Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavLinkClick(item.sectionId)}
                  className="text-left text-sm font-semibold uppercase tracking-widest text-stone-700 hover:text-gold-500 py-1 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 py-3 border-t border-b border-stone-100">
              <span className="text-xs text-stone-400 font-medium">Follow us on Instagram</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-stone-600 hover:text-gold-500 hover:bg-stone-50 rounded-full transition-all duration-300"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
            <Button
              onClick={() => handleNavLinkClick('contact-section')}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-gold-500 hover:bg-gold-600 rounded-sm shadow-md transition-all duration-300"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
