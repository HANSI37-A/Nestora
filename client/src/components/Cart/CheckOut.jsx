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

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };
  return (
    <>
   
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            value={shippingAddress.email} 
            onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })} 
            className="w-full p-2 border rounded" 
            required
          />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input type="text" value={shippingAddress.firstName} onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,firstName: e.target.value,
                })
              } 
              className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input type="text" value={shippingAddress.lastName} onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,lastName: e.target.value,
                })
              } 
              className="w-full p-2 border rounded" required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input type="text" value={shippingAddress.address} onChange={(e) => setShippingAddress({
              ...shippingAddress,address:e.target.value,
            })} 
            className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
             <div>
              <label className="block text-gray-700">City</label>
              <input type="text" value={shippingAddress.city} onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,city: e.target.value,
                })
              } 
              className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input type="text" value={shippingAddress.postalCode} onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,postalCode: e.target.value,
                })
              } 
              className="w-full p-2 border rounded" required />
            </div>
           <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({
              ...shippingAddress,country:e.target.value,
            })} 
            className="w-full p-2 border rounded" required />
          </div>
            <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({
              ...shippingAddress,phone:e.target.value,
            })} 
            className="w-full p-2 border rounded" required />
          </div>
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded">
                Continue to Payment</button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PayPalButton amount={100} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment faild. Try again")} />
              </div>  
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div>
          {cart.products.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-2 border-b">
              <div className="flex items-start">
                <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4" />
              <div>
                <h3 className="text-md">{product.name}</h3>
                <p className="text-gray-500">Color: {product.color}</p>
              </div>
                </div>
                 <p className="text-xl">${product.price?.toLocaleString()}</p>
             </div>              
          ))}          
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;