import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import toast from 'react-hot-toast';

export const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, deleteStudent } = useCanteen();

  const student = state.students.find((s) => String(s.id) === String(id));
  
  const studentOrders = state.orders.filter((order) => String(order.studentId) === String(id));

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${student?.name}? This cannot be undone.`);
    
    if (confirmDelete) {
      const success = await deleteStudent(student.id);
      if (success) {
        toast.success(`${student.name} has been removed.`, {
          style: { borderRadius: '15px', background: '#111827', color: '#fff' }
        });
        navigate('/students');
      } else {
        toast.error("Could not delete student. Server error.");
      }
    }
  };

  if (state.students.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-xs uppercase tracking-[0.3em] text-gray-400">Syncing Database...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Student Not Found</h2>
        <p className="text-gray-400 text-xs font-bold uppercase mt-2">ID: {id} does not exist in records.</p>
        <button 
          onClick={() => navigate('/students')}
          className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-black hover:bg-orange-500 transition-all tracking-widest uppercase text-xs"
        >
          ← Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto min-h-screen bg-gray-50">
      <button 
        onClick={() => navigate('/students')}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-black text-[10px] uppercase tracking-[0.3em]"
      >
        ← Back to Members
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 border border-white/5">
            <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center text-3xl font-black mb-6 shadow-xl shadow-orange-500/20">
              {student.name.charAt(0)}
            </div>
            <h1 className="text-3xl font-black leading-tight mb-1 tracking-tighter uppercase">{student.name}</h1>
            <p className="text-gray-500 font-mono text-xs mb-8 tracking-widest">{student.referralCode}</p>
            
            <div className="space-y-4">
              <div className="p-6 bg-white/5 rounded-4xl border border-white/10 backdrop-blur-md">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">Total Lifetime Spend</p>
                <p className="text-4xl font-black tracking-tight">₹{student.totalSpent.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between px-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>Orders: {studentOrders.length}</span>
                <span>Status: Active</span>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <button 
                  onClick={handleDelete}
                  className="w-full py-4 rounded-2xl border-2 border-red-500/20 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🗑️</span> Delete Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Order History</h2>
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
              Recent Activity
            </span>
          </div>
          
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            {studentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest">Snack Item</th>
                      <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest">Qty</th>
                      <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest">Price</th>
                      <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {studentOrders.map((order) => (
                      <tr key={order.id} className="group hover:bg-orange-50/30 transition-all duration-200">
                        <td className="p-6">
                          <span className="font-black text-gray-900 uppercase text-sm tracking-tight group-hover:text-orange-600 transition-colors">
                            {order.snackName}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className="bg-gray-100 px-3 py-1 rounded-xl text-[10px] font-black text-gray-600">
                            x{order.quantity}
                          </span>
                        </td>
                        <td className="p-6 font-black text-gray-900">
                          ₹{order.payableAmount.toFixed(2)}
                        </td>
                        <td className="p-6 text-right text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-24 text-center">
                <p className="text-6xl mb-4 opacity-20 grayscale">🥪</p>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No orders found in history.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};