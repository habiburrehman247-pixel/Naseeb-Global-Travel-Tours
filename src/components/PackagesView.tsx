import { useState } from 'react';
import { Check, Star, ArrowRight, Shield, Award, HelpCircle, Sparkles, Building2, Train } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data';

// Path to Hajj image banner
const hajjBanner = '/src/assets/images/hajj_umrah_banner_1780398906578.png';

interface PackagesViewProps {
  onSelectPackage: (pkgId: string) => void;
}

export default function PackagesView({ onSelectPackage }: PackagesViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'umrah' | 'hajj' | 'international'>('all');
  
  // Custom Estimator State
  const [pilgrimsCount, setPilgrimsCount] = useState(2);
  const [hotelPref, setHotelPref] = useState<'economy' | 'standard' | 'luxury'>('standard');
  const [transportPref, setTransportPref] = useState<'shared' | 'luxury-private'>('shared');
  const [estimatedCost, setEstimatedCost] = useState<string>('PKR 480,000 - 530,000');

  // Ground math calculation
  const runEstimator = () => {
    let pricePerPilgrim = 185000; // Economy baseline
    if (hotelPref === 'standard') pricePerPilgrim = 250000;
    if (hotelPref === 'luxury') pricePerPilgrim = 340000;

    let totalBase = pricePerPilgrim * pilgrimsCount;

    if (transportPref === 'luxury-private') {
      totalBase += 80000; // block upgrade for luxury SUVs
    }

    const min = totalBase;
    const max = Math.round(totalBase * 1.12);

    setEstimatedCost(`PKR ${min.toLocaleString()} - ${max.toLocaleString()}`);
  };

  const filteredPackages = TOUR_PACKAGES.filter(pkg => {
    if (activeCategory === 'all') return true;
    return pkg.category === activeCategory;
  });

  return (
    <div className="space-y-16 py-12 pb-16">
      
      {/* HEADER HERO BANNER */}
      <section className="relative bg-emerald-950 text-white rounded-3xl overflow-hidden max-w-7xl mx-auto px-6 py-12 md:py-16 shadow-lg">
        {/* Banner Picture background */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src={hajjBanner} 
            alt="Makkah pilgrims" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent z-10" />

        <div className="relative z-20 max-w-3xl space-y-4">
          <span className="bg-amber-500 text-emerald-950 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Licensed Allotments
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Hajj &amp; Umrah Divine Roadmaps</h1>
          <p className="text-emerald-100 text-base font-light">
            We provide verified hotels at walkable distances to Masjid-an-Nabawi &amp; Masjid-Al-Haram, luxury transport guidelines, and expert visa assistance.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-emerald-900 text-amber-300 shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            ALL PACKAGES
          </button>
          <button
            onClick={() => setActiveCategory('umrah')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${activeCategory === 'umrah' ? 'bg-emerald-900 text-amber-300 shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            HOLY UMRAH ITINERARIES
          </button>
          <button
            onClick={() => setActiveCategory('hajj')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${activeCategory === 'hajj' ? 'bg-emerald-900 text-amber-300 shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            SACRED HAJJ PLANS
          </button>
          <button
            onClick={() => setActiveCategory('international')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${activeCategory === 'international' ? 'bg-emerald-900 text-amber-300 shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            INTERNATIONAL HOLIDAYS
          </button>
        </div>

        {/* RECTIVE CARDS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              {/* Header block with prices */}
              <div className="bg-emerald-900 p-6 text-white relative">
                <div className="flex justify-between items-start">
                  <span className="bg-amber-500 text-emerald-950 font-mono text-[10px] uppercase font-extrabold px-2.5 py-1 rounded">
                    {pkg.category}
                  </span>
                  <span className="text-amber-400 font-mono text-sm font-semibold">{pkg.duration}</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-white mt-3 leading-tight">{pkg.title}</h3>
                
                <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between">
                  <span className="text-xs text-emerald-200 font-mono">Guaranteed Rate</span>
                  <span className="text-amber-300 font-mono font-bold text-lg">{pkg.price}</span>
                </div>
              </div>

              {/* Inclusions package list */}
              <div className="p-6 flex-grow space-y-4">
                <div>
                  <h4 className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">Services Included</h4>
                  <ul className="mt-2 space-y-2">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">Itinerary Blueprint</h4>
                  <div className="space-y-2">
                    {pkg.itinerary.map((it, i) => (
                      <div key={i} className="text-[11px] text-slate-600 border-l border-emerald-500 pl-2">
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className="w-full bg-emerald-900 hover:bg-emerald-950 text-amber-300 hover:text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Select &amp; Send Booking Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* RETAILER OFFLINE GROUND CALCULATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-emerald-800/40">
          
          <div className="text-center md:text-left mb-8 space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase">
              Financial Preview
            </span>
            <h3 className="text-2xl md:text-3xl font-serif">Flexible Umrah Ground Pack Estimator</h3>
            <p className="text-xs text-slate-300">
              Calculate standard accommodation and logistical variables instantly for your personal family sizing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Input Slider */}
            <div className="space-y-2">
              <label className="block text-xs uppercase text-emerald-200 tracking-wider font-mono font-bold">Pilgrims count</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="range" min="1" max="10" 
                  value={pilgrimsCount}
                  onChange={(e) => setPilgrimsCount(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <span className="text-amber-300 font-mono text-xs font-bold block">{pilgrimsCount} Adults</span>
            </div>

            {/* Hotel Preference Select */}
            <div className="space-y-2">
              <label className="block text-xs uppercase text-emerald-200 tracking-wider font-mono font-bold">Hotel Grade</label>
              <select
                value={hotelPref}
                onChange={(e) => setHotelPref(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="economy">Economy Shuttled (900m+ from Haram)</option>
                <option value="standard">4-Star Walkable (400-500m walking)</option>
                <option value="luxury">5-Star Haram Front / Clock Tower</option>
              </select>
            </div>

            {/* Transport Style Select */}
            <div className="space-y-2">
              <label className="block text-xs uppercase text-emerald-200 tracking-wider font-mono font-bold">Ground Logistics</label>
              <select
                value={transportPref}
                onChange={(e) => setTransportPref(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="shared">Shared Air-Conditioned Coach</option>
                <option value="luxury-private">Private Luxury VIP SUV (Chauffeur)</option>
              </select>
            </div>

          </div>

          {/* Calculate Event triggers */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Estimated Price Projection</span>
              <p className="text-3xl font-mono font-extrabold text-amber-400">{estimatedCost}</p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={runEstimator}
                className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-xs px-6 py-3 rounded-xl cursor-pointer shadow-md transition-all active:scale-95"
              >
                Recalculate Estimate
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CORE SPECIFICATIONS METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-100 border border-slate-200/60 p-8 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h4 className="text-xl font-bold font-serif text-slate-900">Spiritual Quality Certifications</h4>
          <p className="text-xs text-slate-500 mt-1">NASEEB GLOBAL TRAVEL &amp; TOURS registers and complies with rigorous government checklists.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/50">
            <h5 className="text-sm font-bold text-emerald-950">Approved Umrah Organizers</h5>
            <p className="text-[11px] text-slate-500 mt-1">Fully registered with the Ministry of Religious Affairs GOP &amp; Saudi Ministry.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/50">
            <h5 className="text-sm font-bold text-emerald-950">Transparent Payments</h5>
            <p className="text-[11px] text-slate-500 mt-1">Secure payment pathways with computerized invoicing for total peace of mind.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/50">
            <h5 className="text-sm font-bold text-emerald-950">Group Insurance Coverage</h5>
            <p className="text-[11px] text-slate-500 mt-1">Full medical coverage and flight cancellation support policies compiled with premium underwriters.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
