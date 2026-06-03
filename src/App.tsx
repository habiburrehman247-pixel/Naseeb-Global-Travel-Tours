import { useState, useEffect } from 'react';
import { 
  Compass, Phone, Mail, MapPin, Menu, X, ArrowRight, 
  User, ShieldAlert, Loader2, Award, Heart
} from 'lucide-react';
import { 
  signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, onSnapshot, query, where, orderBy 
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Import our beautiful modular components
import HomeView from './components/HomeView';
import PackagesView from './components/PackagesView';
import VisaView from './components/VisaView';
import ToolsView from './components/ToolsView';
import BuilderView from './components/BuilderView';
import DashboardView from './components/DashboardView';
import ContactView from './components/ContactView';

// Paths for custom generated logotype and banners
const logoImage = '/src/assets/images/naseeb_gold_logo_1780471253314.png';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'packages' | 'visa' | 'tools' | 'builder' | 'dashboard' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom package selection passed to planner
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');

  // Authentication State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Synchronized Firestore DB State
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [allInquiries, setAllInquiries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Listen to Authentication updates
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync real-time Firestore database when authenticated
  useEffect(() => {
    if (!user) {
      setMyBookings([]);
      setAllBookings([]);
      setAllInquiries([]);
      return;
    }

    setDataLoading(true);
    const isAdmin = user.email === 'habiburrehman247@gmail.com';

    // 1. Snapshot listeners for user-specific bookings
    const mineQuery = query(
      collection(db, 'bookings'), 
      where('userId', '==', user.uid)
    );
    
    const unsubMyBk = onSnapshot(mineQuery, (snaps) => {
      const docs = snaps.docs.map(d => ({ id: d.id, ...d.data() }));
      setMyBookings(docs);
      setDataLoading(false);
    }, (err) => {
      console.error(err);
      setDataLoading(false);
    });

    // 2. Snapshot listeners for executive admin command suite
    let unsubAllBk: (() => void) | null = null;
    let unsubAllInq: (() => void) | null = null;

    if (isAdmin) {
      const bookingsRef = collection(db, 'bookings');
      unsubAllBk = onSnapshot(bookingsRef, (snaps) => {
        setAllBookings(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
      });

      const inquiriesRef = collection(db, 'inquiries');
      unsubAllInq = onSnapshot(inquiriesRef, (snaps) => {
        setAllInquiries(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
      });
    }

    return () => {
      unsubMyBk();
      if (unsubAllBk) unsubAllBk();
      if (unsubAllInq) unsubAllInq();
    };

  }, [user]);

  // Google sign in popup triggers
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Popup Authentication failed: ", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentTab('home');
    } catch (err) {
      console.error(err);
    }
  };

  // Nav flows
  const handleSelectPackageId = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    setCurrentTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVisaConsultant = (countryName: string) => {
    setSelectedPackageId(`Consular Visa Advice - ${countryName}`);
    setCurrentTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSelectedPackageHeaderState = () => {
    setSelectedPackageId('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-950 selection:text-amber-300">
      
      {/* PREMIUM HIGH-FIDELITY RESPONSIVE HEADER */}
      <header id="main-header" className="sticky top-0 z-50 bg-emerald-900 border-b border-emerald-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand Logo Layout */}
          <div 
            onClick={() => { setCurrentTab('home'); clearSelectedPackageHeaderState(); }}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-full bg-white border border-amber-300 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 p-0.5 overflow-hidden">
              <img 
                src={logoImage} 
                alt="Naseeb travel emblem" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center">
                NASEEB <span className="text-amber-400 ml-1 font-serif text-sm font-semibold border-l pl-1 border-white/20">GLOBAL</span>
              </h1>
              <p className="text-[10px] text-emerald-200 tracking-widest font-mono font-medium">TRAVEL &amp; TOURS</p>
            </div>
          </div>

          {/* Desktop Navigation Links (7 FULL RESPONSIVE PAGES) */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => { setCurrentTab('home'); clearSelectedPackageHeaderState(); }}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${currentTab === 'home' ? 'bg-amber-500 text-emerald-950 shadow-inner' : 'hover:bg-emerald-800 text-emerald-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentTab('packages'); clearSelectedPackageHeaderState(); }}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${currentTab === 'packages' ? 'bg-amber-500 text-emerald-950 shadow-inner' : 'hover:bg-emerald-800 text-emerald-100'}`}
            >
              Destinations
            </button>
            <button 
              onClick={() => { setCurrentTab('visa'); clearSelectedPackageHeaderState(); }}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${currentTab === 'visa' ? 'bg-amber-500 text-emerald-950 shadow-inner' : 'hover:bg-emerald-800 text-emerald-100'}`}
            >
              Visa Desk
            </button>
            <button 
              onClick={() => { setCurrentTab('tools'); clearSelectedPackageHeaderState(); }}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${currentTab === 'tools' ? 'bg-amber-500 text-emerald-950 shadow-inner' : 'hover:bg-emerald-800 text-emerald-100'}`}
            >
              Tools
            </button>
            <button 
              onClick={() => setCurrentTab('builder')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${currentTab === 'builder' ? 'bg-amber-500 text-emerald-950 shadow-inner' : 'hover:bg-emerald-800 text-emerald-100'}`}
            >
              Planner
            </button>
            <button 
              onClick={() => { setCurrentTab('contact'); clearSelectedPackageHeaderState(); }}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer ${currentTab === 'contact' ? 'bg-amber-500 text-emerald-950 shadow-inner' : 'hover:bg-emerald-800 text-emerald-100'}`}
            >
              Office
            </button>

            {/* Hub Dashboard Navigation or Google Login Trigger */}
            <div className="border-l border-emerald-800/80 pl-4 ml-2 flex items-center">
              {authLoading ? (
                <Loader2 className="w-4 h-4 text-emerald-100 animate-spin" />
              ) : user ? (
                <button
                  onClick={() => { setCurrentTab('dashboard'); clearSelectedPackageHeaderState(); }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center space-x-1.5 cursor-pointer ${currentTab === 'dashboard' ? 'bg-emerald-250 text-white border border-emerald-700' : 'bg-emerald-950 text-amber-300 hover:bg-emerald-900 border border-emerald-800'}`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Dashboard Hub</span>
                </button>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-xl px-4 py-2.5 font-bold transition-all shadow-md active:scale-95 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Hamburguer trigger button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <button
                onClick={() => setCurrentTab('dashboard')}
                className="bg-emerald-950 text-amber-300 rounded-lg p-2 border border-emerald-800"
              >
                <User className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 bg-emerald-800 rounded-xl hover:bg-emerald-700/80 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-b border-emerald-800 text-white py-4 px-6 space-y-2 flex flex-col z-40 relative shadow-inner animate-fade-in font-mono text-xs font-bold uppercase tracking-wider">
          <button 
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); clearSelectedPackageHeaderState(); }}
            className={`text-left p-3.5 rounded-xl ${currentTab === 'home' ? 'bg-amber-500 text-emerald-950' : 'hover:bg-emerald-900'}`}
          >
            Home Layout
          </button>
          <button 
            onClick={() => { setCurrentTab('packages'); setMobileMenuOpen(false); clearSelectedPackageHeaderState(); }}
            className={`text-left p-3.5 rounded-xl ${currentTab === 'packages' ? 'bg-amber-500 text-emerald-950' : 'hover:bg-emerald-900'}`}
          >
            Sacred Destinations
          </button>
          <button 
            onClick={() => { setCurrentTab('visa'); setMobileMenuOpen(false); clearSelectedPackageHeaderState(); }}
            className={`text-left p-3.5 rounded-xl ${currentTab === 'visa' ? 'bg-amber-500 text-emerald-950' : 'hover:bg-emerald-900'}`}
          >
            Consular Visa Desk
          </button>
          <button 
            onClick={() => { setCurrentTab('tools'); setMobileMenuOpen(false); clearSelectedPackageHeaderState(); }}
            className={`text-left p-3.5 rounded-xl ${currentTab === 'tools' ? 'bg-amber-500 text-emerald-950' : 'hover:bg-emerald-900'}`}
          >
            Pilgrim Tools
          </button>
          <button 
            onClick={() => { setCurrentTab('builder'); setMobileMenuOpen(false); }}
            className={`text-left p-3.5 rounded-xl ${currentTab === 'builder' ? 'bg-amber-500 text-emerald-950' : 'hover:bg-emerald-900'}`}
          >
            Interactive Planner
          </button>
          <button 
            onClick={() => { setCurrentTab('contact'); setMobileMenuOpen(false); clearSelectedPackageHeaderState(); }}
            className={`text-left p-3.5 rounded-xl ${currentTab === 'contact' ? 'bg-amber-500 text-emerald-950' : 'hover:bg-emerald-900'}`}
          >
            Office Locator
          </button>

          <div className="pt-4 border-t border-emerald-900">
            {user ? (
              <div className="space-y-2">
                <button 
                  onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-center py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 border border-emerald-800"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>PAX HUB DASHBOARD</span>
                </button>
                <button 
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="w-full bg-rose-950 text-red-300 text-center py-3 rounded-xl hover:bg-rose-900 text-xs font-semibold"
                >
                  Sign Out Profile
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { handleGoogleLogin(); setMobileMenuOpen(false); }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 text-center py-3.5 rounded-xl font-bold font-mono uppercase"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      )}

      {/* CORE DYNAMIC LAYOUT PAGE WRAPPER */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeView 
            onNavigate={setCurrentTab} 
            onSelectPackage={handleSelectPackageId} 
          />
        )}
        {currentTab === 'packages' && (
          <PackagesView 
            onSelectPackage={handleSelectPackageId} 
          />
        )}
        {currentTab === 'visa' && (
          <VisaView 
            onSelectVisa={handleSelectVisaConsultant} 
          />
        )}
        {currentTab === 'tools' && (
          <ToolsView />
        )}
        {currentTab === 'builder' && (
          <BuilderView 
            selectedPackageId={selectedPackageId}
            onClearPackage={clearSelectedPackageHeaderState}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
            onTriggerLogin={handleGoogleLogin}
            user={user}
          />
        )}
        {currentTab === 'dashboard' && (
          <DashboardView 
            user={user}
            myBookings={myBookings}
            allBookings={allBookings}
            allInquiries={allInquiries}
            dataLoading={dataLoading}
            onTriggerLogin={handleGoogleLogin}
            onTriggerLogout={handleSignOut}
          />
        )}
        {currentTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* FOOTER SITE MAP WITH LOGO AND CERTIFICATES */}
      <footer className="bg-slate-900 text-white border-t-2 border-amber-500 pt-16 pb-8 block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Branding area (Cols 5) */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full p-0.5 border border-amber-300 shrink-0 overflow-hidden">
                  <img 
                    src={logoImage} 
                    alt="Naseeb travels circular badge" 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-extrabold text-white">NASEEB GLOBAL TRAVEL &amp; TOURS</h4>
                  <p className="text-xs text-slate-400 font-mono tracking-widest font-semibold">LICENSED GOVERNMENT AGENCY</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm select-text">
                Providing comprehensive sticker visa consultation, dual holy cities deluxe transport arrangements, and scheduled flights directly to Jeddah and Madinah from across Lahore, Islamabad, and Karachi networks.
              </p>

              <div className="flex gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>DTS License: 4921</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>IATA Accredited Portal</span>
                </span>
              </div>
            </div>

            {/* Sitemap categories (Cols 4) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs font-semibold font-mono tracking-wider">
              <div className="space-y-3">
                <h5 className="text-amber-400 uppercase text-[11px] font-bold">Services</h5>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => setCurrentTab('packages')} className="hover:underline hover:text-white cursor-pointer block text-left">Browse Packages</button></li>
                  <li><button onClick={() => setCurrentTab('visa')} className="hover:underline hover:text-white cursor-pointer block text-left">Consular Visa Desk</button></li>
                  <li><button onClick={() => setCurrentTab('builder')} className="hover:underline hover:text-white cursor-pointer block text-left">Itinerary Builder</button></li>
                  <li><button onClick={() => setCurrentTab('tools')} className="hover:underline hover:text-white cursor-pointer block text-left">Exchange Rates</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="text-amber-400 uppercase text-[11px] font-bold">Inquiries</h5>
                <ul className="space-y-2 text-slate-400">
                  <li><button onClick={() => setCurrentTab('contact')} className="hover:underline hover:text-white cursor-pointer block text-left">Headquarters Office</button></li>
                  <li><button onClick={() => setCurrentTab('dashboard')} className="hover:underline hover:text-white cursor-pointer block text-left">Passenger Logins</button></li>
                  <li><a href="https://wa.me/923036722219" target="_blank" rel="noreferrer" className="hover:underline hover:text-white block text-left">Direct WhatsApp Chat</a></li>
                </ul>
              </div>
            </div>

            {/* Location (Cols 3) */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="text-amber-400 uppercase text-[11px] font-mono tracking-widest font-bold">Central Registry</h5>
              <div className="text-xs text-slate-400 leading-relaxed font-light space-y-2 select-text">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mr-1.5 mt-0.5" />
                  <span>Naseeb Plaza, Chen One Road / Mocciani Street, Faisalabad, Pakistan.</span>
                </p>
                <p className="flex items-start">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0 mr-1.5 mt-0.5" />
                  <span>0318-7096647</span>
                </p>
                <p className="flex items-start">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0 mr-1.5 mt-0.5" />
                  <span>habiburrehman247@gmail.com</span>
                </p>
              </div>
            </div>

          </div>

          {/* Social icons, bottom copy */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono tracking-wider">
            <p>© 2026 NASEEB GLOBAL TRAVEL &amp; TOURS. All physical Rights Reserved.</p>
            <p className="flex items-center mt-2 sm:mt-0">
              <span>Made with dedication</span>
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 mx-1 animate-pulse" />
              <span>for sacred pilgrims.</span>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
