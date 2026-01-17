import React, { useState, useEffect, useRef } from 'react';

export const SnackCard = ({ snack, onOrder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-[420px]"
    >
      <div className="relative h-64 overflow-hidden">
        {isVisible ? (
          <img 
            src={snack.image} 
            alt={snack.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse" />
        )}
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
          <span className="text-orange-600 font-black text-sm">₹{snack.price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col justify-between grow">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-extrabold text-gray-900 text-xl leading-tight uppercase tracking-tight">
              {snack.name}
            </h3>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            🔥 {snack.ordersCount} Happy Orders
          </p>
        </div>

        <button 
          onClick={() => onOrder(snack)}
          className="w-full mt-4 bg-gray-900 text-white py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
        >
          Add to Tray
        </button>
      </div>
    </div>
  );
};