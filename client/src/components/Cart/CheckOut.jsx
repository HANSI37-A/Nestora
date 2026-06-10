import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { createCheckout } from '../../redux/slice/checkoutSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading: checkoutLoading } = useSelector((state) => state.checkout);

  const [checkoutId, setCheckoutId] = useState(null);
  const [stripeRedirecting, setStripeRedirecting] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const cartItems = cart?.products || [];
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = 0; 
  const grandTotal = subtotal + shippingFee;

  useEffect(() => {
    if (!checkoutLoading && cartItems.length === 0) {
      alert("Your cart is empty. Redirecting to collections.");
      navigate("/");
    }
  }, [cartItems, navigate, checkoutLoading]);

  useEffect(() => {
    if (user) {
      setShippingAddress((prev) => ({
        ...prev,
        firstName: user.name ? user.name.split(' ')[0] : prev.firstName,
        lastName: user.name ? user.name.split(' ').slice(1).join(' ') : prev.lastName,
        email: user.email || prev.email,
        address: user.shippingAddress?.addressLine || prev.address,
        city: user.shippingAddress?.city || prev.city,
        postalCode: user.shippingAddress?.postalCode || prev.postalCode,
        country: user.shippingAddress?.country || prev.country,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    
    const checkoutData = {
      checkoutItems: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        color: item.color || "Default",
        size: item.size || "Standard"
      })),
      shippingAddress,
      paymentMethod: "Stripe",
      totalPrice: grandTotal,
    };

    dispatch(createCheckout(checkoutData))
      .unwrap()
      .then((res) => {
        if (res && res._id) {
          setCheckoutId(res._id); 
        }
      })
      .catch((err) => {
        alert(err?.message || "Failed to initiate checkout session.");
      });
  };

  // Triggers backend stripe checkout configuration endpoint redirection loops
  const handleStripePaymentRedirect = async () => {
    setStripeRedirecting(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/create-stripe-session`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data?.url) {
        window.location.href = response.data.url; 
      } else {
        throw new Error("Invalid session link parsed by payment gateway.");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Stripe routing gateway configuration error.");
      setStripeRedirecting(false);
    }
  };

  const inputFieldsStyle = "w-full bg-transparent border-b border-[#1A1A1A]/20 p-2 text-sm font-light tracking-wide focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder-[#A8A29E]/50";

  return (
    <div className="w-full bg-[#F9F7F2] min-h-screen text-[#1A1A1A] font-sans antialiased select-none">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8 lg:px-12">
        
        <div className="border-b border-[#A8A29E]/20 pb-6 mb-12">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase block mb-1">Secure Transaction</span>
          <h1 className="text-4xl font-serif tracking-wide text-[#1A1A1A]">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          <div className="lg:col-span-7">
            <form onSubmit={handleCreateCheckout} className="space-y-10">
              
              {/* Contact Information */}
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-5 pb-2 border-b border-[#A8A29E]/10">
                  Contact Details
                </h3>
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@domain.com"
                    value={shippingAddress.email} 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })} 
                    className={inputFieldsStyle}
                    required
                  />
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-5 pb-2 border-b border-[#A8A29E]/10">
                  Delivery Destination
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">First Name</label>
                    <input 
                      type="text" 
                      value={shippingAddress.firstName} 
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} 
                      className={inputFieldsStyle}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Last Name</label>
                    <input 
                      type="text" 
                      value={shippingAddress.lastName} 
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} 
                      className={inputFieldsStyle}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Street Address</label>
                  <input 
                    type="text" 
                    placeholder="Suite, Street, Apartment reference"
                    value={shippingAddress.address} 
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} 
                    className={inputFieldsStyle}
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">City</label>
                    <input 
                      type="text" 
                      value={shippingAddress.city} 
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} 
                      className={inputFieldsStyle}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Postal Code</label>
                    <input 
                      type="text" 
                      value={shippingAddress.postalCode} 
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} 
                      className={inputFieldsStyle}
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Country</label>
                    <input 
                      type="text" 
                      value={shippingAddress.country} 
                      onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} 
                      className={inputFieldsStyle}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={shippingAddress.phone} 
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} 
                      className={inputFieldsStyle}
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                {!checkoutId ? (
                  <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#6B543D] transition-colors duration-300 shadow-sm">
                    Continue to Payment
                  </button>
                ) : (
                  <div className="border-t border-[#A8A29E]/20 pt-6">
                    <h3 className="text-xs font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-4">
                      Gateway Authorization
                    </h3>
                    <button
                      type="button"
                      onClick={handleStripePaymentRedirect}
                      disabled={stripeRedirecting}
                      className="w-full bg-[#6B543D] text-white py-4 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#1A1A1A] transition-colors duration-300 shadow-sm flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {stripeRedirecting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Connecting Stripe Portal...
                        </>
                      ) : (
                        `Pay With Credit Card — $${grandTotal.toFixed(2)}`
                      )}
                    </button>
                  </div>  
                )}
              </div>
            </form>
          </div>

          {/* Right Side Order Summary Summary */}
          <div className="lg:col-span-5 bg-transparent border border-[#A8A29E]/20 p-6 sm:p-8 sticky top-28">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-6 pb-2 border-b border-[#A8A29E]/10">
              Order Summary
            </h3>
            
            <div className="max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {cartItems.map((product, index) => (
                <div key={index} className="flex items-start justify-between py-2 border-b border-[#A8A29E]/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-16 aspect-[4/5] bg-[#1A1A1A]/5 overflow-hidden mr-4 shrink-0">
                      <img src={product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-serif text-[#1A1A1A] truncate pr-2">{product.name}</h4>
                      <p className="text-[10px] tracking-wide text-[#A8A29E] mt-0.5">
                        Finish: <span className="text-[#1A1A1A] font-medium">{product.color || "Default"}</span>
                      </p>
                      <p className="text-[10px] tracking-wide text-[#A8A29E]">
                        Qty: <span className="text-[#1A1A1A] font-medium">{product.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#1A1A1A] tracking-wider shrink-0">
                    ${(product.price * product.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>              
              ))}          
            </div>

            <div className="mt-6 border-t border-[#A8A29E]/20 pt-6 space-y-3">
              <div className="flex justify-between items-center text-xs tracking-wide text-[#A8A29E]">
                <p>Subtotal</p>
                <p className="font-medium text-[#1A1A1A]">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="flex justify-between items-center text-xs tracking-wide text-[#A8A29E]">
                <p>Shipping</p>
                <p className="font-medium text-[#1A1A1A]">{shippingFee === 0 ? "Complimentary" : `$${shippingFee.toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold mt-4 border-t border-[#A8A29E]/20 pt-4 text-[#1A1A1A]">
                <p className="uppercase tracking-[0.15em] text-xs text-[#A8A29E]">Total Due</p>
                <p className="text-lg font-serif font-medium">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;