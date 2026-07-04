'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactFormProps {
  id?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ id = 'contact-section', onSuccess }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <section className="py-24 bg-stone-50 border-t border-stone-200/60" id={id}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Get in Touch Card */}
          <div className="lg:col-span-5 w-full flex flex-col justify-between reveal-left">
            <div className="border border-stone-200/80 rounded-lg p-8 bg-white shadow-sm flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-2 block">
                  Office Info
                </span>
                {/* Title from sketch (Get in Touch) */}
                <h3 className="font-serif text-3xl text-stone-900 mb-6 font-normal tracking-wide">
                  Get in Touch
                </h3>
                
                <p className="text-xs font-light text-stone-500 leading-relaxed mb-8">
                  Connect with our private office to request exclusive brochures, set up physical viewings, or consult on custom investment acquisitions.
                </p>

                {/* Contact Coordinates */}
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-600 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[10px] uppercase tracking-wider font-bold text-stone-400">HQ Address</h5>
                      <p className="text-xs font-medium text-stone-850 mt-1">
                        Gorakhpur, Shimla Bypass Road,<br />Near Jio Petrol Pump, Dehradun,<br />Uttarakhand – 248007
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-600 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Direct Office Phone</h5>
                      <p className="text-xs font-medium text-stone-850 mt-1 hover:text-gold-500 transition-colors">
                        <a href="tel:9258884941">+91 9258884941</a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Private Desk Email</h5>
                      <p className="text-xs font-medium text-stone-850 mt-1 hover:text-gold-500 transition-colors">
                        <a href="mailto:dreamlandassociate7@gmail.com">dreamlandassociate7@gmail.com</a>
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-gold-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h5 className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Advisory Hours</h5>
                      <p className="text-xs font-medium text-stone-850 mt-1">
                        Monday - Friday: 09:00 - 18:00 EST<br />Saturday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Map Placeholder or Brand Stamp */}
              <div className="border border-stone-200/50 bg-stone-50 rounded-sm p-4 text-center mt-8">
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">Dreamland Associates Private Desk</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Us Form */}
          <div className="lg:col-span-7 w-full reveal-right">
            <div className="border border-stone-200/80 rounded-lg p-8 md:p-10 bg-white shadow-sm h-full">
              
              {submitted ? (
                <div className="py-16 text-center animate-fade-in flex flex-col justify-center items-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200/30 flex items-center justify-center text-gold-600 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-stone-900 mb-4 tracking-wide font-normal">
                    Requirements Received
                  </h3>
                  <p className="text-sm font-light text-stone-500 max-w-md leading-relaxed mb-8">
                    Your luxury property requirements have been registered. A private office client advisor will review your specifications and supply a matching off-market collection.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setRequirements('');
                    }}
                    className="text-xs uppercase font-bold tracking-widest text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    Submit another inquiry
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-2 block">
                      Connect Form
                    </span>
                    {/* Title from sketch (Contact Us) */}
                    <h3 className="font-serif text-3xl text-stone-900 mb-2 font-normal tracking-wide">
                      Contact Us
                    </h3>
                    <p className="text-xs font-light text-stone-500">
                      Submit your contact details and criteria. An advisor will contact you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-sm text-xs font-medium focus-visible:ring-gold-500/20 focus-visible:border-gold-500 h-11 px-4"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-sm text-xs font-medium focus-visible:ring-gold-500/20 focus-visible:border-gold-500 h-11 px-4"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-sm text-xs font-medium focus-visible:ring-gold-500/20 focus-visible:border-gold-500 h-11 px-4"
                      />
                    </div>

                    {/* Requirements textarea from sketch (What you Requirements) */}
                    <div className="space-y-2">
                      <Label htmlFor="requirements" className="text-[10px] uppercase font-bold tracking-wider text-stone-400 pl-1">
                        What you Requirements.
                      </Label>
                      <Textarea
                        id="requirements"
                        rows={4}
                        placeholder="e.g. 4-Bedroom villa in Santorini with infinity pool and sunset Caldera view..."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-sm text-xs font-medium focus-visible:ring-gold-500/20 focus-visible:border-gold-500 py-3 px-4 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full h-12 text-xs font-bold uppercase tracking-wider text-white bg-gold-500 hover:bg-gold-600 rounded-sm shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>Send Requirements</span>
                        <Send className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
