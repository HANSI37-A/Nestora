import React from 'react';

export const Navbar = () => {
  return (
    
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand/90 backdrop-blur-md text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo */}
          <div className="text-2xl font-extrabold tracking-tight cursor-pointer">
            <span className="text-white">Nest</span>
            <span className="text-orange-200 text-3xl">ora</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium transition-colors hover:text-orange-200">
              Livin Room
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-orange-200">
              Bedroom
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-orange-200">
              Dining, Kitchen & Bar
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-orange-200">
              Patio
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-orange-200">
              Office & Gaming
            </a>
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <button className="bg-white text-brand px-5 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-md">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon (Visual Only) */}
          <div className="md:hidden flex items-center">
            <button className="p-2 outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};