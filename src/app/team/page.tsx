'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';
import { Mail, Phone, ArrowLeft, Shield, Sparkles, Award, Star, BarChart3, X, MessageSquare, Compass } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTeamMembers, TeamMember } from '../utils/db';
import Image from 'next/image';

// Sound Synthesis via Web Audio API for Gaming Experience
const playHoverSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {}
};

const playChimeSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc1.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
    gain1.gain.setValueAtTime(0.04, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start();
    osc1.stop(ctx.currentTime + 0.4);
  } catch (e) {}
};

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const getMemberCategory = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('ceo') || roleLower.includes('director') || roleLower.includes('founder') || roleLower.includes('president') || roleLower.includes('partner')) {
      return 'Leadership';
    }
    if (roleLower.includes('legal') || roleLower.includes('lawyer') || roleLower.includes('mutation') || roleLower.includes('compliance')) {
      return 'Legal & Compliance';
    }
    if (roleLower.includes('coordinator') || roleLower.includes('operations') || roleLower.includes('admin') || roleLower.includes('desk')) {
      return 'Operations & Support';
    }
    return 'Property Advisory';
  };

  const categories = ['All', 'Leadership', 'Property Advisory', 'Legal & Compliance', 'Operations & Support'];

  const getRoleWeight = (role: string): number => {
    const r = role.toLowerCase();
    if (r.includes('director') && !r.includes('managing') && !r.includes('md')) return 1;
    if (r.includes('ceo') || r.includes('founder')) return 2;
    if (r.includes('managing') || r === 'md' || r.includes('m.d.')) return 3;
    return 4;
  };

  const filteredTeam = teamMembers
    .filter(member => {
      if (activeCategory === 'All') return true;
      return getMemberCategory(member.role) === activeCategory;
    })
    .sort((a, b) => getRoleWeight(a.role) - getRoleWeight(b.role));

  useEffect(() => {
    getTeamMembers().then(setTeamMembers);
  }, []);

  const getMemberInitials = (member: TeamMember) => {
    if (member.initials) return member.initials;
    return member.name.substring(0, 2).toUpperCase();
  };

  const getDesignationAbbr = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('ceo')) return 'CEO';
    if (roleLower.includes('director')) return 'DIR';
    if (roleLower.includes('manager')) return 'MGR';
    if (roleLower.includes('legal')) return 'LEGAL';
    if (roleLower.includes('advisor')) return 'ADV';
    if (roleLower.includes('coordinator')) return 'COORD';
    return 'EXEC';
  };

  // Deterministic Game Attributes Generator
  const getMemberStats = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const negotiation = 82 + (Math.abs(hash) % 18);
    const legality = 85 + (Math.abs(hash >> 2) % 15);
    const discretion = 90 + (Math.abs(hash >> 4) % 10);
    const closing = 80 + (Math.abs(hash >> 6) % 18);
    
    const overall = Math.round((negotiation + legality + discretion + closing) / 4);
    const experience = 4 + (Math.abs(hash) % 12);
    return { negotiation, legality, discretion, closing, overall, experience };
  };

  const handleCardClick = (member: TeamMember) => {
    playChimeSound();
    setSelectedMember(member);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex flex-col justify-between font-sans relative overflow-hidden select-none">
      <title>Our Expert Team | Dreamland Associates - Property Advisors</title>
      <meta name="description" content="Meet the management and private client advisory team at Dreamland Associates. Specialists in legal title registry, plot mutation, and Bypass Road plot inventory." />
      
      {/* ── Beautiful Brown and Grey Glowing Aurora Nebula Orbs ── */}
      {/* 1. Luxury Gold/Brown Glowing Orb */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-[#887361]/8 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse duration-4000" />
      {/* 2. Soft Grey/Gold Glowing Orb */}
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#887361]/5 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse duration-3000" />
      {/* 3. Gold Accent Highlight */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#887361]/3 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-80" />

      {/* CSS Styles for Real Estate Blueprint Draw, Surveying & Magic UI Border Beam Effects */}
      <style>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        .blueprint-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .blueprint-path {
          stroke-dashoffset: 0;
          animation: drawPath 1.4s forwards;
        }
        .survey-bracket {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .group:hover .survey-bracket-tl { transform: translate(6px, 6px); }
        .group:hover .survey-bracket-tr { transform: translate(-6px, 6px); }
        .group:hover .survey-bracket-bl { transform: translate(6px, -6px); }
        .group:hover .survey-bracket-br { transform: translate(-6px, -6px); }

        /* Magic UI Border Beam Animation Effect */
        @keyframes borderBeamMove {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .border-beam-line {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events-none;
          border: 1.5px solid transparent;
          background: linear-gradient(90deg, #887361, #57534e) border-box;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .group:hover .border-beam-line {
          opacity: 0.85;
          animation: borderGlowFlow 4s linear infinite;
        }
        @keyframes borderGlowFlow {
          0%, 100% { clip-path: inset(0 0 95% 0); }
          25% { clip-path: inset(0 95% 0 0); }
          50% { clip-path: inset(95% 0 0 0); }
          75% { clip-path: inset(0 0 0 95%); }
        }

        .fan-card {
          transform: none !important;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        @media (min-width: 768px) {
          .fan-card {
            transform: perspective(1000px) rotateY(var(--card-angle)) translateZ(var(--card-z)) !important;
            transform-style: preserve-3d;
          }
        }
      `}</style>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Header Block */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-600 hover:text-gold-700 transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-500 mb-3 block">
            Dreamland Executive Roster
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-white font-normal tracking-wide">
            Private Office <span className="italic text-gold-500 font-light">Representatives</span>
          </h1>
          
          <p className="text-xs sm:text-sm font-light text-stone-500 dark:text-stone-400 leading-relaxed mt-4">
            Curating institutional clearance, legal mutations, and premier gated inventory in Dehradun. 
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playHoverSound();
              }}
              className={`px-4 py-2 text-[9px] sm:text-[10px] tracking-wider uppercase font-bold border transition-all duration-300 cursor-pointer rounded-full ${
                activeCategory === cat
                  ? 'bg-gold-500 text-stone-955 border-gold-500 shadow-sm shadow-gold-500/10'
                  : 'bg-white dark:bg-stone-900 text-stone-500 hover:text-stone-900 dark:hover:text-white border-stone-200 dark:border-stone-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Container for Team Representatives */}
        <div className="relative py-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center w-full pb-8">
            {filteredTeam.map((member, idx) => {
              const stats = getMemberStats(member.name);
              const abbr = getDesignationAbbr(member.role);
              
              // Calculate static fan-out rotations for 3D curved cylinder effect on desktop
              const angle = (idx - (filteredTeam.length - 1) / 2) * -4;
              const transZ = -Math.abs(idx - (filteredTeam.length - 1) / 2) * 10;

              return (
                <div
                  key={member.id || idx}
                  onMouseEnter={playHoverSound}
                  onClick={() => handleCardClick(member)}
                  className="group fan-card relative w-full aspect-[3/4.2] bg-[#0d1016]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 select-none hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(136,115,97,0.2)]"
                  style={{
                    ['--card-angle' as any]: `${angle}deg`,
                    ['--card-z' as any]: `${transZ}px`
                  }}
                >
                  
                  {/* Magic UI Border Beam Glow Line */}
                  <div className="border-beam-line" />

                  {/* Full Card Image Background */}
                  <div className="absolute inset-0 z-0">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0d1016] flex items-center justify-center font-serif text-3xl text-gold-500/35 font-bold">
                        {getMemberInitials(member)}
                      </div>
                    )}
                    {/* Dynamic bottom fade gradient so the name & profile text are extremely readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-95 pointer-events-none" />
                  </div>

                  {/* Floating Name & Role Overlay at the bottom */}
                  <div className="z-10 text-center w-full">
                    <span className="text-[9px] tracking-wider uppercase font-bold text-gold-400 block mb-1">
                      {member.role}
                    </span>
                    <h4 className="text-[12px] sm:text-xs font-bold tracking-widest text-white uppercase drop-shadow-md">
                      {member.name}
                    </h4>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Game Character HUD Profile Popup Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-[#101318]/90 backdrop-blur-md border border-white/10 rounded-2xl max-w-2xl w-full shadow-[0_0_50px_rgba(149,114,88,0.2)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Left section: Character Avatar Portrait */}
            <div className="relative md:w-2/5 aspect-[3/4] md:aspect-auto bg-stone-950 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
              {selectedMember.image ? (
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border border-gold-400 bg-gold-950/20 flex items-center justify-center text-4xl font-serif text-gold-500 font-bold shadow-lg">
                  {getMemberInitials(selectedMember)}
                </div>
              )}
              
              {/* Dynamic HUD Corner Decals */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/20" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/20" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/20" />
            </div>

            {/* Right section: Gaming Stats HUD Profile */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between text-left space-y-6">
              
              {/* Profile Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500 block mb-1">
                    {selectedMember.role}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-normal tracking-wide">
                    {selectedMember.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Stats Section (Gaming HUD Style) */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase font-black tracking-widest text-gold-400 block border-b border-white/10 pb-1.5 flex items-center space-x-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Representative Capability Metrics</span>
                </span>
                
                {(() => {
                  const stats = getMemberStats(selectedMember.name);
                  return (
                    <div className="space-y-3 font-mono">
                      
                      {/* Stat 1: Negotiation */}
                      <div>
                        <div className="flex justify-between text-[10px] text-stone-300 font-bold mb-1">
                          <span>NEGOTIATION VALUE RATIO</span>
                          <span className="text-gold-400">{stats.negotiation}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000" style={{ width: `${stats.negotiation}%` }} />
                        </div>
                      </div>

                      {/* Stat 2: Legal Registry Clearance */}
                      <div>
                        <div className="flex justify-between text-[10px] text-stone-300 font-bold mb-1">
                          <span>LEGAL REGISTRY CLEARANCE</span>
                          <span className="text-gold-400">{stats.legality}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000" style={{ width: `${stats.legality}%` }} />
                        </div>
                      </div>

                      {/* Stat 3: Discretion Support */}
                      <div>
                        <div className="flex justify-between text-[10px] text-stone-300 font-bold mb-1">
                          <span>DISCRETION & COMPLIANCE</span>
                          <span className="text-gold-400">{stats.discretion}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000" style={{ width: `${stats.discretion}%` }} />
                        </div>
                      </div>

                      {/* Stat 4: Deal Execution Ratio */}
                      <div>
                        <div className="flex justify-between text-[10px] text-stone-300 font-bold mb-1">
                          <span>INVENTORY DEAL EXECUTION</span>
                          <span className="text-gold-400">{stats.closing}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000" style={{ width: `${stats.closing}%` }} />
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>

              {/* Biography Desk Info */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-black tracking-widest text-gold-400 block border-b border-white/10 pb-1.5">
                  Representative Briefing
                </span>
                <p className="text-xs font-light text-stone-300 leading-relaxed max-h-24 overflow-y-auto pr-1">
                  {selectedMember.desc || 'No representative dossier compiled. Direct contact to verify current portfolio responsibilities.'}
                </p>
              </div>

              {/* HUD Quick Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <a
                  href={`tel:${selectedMember.phone}`}
                  className="flex-1 min-w-[120px] bg-stone-900 hover:bg-gold-500 text-stone-300 hover:text-stone-955 border border-stone-800 hover:border-gold-500 py-3 rounded-lg text-center font-bold uppercase tracking-wider text-[9px] transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hotline</span>
                </a>
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="flex-1 min-w-[120px] bg-stone-900 hover:bg-gold-500 text-stone-300 hover:text-stone-955 border border-stone-800 hover:border-gold-500 py-3 rounded-lg text-center font-bold uppercase tracking-wider text-[9px] transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Inbox</span>
                </a>
                <a
                  href={`https://wa.me/919258884941?text=${encodeURIComponent(`Hello, I am inquiring with your representative ${selectedMember.name} regarding property listings.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-stone-955 py-3 px-6 rounded-lg text-center font-bold uppercase tracking-wider text-[9px] transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Floating Widgets */}
      <WhatsAppWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}
