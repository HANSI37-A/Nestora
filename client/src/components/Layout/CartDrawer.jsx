import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import CartContents  from "../Cart/CartContents";

const CartDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      {/* Cart Icon Button */}
      <div
        className="relative flex flex-col items-center cursor-pointer hover:text-[#8C7A6B] transition-colors"
        onClick={() => setDrawerOpen(true)}
      >
        <FiShoppingBag size={20} />
        <span className="text-[10px] text-gray-500 mt-0.5">Cart</span>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-light text-[#2C2C2C] tracking-wide">Your Cart</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-400 hover:text-[#8C7A6B] text-2xl transition-colors p-2"
          >
            ✕
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
             <p className="text-sm text-gray-500 font-light text-center mt-10">
               Your cart is currently empty.
              </p>
            ) : (
               <CartContents cartItems={cartItems} />
         )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#FAFAFA] border-t border-gray-100">
          <button className="w-full bg-[#2C2C2C] text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#8C7A6B] transition-colors duration-300 shadow-sm">
            Checkout
          </button>
          <p className="text-xs text-gray-400 mt-4 text-center font-light tracking-wide">Shipping, taxes, and discount codes calculated at checkout.</p>
        </div>

      </div>

    </> 
  );
};

export default CartDrawer;  