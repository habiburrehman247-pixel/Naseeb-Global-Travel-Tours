import { useState } from 'react';
import { Search, Info, Check, ShieldCheck, Mail, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { VISA_DIRECTORY } from '../data';

interface VisaViewProps {
  onSelectVisa: (countryName: string) => void;
}

export default function VisaView({ onSelectVisa }: VisaViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisas = VISA_DIRECTORY.filter(v => 
    v.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.visaType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 py-12 pb-16">
      
      {/* HEADER SUMMARY PANEL */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
          Consular Support Desk
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          Sticker &amp; Electronic Visa Requirements Directory
        </h2>
        <p className="text-slate-500 text-base font-light">
          We maintain updated records for visa approvals. Search below to learn what documentation you will need to prepare before submiting.
        </p>
      </section>

      {/* SEARCH AND CONTROL ROW */}
      <section className="max-w-md mx-auto px-4">
        <div className="relative shadow-sm rounded-xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Type country name (e.g. Saudi, Turkey)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-800 focus:border-emerald-800 transition-shadow shadow-inner"
          />
        </div>
      </section>

      {/* SEARCH RESULTS DIRECTORY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredVisas.length > 0 ? (
          <div className="space-y-6">
            {filteredVisas.map((visa, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
              >
                
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shrink-0" />
                      <h3 className="text-2xl font-bold text-slate-900">{visa.country}</h3>
                    </div>
                    <p className="text-xs text-emerald-800 font-mono font-extrabold bg-emerald-100/60 px-2.5 py-1 rounded border border-emerald-200 inline-block mt-1">
                      {visa.visaType}
                    </p>
                  </div>

                  <div className="text-left md:text-right space-y-1">
                    <span className="block text-xs uppercase text-slate-400 font-mono tracking-wider font-semibold">Standard Processing Time</span>
                    <strong className="text-slate-800 font-mono text-sm block">{visa.processingTime}</strong>
                    <span className="block text-xs text-amber-600 font-bold font-mono">{visa.priceEstimate}</span>
                  </div>
                </div>

                {/* Requirements details row */}
                <div>
                  <p className="text-xs text-slate-400 font-mono font-semibold uppercase tracking-wider mb-2">Important Instructions</p>
                  <p className="text-slate-600 text-sm italic">{visa.requirementsInfo}</p>
                </div>

                {/* Checklist Document Stack */}
                <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-5">
                  <h4 className="text-xs uppercase font-bold text-emerald-950 font-mono tracking-widest mb-3 flex items-center">
                    <FileText className="w-3.5 h-3.5 text-emerald-800 mr-2" />
                    <span>Pakistani Passport Document Stack checklist</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {visa.documents.map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-start text-xs text-slate-600">
                        <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center mr-2.5 shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-800" />
                        </div>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action button to form */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                    <Info className="w-3.5 h-3.5" />
                    <span>NASEEB GLOBAL TRAVEL &amp; TOURS guarantees maximum approvals.</span>
                  </div>
                  
                  <button
                    onClick={() => onSelectVisa(visa.country)}
                    className="bg-emerald-900 hover:bg-emerald-950 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Assistance inquiry Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 max-w-md mx-auto text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h4 className="font-bold text-slate-900">No Destination Match Found</h4>
            <p className="text-xs text-slate-500">
              We manage visas for over 40+ destinations worldwide! Drop an offline feedback message and our team will provide immediate document lists manually.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-emerald-900 text-white rounded-lg text-xs font-bold"
            >
              Clear Search Box
            </button>
          </div>
        )}
      </section>

      {/* OFFLINE SERVICES SPOTLIGHT */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-emerald-950 text-white rounded-[2rem] p-8 md:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-full bg-emerald-900/45 -skew-x-12 translate-x-4" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-serif text-amber-400">Professional Embassy File Indexation</h3>
            <p className="text-sm font-light leading-relaxed text-emerald-100">
              Ambassadorial offices reject submissions primarily due to unformatted accounting columns, unclear insurance underwriting certificates, or mismatched cover sheets. NASEEB GLOBAL TRAVEL &amp; TOURS offers top-tier document translation, ledger structures, and flight booking proof templates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="flex items-start space-x-2 text-emerald-100">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Travel Underwriter Insurance coverage matching Schengen requirement thresholds.</span>
              </div>
              <div className="flex items-start space-x-2 text-emerald-100">
                <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Structured Bank Statement cover certificates and NTN returns.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
