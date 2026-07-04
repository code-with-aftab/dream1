'use client';

import { useState } from 'react';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // WhatsApp Link using the user's phone number +91 9258884941
  const phoneNumber = '919258884941';
  const prefilledMessage = encodeURIComponent(
    'Hello Dreamland Associates, I am interested in inquiring about residential gated plots in Dehradun. Please share the pricing and brochures.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip Label */}
      <div 
        className={`bg-stone-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-sm border border-stone-850 shadow-md mb-2 transition-all duration-300 transform ${
          showTooltip 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        Chat on WhatsApp
      </div>

      {/* Pulsing ring container */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        title="Chat on WhatsApp"
      >
        {/* Animated Ring Glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        {/* WhatsApp Logo SVG */}
        <svg 
          className="w-8 h-8 text-white fill-current shrink-0" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.407-.003 9.806-4.414 9.809-9.83.001-2.624-1.01-5.092-2.85-6.937C16.378 1.993 13.91 1.017 11.281 1.017c-5.418 0-9.821 4.415-9.824 9.836 0 1.52.41 3.01 1.189 4.316L1.586 20.68l5.061-1.526zM17.65 14.86c-.348-.174-2.062-1.018-2.38-1.134-.318-.116-.55-.174-.78.174-.23.348-.898 1.134-1.101 1.366-.203.232-.406.261-.754.087-1.464-.73-2.58-1.272-3.582-3.003-.263-.453.263-.42.753-.873.08-.073.16-.16.23-.23.072-.07.12-.116.18-.174.06-.058.087-.116.13-.174.044-.058.02-.116-.01-.174-.03-.058-.78-1.879-1.07-2.576-.28-.675-.562-.582-.78-.582-.2-.008-.43-.008-.66-.008-.23 0-.61.087-.93.435-.32.348-1.22 1.192-1.22 2.91 0 1.72 1.248 3.377 1.422 3.608.174.232 2.457 3.75 5.952 5.26.83.36 1.48.57 1.98.73.84.27 1.61.23 2.21.14.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.51.2-1.65-.09-.14-.32-.23-.67-.4z" />
        </svg>
      </a>
    </div>
  );
}
