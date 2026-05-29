import React, { useState } from 'react';
import { FiSearch, FiUser, FiMenu, FiShoppingBag } from 'react-icons/fi';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from "react-icons/io";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const categories = [
  { name: 'All Collection', path: '/collection/all' },
  { name: 'Living Room', path: '/collection/living-room' },
  { name: 'Dining & Kitchen', path: '/collection/dining' },
  { name: 'Bedroom Oasis', path: '/collection/bedroom' },
  { name: 'Lighting Studios', path: '/collection/lighting' },
  { name: 'Rugs & Textiles', path: '/collection/rugs-textiles' },
  { name: 'Outdoor Living', path: '/collection/outdoor' },
];

export const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const { user } = useSelector((state) => state.auth);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection/all?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Premium Glassmorphic Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            
            {/* Left: Premium Brand Logo */}
            <div className="shrink-0">
              <Link 
                to="/" 
                className="text-xl sm:text-2xl font-bold tracking-widest text-neutral-900 hover:text-[#8C7A6B] transition-colors duration-300 uppercase font-serif"
              >
                Nestora
              </Link>
            </div>

            {/* Center: Sleek Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((cat) => (
                <NavLink
                  key={cat.name}
                  to={cat.path}
                  className={({ isActive }) =>
                    `relative py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 group ${
                      isActive
                        ? "text-[#8C7A6B]"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`
                  }
                >
                  {cat.name}
                  <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-[#8C7A6B] transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </div>

            {/* Right: Elegant Utility Area */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Interactive Slide-out Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div 
                  className={`flex items-center bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1.5 transition-all duration-300 overflow-hidden ${
                    searchOpen ? 'w-40 sm:w-60 opacity-100' : 'w-0 opacity-0 border-transparent p-0'
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search premium design catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-neutral-800 outline-none placeholder-neutral-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-neutral-700 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none"
                  aria-label="Toggle search bar"
                >
                  <FiSearch size={18} />
                </button>
              </form>

              {/* Shopping Cart Bag Action Area */}
              <div className="flex items-center relative group">
                <CartDrawer buttonElement={
                  <button className="p-2 text-neutral-700 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none" aria-label="Open your design bag">
                    <FiShoppingBag size={19} />
                  </button>
                } />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
                  Cart
                </span>
              </div>

              {/* User Profile / Login Action */}
              <Link 
                to={user ? "/profile" : "/login"} 
                className="p-2 text-neutral-700 hover:text-[#8C7A6B] transition-colors duration-300 relative group flex items-center gap-1"
                aria-label="View user profile"
              >
                <FiUser size={19} />
                {user && <span className="text-[10px] max-w-[60px] truncate hidden md:inline text-neutral-500">Hi, {user.name.split(" ")[0]}</span>}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
                  {user ? "Profile" : "Login"}
                </span>
              </Link>

              {/* Responsive Hamburger Menu (Mobile/Tablet Only) */}
              <button 
                onClick={() => setNavDrawerOpen(true)} 
                className="lg:hidden p-2 text-neutral-700 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none"
                aria-label="Open navigation menu"
              >
                <FiMenu size={20} />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden"
          onClick={() => setNavDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Side Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col lg:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-widest text-neutral-900 font-serif uppercase"
            onClick={() => setNavDrawerOpen(false)}
          >
            Nestora
          </Link>
          <button
            onClick={() => setNavDrawerOpen(false)}
            className="p-2 text-neutral-400 hover:text-[#8C7A6B] transition-colors duration-300"
            aria-label="Close menu"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          <div className="space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Design Collections</p>
            <div className="flex flex-col space-y-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setNavDrawerOpen(false)}
                  className="text-sm font-medium text-neutral-700 hover:text-[#8C7A6B] tracking-wide transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="border-t border-neutral-100 pt-6 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">My Account</p>
            <div className="flex flex-col space-y-3">
              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setNavDrawerOpen(false)}
                className="text-sm font-medium text-neutral-700 hover:text-[#8C7A6B] tracking-wide transition-colors"
              >
                {user ? "My Profile" : "Login / Register"}
              </Link>
                <Link
                  to="/my-orders"
                  onClick={() => setNavDrawerOpen(false)}
                  className="text-sm font-medium text-neutral-700 hover:text-[#8C7A6B] tracking-wide transition-colors"
                >
                  Track Commissions & Orders
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;