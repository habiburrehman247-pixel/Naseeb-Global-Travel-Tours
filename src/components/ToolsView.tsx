import { useState, FormEvent } from 'react';
import { RefreshCw, ClipboardList, Plus, Trash2, CheckSquare, Square, Check, ThumbsUp, Sparkles, Scale } from 'lucide-react';

interface ChecklistItem {
  id: string;
  task: string;
  category: 'Spiritual' | 'Documents' | 'Personal';
  packed: boolean;
}

const INITIAL_PACK_LIST: ChecklistItem[] = [
  { id: '1', task: 'Ihram sheets (2 sets of white seamless cloth)', category: 'Spiritual', packed: false },
  { id: '2', task: 'Unscented liquid soap and body wash (for Ihram state)', category: 'Spiritual', packed: false },
  { id: '3', task: 'Pocket Duas book & digital counter', category: 'Spiritual', packed: true },
  { id: '4', task: 'Original passports + 3 paper copies', category: 'Documents', packed: true },
  { id: '5', task: 'Confirmed return flight tickets & visa printouts', category: 'Documents', packed: true },
  { id: '6', task: 'Polio/Meningitis vaccination card', category: 'Documents', packed: false },
  { id: '7', task: 'Emergency contacts & Hotel addresses list', category: 'Documents', packed: false },
  { id: '8', task: 'Comfortable walking sandals or unscented trainers', category: 'Personal', packed: false },
  { id: '9', task: 'Pocket sized umbrellas for desert heat protection', category: 'Personal', packed: false },
  { id: '10', task: 'Essential routine medications & pain relief tablets', category: 'Personal', packed: false },
];

export default function ToolsView() {
  // Currency Calculator states
  const [ccAmount, setCcAmount] = useState<number>(100);
  const [ccFrom, setCcFrom] = useState<string>('SAR');
  const [ccTo, setCcTo] = useState<string>('PKR');
  const [ccResult, setCcResult] = useState<string>('100 SAR = 7,424.00 PKR');

  // Checklist States
  const [packList, setPackList] = useState<ChecklistItem[]>(INITIAL_PACK_LIST);
  const [newItemText, setNewItemText] = useState('');
  const [newItemCat, setNewItemCat] = useState<'Spiritual' | 'Documents' | 'Personal'>('Spiritual');

  // Convert Math
  const handleCurrencyConvert = () => {
    // Standard exchange base reference matching real rates
    const toPKRFactors: Record<string, number> = {
      USD: 278.40,
      SAR: 74.24,
      AED: 75.80,
      PKR: 1.00
    };

    const rateFrom = toPKRFactors[ccFrom];
    const rateTo = toPKRFactors[ccTo];
    
    const pkrEquivalent = ccAmount * rateFrom;
    const finalValue = pkrEquivalent / rateTo;

    setCcResult(`${ccAmount.toLocaleString()} ${ccFrom} = ${finalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${ccTo}`);
  };

  // Checklist Actions
  const toggleItemPacked = (id: string) => {
    setPackList(prev => prev.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setPackList(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const item: ChecklistItem = {
      id: Date.now().toString(),
      task: newItemText.trim(),
      category: newItemCat,
      packed: false
    };

    setPackList(prev => [...prev, item]);
    setNewItemText('');
  };

  const clearPacked = () => {
    setPackList(prev => prev.map(item => ({ ...item, packed: false })));
  };

  // Math totals for checklist progress
  const totalItems = packList.length;
  const packedItemsCount = packList.filter(i => i.packed).length;
  const percentageCompleted = totalItems > 0 ? Math.round((packedItemsCount / totalItems) * 100) : 0;

  return (
    <div className="space-y-16 py-12 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER SPECS */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
          Digital Companions
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          Dynamic Packing &amp; Currency Exchange Tools
        </h2>
        <p className="text-slate-500 text-base font-light">
          Use these secure tools to calculate currency rates on-the-go and manage your pilgrimage preparations checklist.
        </p>
      </section>

      {/* CORE UTILITY PANELS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* PANEL A: CURRENCY CALCULATOR (COLS 5) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-xl rounded-3xl p-6 md:p-8 space-y-6 h-fit">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">PKR Exchange Calculator</h3>
              <p className="text-[11px] text-slate-500 font-mono">LIVE OFFSHORE PARITY WEIGHTS</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            {/* Input fields */}
            <div>
              <label className="block text-slate-500 uppercase font-mono tracking-wider mb-1.5">Enter Amount</label>
              <input
                type="number"
                value={ccAmount}
                onChange={(e) => setCcAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-800"
              />
            </div>

            {/* From Source */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 uppercase font-mono tracking-wider mb-1.5">From</label>
                <select
                  value={ccFrom}
                  onChange={(e) => setCcFrom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                >
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="SAR">SAR (﷼) - Saudi Riyal</option>
                  <option value="AED">AED (د.إ) - UAE Dirham</option>
                  <option value="PKR">PKR (₨) - Pak Rupee</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 uppercase font-mono tracking-wider mb-1.5">To</label>
                <select
                  value={ccTo}
                  onChange={(e) => setCcTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                >
                  <option value="PKR">PKR (₨) - Pak Rupee</option>
                  <option value="SAR">SAR (﷼) - Saudi Riyal</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="AED">AED (د.إ) - UAE Dirham</option>
                </select>
              </div>
            </div>

            {/* Converter output frame */}
            <div className="bg-emerald-900 text-white rounded-2xl p-5 text-center relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-8 h-full bg-white/5 skew-x-12 translate-x-4" />
              <span className="block text-[10px] text-emerald-200 tracking-wider font-mono">CALCULATED VALUE</span>
              <p className="text-xl md:text-2xl font-mono font-extrabold text-amber-300 mt-1 select-all">{ccResult}</p>
            </div>

            <button
              onClick={handleCurrencyConvert}
              className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-bold p-3 rounded-xl cursor-pointer shadow-md transition-all active:scale-98"
            >
              Perform Conversion
            </button>
          </div>
        </div>

        {/* PANEL B: PACKING CHECKLIST TRACKER (COLS 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-xl rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Interactive Pilgrim Packing List</h3>
                <p className="text-[11px] text-slate-500 font-mono">STABILIZE YOUR READINESS PROFILE</p>
              </div>
            </div>

            {/* Checklist progress ring/meter */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="block text-xs font-mono font-bold text-slate-500">PACKED STATUS</span>
                <span className="text-emerald-800 font-extrabold text-sm">{packedItemsCount} of {totalItems} Packed ({percentageCompleted}%)</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative bg-slate-50" style={{ borderTopColor: '#065f46' }}>
                <span className="text-[11px] font-bold font-mono text-emerald-900">{percentageCompleted}%</span>
              </div>
            </div>
          </div>

          {/* Quick Custom Add form */}
          <form onSubmit={handleAddItem} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add custom packing item (e.g. Toothbrush, extra cash)..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              className="flex-grow bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800 shadow-sm"
            />
            
            <div className="flex gap-2">
              <select
                value={newItemCat}
                onChange={(e) => setNewItemCat(e.target.value as any)}
                className="bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-mono"
              >
                <option value="Spiritual">Spiritual</option>
                <option value="Documents">Documents</option>
                <option value="Personal">Personal</option>
              </select>

              <button
                type="submit"
                className="bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl px-4 py-2 text-xs font-bold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </form>

          {/* Packing items render list */}
          <div className="space-y-3">
            {packList.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleItemPacked(item.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${item.packed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
              >
                <div className="flex items-center space-x-3.5 flex-grow">
                  <div className="shrink-0 text-emerald-805">
                    {item.packed ? (
                      <div className="w-5 h-5 bg-emerald-800 text-white rounded-md flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-slate-300 rounded-md bg-white hover:border-emerald-700" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs md:text-sm font-medium ${item.packed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item.task}
                    </span>
                    <span className="block text-[9px] font-mono tracking-wider font-extrabold uppercase text-slate-400 mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="p-1.5 text-rose-200 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Clean utility */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-mono">Check items off to track your travel preparation.</span>
            <button
              onClick={clearPacked}
              className="text-slate-500 hover:text-slate-800 text-xs font-semibold underline cursor-pointer"
            >
              Reset Packed Marks
            </button>
          </div>

        </div>

      </section>

      {/* RETAILER SPECIFIC QUALITY COMPLIANCE */}
      <section className="bg-emerald-950 text-white p-8 rounded-3xl text-center max-w-4xl mx-auto space-y-4">
        <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="text-xl font-serif text-amber-400">Integrated Weight Compliance Check</h3>
        <p className="text-xs text-emerald-100 leading-relaxed max-w-2xl mx-auto font-light">
          Saudi airline baggage regulations enforce standard 23kg check-in luggage structures (maximum 2 bags total) and 7kg hand carry. NASEEB GLOBAL TRAVEL &amp; TOURS highly recommends purchasing a digital travel scale before departure to avoid ticketing charges.
        </p>
      </section>

    </div>
  );
}
