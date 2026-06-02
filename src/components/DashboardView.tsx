import { useState } from 'react';
import { 
  User, CheckSquare, Calendar, Phone, Mail, Clock, RefreshCw, 
  Trash2, ShieldAlert, Award, Inbox, Check, X, FileSpreadsheet, Loader2 
} from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface DashboardViewProps {
  user: any;
  myBookings: any[];
  allBookings: any[];
  allInquiries: any[];
  dataLoading: boolean;
  onTriggerLogin: () => Promise<void>;
  onTriggerLogout: () => Promise<void>;
}

export default function DashboardView({
  user,
  myBookings,
  allBookings,
  allInquiries,
  dataLoading,
  onTriggerLogin,
  onTriggerLogout
}: DashboardViewProps) {
  
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentSubTab, setCurrentSubTab] = useState<'bookings' | 'inquiries'>('bookings');

  // Check if current user is the admin
  const isAdmin = user && user.email === 'habiburrehman247@gmail.com';

  // Admin: Update status on database
  const handleUpdateStatus = async (bookingId: string, nextStatus: string) => {
    setUpdatingId(bookingId);
    try {
      const docRef = doc(db, 'bookings', bookingId);
      await updateDoc(docRef, { status: nextStatus });
    } catch (err) {
      console.error("Failed to update status: ", err);
      alert("Verification or admin rule clearance failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Convert Firebase ServerTimestamp to readable text safely
  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Just now';
    if (ts.seconds) {
      return new Date(ts.seconds * 1000).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    }
    // String ISO formats
    return new Date(ts).toLocaleDateString();
  };

  // Helper colors for status pills
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16 space-y-12">
      
      {/* PASSENGER PROFILE HEADER */}
      <section className="bg-emerald-900 text-white rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Avatar Details */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-amber-500 border border-amber-300 flex items-center justify-center text-emerald-950 text-xl font-bold font-mono">
            {user?.displayName ? user.displayName.charAt(0) : <User className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl md:text-2xl font-bold">{user?.displayName || 'NASEEB GLOBAL Pilgrim'}</h2>
              {isAdmin && (
                <span className="bg-amber-500 text-emerald-950 text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded shadow">
                  Executive Admin
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-200 font-mono mt-0.5">{user?.email || 'Secure authentication active'}</p>
          </div>
        </div>

        {/* Right Side Control Button */}
        <div>
          <button
            onClick={onTriggerLogout}
            className="bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 py-2.5 px-5 rounded-xl transition-all cursor-pointer"
          >
            Sign Out Profile
          </button>
        </div>

      </section>

      {/* DUAL RENDER LOGIC */}
      <section>
        
        {/* ROLE A: EXECUTIVE ADMINISTRATOR VIEW */}
        {isAdmin ? (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">NASEEB GLOBAL Executive Command Suite</h3>
                <p className="text-xs text-slate-500">Real-time synchronized data logs of travel requests and client inquiries.</p>
              </div>

              {/* Toggle Sub-tabs */}
              <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setCurrentSubTab('bookings')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${currentSubTab === 'bookings' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500'}`}
                >
                  Registrations ({allBookings.length})
                </button>
                <button
                  onClick={() => setCurrentSubTab('inquiries')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${currentSubTab === 'inquiries' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500'}`}
                >
                  Inquiries ({allInquiries.length})
                </button>
              </div>
            </div>

            {/* Spinner loader state */}
            {dataLoading && (
              <div className="p-12 text-center text-slate-500 flex justify-center items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-800" />
                <span className="text-xs font-mono">Syncing Cloud Database records...</span>
              </div>
            )}

            {/* SUB TAB A: ALL BOOKING ENTRIES */}
            {currentSubTab === 'bookings' && (
              <div className="space-y-4">
                {allBookings.length > 0 ? (
                  allBookings.map((bk) => (
                    <div 
                      key={bk.id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                    >
                      {/* Booking meta row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase font-extrabold text-slate-400">PROP ID: {bk.id}</span>
                          <h4 className="font-bold text-slate-900 text-base">{bk.fullName}</h4>
                          <span className="text-xs text-slate-400 font-mono flex items-center mt-0.5">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {formatTimestamp(bk.createdAt)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`px-2.5 py-1 text-[10px] font-bold font-mono uppercase border rounded-md ${getStatusStyle(bk.status)}`}>
                            {bk.status}
                          </span>

                          {/* Loading identifier */}
                          {updatingId === bk.id && (
                            <Loader2 className="w-4 h-4 text-emerald-800 animate-spin" />
                          )}
                        </div>
                      </div>

                      {/* Content details cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block font-mono">EMAIL</span>
                          <span className="text-slate-800 block select-all font-semibold break-all">{bk.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-mono">WHATSAPP / PHONE</span>
                          <span className="text-slate-800 block select-all font-semibold">{bk.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-mono">DESIRED DEPARTURE</span>
                          <span className="text-slate-800 block font-semibold">{bk.departureDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-mono">PACKAGE</span>
                          <span className="text-emerald-900 font-extrabold block">{bk.packageType} ({bk.travelersCount} pax)</span>
                        </div>
                      </div>

                      {/* Special instructions block */}
                      <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                        <span className="block text-[10px] font-mono text-slate-400">PASSENGER NOTE</span>
                        <p className="text-xs text-slate-600 mt-1 italic">{bk.specialRequests}</p>
                      </div>

                      {/* Action buttons row */}
                      <div className="flex shrink-0 gap-2 justify-end pt-2 border-t border-slate-50 text-xs font-semibold">
                        <button
                          onClick={() => handleUpdateStatus(bk.id, 'confirmed')}
                          className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100 trigger-btn"
                          disabled={updatingId === bk.id}
                        >
                          Approve Confirmed
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(bk.id, 'completed')}
                          className="px-3.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-100 trigger-btn"
                          disabled={updatingId === bk.id}
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(bk.id, 'cancelled')}
                          className="px-3.5 py-1.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg hover:bg-rose-100 trigger-btn"
                          disabled={updatingId === bk.id}
                        >
                          Cancel
                        </button>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center max-w-md mx-auto space-y-2">
                    <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="font-bold">No Proposals Filed</h4>
                    <p className="text-xs text-slate-500">Wait for passengers to register custom trips on the planning portal.</p>
                  </div>
                )}
              </div>
            )}

            {/* SUB TAB B: ALL CONTACT INQUIRIES */}
            {currentSubTab === 'inquiries' && (
              <div className="space-y-4">
                {allInquiries.length > 0 ? (
                  allInquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
                        <div>
                          <h4 className="font-bold text-slate-950 text-sm">{inq.name}</h4>
                          <span className="text-xs text-slate-400 font-mono">{formatTimestamp(inq.createdAt)}</span>
                        </div>
                        
                        <span className="bg-blue-100 text-blue-800 font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-blue-250 font-bold">
                          FEEDBACK INQUIRY
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <span className="text-slate-400 block font-mono">CONTACT</span>
                          <span className="text-slate-800 block select-all break-all">{inq.email} / {inq.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-mono">SUBJECT / PREF</span>
                          <span className="text-emerald-900 block font-mono font-bold">{inq.subject || 'General Inquiry'}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3 text-xs italic text-slate-600">
                        {inq.message}
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center max-w-md mx-auto space-y-2">
                    <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="font-bold">No Contact Mail Inboxes</h4>
                    <p className="text-xs text-slate-500">All submissions from the Contact Form page will synchronize here live.</p>
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          
          /* ROLE B: REGISTERED PILGRIM/PASSENGER VIEW */
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-bold font-serif text-slate-900">Your Active Registrations</h3>
              <p className="text-xs text-slate-500">Check current approvals, document checks, and status milestones live.</p>
            </div>

            {dataLoading && (
              <div className="p-12 text-center text-slate-500 flex justify-center items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-800" />
                <span className="text-xs font-mono">Securing live records...</span>
              </div>
            )}

            {myBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myBookings.map((bk) => (
                  <div 
                    key={bk.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
                  >
                    
                    {/* Top status */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 text-[10px] font-bold font-mono uppercase border rounded-md ${getStatusStyle(bk.status)}`}>
                        {bk.status}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-slate-400">ID: {bk.id}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight text-base">{bk.packageType}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Submitted: {formatTimestamp(bk.createdAt)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block font-mono text-[10px]">PILGRIM NAME</span>
                        <strong className="text-slate-800 block truncate">{bk.fullName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono text-[10px]">DEPARTURE DATE</span>
                        <strong className="text-slate-800 block">{bk.departureDate}</strong>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 leading-normal bg-emerald-100/30 p-2.5 rounded-lg border border-emerald-200/50 flex items-start space-x-1.5">
                      <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Current Milestone</p>
                        <p className="text-emerald-950 font-medium">
                          {bk.status === 'confirmed' 
                            ? 'Consular documentation approved! Ready for physical check handover.' 
                            : bk.status === 'completed' 
                            ? 'Pilgrim returned. Welcome home!' 
                            : 'Logistical reviews ongoing at Faisalabad central desk. WhatsApp support active.'}
                        </p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center max-w-md mx-auto space-y-4 shadow-sm">
                <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-900">No Filed Registrations</h4>
                <p className="text-xs text-slate-500 leading-normal max-w-sm">
                  You have not submitted a custom itinerary proposal yet. Use our Planner tab to customized your hotels, room sizing, and departure dates instantly!
                </p>
              </div>
            )}

            {/* General FAQs on dashboard */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-slate-900 mb-3">Frequent Passenger Inquiries</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <h5 className="font-bold text-emerald-950">How long does my Hajj or Umrah booking approval take?</h5>
                  <p className="text-slate-500 mt-1">Our land packages are checked within 4-6 business hours. High season flights could take up to 24 hours to secure with the respective airline.</p>
                </div>
                <div>
                  <h5 className="font-bold text-emerald-950">Where should I submit original passports?</h5>
                  <p className="text-slate-500 mt-1">Passports are to be physically handed over at Naseeb Plaza, Faisalabad, or sent via authorized secure courier service alongside medical vaccine cards.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </section>

    </div>
  );
}
