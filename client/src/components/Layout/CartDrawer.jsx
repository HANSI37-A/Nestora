import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";

const CartDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Cart Icon Button */}
      <div
        className="relative flex flex-col items-center cursor-pointer hover:text-red-600"
        onClick={() => setDrawerOpen(true)}
      >
        <FiShoppingBag size={20} />
        <span className="text-[10px] text-gray-500 mt-0.5">Cart</span>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-400">Your cart is empty.</p>
        </div>

              {/* Cart contents with scrollable area */} 

              <div>
                <h2 className="grow p-4 overflow-y-auto">Cart Contents</h2>
              </div>
      <div className="p-4 bg-white sticky bottom-0">
        <button className="w-full bg-black text-white text-lg font-semibold">Checkout</button>
        <p className="text-sm text-gray-400">Shipping, taxes, and discount codes calculated at checkout.  </p>
      </div>

      </div>

    </> 
  );
};

export default CartDrawer;  