import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slice/orderSlice"; 

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderState = useSelector((state) => state.orders) || {};
  const loading = orderState.loading;
  const error = orderState.error;

  const rawOrders = orderState.orders || orderState.list || orderState;
  const orders = Array.isArray(rawOrders) ? rawOrders : [];

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
            
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer animate-fadeIn"
                >
                  <td className="py-4 px-4">
                    <img
                      src={order.orderItems?.[0]?.image || "https://via.placeholder.com/150"}
                      alt={order.orderItems?.[0]?.name || "Product"}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>

                  <td className="py-4 px-4">
                    <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>

                  <td className="py-4 px-4">
                    {order.orderItems ? order.orderItems.reduce((acc, item) => acc + item.quantity, 0) : 0}
                  </td>

                  <td className="py-4 px-4 font-medium">
                    ${order.totalPrice}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">
                  No orders found. Start shopping to create your order history!
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
   
  );
};

export default MyOrdersPage;