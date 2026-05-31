import React, { useState } from 'react';
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
      <nav className="sticky top-0 z-50 w-full bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#A8A29E]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="h-24 flex items-center justify-between">
            
            {/* Left: Premium Brand Logo */}
            <div className="shrink-0">
              <Link 
                to="/" 
                className="text-2xl font-bold tracking-[0.25em] text-[#1A1A1A] hover:text-[#6B543D] transition-colors uppercase font-serif"
              >
                Nestora
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-10">
              {categories.map((cat) => (
                <NavLink
                  key={cat.name}
                  to={cat.path}
                  className={({ isActive }) =>
                    `text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive ? "text-[#6B543D] font-semibold" : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                    }`
                  }
                >
                  {cat.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div 
                  className={`flex items-center bg-[#1A1A1A]/5 border border-[#A8A29E]/30 rounded-full px-3 py-1 transition-all duration-300 overflow-hidden ${
                    searchOpen ? 'w-48 sm:w-56 opacity-100' : 'w-0 opacity-0 border-transparent p-0'
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1A1A1A] outline-none placeholder-[#A8A29E] font-light"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-[#1A1A1A] hover:text-[#6B543D] transition-colors"
                  aria-label="Toggle search"
                >
                  <FiSearch size={17} />
                </button>
              </form>

              <Link 
                to={user ? "/profile" : "/login"} 
                className="p-2 text-[#1A1A1A] hover:text-[#6B543D] transition-colors flex items-center"
                aria-label="Profile access"
              >
                <FiUser size={18} />
              </Link>

              <div className="flex items-center relative">
                <CartDrawer buttonElement={
                  <button className="p-2 text-[#1A1A1A] hover:text-[#6B543D] transition-colors" aria-label="Open bag">
                    <FiShoppingBag size={17} />
                  </button>
                } />
              </div>

              <button 
                onClick={() => setNavDrawerOpen(true)} 
                className="lg:hidden p-2 text-[#1A1A1A] hover:text-[#6B543D] transition-colors"
                aria-label="Menu trigger"
              >
                <FiMenu size={19} />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-[#1A1A1A]/30 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setNavDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#F9F7F2] shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col lg:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-[#A8A29E]/20 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-widest text-[#1A1A1A] font-serif uppercase" onClick={() => setNavDrawerOpen(false)}>
            Nestora
          </Link>
          <button onClick={() => setNavDrawerOpen(false)} className="p-2 text-[#A8A29E] hover:text-[#1A1A1A]">
            <IoMdClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A8A29E]">Design Collections</p>
            <div className="flex flex-col space-y-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setNavDrawerOpen(false)}
                  className="text-sm font-medium text-[#1A1A1A] hover:text-[#6B543D] tracking-wide transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="border-t border-[#A8A29E]/20 pt-6 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A8A29E]">My Account</p>
            <div className="flex flex-col space-y-4">
              <Link to={user ? "/profile" : "/login"} onClick={() => setNavDrawerOpen(false)} className="text-sm font-medium text-[#1A1A1A] hover:text-[#6B543D] tracking-wide transition-colors">
                {user ? "My Profile" : "Login / Register"}
              </Link>
              <Link to="/my-orders" onClick={() => setNavDrawerOpen(false)} className="text-sm font-medium text-[#1A1A1A] hover:text-[#6B543D] tracking-wide transition-colors">
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