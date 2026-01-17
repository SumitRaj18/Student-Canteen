import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';

export const StudentsList = () => {
  const { state } = useCanteen();
  const [localSearch, setLocalSearch] = useState("");

  const filteredStudents = state.students.filter(student =>
    student.name.toLowerCase().includes(localSearch.toLowerCase())
  );

  const totalRevenue = state.students.reduce((acc, curr) => acc + curr.totalSpent, 0);
  
  const maxSpent = Math.max(...state.students.map(s => s.totalSpent), 0);
  const dailyTarget = 10000; 
  const progressPercentage = Math.min((totalRevenue / dailyTarget) * 100, 100);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">Directory.</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            Manage members • Track accounts
          </p>
        </div>

        <Link 
          to="/students/new" 
          className="bg-gray-900 text-white font-black py-4 px-8 rounded-2xl transition-all hover:bg-orange-600 active:scale-95 shadow-xl shadow-gray-200 flex items-center gap-2 uppercase tracking-widest text-xs"
        >
          <span className="text-xl">+</span> Add Member
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-4xl opacity-10 group-hover:rotate-12 transition-transform">👥</div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Registered Students</p>
          <p className="text-4xl font-black text-gray-900">{state.students.length}</p>
        </div>

        <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-100 relative overflow-hidden group lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Canteen Revenue</p>
              <p className="text-4xl font-black text-orange-600">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-300 uppercase">Target: ₹{dailyTarget}</p>
              <p className="text-sm font-bold text-gray-400">{progressPercentage.toFixed(0)}% reached</p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-8 relative max-w-md">
        <input 
          type="text"
          placeholder="Search by name..."
          className="w-full bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl py-4 pl-12 pr-4 shadow-sm outline-none transition-all font-bold text-gray-800"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map((student) => {
            const isTopSpender = student.totalSpent === maxSpent && maxSpent > 0;
            
            return (
              <div 
                key={student.id} 
                className={`group bg-white rounded-4xl p-8 shadow-sm border ${isTopSpender ? 'border-orange-200 ring-2 ring-orange-100' : 'border-gray-100'} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${isTopSpender ? 'bg-orange-500' : 'bg-orange-50'} rounded-bl-[4rem] -mr-8 -mt-8 transition-colors duration-500`} />
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-2xl font-black text-gray-900 truncate pr-4 leading-tight uppercase tracking-tighter">
                      {student.name}
                    </h3>
                    {isTopSpender && <span className="text-[8px] bg-white text-orange-600 font-black px-2 py-1 rounded-full shadow-sm uppercase tracking-tighter mr-6">Top Spender</span>}
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {student.referralCode}
                  </span>
                  
                  <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 font-black tracking-widest mb-1">Total Spent</p>
                      <p className="text-3xl font-black text-gray-900">₹{student.totalSpent.toFixed(2)}</p>
                    </div>
                    
                    <Link 
                      to={`/student/${student.id}`}
                      className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg active:scale-90"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <p className="text-5xl mb-4 grayscale opacity-30">🔍</p>
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">No matching members</h3>
          <p className="text-gray-400 font-medium mt-2">Try searching for a different name.</p>
        </div>
      )}
    </div>
  );
};