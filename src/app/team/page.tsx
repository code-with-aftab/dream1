'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  desc: string;
  phone: string;
  email: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Devika',
    role: 'Marketing & Operation Head',
    initials: 'D',
    desc: 'Leads private office operations, corporate marketing strategies, and developer relations for gated townships in Dehradun.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Anjali',
    role: 'Graphics & Editor',
    initials: 'A',
    desc: 'Handles architectural visualization, site plans, brochures, and digital media design for our portfolio listings.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Tanugya',
    role: 'Sr. Sale Executive',
    initials: 'T',
    desc: 'Senior acquisition consultant specializing in client relations, price negotiations, and Shimla Bypass plots.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Surjeet',
    role: 'Sr. Sale Executive',
    initials: 'S',
    desc: 'Dedicated property advisor with a deep network in Selaqui, Premnagar, and Bhauwala residential corridors.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Ansh',
    role: 'Sales Executive',
    initials: 'A',
    desc: 'Consultant facilitating plot demarcations, site visits, and buyer registry documentation support.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Vansh',
    role: 'Sales Executive',
    initials: 'V',
    desc: 'Facilitates seamless customer site viewings and local registry office coordinates for freehold plots.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Ankit',
    role: 'Sales Executive',
    initials: 'A',
    desc: 'Assists clients with bank loan approvals, legal title searches, and mutation status reporting.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Amit',
    role: 'Sr. Sale Executive',
    initials: 'A',
    desc: 'Senior advisory consultant managing premium portfolios in Lachiwala Greens and Doiwala development zones.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Neetu',
    role: 'Sales Executive',
    initials: 'N',
    desc: 'Facilitates customer inquiries, pre-launch property briefs, and coordinates buyer onboarding support.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
  {
    name: 'Anuj',
    role: 'Sales Executive',
    initials: 'A',
    desc: 'Handles plot boundary verifications, local zoning consultations, and buyer site visits.',
    phone: '9258884941',
    email: 'dreamlandassociate7@gmail.com',
  },
];

export default function TeamPage() {
  // Scroll reveal Observer Setup
  useEffect(() => {
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
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Header Block */}
        <div className="mb-16 text-left">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-600 hover:text-gold-700 transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
            Our Representatives
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal tracking-wide">
            Private Office Leadership & Desk
          </h1>
          <p className="text-sm font-light text-stone-500 leading-relaxed mt-4 max-w-3xl">
            Meet the dedicated advisors, operation heads, and coordinators behind Dreamland Associates Dehradun. 
            Every representative is trained to provide institutional-quality counsel, legal coordinates, and absolute discretion.
          </p>
        </div>

        {/* Members Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/60 rounded-lg p-4 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 reveal hover:-translate-y-1"
              style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
            >
              <div>
                {/* Profile Avatar / Initials Badge */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-gold-300 bg-gold-50/30 flex items-center justify-center text-gold-600 font-serif text-base sm:text-xl font-medium mb-4 sm:mb-6 select-none shadow-inner">
                  {member.initials}
                </div>
                
                {/* Title and Role */}
                <h4 className="font-serif text-base sm:text-lg text-stone-900 font-bold tracking-wide">{member.name}</h4>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-gold-600 block mt-1.5 mb-3 sm:mb-4">
                  {member.role}
                </span>
                
                {/* Description */}
                <p className="text-[10px] sm:text-xs font-light text-stone-500 leading-relaxed line-clamp-5">
                  {member.desc}
                </p>
              </div>

              {/* Direct Card Action Coordinates */}
              <div className="pt-4 sm:pt-6 border-t border-stone-100 mt-4 sm:mt-6 flex items-center justify-between text-stone-400 gap-2">
                <span className="text-[8px] sm:text-[10px] font-semibold text-stone-500 hidden xs:inline">Advisor Desk</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 rounded-full border border-stone-100 hover:border-gold-500 hover:text-gold-500 bg-stone-50/50 transition-all duration-300"
                    title="Call representative desk"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full border border-stone-100 hover:border-gold-500 hover:text-gold-500 bg-stone-50/50 transition-all duration-300"
                    title="Email private inbox"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Widgets */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}
