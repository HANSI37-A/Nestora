import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout");
  };

    const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Eames-Inspired Velvet Accent Chair",
      size: "Walnut / Emerald Velvet", // Replaced apparel sizes with high-end material/finish combinations
      color: "Emerald",
      price: 899.00, // Adjusted pricing structures to align with high-end furniture items
      quantity: 1,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=120",
    },
    {
      id: 2,
      name: "Minimalist Oak Dining Chair",
      size: "Solid White Oak", // Replaced apparel sizes with high-end material/finish combinations
      color: "Natural Oak",
      price: 149.00, // Adjusted pricing structures to align with high-end furniture items
      quantity: 2,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=120",
    },
  ]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="relative flex flex-col items-center text-neutral-700 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none"
        aria-label="Open cart"
      >
        <div className="relative">
          <FiShoppingBag size={20} />
          
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#8C7A6B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
              {totalItemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-500 mt-0.5">Cart</span>
      </button>

      
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-70 transform transition-transform duration-500 ease-in-out flex flex-col ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-medium text-neutral-800 tracking-wide">
            Your Cart
          </h2>
          
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none"
            aria-label="Close cart"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <FiShoppingBag size={40} className="text-gray-200" />
              <p className="text-sm text-gray-400 font-light">
                Your cart is currently empty.
              </p>
            </div>
          ) : (
            <CartContents cartItems={cartItems} />
          )}
        </div>

        
        <div className="p-6 bg-[#FAFAFA] border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-neutral-500 tracking-wide">Subtotal</span>
            <span className="text-base font-semibold text-neutral-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-[#2C2C2C] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#8C7A6B] transition-colors duration-300 shadow-sm"
          >
            Checkout
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center font-light tracking-wide">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;