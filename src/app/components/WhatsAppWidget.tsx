'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Building2, MapPin, BadgePercent, ShieldCheck, ChevronRight, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { Property, PROPERTIES } from '../data';
import { getProperties } from '../utils/db';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  properties?: Property[];
  actionButtons?: { label: string; action: string }[];
}

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Dreamland Associates. I am your AI Property Advisor. How can I help you find your dream plot or villa in Dehradun today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        { label: 'Show Gated Plots 🏡', action: 'show_plots' },
        { label: 'Budget Plots (< 25 Lakhs) 💰', action: 'show_budget' },
        { label: 'Bypass Road Locations 📍', action: 'show_bypass' },
        { label: 'Verify Legal Status 📑', action: 'show_legal' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch live properties from database on mount
  useEffect(() => {
    getProperties().then((data) => {
      if (data && data.length > 0) {
        setProperties(data);
      }
    });
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // WhatsApp Link using the user's phone number +91 9258884941
  const phoneNumber = '919258884941';
  const defaultPrefilledMessage = encodeURIComponent(
    'Hello Dreamland Associates, I am interested in inquiring about residential gated plots in Dehradun. Please share the pricing and brochures.'
  );
  const defaultWhatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultPrefilledMessage}`;

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  const handleQuickAction = (action: string, label: string) => {
    // Add user message
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      sender: 'user',
      text: label,
      timestamp: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let replyText = '';
      let recommended: Property[] = [];
      let nextButtons: { label: string; action: string }[] = [
        { label: 'Plot Inventory 🏡', action: 'show_plots' },
        { label: 'Under 25 Lakhs 💰', action: 'show_budget' },
        { label: 'Contact Private Office 📞', action: 'contact_office' }
      ];

      if (action === 'show_plots') {
        const plots = properties.filter((p) => p.type?.toLowerCase() === 'plot' || p.category?.toLowerCase() === 'plots');
        recommended = plots.slice(0, 3);
        replyText = `Here are some of our prime gated residential plots in Dehradun. They feature ready registry, 90% loan assistance, and full utility connections:`;
      } else if (action === 'show_budget') {
        const budgetPlots = properties.filter((p) => p.price <= 2500000);
        recommended = budgetPlots.slice(0, 3);
        replyText = `Here are premium plots and options that fit your budget of under ₹25 Lakhs. These are excellent for both immediate housing or high-return investment:`;
      } else if (action === 'show_bypass') {
        const bypassPlots = properties.filter(
          (p) =>
            p.location?.toLowerCase().includes('bypass') ||
            p.location?.toLowerCase().includes('shimla') ||
            p.location?.toLowerCase().includes('isbt')
        );
        recommended = bypassPlots.slice(0, 3);
        replyText = `These locations lie directly along premium Shimla Bypass / ISBT corridors offering outstanding connectivity and high appreciation rates:`;
      } else if (action === 'show_legal') {
        replyText = `At Dreamland Associates, legal security is our highest priority. All our projects undergo exhaustive zoning clearance checks. Every property features:\n\n✓ 100% Khatauni & Registry Clear Title\n✓ Immediate Mutation (Dakhil-Kharij) Support\n✓ Approved Road Widths (25 to 30 Ft)\n✓ Ready to Construct Gated Colonies`;
        nextButtons = [
          { label: 'View Safe Inventory 🏡', action: 'show_plots' },
          { label: 'Discuss with CEO 📞', action: 'contact_ceo' }
        ];
      } else if (action === 'contact_office' || action === 'contact_ceo') {
        const contactMsg = action === 'contact_ceo' ? 'Hello CEO Sumit Rajput, ' : 'Hello, ';
        const customWa = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(contactMsg + 'I am inquiring via the Dreamland AI Assistant regarding property listings. Please share brochures.')}`;
        window.open(customWa, '_blank');
        replyText = `I have redirected you to our Private Office WhatsApp desk. You can chat directly with our team!`;
      }

      const botMsg: Message = {
        sender: 'bot',
        text: replyText,
        timestamp: botTime,
        properties: recommended.length > 0 ? recommended : undefined,
        actionButtons: nextButtons,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      sender: 'user',
      text: inputText.trim(),
      timestamp: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let replyText = '';
      let recommended: Property[] = [];

      // Simple keywords mapping
      if (query.includes('plot') || query.includes('land') || query.includes('zamin')) {
        recommended = properties.filter((p) => p.type?.toLowerCase() === 'plot' || p.category?.toLowerCase() === 'plots').slice(0, 3);
        replyText = `Sure! I found these residential plots in Dehradun with 25-30 ft cemented roads and ready registry:`;
      } else if (query.includes('budget') || query.includes('lakh') || query.includes('sasta') || query.includes('price')) {
        recommended = properties.filter((p) => p.price <= 3000000).slice(0, 3);
        replyText = `Here are our best budget-friendly property offerings under ₹30 Lakhs:`;
      } else if (query.includes('bypass') || query.includes('shimla') || query.includes('highway')) {
        recommended = properties.filter((p) => p.location?.toLowerCase().includes('bypass') || p.location?.toLowerCase().includes('shimla')).slice(0, 3);
        replyText = `Here are top bypass/highway side properties with high connectivity:`;
      } else {
        replyText = `Thank you for sharing. We offer gated plots in Dehradun starting from 15 Lakhs up to luxury villas. You can explore our listings here or connect with our founders on WhatsApp for a custom catalog.`;
      }

      const botMsg: Message = {
        sender: 'bot',
        text: replyText,
        timestamp: botTime,
        properties: recommended.length > 0 ? recommended : undefined,
        actionButtons: [
          { label: 'Explore All Plots 🏡', action: 'show_plots' },
          { label: 'Chat on WhatsApp 💬', action: 'contact_office' }
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* ── Chatbot Panel (Expanding Card) ── */}
      {isChatOpen && (
        <div className="w-[360px] sm:w-[380px] h-[520px] bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-amber-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-stone-950" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-stone-900" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold tracking-wide">Dreamland AI Advisor</h4>
                <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase animate-pulse">Online & Ready</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-stone-300 hover:text-white bg-transparent border-none outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-stone-950/40">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
                
                {/* Bubble */}
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-800 rounded-tl-none'
                }`}>
                  {msg.text.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>{line}</p>
                  ))}
                </div>

                {/* Recommended Properties Cards */}
                {msg.properties && msg.properties.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2">
                    {msg.properties.map((prop) => (
                      <div 
                        key={prop.id}
                        className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-850 rounded-xl overflow-hidden shadow-sm flex hover:shadow-md transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative w-24 h-24 shrink-0 bg-stone-100">
                          <Image
                            src={prop.image}
                            alt={prop.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        {/* Detail */}
                        <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h5 className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">{prop.title}</h5>
                            <div className="flex items-center text-[10px] text-stone-400 mt-1 truncate">
                              <MapPin className="w-3 h-3 text-gold-500 mr-1 shrink-0" />
                              <span className="truncate">{prop.location}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] font-semibold text-stone-600 dark:text-stone-400">
                              <span>{prop.size}</span>
                              <span className="w-1 h-1 rounded-full bg-stone-300" />
                              <span>{prop.roadWidth}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 dark:border-stone-850">
                            <span className="text-[12px] font-bold text-gold-600">{formatPrice(prop.price)}</span>
                            <a
                              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hello Dreamland, I am interested in inquiring about listing: ${prop.title} (${prop.location}).`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm transition-all"
                            >
                              Inquire
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Reply Action Buttons */}
                {msg.actionButtons && msg.actionButtons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5 max-w-[90%]">
                    {msg.actionButtons.map((btn) => (
                      <button
                        type="button"
                        key={btn.label}
                        onClick={() => handleQuickAction(btn.action, btn.label)}
                        className="bg-stone-100 hover:bg-stone-200 dark:bg-stone-850 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 text-[10px] font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Time */}
                <span className="text-[9px] text-stone-400 px-1">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask about properties, bypass corridor, budget..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-gold-500 text-stone-800 dark:text-stone-200"
            />
            <button
              type="submit"
              className="bg-stone-900 hover:bg-gold-500 hover:text-stone-950 text-white rounded-xl p-2.5 transition-all shadow-md cursor-pointer flex items-center justify-center shrink-0 border-none outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ── Floating Buttons Row (WhatsApp + AI Bot Toggle) ── */}
      <div className="flex items-center space-x-3">
        
        {/* WhatsApp Icon Widget */}
        <div 
          className="flex flex-col items-end relative group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Tooltip Label */}
          <div 
            className={`absolute bottom-full right-0 bg-stone-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-md border border-stone-850 shadow-md mb-2 transition-all duration-300 transform shrink-0 whitespace-nowrap ${
              showTooltip 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
            }`}
          >
            Chat on WhatsApp
          </div>

          <a
            href={defaultWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative"
            title="Chat on WhatsApp"
          >
            {/* Animated Ring Glow */}
            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

            {/* Standard clean WhatsApp Logo SVG */}
            <svg 
              className="w-7 h-7 text-white fill-current shrink-0" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.407-.003 9.806-4.414 9.809-9.83.001-2.624-1.01-5.092-2.85-6.937C16.378 1.993 13.91 1.017 11.281 1.017c-5.418 0-9.821 4.415-9.824 9.836 0 1.52.41 3.01 1.189 4.316L1.586 20.68l5.061-1.526zM17.65 14.86c-.348-.174-2.062-1.018-2.38-1.134-.318-.116-.55-.174-.78.174-.23.348-.898 1.134-1.101 1.366-.203.232-.406.261-.754.087-1.464-.73-2.58-1.272-3.582-3.003-.263-.453.263-.42.753-.873.08-.073.16-.16.23-.23.072-.07.12-.116.18-.174.06-.058.087-.116.13-.174.044-.058.02-.116-.01-.174-.03-.058-.78-1.879-1.07-2.576-.28-.675-.562-.582-.78-.582-.2-.008-.43-.008-.66-.008-.23 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.72 1.248 3.377 1.422 3.608.174.232 2.457 3.75 5.952 5.26.83.36 1.48.57 1.98.73.84.27 1.61.23 2.21.14.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.51.2-1.65-.09-.14-.32-.23-.67-.4z" />
            </svg>
          </a>
        </div>

        {/* AI Real Estate Bot Toggle Button */}
        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative border outline-none ${
            isChatOpen
              ? 'bg-stone-900 border-stone-850 text-white'
              : 'bg-gradient-to-tr from-gold-500 to-amber-600 text-stone-950 border-gold-400'
          }`}
          title="Dreamland AI Property Advisor"
        >
          {isChatOpen ? (
            <X className="w-6 h-6 animate-in spin-in-90" />
          ) : (
            <>
              {/* Outer pulsing ring for AI Bot */}
              <span className="absolute inset-0 rounded-full bg-gold-500/20 animate-ping pointer-events-none" />
              <Sparkles className="w-6 h-6 animate-pulse" />
            </>
          )}
        </button>

      </div>

    </div>
  );
}
