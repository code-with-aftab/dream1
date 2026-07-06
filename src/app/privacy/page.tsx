'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { Eye, ShieldCheck, Database, MailCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
            <ShieldCheck className="w-6 h-6" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Legal Desk</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-wide font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500 mt-2 font-mono">
            Last Updated: July 2026 | Dreamland Associates legal desk
          </p>
        </div>

        {/* Content Section */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <Eye className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>1. Information Collection</h2>
            </div>
            <p>
              We collect information that you voluntarily provide to us when you submit forms on the site. This includes your name, phone number, email address, and specifications for residential gated plots or villas. Additionally, the website collects metadata of your interaction to improve page load speed and styling assets.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <Database className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>2. Information Storage & Utilization</h2>
            </div>
            <p>
              All client consult submissions and property sell requests are stored securely in our MongoDB Atlas database. This information is utilized solely by Dreamland Associates coordinators to contact you regarding available inventory listings, plot brochures, or registry mutation dates.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>3. Data Protection & Sharing</h2>
            </div>
            <p>
              We maintain high-standard security measures, including HTTPS encryption and secure database access protocols, to protect your personal details. We do not sell, distribute, trade, or share your contact details or mutation documents with external third-party advertising companies. Your records are only shared internally with authorized legal desk counselors or registrar officers when initiating a registry or bank loan application.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <MailCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>4. Automated Email Desk Notifications</h2>
            </div>
            <p>
              When you register an inquiry, you will receive an autoresponder email notification copy through our secure Gmail SMTP transporter. You can choose to opt-out of these updates by contacting us directly at <a href="mailto:dreamlandassociate7@gmail.com" className="text-gold-500 underline font-semibold">dreamlandassociate7@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-serif text-lg font-semibold">
              <Eye className="w-4 h-4 text-gold-500 shrink-0" />
              <h2>5. Contact Our Privacy Officer</h2>
            </div>
            <p>
              If you have any questions about this Privacy Policy, your registered data files, or want to request deletion of your inquiry registry from our database, please contact our Dehradun desk at +91 9927502248.
            </p>
          </section>

        </div>
      </main>

      <WhatsAppWidget />
      <Footer />
    </div>
  );
}
