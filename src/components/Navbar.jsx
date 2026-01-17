import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';

export const Navbar = () => {
  const { state, dispatch } = useCanteen();
  const location = useLocation();
  const isSnacksPage = location.pathname === "/";

  const linkClass = ({ isActive }) => 
    `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
      isActive ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
    }`;
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-100 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-orange-500 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/20">
              C
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Canteen<span className="text-orange-500">Hub</span>
            </span>
          </div>

          <NavLink to="/students/new" className="md:hidden w-10 h-10 bg-gray-800 text-white rounded-xl flex items-center justify-center text-2xl font-light hover:bg-orange-500">
            +
          </NavLink>
        </div>

        {isSnacksPage && (
          <div className="w-full flex-1 max-w-xl transition-all duration-300">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm group-focus-within:text-orange-500">🔍</span>
              <input 
                type="text"
                placeholder="Search your favorite snacks..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                className="w-full bg-gray-800/40 border border-gray-700 rounded-2xl py-2.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:bg-gray-800 transition-all outline-none text-sm"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <NavLink to="/" className={linkClass}>Snacks</NavLink>
          <NavLink to="/students" className={linkClass}>Students</NavLink>
          <NavLink to="/students/new" className="hidden md:flex w-10 h-10 bg-gray-800 text-white rounded-xl items-center justify-center text-2xl font-light hover:bg-orange-500 transition-colors shadow-lg">
            +
          </NavLink>
        </div>
      </div>
    </nav>
  );
};