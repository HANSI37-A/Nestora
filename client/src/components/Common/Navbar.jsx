import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiMenu, FiShoppingBag } from 'react-icons/fi';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from "react-icons/io";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const categories = [
  { name: 'Collections', path: '/collection/all' },
  { name: 'Designers', path: '/designers' },
  { name: 'Showrooms', path: '/showrooms' },
];

export const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection/all?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Outer Wrapper capsule spacing */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
        
        {/* 
          Inner Nav Capsule: 
          - Scrolled: Solid Dark Theme (For content visibility over scrolling items)
          - Unscrolled: Semi-translucent light overlay with solid dark text for maximum legibility on light pages
        */}
        <nav 
          className={`max-w-7xl mx-auto rounded-full transition-all duration-500 ease-out border ${
            isScrolled 
              ? "bg-[#1A1A1A] border-neutral-800 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] text-white" 
              : "bg-white/80 border-neutral-200/60 shadow-sm text-[#1A1A1A]"
          }`}
        >
          <div className="px-6 sm:px-8 lg:px-10">
            <div className="h-16 sm:h-20 flex items-center justify-between">
              
              {/* Left: Brand Logo */}
              <div className="shrink-0">
                <Link 
                  to="/" 
                  className={`text-xl sm:text-2xl font-bold tracking-[0.25em] transition-colors uppercase font-serif ${
                    isScrolled ? "text-white hover:text-neutral-300" : "text-[#1A1A1A] hover:text-neutral-600"
                  }`}
                >
                  Nestora
                </Link>
              </div>

              {/* Center: Navigation Links */}
              <div className="hidden lg:flex items-center space-x-10">
                {categories.map((cat) => (
                  <NavLink
                    key={cat.name}
                    to={cat.path}
                    className={({ isActive }) =>
                      `text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300 relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[1px] after:transition-transform after:duration-300 ${
                        isScrolled 
                          ? "after:bg-white hover:text-white" 
                          : "after:bg-[#1A1A1A] hover:text-[#1A1A1A]"
                      } ${
                        isActive 
                          ? "font-semibold after:scale-x-100 " + (isScrolled ? "text-white" : "text-[#1A1A1A]")
                          : "after:scale-x-0 " + (isScrolled ? "text-white/60" : "text-[#1A1A1A]/70")
                      }`
                    }
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>

              {/* Right: Interface Controls */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                
                {/* Dynamic Search Input Bar */}
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <div 
                    className={`flex items-center rounded-full px-4 py-1.5 transition-all duration-500 overflow-hidden border ${
                      isScrolled 
                        ? "bg-white/10 border-white/20" 
                        : "bg-black/5 border-black/10"
                    } ${
                      searchOpen ? 'w-40 sm:w-56 opacity-100' : 'w-0 opacity-0 border-transparent p-0'
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Search catalog..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full bg-transparent text-xs outline-none font-light tracking-wide ${
                        isScrolled ? "text-white placeholder-white/40" : "text-[#1A1A1A] placeholder-black/40"
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={`p-2 transition-colors ${
                      isScrolled ? "text-white/80 hover:text-white" : "text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                    }`}
                    aria-label="Toggle search"
                  >
                    <FiSearch size={17} />
                  </button>
                </form>

                {/* Account Identity Link */}
                <Link 
                  to={user ? "/profile" : "/login"} 
                  className={`p-2 transition-colors flex items-center ${
                    isScrolled ? "text-white/80 hover:text-white" : "text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                  }`}
                  aria-label="Profile access"
                >
                  <FiUser size={18} />
                </Link>

                {/* Shopping Bag Drawer Access Component */}
                <div className="flex items-center relative">
                  <CartDrawer buttonElement={
                    <button 
                      className={`p-2 transition-colors ${
                        isScrolled ? "text-white/80 hover:text-white" : "text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                      }`} 
                      aria-label="Open bag"
                    >
                      <FiShoppingBag size={17} />
                    </button>
                  } />
                </div>

                {/* Mobile Drawer Menu Trigger */}
                <button 
                  onClick={() => setNavDrawerOpen(true)} 
                  className={`lg:hidden p-2 transition-colors ${
                    isScrolled ? "text-white/80 hover:text-white" : "text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                  }`}
                  aria-label="Menu trigger"
                >
                  <FiMenu size={19} />
                </button>

              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Side Drawer Menu Overlay */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 lg:hidden transition-opacity duration-300"
          onClick={() => setNavDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#1A1A1A] text-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col lg:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-[0.2em] text-white font-serif uppercase" onClick={() => setNavDrawerOpen(false)}>
            Nestora
          </Link>
          <button onClick={() => setNavDrawerOpen(false)} className="p-2 text-white/60 hover:text-white transition-colors">
            <IoMdClose size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/40">Design Collections</p>
            <div className="flex flex-col space-y-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setNavDrawerOpen(false)}
                  className="text-sm font-light text-white/80 hover:text-white tracking-widest transition-colors uppercase"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/40">My Account</p>
            <div className="flex flex-col space-y-4">
              <Link to={user ? "/profile" : "/login"} onClick={() => setNavDrawerOpen(false)} className="text-sm font-light text-white/80 hover:text-white tracking-widest transition-colors uppercase">
                {user ? "My Profile" : "Login / Register"}
              </Link>
              <Link to="/my-orders" onClick={() => setNavDrawerOpen(false)} className="text-sm font-light text-white/80 hover:text-white tracking-widest transition-colors uppercase">
                Track Commissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;