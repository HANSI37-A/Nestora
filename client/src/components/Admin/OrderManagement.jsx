import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus, deleteOrder } from '../../redux/slice/adminOrderSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }))
      .unwrap()
      .then(() => alert('Order status updated successfully.'))
      .catch((err) => alert(err || 'Failed to update order status.'));
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order record? This action is permanent.')) {
      dispatch(deleteOrder({ id: orderId }))
        .unwrap()
        .then(() => alert('Order removed successfully.'))
        .catch((err) => alert(err || 'Failed to delete order.'));
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs uppercase tracking-widest text-gray-500 py-20">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs text-red-500 py-20 bg-red-50 border border-red-200 rounded">
        Error loading orders: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans select-none">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Management</h2>
      <div className="overflow-x-auto shadow-sm border border-gray-100 sm:rounded-lg">
        <table className="min-w-full text-left text-xs uppercase text-gray-700 bg-white">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Order ID</th>
              <th className="py-3.5 px-6">Customer</th>
              <th className="py-3.5 px-6">Total Price</th>  
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-gray-900 truncate max-w-[150px]">
                    #{order._id}
                  </td>
                  <td className="p-6 text-gray-600 normal-case">
                    <div>{order.user?.name || "Guest Account"}</div>
                    <div className="text-[10px] text-gray-400 font-light mt-0.5">{order.user?.email}</div>
                  </td>
                  <td className="p-6 text-gray-900 font-semibold">
                    ${order.totalPrice?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-6 text-gray-600">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)} 
                      className="bg-gray-50 rounded-lg border border-gray-300 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block p-2"
                    >
                      <option value="Processing">Processing</option>
                      <option value="In Assembly">In Assembly</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-6 text-center">
                    <button 
                      onClick={() => handleStatusChange(order._id, 'Delivered')} 
                      disabled={order.status === 'Delivered'}
                      className="bg-green-600 text-white px-3 py-1.5 hover:bg-green-700 transition-colors rounded mr-2 uppercase font-semibold tracking-wider disabled:opacity-50"
                    >
                      Deliver
                    </button>
                    <button 
                      onClick={() => handleDelete(order._id)} 
                      className="bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 transition-colors rounded uppercase font-semibold tracking-wider"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400 normal-case">
                  No orders registered in Nestora database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;