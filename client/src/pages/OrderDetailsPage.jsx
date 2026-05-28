import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "White-Glove Delivery & Assembly", 
      shippingAddress: { city: "New York", country: "USA", address: "742 Evergreen Terrace" }, 
      orderItems: [
        {
          productId: "1",
          name: "Travertine Stone Coffee Table", 
          color: "Honed Ivory",                 
          price: 1250,                          
          quantity: 1,
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=150"
        },
        {
          productId: "2",
          name: "Minimalist Walnut Sideboard",  
          color: "Natural Matte Walnut",        
          price: 1850,                          
          quantity: 1,
          image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=150"
        },
      ]
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Commission Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3>Order Reference: #{orderDetails._id}</h3>
              <p className="text-gray-600">
                Placement Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}> 
                {orderDetails.isPaid ? "Payment Settled" : "Awaiting Settlement"}
              </span>
              <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}> 
                {orderDetails.isDelivered ? "Delivered" : "Not Delivered"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Archive</h4>
              <p>Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Completed" : "Pending Verification"}</p> 
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Logistics Info</h4>
              <p>Delivery Tier: {orderDetails.shippingMethod}</p>
              <p>Destination:{" "}
                {`${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Selected Furnishings</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Design Piece</th>
                  <th className="px-4 py-2 text-left">Unit Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total Investment</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="px-4 py-2 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                      <div>
                        <Link to={`/product/${item.productId}`} className="text-blue-500 hover:underline block font-medium"> 
                          {item.name}
                        </Link>
                        <span className="text-xs text-gray-400">Finish: {item.color}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">${item.price.toLocaleString()}.00</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">${(item.price * item.quantity).toLocaleString()}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => navigate("/my-orders")}
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            ← Return to Order History
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;