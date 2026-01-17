import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext.jsx';
import toast from 'react-hot-toast';

export const CreateStudent = () => {
  const { addStudent } = useCanteen(); 
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await addStudent(data.name); 

      if (result) {
        toast.success(`Welcome, ${result.name}!`, {
          icon: '🎉',
          style: {
            borderRadius: '15px',
            background: '#111827',
            color: '#fff',
          }
        });
        
        navigate('/students');
      }
    } catch (error) {
      toast.error("Registration failed. Check your connection.");
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md">
        <div className="absolute -top-12 left-6 right-6 bg-linear-to-r from-gray-900 to-gray-800 p-6 rounded-3xl shadow-2xl z-10 border border-white/10">
          <h2 className="text-2xl font-black text-white tracking-tight">Join the Club 🍔</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">New Student Registration</p>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-8 pt-20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative">
              <label className="absolute -top-3 left-4 px-2 bg-white text-[10px] font-black text-orange-600 uppercase tracking-widest z-20">
                Student Identity
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🏷️</span>
                <input
                  {...register("name", { 
                    required: "We need a name to start!",
                    minLength: { value: 2, message: "Name is a bit too short" }
                  })}
                  placeholder="Enter full name..."
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 font-bold text-gray-800 focus:bg-white ${
                    errors.name 
                      ? 'border-red-100 focus:border-red-500 ring-4 ring-red-500/10' 
                      : 'border-transparent focus:border-orange-500 ring-4 ring-orange-500/0 focus:ring-orange-500/10'
                  }`}
                />
              </div>
              
              {errors.name && (
                <p className="absolute -bottom-6 left-2 text-red-500 text-[10px] font-bold uppercase italic animate-bounce">
                  ⚠️ {errors.name.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-gray-900 overflow-hidden text-white font-black py-4 rounded-2xl transition-all duration-300 hover:bg-orange-600 active:scale-95 disabled:opacity-50 shadow-xl shadow-gray-200 hover:shadow-orange-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest uppercase text-sm">
                  {isSubmitting ? "Syncing..." : "Create Profile"}
                  {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                </span>
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-45 -translate-x-full group-hover:animate-shine"></div>
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400 text-[10px] font-medium mt-8 uppercase tracking-tighter">
            A unique referral code will be generated automatically
          </p>
        </div>
      </div>
    </div>
  );
};