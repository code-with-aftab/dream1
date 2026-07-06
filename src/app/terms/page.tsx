'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { FileText, ShieldAlert, Scale, ScrollText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const handleScrollToSection = () => {
    // Navigate back home or handled by Navbar
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <Navbar onScrollToSection={handleScrollToSection} />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-20 md:py-28 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-gold-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Desk</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-stone-200 dark:border-stone-850 pb-8 mb-10">
          <div className="flex items-center space-x-3 text-gold-500 mb-3">
            <ScrollText className="w-6 h-6" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Legal Desk</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-wide font-normal">
            Terms & Conditions
          </h1>
          <p className="text-xs text-stone-500 mt-2 font-mono">
            Last Updated: July 2026 | Dreamland Associates legal desk
          </p>
        </div>

        {/* Content Section */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <Scale className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>1. Agreement to Terms</h2>
            </div>
            <p>
              By accessing and interacting with the web portal of Dreamland Associates (dreamsland.in), you acknowledge and agree to be legally bound by these Terms and Conditions. If you do not agree to these terms, please discontinue access to our digital desks immediately.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <FileText className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>2. Information Accuracy & Listing Directory</h2>
            </div>
            <p>
              While Dreamland Associates utilizes rigorous legal title clearance checks, plot layout verification, and official khatauni inspection processes, the virtual property listings, layout dimensions (Gaj/Sq. Ft.), Bypass road widths, and pricing details published are for initial consumer guidance only. Final structural and legal commitments are governed strictly by physical sale deed registrations, local land administration desk agreements, and bank loan clearance drafts.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <ShieldAlert className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>3. Booking Fees, Mutation, & Registry</h2>
            </div>
            <p>
              All property purchases, gated township bookings, registry dates, and local land administration mutation requests are handled by our private advisory desk in Gorakhpur, Shimla Bypass, Dehradun. Legal registry processing timeframes are subject to Uttarakhand state registration department queues, stamp duty clearings, and municipal council schedules.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <Scale className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>4. Intellectual Property</h2>
            </div>
            <p>
              All website text layouts, logo branding vectors, dynamic Recharts reporting frameworks, blog publications, and high-resolution colony visual maps remain the exclusive intellectual property of Dreamland Associates. Unauthorized reproduction, scraping, or utilization of directory codes is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <FileText className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>5. Limitation of Liability</h2>
            </div>
            <p>
              Dreamland Associates shall not be held liable for any indirect, incidental, or consequential damages resulting from digital browser timeouts, unverified secondary link redirection, or discrepancies arising from external local broker networks.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <ScrollText className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>6. Governing Law</h2>
            </div>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of the State of Uttarakhand, India. Any disputes arising out of the use of our services or properties shall be subject to the exclusive jurisdiction of the courts of Dehradun.
            </p>
          </section>

        </div>
      </main>

      <WhatsAppWidget />
      <Footer />
    </div>
  );
}
