import { useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItemsQuantity, removeFromCart } from "../../redux/slice/cartSlice";

const CartDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCart({ userId: user?._id, guestId }));
  }, [dispatch, user, guestId]);

  const handleCheckout = () => {
    setDrawerOpen(false);
    navigate("/checkout");
  };

  const handleUpdateQuantity = (productId, quantity, size, color) => {
    if (quantity < 1) return;
    dispatch(updateCartItemsQuantity({ productId, quantity, guestId, userId: user?._id, size, color }))
      .then(() => {
        dispatch(fetchCart({ userId: user?._id, guestId }));
      });
  };

  const handleRemoveItem = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId: user?._id, size, color }))
      .then(() => {
        dispatch(fetchCart({ userId: user?._id, guestId }));
      });
  };

  const cartItems = cart?.products || [];
  
  // Calculate pricing totals and quantities dynamically
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Cart Icon Button with Premium Badge */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="relative flex flex-col items-center text-neutral-700 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none"
        aria-label="Open cart drawer"
      >
        <div className="relative">
          <FiShoppingBag size={20} className="text-neutral-700 hover:text-[#8C7A6B] transition-colors" />
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#8C7A6B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center tracking-tight shadow-sm scale-95 transition-transform">
              {totalItemCount}
            </span>
          )}
        </div>
      </button>

      {/* Backdrop Overlay with exact z-indexing just under drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[999] transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Premium Sliding Cart Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-[1000] transform transition-transform duration-500 ease-in-out flex flex-col ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header - Non-shrinking, pinned to top */}
        <div className="flex-shrink-0 p-6 border-b border-neutral-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-medium text-neutral-800 tracking-wide">
            Your Cart
          </h2>
          
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-neutral-400 hover:text-[#8C7A6B] transition-colors duration-300 focus:outline-none"
            aria-label="Close cart"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Scrollable Body - Takes remaining space and overflows */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <FiShoppingBag size={40} className="text-neutral-200" />
              <p className="text-sm text-neutral-400 font-light">
                Your cart is currently empty.
              </p>
            </div>
          ) : (
            <CartContents 
              cartItems={cartItems} 
              onUpdateQuantity={handleUpdateQuantity} 
              onRemoveItem={handleRemoveItem}
            />
          )}
        </div>

        {/* Footer - Non-shrinking, pinned to bottom */}
        <div className="flex-shrink-0 p-6 bg-neutral-50 border-t border-neutral-100 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-neutral-500 tracking-wide">Subtotal</span>
            <span className="text-base font-semibold text-neutral-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-[#2C2C2C] disabled:bg-neutral-200 disabled:cursor-not-allowed text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#8C7A6B] transition-colors duration-300 shadow-sm"
          >
            Checkout
          </button>

          <p className="text-xs text-neutral-400 mt-4 text-center font-light tracking-wide">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;