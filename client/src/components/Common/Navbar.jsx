import React, { useState } from 'react';
import { FiSearch, FiUser, FiList, FiBell, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineCardGiftcard } from 'react-icons/md';

const categories = [
  'Furniture', 'Rugs', 'Outdoor', 'Bedding', 'Bath',
  'Kitchen & Entertaining',
  'Lighting', 'Holiday & More', 'Sales & Deals' ];

export const Navbar = () => {
  const [cartCount] = useState(0);

  return (
    <nav className="sticky top-0 z-50 w-full shadow-sm bg-white">

      {/* Top Bar */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-200">

        {/* Logo */}
        <div className="min-w-22.5 leading-tight">
          <p className="text-xs font-bold text-gray-800 tracking-tight">NestOra</p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center border border-gray-300 rounded overflow-hidden h-10">
          <input
            type="text"
            placeholder="Find all things home & beyond"
            className="flex-1 px-4 text-sm text-gray-500 outline-none"
          />
          <button className="bg-gray-900 text-white w-12 h-10 flex items-center justify-center hover:bg-gray-700">
            <FiSearch size={16} />
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
 
          {/* Account */}
          <div className="flex flex-col items-center cursor-pointer hover:text-red-600">
            <FiUser size={20} />
            <span className="text-[10px] text-gray-500 mt-0.5">Account</span>
          </div>

          {/* Lists */}
          <div className="flex flex-col items-center cursor-pointer hover:text-red-600">
            <FiList size={20} />
            <span className="text-[10px] text-gray-500 mt-0.5">Lists</span>
          </div>

          {/* Notifications */}
          <div className="flex flex-col items-center cursor-pointer hover:text-red-600">
            <FiBell size={20} />
            <span className="text-[10px] text-gray-500 mt-0.5">Notifications</span>
          </div>

          {/* Cart */}
          <div className="relative flex flex-col items-center cursor-pointer hover:text-red-600">
            <FiShoppingBag size={20} />
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
            <span className="text-[10px] text-gray-500 mt-0.5">Cart</span>
          </div>

        </div>
      </div>

      {/* Category Bar */}
      <div className="flex items-center overflow-x-auto px-6 border-b border-gray-100 scrollbar-hide">
        {categories.map((cat) => (
          <a
            key={cat}
            href="#"
            className="text-xs text-gray-700 whitespace-nowrap px-3 py-2.5 border-b-2 border-transparent hover:border-red-600 hover:text-red-600 transition-colors"
          >
            {cat}
          </a>
        ))}
      </div>

    </nav>
  );
};