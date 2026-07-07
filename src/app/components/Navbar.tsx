'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
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
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileInventoryOpen, setMobileInventoryOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('dreamsland_theme');
      if (storedTheme === 'dark') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('dreamsland_theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dreamsland_theme', 'light');
    }
  };

  useEffect(() => {
    // Trigger entry animation after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          
          setScrolled(currentScroll > 20);

          if (window.innerWidth < 1024) {
            const diff = currentScroll - lastScroll;
            // Buffer to prevent flickering
            if (currentScroll > 120 && diff > 15) {
              setVisible(false);
            } else if (diff < -10 || currentScroll < 50) {
              setVisible(true);
            }
          } else {
            setVisible(true);
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const handleNavLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'about-us-section') {
      router.push('/about');
      return;
    }
    if (sectionId === 'blog-section') {
      router.push('/blog');
      return;
    }
    if (sectionId === 'contact-section') {
      router.push('/contact');
      return;
    }
    if (sectionId === 'our-team-section') {
      router.push('/team');
      return;
    }
    if (sectionId === 'admin') {
      router.push('/admin');
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
    { label: 'Inventory', hasDropdown: true },
    { label: 'About', sectionId: 'about-us-section' },
    { label: 'Gallery', sectionId: 'gallery-section' },
    { label: 'Blog', sectionId: 'blog-section' },
    { label: 'Our Team', sectionId: 'our-team-section' },
    { label: 'Contact Us', sectionId: 'contact-section' },
  ];

  return (
    <>
      <style>{`
        /* ── Navbar entry animation ── */
        @keyframes navSlideIn {
          from { opacity: 0; transform: translateY(-22px) scaleX(0.96); }
          to   { opacity: 1; transform: translateY(0)     scaleX(1);    }
        }
        .nav-enter {
          animation: navSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ── Nav link letter-spacing hover ── */
        .nav-link-item {
          position: relative;
          letter-spacing: 0.12em;
          transition: letter-spacing 0.35s cubic-bezier(0.16,1,0.3,1),
                      color 0.25s ease;
        }
        .nav-link-item:hover {
          letter-spacing: 0.18em;
        }

        /* ── Underline wipe animation ── */
        .nav-underline {
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #887361, #b6a798);
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1),
                      left   0.35s cubic-bezier(0.16,1,0.3,1);
          border-radius: 2px;
        }
        .nav-link-item:hover .nav-underline {
          width: 100%;
          left: 0;
        }

        /* ── Shimmer CTA button ── */
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%)  skewX(-15deg); }
        }
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: translateX(-100%) skewX(-15deg);
        }
        .btn-shimmer:hover::after {
          animation: shimmer 0.7s ease forwards;
        }

        /* ── Staggered link fade-in ── */
        @keyframes linkFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .nav-link-stagger {
          opacity: 0;
          animation: linkFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ── Mobile menu item slide ── */
        @keyframes mobileItemIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        .mobile-link-stagger {
          opacity: 0;
          animation: mobileItemIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ── Logo hover float ── */
        .logo-wrap {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                      filter 0.3s ease;
        }
        .logo-wrap:hover {
          transform: translateY(-2px) scale(1.04);
          filter: drop-shadow(0 4px 10px rgba(136,115,97,0.18));
        }

        /* ── Dot indicator on active link ── */
        .nav-dot {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #887361;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nav-link-item:hover .nav-dot {
          transform: translateX(-50%) scale(1);
        }
      `}</style>

      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md px-6 lg:px-12
          ${visible ? 'translate-y-0' : '-translate-y-full'}
          ${mounted ? 'opacity-100' : 'opacity-0'}
          ${
            scrolled
              ? 'bg-white dark:bg-stone-950 border-b border-stone-200/80 dark:border-stone-850/80 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
              : 'bg-white dark:bg-stone-950 border-b border-stone-200/50 dark:border-stone-850/50 py-4 lg:py-5 shadow-sm'
          }
        `}
      >
        <div className="w-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center logo-wrap">
            <div className="relative w-32 lg:w-36 h-10 lg:h-12 shrink-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Dreamland Associates Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Links & Actions (Right aligned) ── */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* Desktop Links */}
            <div className="flex items-center lg:space-x-7 xl:space-x-9">
              {navItems.map((item, i) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="relative group inline-block py-1.5">
                      <button
                        style={{ animationDelay: mounted ? `${120 + i * 70}ms` : '0ms' }}
                        className="nav-link-item nav-link-stagger text-[10px] xl:text-[11px] uppercase font-sans font-semibold cursor-pointer flex items-center space-x-1 text-stone-700 hover:text-gold-600 dark:text-stone-300 dark:hover:text-gold-450"
                      >
                        <span className="font-sans font-semibold">{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                        <span className="nav-underline" />
                        <span className="nav-dot" />
                      </button>
                      
                      {/* Dropdown Options */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-40 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-left">
                        {['Plots', 'Houses', 'Flats', 'Resales'].map((sub) => (
                          <Link
                            key={sub}
                            href={`/inventory?cat=${sub}`}
                            className="block px-4 py-2.5 text-[9px] uppercase font-sans font-bold tracking-widest text-stone-600 dark:text-stone-300 hover:bg-gold-50 dark:hover:bg-stone-850 hover:text-gold-600 dark:hover:text-gold-450 transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavLinkClick(item.sectionId || '')}
                    style={{ animationDelay: mounted ? `${120 + i * 70}ms` : '0ms' }}
                    className="nav-link-item nav-link-stagger text-[10px] xl:text-[11px] uppercase font-sans font-semibold cursor-pointer py-1.5 text-stone-700 hover:text-gold-600 dark:text-stone-300 dark:hover:text-gold-450"
                  >
                    <span className="font-sans font-semibold">
                      {item.label}
                    </span>
                    <span className="nav-underline" />
                    <span className="nav-dot" />
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <span className="w-px h-4 bg-stone-200 dark:bg-stone-800" />

            {/* Desktop Actions */}
            <div
              className="flex items-center space-x-4 xl:space-x-5"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'opacity 0.6s 0.5s ease, transform 0.6s 0.5s ease',
              }}
            >
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1.5 text-stone-500 hover:text-gold-500 hover:scale-110 transition-all duration-300 rounded-full hover:bg-gold-50 dark:hover:bg-stone-900 dark:text-stone-400 dark:hover:text-gold-400 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 xl:w-[18px] xl:h-[18px]" /> : <Moon className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />}
              </button>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-stone-500 hover:text-gold-500 hover:scale-110 hover:rotate-6 transition-all duration-300 rounded-full hover:bg-gold-50 dark:hover:bg-stone-900 dark:text-stone-400 dark:hover:text-gold-400"
                aria-label="Instagram Link"
              >
                <InstagramIcon className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
              </a>

              {/* Divider */}
              <span className="w-px h-4 bg-stone-200 dark:bg-stone-800" />

              <Button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-sell-modal'));
                }}
                className="hidden xl:inline-flex text-[9px] xl:text-[11px] font-sans font-semibold uppercase tracking-[0.14em] px-4 xl:px-5 h-9 xl:h-10 rounded-full border border-gold-500 hover:bg-gold-500 hover:text-stone-950 text-gold-500 bg-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:text-stone-950"
              >
                Sell Property
              </Button>

              <Button
                onClick={() => handleNavLinkClick('contact-section')}
                className="btn-shimmer text-[9px] xl:text-[11px] font-sans font-semibold uppercase tracking-[0.14em] px-5 xl:px-7 h-9 xl:h-10 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg bg-stone-900 hover:bg-gold-600 text-white border-0 dark:bg-white dark:text-stone-950 dark:hover:bg-gold-600 dark:hover:text-white"
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* ── Mobile Burger with Custom Dropdown Pop-up ── */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-600 hover:text-gold-500 transition-all rounded-full hover:bg-gold-50 dark:text-stone-400 dark:hover:bg-stone-900 cursor-pointer bg-transparent border-none outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="transition-all duration-200 cursor-pointer text-stone-800 dark:text-stone-200 hover:text-gold-500 hover:scale-110 p-2 bg-transparent border-none outline-none focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Pop-up Menu */}
        <div 
          className={`
            absolute top-full left-0 w-full bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-850/80 shadow-lg lg:hidden transition-all duration-300 origin-top transform 
            ${mobileMenuOpen ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
          `}
        >
          <div className="px-6 py-6 flex flex-col space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Nav Items */}
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="flex flex-col border-b border-stone-100 dark:border-stone-800/40">
                      <button
                        type="button"
                        onClick={() => setMobileInventoryOpen(!mobileInventoryOpen)}
                        className="text-left group flex items-center justify-between py-3 cursor-pointer bg-transparent border-none outline-none"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-300 group-hover:bg-gold-500 group-hover:scale-125 transition-all duration-350 shrink-0" />
                          <span className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                            {item.label}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${mobileInventoryOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {mobileInventoryOpen && (
                        <div className="pl-6 flex flex-col space-y-2 pb-3 pt-1.5 bg-stone-50 dark:bg-stone-950/40 rounded-lg mt-0.5 border border-stone-100/50 dark:border-stone-850/50">
                          {['Plots', 'Houses', 'Flats', 'Resales'].map((sub) => (
                            <Link
                              key={sub}
                              href={`/inventory?cat=${sub}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500 hover:text-gold-600 dark:text-stone-400 dark:hover:text-gold-450"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      handleNavLinkClick(item.sectionId || '');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left group flex items-center gap-2.5 py-3 border-b border-stone-100 dark:border-stone-800/40 cursor-pointer bg-transparent border-none outline-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-300 group-hover:bg-gold-500 group-hover:scale-125 transition-all duration-350 shrink-0" />
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-col gap-3">
              <Button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-sell-modal'));
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 h-10 text-[10px] font-sans font-bold uppercase tracking-wider text-gold-500 hover:bg-gold-500 hover:text-stone-955 border border-gold-500 rounded-full transition-all duration-300 bg-transparent cursor-pointer flex items-center justify-center"
              >
                Sell Your Property
              </Button>

              <Button
                onClick={() => {
                  handleNavLinkClick('contact-section');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 h-10 text-[10px] font-sans font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-gold-600 rounded-full shadow-md transition-all duration-300 border-0 dark:bg-white dark:text-stone-955 cursor-pointer flex items-center justify-center"
              >
                Get in Touch
              </Button>
            </div>

            {/* Social handles */}
            <div className="flex items-center justify-center gap-2.5 pt-4 border-t border-stone-100 dark:border-stone-800/60">
              <span className="text-[10px] text-stone-400 font-sans font-semibold">
                Follow us on Instagram
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-stone-500 hover:text-gold-500 hover:bg-gold-50 rounded-full transition-all duration-300 dark:text-stone-400 dark:hover:text-gold-450 dark:hover:bg-stone-900"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
