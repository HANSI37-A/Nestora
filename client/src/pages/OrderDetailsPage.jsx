import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slice/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [id, dispatch]);

  if (loading) return <div className="text-center py-20 text-gray-500">Retrieving order specifications...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error rendering profile: {error}</div>;
  if (!orderDetails) return <div className="text-center py-20 text-gray-400">No matching Order Found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Commission Details</h2>
      
      <div className="p-4 sm:p-6 rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="font-semibold text-lg">Order Reference: #{orderDetails._id}</h3>
            <p className="text-gray-600">
              Placement Date: {new Date(orderDetails.createdAt).toLocaleDateString()} at {new Date(orderDetails.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
            <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}> 
              {orderDetails.isPaid ? "Payment Settled" : "Awaiting Settlement"}
            </span>
            <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}> 
              {orderDetails.isDelivered ? "Delivered" : "Processing / In Transit"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 border-y py-6 my-6">
          <div>
            <h4 className="text-md font-bold mb-2 uppercase text-gray-400 tracking-wider">Payment Archive</h4>
            <p className="text-gray-700">Method: {orderDetails.paymentMethod || "PayPal"}</p>
            <p className="text-gray-700">Status: {orderDetails.isPaid ? "Verified Complete" : "Pending Verification"}</p> 
          </div>
          <div>
            <h4 className="text-md font-bold mb-2 uppercase text-gray-400 tracking-wider">Logistics Info</h4>
            <p className="text-gray-700">Customer: {orderDetails.user?.name} ({orderDetails.user?.email})</p>
            <p className="text-gray-700">
              Destination: {orderDetails.shippingAddress 
                ? `${orderDetails.shippingAddress.address || orderDetails.shippingAddress.line1 || ""}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`
                : "Digital Checkout Fulfillment"}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <h4 className="text-lg font-semibold mb-4">Selected Furnishings</h4>
          <table className="min-w-full text-gray-600 mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Design Piece</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Unit Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Investment</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems?.map((item) => (
                <tr key={item.productId || item._id} className="border-b">
                  <td className="px-4 py-4 flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                    <div>
                      <Link to={`/product/${item.productId || item._id}`} className="text-black font-semibold hover:underline block"> 
                        {item.name}
                      </Link>
                      {item.color && <span className="text-xs text-gray-400 block">Finish: {item.color}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4">${item.price?.toLocaleString()}</td>
                  <td className="px-4 py-4">{item.quantity}</td>
                  <td className="px-4 py-4 font-medium text-gray-900">${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <button
            onClick={() => navigate("/profile")}
            className="text-black font-medium hover:underline flex items-center gap-1"
          >
            ← Return to Profile Dashboard
          </button>
          <div className="text-right">
            <span className="text-gray-500 text-sm">Grand Total:</span>
            <h3 className="text-2xl font-bold text-gray-900">${orderDetails.totalPrice?.toLocaleString()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;