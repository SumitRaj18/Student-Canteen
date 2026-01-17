import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext.jsx'; 
import { SnackCard } from '../components/SnackCard.jsx';
import toast from 'react-hot-toast'; 

export const SnacksPage = () => {
  const { state, placeOrder } = useCanteen(); 
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [orderData, setOrderData] = useState({ studentId: '', qty: 1 });

  const filteredSnacks = state.snacks.filter(snack =>
    snack.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    const selectedId = Number(orderData.studentId);
    const targetStudent = state.students.find(s => Number(s.id) === selectedId);

    if (!targetStudent) {
      toast.error("Student record not found.");
      return;
    }

    await placeOrder({ 
      snackId: selectedSnack.id, 
      studentId: selectedId, 
      quantity: Number(orderData.qty) 
    });

    toast.success(`Order placed for ${targetStudent.name}!`, {
      style: { borderRadius: '15px', background: '#111827', color: '#fff' }
    });
    
    setSelectedSnack(null);
    setOrderData({ studentId: '', qty: 1 });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Live Kitchen
            </span>
            <span className="text-gray-300 text-xs font-bold">●</span>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Freshly prepared daily
            </p>
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter">
            Canteen <span className="text-orange-500">Menu.</span>
          </h1>
        </div>

        <div className="text-right">
          <p className="text-gray-900 font-black text-2xl tracking-tighter uppercase">
            {filteredSnacks.length} Items
          </p>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            Available for ordering
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredSnacks.map(snack => (
          <SnackCard key={snack.id} snack={snack} onOrder={setSelectedSnack} />
        ))}
      </div>

      {selectedSnack && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border border-white">
            <div className="h-40 relative">
              <img src={selectedSnack.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <button 
                onClick={() => setSelectedSnack(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md"
              >✕</button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">{selectedSnack.name}</h2>
                <p className="text-sm text-orange-400 font-black tracking-widest uppercase">₹{selectedSnack.price.toFixed(2)} / unit</p>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Assign to Member</label>
                <div className="relative">
                  <select 
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-orange-500 p-4 rounded-2xl text-sm font-bold outline-none transition-all appearance-none cursor-pointer pr-10"
                    onChange={e => setOrderData({...orderData, studentId: e.target.value})}
                    value={orderData.studentId}
                  >
                    <option value="">Select Student...</option>
                    {state.students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.referralCode})</option>)}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30 text-xs">▼</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quantity</label>
                  <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">MAX 10</span>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" min="1" max="10" 
                    value={orderData.qty}
                    onChange={e => setOrderData({...orderData, qty: e.target.value})}
                    className="flex-1 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <span className="w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-2xl font-black text-lg">
                    {orderData.qty}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Payable Amount</p>
                  <span className="text-3xl font-black text-gray-900">
                    ₹{(selectedSnack.price * orderData.qty).toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gray-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-gray-200 hover:shadow-orange-500/30"
              >
                Confirm Placement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};