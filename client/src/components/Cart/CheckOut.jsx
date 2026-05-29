import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { createCheckout } from '../../redux/slice/checkoutSlice';
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading: checkoutLoading } = useSelector((state) => state.checkout);

  const [checkoutId, setCheckoutId] = useState(null);
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
    if (user?.email) {
      setShippingAddress((prev) => ({ ...prev, email: user.email }));
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
      paymentMethod: "PayPal",
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
        alert(err?.message || "Failed to initiate checkout session. Please check details.");
      });
  };

  const handlePaymentSuccess = (finalOrder) => {
    console.log("Order finalized in database:", finalOrder);
    navigate("/order-confirmation", { state: { order: finalOrder } });
  };
  return (
    <>
   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl uppercase mb-6 font-semibold">Checkout</h2>
          <form onSubmit={handleCreateCheckout}>
            
            <h3 className="text-lg mb-4 font-medium">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input 
                type="email" 
                value={shippingAddress.email} 
                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })} 
                className="w-full p-2 border rounded focus:outline-none focus:border-neutral-500" 
                required
              />
            </div>

            <h3 className="text-lg mb-4 font-medium">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">First Name</label>
                <input 
                  type="text" 
                  value={shippingAddress.firstName} 
                  onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={shippingAddress.lastName} 
                  onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Address</label>
              <input 
                type="text" 
                value={shippingAddress.address} 
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">City</label>
                <input 
                  type="text" 
                  value={shippingAddress.city} 
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Postal Code</label>
                <input 
                  type="text" 
                  value={shippingAddress.postalCode} 
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Country</label>
                <input 
                  type="text" 
                  value={shippingAddress.country} 
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={shippingAddress.phone} 
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
            </div>
            <div className="mt-6">
              {!checkoutId ? (
                <button type="submit" className="w-full bg-black text-white py-3 rounded font-medium uppercase tracking-wider hover:bg-zinc-800 transition-colors">
                  Continue to Payment
                </button>
              ) : (
                <div className="border-t pt-4">
                  <h3 className="text-lg mb-4 font-medium text-neutral-800">Pay with Debit / Credit Card or PayPal</h3>
                  <PayPalButton 
                    amount={grandTotal} 
                    checkoutId={checkoutId}
                    onSuccess={handlePaymentSuccess} 
                    onError={(err) => alert(err || "Payment processing failed. Try again")} 
                  />
                </div>  
              )}
            </div>
          </form>
        </div>

        {/* Right Hand Side Order Summaries */}
        <div className="bg-gray-50 p-6 rounded-lg self-start">
          <h3 className="text-lg mb-4 font-medium">Order Summary</h3>
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            {cartItems.map((product, index) => (
              <div key={index} className="flex items-start justify-between py-3 border-b">
                <div className="flex items-start">
                  <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded border bg-white" />
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Color: {product.color || "Default"}</p>
                    <p className="text-xs text-gray-400">Qty: {product.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-neutral-900">${(product.price * product.quantity).toLocaleString()}</p>
              </div>              
            ))}          
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>Subtotal</p>
              <p>${subtotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>Shipping</p>
              <p>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</p>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold mt-4 border-t pt-4 text-neutral-900">
              <p>Total</p>
              <p>${grandTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Checkout;