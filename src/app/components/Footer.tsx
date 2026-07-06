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
    <footer className="relative bg-[#251912] text-white pt-14 pb-10 transition-colors duration-300">
      
      {/* ── Layered Building Skyline Silhouette with Custom Illuminated Windows ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none select-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[75px]">
          {/* Back layer: Distant buildings (low opacity gold) */}
          <path d="M0,120 L0,80 L40,80 L40,120 L80,120 L80,60 L130,60 L130,120 L180,120 L180,70 L220,50 L260,70 L260,120 L320,120 L320,40 L380,40 L380,120 L440,120 L440,75 L490,75 L490,120 L550,120 L550,55 L610,35 L670,55 L670,120 L730,120 L730,45 L790,45 L790,120 L850,120 L850,65 L900,65 L900,120 L960,120 L960,30 L1020,30 L1020,120 L1080,120 L1080,75 L1130,55 L1180,75 L1180,120 L1200,120 Z" className="fill-gold-500/10 dark:fill-gold-400/5" />
          
          {/* Middle layer: Intermediate buildings with depth */}
          <path d="M0,120 L0,90 L60,90 L60,120 L110,120 L110,75 L160,75 L160,120 L210,120 L210,85 L250,65 L290,85 L290,120 L350,120 L350,55 L400,55 L400,120 L470,120 L470,80 L520,80 L520,120 L580,120 L580,65 L630,45 L680,65 L680,120 L750,120 L750,50 L810,50 L810,120 L880,120 L880,75 L930,75 L930,120 L990,120 L990,40 L1050,40 L1050,120 L1100,120 L1100,85 L1150,65 L1200,85 L1200,120 Z" className="fill-[#170f0a]/65" />
          
          {/* Front layer: Solid front buildings with custom illuminated window grids */}
          <path d="M0,120 L0,100 L80,100 L80,120 L140,120 L140,85 L190,85 L190,120 L240,120 L280,75 L320,120 L380,120 L380,65 L430,65 L430,120 L500,120 L500,90 L550,90 L550,120 L600,120 L640,55 L680,120 L780,120 L780,60 L830,60 L830,120 L900,120 L900,85 L950,85 L950,120 L1010,120 L1010,50 L1070,50 L1070,120 L1120,120 L1160,75 L1200,120 Z" className="fill-[#251912] transition-colors duration-300" />
          
          {/* Glowing Windows Grid (Visible in both light & dark mode) */}
          <g className="opacity-90 animate-pulse duration-1000">
            {/* Windows in Tower X: 380-430 */}
            <rect x="392" y="75" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="402" y="75" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="414" y="75" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="392" y="86" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="402" y="86" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="414" y="86" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="392" y="97" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="402" y="97" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="414" y="97" width="4" height="5" className="fill-gold-300 dark:fill-gold-400" />

            {/* Circular window in Gable Roof Building 3 (X: 240-320) */}
            <circle cx="280" cy="92" r="3.5" className="fill-gold-300 dark:fill-gold-400" />

            {/* Windows in Tower X: 780-830 */}
            <rect x="792" y="70" width="5" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="812" y="70" width="5" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="792" y="82" width="5" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="812" y="82" width="5" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="792" y="94" width="5" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="812" y="94" width="5" height="6" className="fill-gold-300 dark:fill-gold-400" />

            {/* Circular window in Gable Roof Building 6 (X: 600-680) */}
            <circle cx="640" cy="80" r="4.5" className="fill-gold-300 dark:fill-gold-400" />

            {/* Windows in Tower X: 1010-1070 */}
            <rect x="1024" y="65" width="4" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="1042" y="65" width="4" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="1024" y="77" width="4" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="1042" y="77" width="4" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="1024" y="89" width="4" height="6" className="fill-gold-300 dark:fill-gold-400" />
            <rect x="1042" y="89" width="4" height="6" className="fill-gold-300 dark:fill-gold-400" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 border-t border-white/10">
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
            <p className="text-[11px] leading-relaxed text-stone-400 font-light max-w-xs">
              Dreamland Associates is a premier private office advisory specializing in gated residential enclaves, freehold plots, and elite estate acquisitions in Dehradun, Uttarakhand.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-white mb-6 border-l-2 border-gold-400 pl-3">
              Useful Links
            </h4>
            <ul className="space-y-3.5 text-xs font-bold text-white">
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
                    className="hover:text-gold-200 transition-all duration-300 text-left cursor-pointer flex items-center space-x-2.5 group/link"
                  >
                    {/* Building outline bullet shape */}
                    <span className="w-2.5 h-2.5 border border-white/40 group-hover/link:border-gold-300 rounded-[1px] relative flex items-center justify-center shrink-0 transition-colors">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[4px] border-b-white/40 group-hover/link:border-b-gold-300 transition-colors" />
                    </span>
                    <span className="text-white group-hover/link:text-gold-200 transition-colors">{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information (Legal & Support Checklist) */}
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-white mb-6 border-l-2 border-gold-400 pl-3">
              Information
            </h4>
            <ul className="space-y-3.5 text-xs font-bold text-white">
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
                    className="hover:text-gold-200 transition-all duration-300 text-left cursor-pointer flex items-center space-x-2.5 group/link"
                  >
                    {/* Building outline bullet shape */}
                    <span className="w-2.5 h-2.5 border border-white/40 group-hover/link:border-gold-300 rounded-[1px] relative flex items-center justify-center shrink-0 transition-colors">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[4px] border-b-white/40 group-hover/link:border-b-gold-300 transition-colors" />
                    </span>
                    <span className="text-white group-hover/link:text-gold-200 transition-colors">{info.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-white mb-6 border-l-2 border-gold-400 pl-3">
                Contact Us
              </h4>
              <ul className="space-y-3 text-xs font-bold text-white">
                <li className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gold-300 shrink-0" />
                  <a href="tel:9258884941" className="hover:text-gold-200 transition-colors">+91 9258884941</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gold-300 shrink-0" />
                  <a href="tel:8147349242" className="hover:text-gold-200 transition-colors">+91 8147349242</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-gold-300 shrink-0" />
                  <a href="mailto:dreamlandassociate7@gmail.com" className="hover:text-gold-200 transition-colors">
                    dreamlandassociate7@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-stone-900/60 w-full">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400 block mb-3">
                Chat With Us
              </span>
              <div className="flex items-center space-x-3">
                {/* Instant Social/Chat Icons (Tanishq Style) */}
                <a
                  href="https://wa.me/919258884941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-stone-850 hover:border-gold-500 bg-stone-900/30 text-stone-500 hover:text-gold-500 transition-all duration-300 cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.503 4.94 1.505 5.548 0 10.064-4.512 10.068-10.066a10.016 10.016 0 0 0-2.953-7.11 9.97 9.97 0 0 0-7.115-2.953C5.98 2.53 1.464 7.042 1.46 12.597c-.001 1.765.485 3.491 1.407 5.021L1.87 21.84l4.777-1.254z" />
                  </svg>
                </a>
                <a
                  href="mailto:dreamlandassociate7@gmail.com"
                  className="p-2 rounded-full border border-stone-850 hover:border-gold-500 bg-stone-900/30 text-stone-500 hover:text-gold-500 transition-all duration-300 cursor-pointer"
                  title="Email Us"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href="tel:9258884941"
                  className="p-2 rounded-full border border-stone-850 hover:border-gold-500 bg-stone-900/30 text-stone-500 hover:text-gold-500 transition-all duration-300 cursor-pointer"
                  title="Call Us"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#251e19] my-10" />

        {/* Row 2: Social media text-based list */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 text-xs text-white font-bold border-b border-[#251e19]">
          <div className="flex items-center space-x-3">
            <span className="text-white uppercase font-bold text-[10px] tracking-widest mr-2">Social</span>
            {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map((social) => (
              <a key={social} href="#" className="hover:text-gold-200 transition-colors">
                {social}
              </a>
            ))}
          </div>
          
          <div className="text-[10px] uppercase tracking-wider text-white font-bold">
            MEMBER OF UTTARAKHAND BUILDERS ASSOCIATION
          </div>
        </div>

        {/* Row 3: Bank Partner integration logos (Tanishq payment style) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 border-b border-[#251e19] text-[10px] uppercase font-bold tracking-widest text-white select-none">
          <span className="text-[8px] text-white/90 font-bold tracking-wide mr-2">Certified Loan Partners:</span>
          <span>SBI Home Loan</span>
          <span>HDFC Bank</span>
          <span>ICICI Bank</span>
          <span>Axis Bank</span>
          <span>PNB Housing</span>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 text-xs font-bold text-white leading-relaxed">
          <p>© {new Date().getFullYear()} Dream Land Associates. Gated Plots in Dehradun. All rights reserved.</p>
          <div className="flex space-x-6 shrink-0">
            <Link href="/privacy" className="hover:text-gold-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-200 transition-colors">Terms of Service</Link>
            <button
              onClick={() => handleNavClick('hero-section')}
              className="hover:text-gold-200 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer block */}
        <p className="text-[9px] text-white/90 font-bold leading-relaxed text-left mt-8 pt-4 border-t border-[#251e19]/60">
          Disclaimer: Dreamland Associates is an independent property curating and consulting desk. All colony layout maps, plot dimensions, mutation (Dakhil Kharij) clearance processes, and loan approval parameters represent standard developer offerings and are subject to official verification checks at the time of private buyer-seller registry.
        </p>
      </div>
    </footer>
  );
}
