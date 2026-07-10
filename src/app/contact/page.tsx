'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { 
  PhoneCall, Mail, MapPin, Clock, 
  Send, CheckCircle2, AlertCircle, Building2 
} from 'lucide-react';

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirements: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.requirements) {
      setError('Please fill in all required (*) fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || 'dreamlandassociate7@gmail.com',
          requirements: form.requirements,
          inquiryType: 'Consult',
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', requirements: '' });
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setError('Failed to send message. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-850 dark:bg-stone-950 dark:text-stone-300 font-sans transition-colors duration-300">
      <title>Contact Us | Dreamland Associates - Private Advisory Desk</title>
      <meta name="description" content="Get in touch with Dreamland Associates. Contact our Dehradun offices for gated plot consultation, bypass road site views, and legal registry mutation inquiries." />
      {/* Navigation */}
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 bg-[#957258] text-white overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-100/90 mb-4 block animate-pulse">
            Advisory Desk
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight max-w-4xl mx-auto text-white">
            Contact Our <span className="italic text-amber-100 font-light">Private Office</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-stone-100/90 max-w-xl mx-auto mt-6 leading-relaxed">
            Get in touch with our local land coordinators, schedule site visits, or get bank loan approvals.
          </p>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Column 1: Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 block">
                Direct Channels
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-white font-normal tracking-wide">
                Reach out to us through <span className="italic text-gold-500 font-light">verified coordinates</span>.
              </h2>
              <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed">
                Whether you want to pre-book a gated plot along Shimla Bypass Road, schedule a local vehicle pick-up for layout verification, or list your property, our desk is here to assist.
              </p>
            </div>

            <div className="h-px bg-stone-200 dark:bg-stone-850" />

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-6 rounded-md shadow-sm">
                <div className="p-2 w-9 h-9 rounded bg-gold-500/10 text-gold-600 dark:text-gold-500 flex items-center justify-center mb-4">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-stone-900 dark:text-white">Call Hotline</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 font-mono leading-relaxed">
                  +91 9258884941
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-6 rounded-md shadow-sm">
                <div className="p-2 w-9 h-9 rounded bg-gold-500/10 text-gold-600 dark:text-gold-500 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-stone-900 dark:text-white">Email Desk</h4>
                <p className="text-xs text-stone-500 dark:text-stone-450 mt-2 font-mono truncate" title="dreamlandassociate7@gmail.com">
                  dreamlandassociate7<br />@gmail.com
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-6 rounded-md shadow-sm">
                <div className="p-2 w-9 h-9 rounded bg-gold-500/10 text-gold-600 dark:text-gold-500 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-stone-900 dark:text-white">Headquarters</h4>
                <p className="text-xs text-stone-500 dark:text-stone-405 mt-2 leading-normal">
                  Gorakhpur, Shimla Bypass,<br />
                  Near Jio Petrol Pump, Dehradun
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-250/60 dark:border-stone-850 p-6 rounded-md shadow-sm">
                <div className="p-2 w-9 h-9 rounded bg-gold-500/10 text-gold-600 dark:text-gold-500 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-stone-900 dark:text-white">Hours Open</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
                  10:00 AM – 7:00 PM<br />
                  (7 Days Open)
                </p>
              </div>

            </div>
          </div>

          {/* Column 2: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-8 border border-stone-200/80 dark:border-stone-850 rounded-lg shadow-sm">
            
            {success ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                <div className="relative w-36 h-12 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="Dreamland Associates Logo"
                    className="object-contain h-10 mx-auto"
                  />
                </div>
                <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                <h4 className="font-serif text-2xl text-stone-900 dark:text-white font-normal">
                  Inquiry Sent Successfully
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your consult request has been registered under <strong>dreamlandassociate7@gmail.com</strong>. An advisory coordinator from our Dehradun office will connect with you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-stone-900 hover:bg-gold-600 text-white dark:bg-white dark:text-stone-950 dark:hover:bg-gold-600 dark:hover:text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs text-stone-800 dark:text-stone-300">
                <div>
                  <h3 className="font-serif text-lg text-stone-900 dark:text-white font-normal">
                    Submit Consult Request
                  </h3>
                  <p className="text-[9px] text-stone-400 uppercase tracking-wider mt-0.5">
                    Dreamland Private Client Desk
                  </p>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. nitin katoch"
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2.5 px-3 text-xs focus:outline-none focus:border-gold-500 text-stone-800 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9258884941"
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2.5 px-3 text-xs focus:outline-none focus:border-gold-500 text-stone-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="e.g. client@gmail.com"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2.5 px-3 text-xs focus:outline-none focus:border-gold-500 text-stone-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1.5">
                    Your Requirements & Plot Coordinates *
                  </label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe what type of property you are looking for (e.g. 150 Gaj residential plot in gated colony near Shimla Bypass, with 25ft RCC road)"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-sm py-2.5 px-3 text-xs focus:outline-none focus:border-gold-500 text-stone-800 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-stone-955 py-3.5 rounded-sm shadow-md font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Building2 className="w-4 h-4 animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* Interactive Google Map Map Coordinate Integration */}
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white dark:bg-stone-900 p-4 border border-stone-200/80 dark:border-stone-850 rounded-lg shadow-sm">
          <div className="relative w-full h-[400px] rounded overflow-hidden border border-stone-150 dark:border-stone-800">
            <iframe
              title="Dreamsland Associates Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.5188738363717!2d77.9701055!3d30.3139923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b1e3f0f4d83%3A0x8bd049eab38f6274!2sDreamland+Associates!5e0!3m2!1sen!2sin!4v1719245123456!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Chat floating widget */}
      <WhatsAppWidget />
    </div>
  );
}
