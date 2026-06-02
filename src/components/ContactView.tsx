import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, CheckSquare, MessageSquare, Clock, ShieldAlert, Loader2, Award } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ContactView() {
  
  // States of Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Umrah Inquiries');
  const [message, setMessage] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitInquiry = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    // Strict validation matching firebase rules
    if (name.length < 2 || name.length > 100) {
      setErrorMessage("Full Name must be between 2 and 100 characters.");
      setSubmitting(false);
      return;
    }
    if (email.length < 5 || email.length > 100) {
      setErrorMessage("Email address must be between 5 and 100 characters.");
      setSubmitting(false);
      return;
    }
    if (phone.length < 7 || phone.length > 30) {
      setErrorMessage("Phone or WhatsApp must be between 7 and 30 characters.");
      setSubmitting(false);
      return;
    }
    if (subject.length < 3 || subject.length > 100) {
      setErrorMessage("Subject must be between 3 and 100 characters.");
      setSubmitting(false);
      return;
    }
    if (message.length < 10 || message.length > 1000) {
      setErrorMessage("Message description must be between 10 and 1000 characters.");
      setSubmitting(false);
      return;
    }

    try {
      const inquiryData = {
        name,
        email,
        phone,
        subject,
        message,
        createdAt: serverTimestamp() // Matches write schema perfectly
      };

      await addDoc(collection(db, 'inquiries'), inquiryData);
      
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to submit message to Firestore. Please double check character limits.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16 space-y-16">
      
      {/* HEADER SECTION */}
      <section className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
          Direct Communications
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight font-serif">
          Connect With Our Ticketing Counselors
        </h2>
        <p className="text-slate-500 text-sm">
          Visit our flagship office in Faisalabad or submit an offline message instantly to coordinate your document compilation.
        </p>
      </section>

      {/* THREE CARDS QUICK DIRECTORY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card A: Physical Office */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3 relative group hover:shadow-lg transition-all">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-2">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Flagship Office</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed select-text">
            Naseeb Plaza, Chen One Road / Mocciani Street, Faisalabad, Punjab, Pakistan.
          </p>
          <span className="text-[10px] font-mono text-emerald-800 font-bold block bg-emerald-100/60 py-1.5 px-3 rounded-md w-fit mx-auto border border-emerald-200">
            Open Monday - Saturday: 10AM - 7PM
          </span>
        </div>

        {/* Card B: Phone Hotlines */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3 relative group hover:shadow-lg transition-all">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Direct Hotlines</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Available for immediate price updates, hotel vacancy checks, or visa consultation calls.
          </p>
          
          <div className="bg-slate-50 p-2 text-xs font-semibold rounded-lg space-y-1 block border border-slate-100 text-slate-700">
            <a href="tel:+923187096647" className="block hover:underline">0318-7096647</a>
            <a href="tel:+923036722219" className="block hover:underline text-emerald-800">0303-6722219 (WhatsApp)</a>
          </div>
        </div>

        {/* Card C: Corporate Email */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3 relative group hover:shadow-lg transition-all">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">E-Support Box</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Send corporate inquiries, flight itinerary bids, hotel checklists, and passenger ledgers directly.
          </p>
          <a 
            href="mailto:habiburrehman247@gmail.com" 
            className="text-xs font-mono font-bold leading-none text-emerald-900 hover:underline select-all block bg-slate-50 border border-slate-100 p-2.5 rounded-lg"
          >
            habiburrehman247@gmail.com
          </a>
        </div>

      </section>

      {/* MAP AND FORM COMBINED LAYOUT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Interactive Map Visual Desk (Cols 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-full bg-white/5 skew-x-12 translate-x-4" />
          
          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">Geographic Location</span>
            <h3 className="text-2xl font-serif">Flagship Navigation Coordinates</h3>
            <p className="text-xs font-light text-emerald-100 leading-relaxed">
              We are located at Naseeb Plaza on Chen One Road, intersecting with Mocciani Street. This location is easily accessible from any part of Faisalabad. Excellent dedicated underground client car parking is free.
            </p>
          </div>

          {/* Fictional Styled Map Card Asset */}
          <div className="bg-slate-900 rounded-2xl border border-white/10 p-5 mt-6 relative overflow-hidden shadow-inner flex-grow">
            {/* Map Roads lines stylized grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-0.5 bg-white absolute top-1/3" />
              <div className="w-full h-0.5 bg-white absolute top-2/3" />
              <div className="h-full w-0.5 bg-white absolute left-1/4" />
              <div className="h-full w-0.5 bg-white absolute left-3/4" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div className="flex justify-between text-[11px] font-mono font-semibold text-slate-400">
                <span>COORD: 31.4187° N, 73.0791° E</span>
                <span>MAP ZOOM x16</span>
              </div>

              {/* Centered marker */}
              <div className="text-center space-y-1 my-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 border-4 border-emerald-900 flex items-center justify-center mx-auto text-emerald-950 shadow-lg animate-pulse">
                  <MapPin className="w-5 h-5" />
                </div>
                <strong className="block text-sm text-amber-400">NASEEB PLAZA</strong>
                <span className="text-[10px] text-slate-300">Chen One Rd, Faisalabad</span>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-widest block">Client Landmark</span>
                <span className="text-[11px] text-slate-200 mt-0.5 block">Directly Opposite Mocciani Street Crossing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Desk (Cols 7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckSquare className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Thank you! Your message has been safely logged inside our databases. One of our Faisalabad counselors will contact you during off-peak times.
              </p>
              
              <button
                onClick={() => setSuccess(false)}
                className="bg-emerald-900 text-white font-bold text-xs px-5 py-2 rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            
            <form onSubmit={handleSubmitInquiry} className="space-y-5">
              
              <div className="border-b border-secondary pb-3 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Write Direct Inquiry Mail</h3>
                <span className="text-xs text-slate-400 font-mono">Syncs Immediately</span>
              </div>

              {/* Form errors */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-800 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-semibold">
                
                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Bilal"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Your Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. user@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 03187096647"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-500 uppercase font-mono tracking-wider">Subject of Inquiry</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:ring-1 focus:ring-emerald-800"
                  >
                    <option value="General Umrah Inquiries">General Umrah Inquiries</option>
                    <option value="Hajj Seat Registrations">Hajj Seat Registrations</option>
                    <option value="International Tour Vacations">International Tour Vacations</option>
                    <option value="Consular Visa assistance">Consular Visa Assistance</option>
                    <option value="Ticketing &amp; Hotel Allocation">Ticketing &amp; Hotel Allocation</option>
                  </select>
                </div>

              </div>

              <div className="space-y-1.5 text-xs font-semibold">
                <label className="block text-slate-500 uppercase font-mono tracking-wider">Message Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Specify desired hotel distance, luggage sizes, and flight schedules or ask consular document checklists manually..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold px-6 py-3 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Inquiry Message</span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </section>

    </div>
  );
}
