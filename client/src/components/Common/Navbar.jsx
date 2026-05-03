import React, { useState } from 'react';
import { FiSearch, FiUser, FiList, FiBell } from 'react-icons/fi';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from "react-icons/io";

const categories = [
  'Furniture', 'Rugs', 'Outdoor', 'Bedding', 'Bath',
  'Kitchen & Entertaining',
  'Lighting', 'Holiday & More', 'Sales & Deals'
];

export const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full shadow-sm bg-white">

        {/* Top Bar */}
        <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-200">

          {/* Logo */}
          <div className="min-w-22.5 leading-tight">
            <p className="text-xs font-bold text-gray-800 tracking-tight">NestOra</p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center border border-gray-300 rounded overflow-hidden h-10 focus-within:border-[#8C7A6B] focus-within:ring-1 focus-within:ring-[#8C7A6B] transition-all">
            <input
              type="text"
              placeholder="Find all things home & beyond"
              className="flex-1 px-4 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            <button onClick={toggleNavDrawer} className="bg-[#2C2C2C] text-white w-12 h-10 flex items-center justify-center hover:bg-[#3E362E] transition-colors">
              <FiSearch size={16} />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-5">

            {/* Account */}
            <div className="flex flex-col items-center cursor-pointer hover:text-[#8C7A6B] transition-colors">
              <FiUser size={20} />
              <span className="text-[10px] text-gray-500 mt-0.5">Account</span>
            </div>

            {/* Lists */}
            <div className="flex flex-col items-center cursor-pointer hover:text-[#8C7A6B] transition-colors">
              <FiList size={20} />
              <span className="text-[10px] text-gray-500 mt-0.5">Lists</span>
            </div>

            {/* Cart */}
            <CartDrawer />

            {/* Notifications */}
            <div className="flex flex-col items-center cursor-pointer hover:text-[#8C7A6B] transition-colors">
              <FiBell size={20} />
              <span className="text-[10px] text-gray-500 mt-0.5">Notifications</span>
            </div>

          </div>
        </div>

        {/* Category Bar */}
        <div className="flex items-center overflow-x-auto px-6 border-b border-gray-100 scrollbar-hide">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="text-xs text-gray-700 whitespace-nowrap px-3 py-2.5 border-b-2 border-transparent hover:border-[#8C7A6B] hover:text-[#8C7A6B] transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>

      </nav>

      {/* Nav Drawer */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      <div className="flex items-center justify-end p-4">
        <button onClick={toggleNavDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      </div>

    </>
  );
};

export default Navbar;