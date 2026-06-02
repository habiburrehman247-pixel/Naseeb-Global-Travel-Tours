import { useState, useEffect, FormEvent } from 'react';
import { User, Mail, Phone, Calendar, Users, HelpCircle, FileText, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { TOUR_PACKAGES } from '../data';

interface BuilderViewProps {
  selectedPackageId?: string;
  onClearPackage: () => void;
  onNavigateToDashboard: () => void;
  onTriggerLogin: () => Promise<void>;
  user: any;
}

export default function BuilderView({ 
  selectedPackageId, 
  onClearPackage, 
  onNavigateToDashboard, 
  onTriggerLogin,
  user 
}: BuilderViewProps) {
  
  // State for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [packageType, setPackageType] = useState('Standard Custom Umrah');
  const [travelersCount, setTravelersCount] = useState(2);
  const [departureDate, setDepartureDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-fill form if package pre-selected
  useEffect(() => {
    if (selectedPackageId) {
      const match = TOUR_PACKAGES.find(p => p.id === selectedPackageId);
      if (match) {
        setPackageType(match.title);
      } else {
        // e.g. Visa country helper
        setPackageType(selectedPackageId);
      }
    }
  }, [selectedPackageId]);

  // Handle submit to firestore
  const handleSubmitProposal = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage("Please Sign In first to securely register your proposal.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);

    // Validation matching FireStore.rules lengths
    if (fullName.length < 2 || fullName.length > 100) {
      setErrorMessage("Full Name must be between 2 and 100 characters.");
      setSubmitting(false);
      return;
    }
    if (email.length < 5 || email.length > 100) {
      setErrorMessage("Email must be between 5 and 100 characters.");
      setSubmitting(false);
      return;
    }
    if (phone.length < 7 || phone.length > 30) {
      setErrorMessage("Phone must be between 7 and 30 characters.");
      setSubmitting(false);
      return;
    }
    if (packageType.length < 3 || packageType.length > 100) {
      setErrorMessage("Package Type / Subject must be between 3 and 100 characters.");
      setSubmitting(false);
      return;
    }
    if (travelersCount < 1 || travelersCount > 100) {
      setErrorMessage("Number of travelers must be between 1 and 100.");
      setSubmitting(false);
      return;
    }
    if (!departureDate || departureDate.length < 10 || departureDate.length > 20) {
      setErrorMessage("Please select a valid upcoming departure date.");
      setSubmitting(false);
      return;
    }

    try {
      // Create schema object strictly matching Firebase rules expectations
      const bookingData = {
        fullName,
        email,
        phone,
        packageType,
        travelersCount: Number(travelersCount),
        departureDate,
        specialRequests: specialRequests || 'No special requirements listed.',
        status: 'pending', // REQUIRED BY RULES
        userId: user.uid, // REQUIRED BY RULES
        createdAt: serverTimestamp(), // REQUIRED BY RULES
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      
      setSuccess(true);
      onClearPackage();
      
      // Reset inputs
      setFullName('');
      setEmail('');
      setPhone('');
      setSpecialRequests('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An authentication or database rule error occurred. Please verify your fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
      
      {/* SHAPE INTRO */}
      <section className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
          Fictional customizer
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
          Interactive Custom Package Planner
        </h2>
        <p className="text-slate-500 text-sm">
          Select or formulate your tailored pilgrimage structure, register details, and secure reviews from our desk.
        </p>
      </section>

      {/* SECURE BLOCK FORM AND EXPLANATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* PANEL A: PLANNING DETAILS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-900 text-white rounded-[2rem] p-6 space-y-5 shadow-lg">
            <h3 className="text-xl font-serif text-amber-400">Planning Milestones</h3>
            
            <div className="space-y-4 text-xs font-light">
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold font-mono">1</span>
                <div>
                  <h4 className="font-semibold text-white">Proposal Registration</h4>
                  <p className="text-emerald-200 mt-0.5">Submit your desired flight times, passenger sizes, and hotel grade selection through this secure portal.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold font-mono">2</span>
                <div>
                  <h4 className="font-semibold text-white">Consular Interview (Visa)</h4>
                  <p className="text-emerald-200 mt-0.5">NASEEB GLOBAL TRAVEL &amp; TOURS registers and submits electronic permissions inside 24-48 hours of reservation approval.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold font-mono">3</span>
                <div>
                  <h4 className="font-semibold text-white">Live Status tracking</h4>
                  <p className="text-emerald-200 mt-0.5">Access "Passenger Hub Dashboard" anytime to check hotel allocations and voucher certificates instantly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-[2rem] space-y-3">
            <h4 className="text-sm font-bold text-slate-800">Support Emergency Contact</h4>
            <p className="text-xs text-slate-500">Need specific help filling documents? Call our helpline first.</p>
            <div className="bg-slate-50 p-3 rounded-xl block border border-slate-100 text-xs font-mono font-bold text-emerald-800">
              Helpline: 0303-6722219
            </div>
          </div>
        </div>

        {/* PANEL B: CUSTOM RES SYSTEM (COLS 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl relative">
          
          {/* SECURE AUTH WALL BEFORE BOOKING */}
          {!user ? (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 max-w-full">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Secure Passenger Registration Required</h3>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                NASEEB GLOBAL TRAVEL &amp; TOURS utilizes end-to-end cloud protection. Please Sign In first to enable real-time booking, status approvals, and passport checklist access.
              </p>
              
              <button
                onClick={onTriggerLogin}
                className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <span>Sign In with Secure Google Auth</span>
              </button>
            </div>
          ) : null}

          {/* SUCCESS MESSAGE */}
          {success ? (
            <div className="bg-white p-8 text-center space-y-5 rounded-3xl">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Trip Proposal Registered Successfully!</h3>
              <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Excellent! Your travel proposal of <strong>{packageType}</strong> has been secured inside the NASEEB GLOBAL TRAVEL &amp; TOURS Cloud Hub. Our ground operators in Faisalabad will compile itineraries immediately.
              </p>
              
              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-5 py-2.5 rounded-lg text-xs"
                >
                  Plan Another Custom Trip
                </button>
                <button
                  onClick={onNavigateToDashboard}
                  className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-extrabold px-5 py-2.5 rounded-lg text-xs"
                >
                  View My Dashboard Status
                </button>
              </div>
            </div>
          ) : (
            
            <form onSubmit={handleSubmitProposal} className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Secure Document Registration</h3>
                <span className="text-xs text-slate-400 font-mono">Step 1 of 1</span>
              </div>

              {/* Error messages block */}
              {errorMessage && (
                <div id="error-alert" className="bg-rose-50 border border-rose-200 text-rose-850 px-4 py-3 rounded-xl text-xs font-semibold leading-relaxed flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-800 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Interactive Fields Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
                
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Full Pilgrim Name (As in Passport)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                      placeholder="e.g. Muhammad Bilal"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Secure Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                      placeholder="e.g. user@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone number */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Direct WhatsApp / Phone No.</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                      placeholder="e.g. 03036722219"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Selected Package subject */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Service Category / Package Selection</label>
                  <input
                    type="text"
                    className="w-full bg-emerald-50/50 border border-emerald-200/80 rounded-xl px-4 py-3 text-xs text-emerald-950 font-bold"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    required
                  />
                </div>

                {/* Total travelers count */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Total Travelers headcount</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Users className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>
                </div>

                {/* Estimated Departure date */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Desired Departure date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Special instructions */}
              <div className="space-y-1.5 text-xs font-semibold">
                <label className="block text-slate-500 uppercase font-mono tracking-wider">Special Requests &amp; Health details (Optional)</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none min-h-[100px]"
                  placeholder="Tell us if you require wheelchair assistance, specific room adjustments (quad space/triple layouts), or stopover flight preference."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-mono">
                  <FileText className="w-3 h-3" />
                  <span>Subject to standard data protection policies.</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 hover:text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Secure Data...</span>
                    </>
                  ) : (
                    <span>Register Booking Proposal</span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
