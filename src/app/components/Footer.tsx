'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Mail, Phone, ExternalLink, ArrowUp, Compass } from 'lucide-react';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'about-us-section') {
      router.push('/about');
      return;
    }
    if (sectionId === 'contact-section') {
      router.push('/contact');
      return;
    }
    if (sectionId === 'blog-section') {
      router.push('/blog');
      return;
    }
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 85; // navbar height + buffer
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#957258] via-[#7d5f47] to-[#5d4432] text-white pt-8 pb-6 transition-colors duration-300">
      
      {/* ── Layered Building Skyline Silhouette with Custom Illuminated Windows ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none select-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[75px]">
          {/* Back layer: Distant buildings (low opacity gold) */}
          <path d="M0,120 L0,80 L40,80 L40,120 L80,120 L80,60 L130,60 L130,120 L180,120 L180,70 L220,50 L260,70 L260,120 L320,120 L320,40 L380,40 L380,120 L440,120 L440,75 L490,75 L490,120 L550,120 L550,55 L610,35 L670,55 L670,120 L730,120 L730,45 L790,45 L790,120 L850,120 L850,65 L900,65 L900,120 L960,120 L960,30 L1020,30 L1020,120 L1080,120 L1080,75 L1130,55 L1180,75 L1180,120 L1200,120 Z" className="fill-gold-500/10 dark:fill-gold-400/5" />
          
          {/* Middle layer: Intermediate buildings with depth */}
          <path d="M0,120 L0,90 L60,90 L60,120 L110,120 L110,75 L160,75 L160,120 L210,120 L210,85 L250,65 L290,85 L290,120 L350,120 L350,55 L400,55 L400,120 L470,120 L470,80 L520,80 L520,120 L580,120 L580,65 L630,45 L680,65 L680,120 L750,120 L750,50 L810,50 L810,120 L880,120 L880,75 L930,75 L930,120 L990,120 L990,40 L1050,40 L1050,120 L1100,120 L1100,85 L1150,65 L1200,85 L1200,120 Z" className="fill-[#4b392c]/65" />
          
          {/* Front layer: Solid front buildings with custom illuminated window grids */}
          <path d="M0,120 L0,100 L80,100 L80,120 L140,120 L140,85 L190,85 L190,120 L240,120 L280,75 L320,120 L380,120 L380,65 L430,65 L430,120 L500,120 L500,90 L550,90 L550,120 L600,120 L640,55 L680,120 L780,120 L780,60 L830,60 L830,120 L900,120 L900,85 L950,85 L950,120 L1010,120 L1010,50 L1070,50 L1070,120 L1120,120 L1160,75 L1200,120 Z" className="fill-[#957258] transition-colors duration-300" />
          
          {/* Glowing Windows Grid (Visible in both light & dark mode) */}
          <g className="opacity-95 animate-pulse duration-1000">
            {/* Windows in Tower X: 380-430 */}
            <rect x="392" y="75" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="402" y="75" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="414" y="75" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="392" y="86" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="402" y="86" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="414" y="86" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="392" y="97" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="402" y="97" width="4" height="5" className="fill-[#ffe082]" />
            <rect x="414" y="97" width="4" height="5" className="fill-[#ffe082]" />

            {/* Circular window in Gable Roof Building 3 (X: 240-320) */}
            <circle cx="280" cy="92" r="3.5" className="fill-[#ffe082]" />

            {/* Windows in Tower X: 780-830 */}
            <rect x="792" y="70" width="5" height="6" className="fill-[#ffe082]" />
            <rect x="812" y="70" width="5" height="6" className="fill-[#ffe082]" />
            <rect x="792" y="82" width="5" height="6" className="fill-[#ffe082]" />
            <rect x="812" y="82" width="5" height="6" className="fill-[#ffe082]" />
            <rect x="792" y="94" width="5" height="6" className="fill-[#ffe082]" />
            <rect x="812" y="94" width="5" height="6" className="fill-[#ffe082]" />

            {/* Circular window in Gable Roof Building 6 (X: 600-680) */}
            <circle cx="640" cy="80" r="4.5" className="fill-[#ffe082]" />

            {/* Windows in Tower X: 1010-1070 */}
            <rect x="1024" y="65" width="4" height="6" className="fill-[#ffe082]" />
            <rect x="1042" y="65" width="4" height="6" className="fill-[#ffe082]" />
            <rect x="1024" y="77" width="4" height="6" className="fill-[#ffe082]" />
            <rect x="1042" y="77" width="4" height="6" className="fill-[#ffe082]" />
            <rect x="1024" y="89" width="4" height="6" className="fill-[#ffe082]" />
            <rect x="1042" y="89" width="4" height="6" className="fill-[#ffe082]" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
             {/* Column 1: Logo & Brief Description */}
          <div className="flex flex-col space-y-4">
            <div className="relative w-40 h-14 shrink-0 flex items-center justify-start">
              <Image
                src="/logo.png"
                alt="Dreamland Associates Logo"
                fill
                className="object-contain brightness-0 invert opacity-95 transition-opacity duration-300 hover:opacity-100"
                priority
              />
            </div>
            <p className="font-serif text-[16px] leading-relaxed text-white/85 italic font-light max-w-xs">
              Dreamland Associates is a premier private office advisory specializing in gated residential enclaves, freehold plots, and elite estate acquisitions in Dehradun, Uttarakhand.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold tracking-wider text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[1px] after:bg-white/40">
              Useful Links
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Home Desk', id: 'hero-section' },
                { name: 'Our Services', id: 'services-section' },
                { name: 'Curated Collections', id: 'locations-section' },
                { name: 'Visual Gallery', id: 'gallery-section' },
                { name: 'Advisory Team', id: 'our-team-section' },
                { name: 'Real Estate Blog', id: 'blog-section' },
                { name: 'Contact Office', id: 'contact-section' },
              ].map((link) => (
                <li key={link.name} className="flex items-center">
                  <button
                    onClick={() => {
                      if (link.name === 'Advisory Team') {
                        router.push('/team');
                      } else if (link.name === 'Real Estate Blog') {
                        router.push('/blog');
                      } else {
                        handleNavClick(link.id);
                      }
                    }}
                    className="hover:text-white transition-all duration-300 text-left cursor-pointer flex items-center group/link transform hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover/link:bg-gold-300 group-hover/link:shadow-[0_0_8px_rgba(255,215,0,0.6)] mr-2.5 shrink-0 transition-all duration-300" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold text-white/80 group-hover/link:text-white transition-colors">{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information (Legal & Support Checklist) */}
          <div>
            <h4 className="font-serif text-lg font-semibold tracking-wider text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[1px] after:bg-white/40">
              Information
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Title Verification Checklist', id: 'faq-section' },
                { name: 'Registry Support', id: 'faq-section' },
                { name: 'Mutation Process', id: 'faq-section' },
                { name: 'Colony Development Layouts', id: 'services-section' },
                { name: 'FAQ & Inquiries Support', id: 'faq-section' },
              ].map((info) => (
                <li key={info.name} className="flex items-center">
                  <button
                    onClick={() => handleNavClick(info.id)}
                    className="hover:text-white transition-all duration-300 text-left cursor-pointer flex items-center group/link transform hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover/link:bg-gold-300 group-hover/link:shadow-[0_0_8px_rgba(255,215,0,0.6)] mr-2.5 shrink-0 transition-all duration-300" />
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold text-white/80 group-hover/link:text-white transition-colors">{info.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-lg font-semibold tracking-wider text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[1px] after:bg-white/40">
                Contact Us
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-center space-x-2.5 group/item">
                  <Phone className="w-3.5 h-3.5 text-white/50 group-hover/item:text-white transition-colors shrink-0" />
                  <a href="tel:9258884941" className="text-[11px] sm:text-xs uppercase tracking-[0.15em] font-semibold text-white/80 hover:text-white hover:underline transition-colors">+91 9258884941</a>
                </li>

                <li className="flex items-center space-x-2.5 group/item">
                  <Mail className="w-3.5 h-3.5 text-white/50 group-hover/item:text-white transition-colors shrink-0" />
                  <a href="mailto:dreamlandassociate7@gmail.com" className="text-[11px] sm:text-xs uppercase tracking-[0.10em] font-semibold text-white/80 hover:text-white hover:underline transition-colors break-all">
                    dreamlandassociate7@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-2 w-full">
              <span className="font-serif text-base font-semibold text-white/90 block mb-3 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-6 after:h-[1px] after:bg-white/40">
                Chat With Us
              </span>
              <div className="flex items-center space-x-3">
                {/* Instant Social/Chat Icons (Tanishq Style) */}
                <a
                  href="https://wa.me/919258884941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/10 hover:border-white/40 bg-white/5 text-white/75 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.503 4.94 1.505 5.548 0 10.064-4.512 10.068-10.066a10.016 10.016 0 0 0-2.953-7.11 9.97 9.97 0 0 0-7.115-2.953C5.98 2.53 1.464 7.042 1.46 12.597c-.001 1.765.485 3.491 1.407 5.021L1.87 21.84l4.777-1.254z" />
                  </svg>
                </a>
                <a
                  href="mailto:dreamlandassociate7@gmail.com"
                  className="p-2.5 rounded-full border border-white/10 hover:border-white/40 bg-white/5 text-white/75 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer"
                  title="Email Us"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href="tel:9258884941"
                  className="p-2.5 rounded-full border border-white/10 hover:border-white/40 bg-white/5 text-white/75 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer"
                  title="Call Us"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Social media links with custom inline SVGs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 pt-6 border-t border-white/10 mt-8">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-base font-medium text-white/90 mr-2">Social</span>
            {[
              { 
                name: 'Instagram', 
                href: 'https://instagram.com/dreamlandassociates?igsh=MTl0MnViYWx3c203ZA==',
                svg: (
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                )
              },
              { 
                name: 'Facebook', 
                href: 'https://facebook.com/share/1DsbEz5EMw',
                svg: (
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                )
              },
              { 
                name: 'LinkedIn', 
                href: 'https://linkedin.com/company/dreamland-associates/?viewAsMember=true',
                svg: (
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                )
              },
              { 
                name: 'YouTube', 
                href: '#',
                svg: (
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                )
              }
            ].map((social) => {
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/10 hover:border-white/40 bg-white/5 text-white/70 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center"
                  title={social.name}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    {social.svg}
                  </svg>
                </a>
              );
            })}
          </div>
          
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-light font-sans">
            MEMBER OF UTTARAKHAND BUILDERS ASSOCIATION
          </div>
        </div>

        {/* Row 3: Bank Partner integration logos (Tanishq payment style) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-6 text-[10px] uppercase font-semibold tracking-[0.15em] text-white/80 select-none font-sans border-t border-white/10 mt-6">
          <span className="font-serif text-sm italic text-white/90 tracking-normal normal-case mr-2">Certified Loan Partners:</span>
          {['SBI Home Loan', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'PNB Housing'].map((partner) => (
            <span key={partner} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/80 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 shadow-sm cursor-default">
              {partner}
            </span>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 mt-6 text-[10px] uppercase tracking-[0.15em] font-light text-white/50 leading-relaxed font-sans">
          <p>© {new Date().getFullYear()} Dream Land Associates. All rights reserved. • Managed by <a href="https://www.unzora.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline decoration-white/20 hover:decoration-white transition-colors font-normal">Unzora</a></p>
          <div className="flex space-x-6 shrink-0 font-normal">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/10">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-white/10">|</span>
            <button
              onClick={() => handleNavClick('hero-section')}
              className="hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
