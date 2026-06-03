import { useState } from 'react';
import { Compass, ArrowRight, Check, MapPin, Phone, Mail, Star, Heart, Award, ShieldCheck, Clock } from 'lucide-react';
import { GENERAL_REVIEWS } from '../data';

// Paths for custom generated assets
const logoImage = '/src/assets/images/naseeb_gold_logo_1780471253314.png';
const hajjBanner = '/src/assets/images/hajj_umrah_banner_1780398906578.png';
const internationalBanner = '/src/assets/images/international_travel_banner_1780398927558.png';

interface HomeViewProps {
  onNavigate: (tab: 'home' | 'packages' | 'visa' | 'tools' | 'builder' | 'dashboard' | 'contact') => void;
  onSelectPackage: (pkgId: string) => void;
}

export default function HomeView({ onNavigate, onSelectPackage }: HomeViewProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  return (
    <div className="space-y-16 pb-16">
      
      {/* PROFESSIONAL PREMIUM HERO SECTION */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 lg:py-28">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-950/95 z-10" />
        
        {/* Ambient background graphics */}
        <div className="absolute inset-0 opacity-20 z-0">
          <img 
            src={internationalBanner} 
            alt="International Travel background" 
            className="w-full h-full object-cover filter blur-[2px]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-mono tracking-widest uppercase font-extrabold shadow-sm">
                <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>NASEEB GLOBAL TRAVEL &amp; TOURS</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Authentic Guidance for Your Ultimate <span className="text-amber-400">Sacred</span> &amp; Luxury Journeys
              </h1>
              
              <p className="text-emerald-100 text-lg font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 select-text">
                Explore custom-built Hajj &amp; Umrah packages, fast-track visa consultation, and direct flight booking utilities. Operating strictly with licensed hotel allotments and premium transfer networks.
              </p>

              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => onNavigate('packages')}
                  className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-amber-500/10 transition-all hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
                >
                  <span>Browse Umrah Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onNavigate('builder')}
                  className="bg-emerald-900 hover:bg-emerald-800 text-white font-medium px-7 py-4 rounded-xl border border-emerald-700/80 transition-all cursor-pointer"
                >
                  Custom Package Planner
                </button>
              </div>
            </div>

            {/* Right Media Logo Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-2 bg-gradient-to-tr from-amber-400/30 to-emerald-400/20 rounded-[2.5rem] shadow-2xl">
                <div className="bg-emerald-900/40 backdrop-blur-md border border-white/10 rounded-[2.3rem] p-8 max-w-xs md:max-w-sm text-center relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full filter blur-xl" />
                  
                  {/* LOGO PICTURE SECURELY RENDERED */}
                  <img 
                    src={logoImage} 
                    alt="NASEEB GLOBAL TRAVEL &amp; TOURS Logo" 
                    className="w-44 h-44 mx-auto rounded-full border-4 border-amber-400 bg-white p-2.5 shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-amber-400 font-serif">Official NASEEB GLOBAL Badge</h3>
                    <p className="text-xs text-emerald-200 mt-1 font-mono tracking-wider font-semibold">ESTABLISHED 2018 | FAISALABAD</p>
                  </div>
                  
                  <div className="mt-4 flex justify-center space-x-1 bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-800/40">
                    <Award className="w-4 h-4 text-amber-400 mr-1.5" />
                    <span className="text-[11px] text-emerald-100 font-medium">Licensed Travel Agency (Govt Reg No. 4921)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE ADVANTAGES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase bg-emerald-100/60 px-3.5 py-1 rounded-full border border-emerald-200">
            Why Pilgrims Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
            The NASEEB GLOBAL Difference
          </h2>
          <p className="text-slate-500 mt-2">
            Uncompromising spiritual adherence combined with modern tech-supported travel planning conveniences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="h-44 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=600&q=80" 
                alt="Verified Luxury Lodgings in Makkah and Madinah" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 text-amber-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900">100% Verified Lodgings</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                We own upfront hotel reservation allotments in Makkah &amp; Madinah. The exact distance is documented in your plan, with no last-minute surprise relocation clauses.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="h-44 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=600&q=80" 
                alt="Scholar Guided Spiritual Umrah Tours" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 text-emerald-600">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900">Spiritual Guidance Desk</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Experienced, scholar-led guides travel along with groups to conduct workshops on Umrah/Hajj rituals, resolving all spiritual inquiries on the spot.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="h-44 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" 
                alt="Real-time support WhatsApp hotline" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900">Real-Time Support Hub</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                All pilgrims receive dynamic group managers keeping them connected via WhatsApp for shuttle times, visa stages, health guidelines, and luggage logs.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* DUAL HOLY CITIES LANDSCAPE CARD SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl overflow-hidden shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Banner Media */}
            <div className="lg:col-span-5 h-64 lg:h-full relative min-h-[350px]">
              <img 
                src={hajjBanner} 
                alt="Holy mosque Kaaba" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-emerald-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 z-20">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded">
                  Live Allotments
                </span>
                <p className="text-white font-serif font-bold text-lg mt-1">Masjid Al Haram Viewfronts</p>
              </div>
            </div>

            {/* Narrative Details */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <span className="text-xs uppercase text-amber-400 font-mono font-bold tracking-widest">Premium Spiritual Packages</span>
              <h3 className="text-2xl md:text-3xl font-bold font-serif">Umrah &amp; Hajj Sacred Portals</h3>
              
              <p className="text-emerald-100 text-sm leading-relaxed font-light">
                Our operations team coordinate with local authorities in Saudi Arabia to license the best transportation matrices. From standard, budget-conducive shuttles for budget planners to deluxe business flights with bullet train reservations.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-emerald-800/60 pt-6">
                <div>
                  <h4 className="text-sm font-bold text-white">Makkah Al-Mukarramah</h4>
                  <p className="text-xs text-emerald-200 mt-1">Properties located at Swissôtel, Pulman Zamzam Makkah, and luxury flats.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Madinah Al-Munawwarah</h4>
                  <p className="text-xs text-emerald-200 mt-1">Excellent properties located directly in Northern and Central zones.</p>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => onNavigate('packages')}
                  className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Explore Standard Rates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DETAILED ROADMAP FLOWCHART DIAGRAM WITH IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-widest">
            OPERATIONAL PIPELINE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            The NASEEB GLOBAL Sacred Tour Roadmap
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-light">
            An open, step-by-step visual map representing how your spiritual aspirations are organized and verified into fully secure, physical flight schedules and real-time hotel keys.
          </p>
        </div>

        {/* Visual Roadmap Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mt-10">
          
          {/* Step 1 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 relative hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden rounded-xl mb-3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80" 
                  alt="Tailored Consultation & Selection" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-emerald-900 text-amber-300 font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
              </div>
              <h4 className="font-bold text-sm text-emerald-950">1. Tailored Consultation</h4>
              <p className="text-[11px] text-slate-500 mt-1 lines-clamp-3">
                Meet at our Faisalabad offices to outline custom hotel preferences, dates, transport nodes, and companion counts.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-emerald-800 font-bold">
              EST. DURATION: 1 HOUR
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 relative hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden rounded-xl mb-3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80" 
                  alt="Embassy Document File Indexing" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-emerald-900 text-amber-300 font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
              </div>
              <h4 className="font-bold text-sm text-emerald-950">2. Professional Indexing</h4>
              <p className="text-[11px] text-slate-500 mt-1 lines-clamp-3">
                Our file team compiles biometric logs, ledger sheets, and background cards matching strict consular criteria.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-emerald-800 font-bold">
              EST. DURATION: 1-2 DAYS
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 relative hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden rounded-xl mb-3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80" 
                  alt="Verified Direct Seat & Hotel Ingress Booking" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-emerald-900 text-amber-300 font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
              </div>
              <h4 className="font-bold text-sm text-emerald-950">3. Direct Hotel Allotment</h4>
              <p className="text-[11px] text-slate-500 mt-1 lines-clamp-3">
                Secure flight routes and room confirmations, loading physical PNR credentials directly into the Naseeb Pilgrim Suite.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-emerald-800 font-bold">
              EST. DURATION: 24 HOURS
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 relative hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-32 w-full overflow-hidden rounded-xl mb-3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=80" 
                  alt="Saudi Terminal Guide Escort & Transit" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-emerald-900 text-amber-300 font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">4</span>
              </div>
              <h4 className="font-bold text-sm text-emerald-950">4. Scholar Guides Escort</h4>
              <p className="text-[11px] text-slate-500 mt-1 lines-clamp-3">
                Ground crew receives you at Jeddah or Madinah with private coaches, guiding you from terminal doors to lodging lobbies.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-emerald-800 font-bold">
              EST. DURATION: ACTIVE DAILY
            </div>
          </div>

        </div>
      </section>

      {/* CORE STATISTICS RHYTHM */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="block text-4xl font-extrabold text-emerald-800 tracking-tight">2018</span>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400">Founded In</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl font-extrabold text-emerald-800 tracking-tight">5,000+</span>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400">Happy Pilgrims</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl font-extrabold text-emerald-800 tracking-tight">99.2%</span>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400">Visa Success Rate</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl font-extrabold text-emerald-800 tracking-tight">24/7</span>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400">WhatsApp Helpline</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS TESTIMONIALS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase bg-emerald-100/60 px-3.5 py-1 rounded-full border border-emerald-200">
            Client Gratitude
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Shared Experiences From Pilgrim Families
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto bg-white border border-slate-200 shadow-xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-emerald-800/10 font-serif text-[120px] select-none leading-none -mt-4">“</div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(GENERAL_REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
              ))}
            </div>

            <p className="text-slate-700 text-lg leading-relaxed italic select-text">
              "{GENERAL_REVIEWS[activeReviewIndex].quote}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-4">
                <img 
                  src={GENERAL_REVIEWS[activeReviewIndex].avatarUrl} 
                  alt={GENERAL_REVIEWS[activeReviewIndex].name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-900 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900">{GENERAL_REVIEWS[activeReviewIndex].name}</h4>
                  <p className="text-xs text-slate-400 font-mono tracking-wide">{GENERAL_REVIEWS[activeReviewIndex].location}</p>
                </div>
              </div>
              
              <div className="flex space-x-1.5">
                {GENERAL_REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === activeReviewIndex ? 'bg-emerald-900 w-5' : 'bg-slate-200'}`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE OFFICES DIRECTORY AND DIRECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-emerald-800/20 translate-x-10 transform skew-x-12" />
          
          <div className="md:flex justify-between items-center gap-12 relative z-10">
            <div className="md:w-2/3 space-y-4">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">Faisalabad Head Office</span>
              <h3 className="text-2xl md:text-3xl font-serif text-white">We Welcome Your Physical Visit</h3>
              <p className="text-emerald-100 text-sm leading-relaxed select-text">
                Naseeb Plaza, Chen One Road / Mocciani Street, Faisalabad, Pakistan. Come down for individualized visa consultancy, document translation reviews, and face-to-face package customization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs">
                <span className="flex items-center space-x-1.5 text-emerald-100">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Naseeb Plaza, Faisalabad</span>
                </span>
                <span className="flex items-center space-x-1.5 text-emerald-100">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>0318-7096647 / 0303-6722219</span>
                </span>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 flex flex-col gap-3 min-w-[200px]">
              <button 
                onClick={() => onNavigate('contact')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                Inquire Directions &amp; Hours
              </button>
              <a 
                href="https://wa.me/923036722219" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs py-3 px-6 rounded-xl text-center flex items-center justify-center space-x-2"
              >
                <span>Live WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
