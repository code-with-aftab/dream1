'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t-2 border-gold-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Info */}
        <div className="flex flex-col space-y-6 md:col-span-1 text-left">
          <div className="relative w-40 h-14 bg-white p-2 rounded-sm border border-stone-850 shadow-sm shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Dreamland Associates Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <p className="text-xs font-light text-stone-400 leading-relaxed max-w-xs">
            Dehradun's premier real estate private office curating verified residential gated plots with absolute legal clearance and registry support.
          </p>
          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-2">
            {['instagram', 'facebook', 'linkedin'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full border border-stone-800 bg-stone-900/50 flex items-center justify-center text-stone-400 hover:text-gold-500 hover:border-gold-500 transition-all duration-300"
              >
                {social === 'instagram' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )}
                {social === 'facebook' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                )}
                {social === 'linkedin' && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Plot Portfolio */}
        <div>
          <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white mb-6 border-l-2 border-gold-500 pl-3">Plot Portfolio</h4>
          <ul className="space-y-3.5 text-xs">
            {['Highway Plot', 'Forest Plot', 'Premium Plot', 'Plot'].map((type) => (
              <li key={type}>
                <button
                  onClick={() => {
                    if (pathname !== '/') {
                      router.push(`/?filterType=${type}#properties-section`);
                    } else {
                      // Home page filter handler
                      const filterBtn = document.querySelector(`[data-filter-type="${type}"]`) as HTMLButtonElement;
                      if (filterBtn) {
                        filterBtn.click();
                      } else {
                        router.push(`/?filterType=${type}#properties-section`);
                      }
                    }
                  }}
                  className="hover:text-gold-500 transition-colors text-left font-light cursor-pointer"
                >
                  {type === 'Plot' ? 'Standard Plots' : `${type}s`}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white mb-6 border-l-2 border-gold-500 pl-3">Corporate</h4>
          <ul className="space-y-3.5 text-xs">
            {['Services', 'About Us', 'Our Team', 'Contact Us'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    const idMap: { [key: string]: string } = {
                      'Services': 'services-section',
                      'About Us': 'about-us-section',
                      'Our Team': 'our-team-section',
                      'Contact Us': 'contact-section',
                    };
                    if (item === 'Our Team') {
                      router.push('/team');
                    } else {
                      handleNavClick(idMap[item]);
                    }
                  }}
                  className="hover:text-gold-500 transition-colors text-left font-light cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Private Office Info */}
        <div className="space-y-6">
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-white mb-6 border-l-2 border-gold-500 pl-3">Private Office</h4>
            <p className="text-xs font-light text-stone-400 leading-relaxed mb-4">
              Subscribe to receive exclusive off-market listings, pre-launch alerts, and market updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed successfully.');
              }}
              className="flex border-b border-stone-850 pb-2 focus-within:border-gold-500 transition-colors duration-300"
            >
              <input
                type="email"
                required
                placeholder="Email Address"
                className="bg-transparent border-none text-xs text-white placeholder-stone-600 focus:outline-none w-full pr-2"
              />
              <button type="submit" className="text-gold-500 hover:text-gold-400 font-bold uppercase text-[10px] tracking-wider shrink-0 pl-2 cursor-pointer">
                Join
              </button>
            </form>
          </div>

          {/* Quick Contact Info */}
          <div className="text-xs font-light text-stone-500 space-y-1.5 text-left">
            <p>Direct Desk: <a href="tel:9258884941" className="text-stone-300 hover:text-gold-500 transition-colors">+91 9258884941</a></p>
            <p>Email Desk: <a href="mailto:dreamlandassociate7@gmail.com" className="text-stone-300 hover:text-gold-500 transition-colors">dreamlandassociate7@gmail.com</a></p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-stone-500">
        <p>© {new Date().getFullYear()} Dream Land Associates. Gated Plots in Dehradun. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a>
          <button
            onClick={() => {
              if (pathname !== '/') {
                router.push('/');
              } else {
                handleNavClick('hero-section');
              }
            }}
            className="hover:text-gold-500 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>Back to Top</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
