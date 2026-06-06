import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../redux/slice/adminOrderSlice';
import { fetchAdminProducts } from '../redux/slice/adminProductSlice';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders);
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const loading = ordersLoading || productsLoading;
  const error = ordersError || productsError;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs uppercase tracking-widest text-gray-500 py-20">
        Loading admin workspace analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs text-red-500 py-20 bg-red-50 border border-red-200 rounded">
        Error loading workspace details: {error}
      </div>
    );
  }

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-6 select-none font-sans text-gray-800 antialiased">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
      
      {/* Analytics Card Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
          <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-gray-950">${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-950 mb-3">{totalOrders}</p>
          </div>
          <Link to="/admin/orders" className="text-xs font-semibold text-[#6B543D] hover:text-gray-900 transition-colors uppercase tracking-wider">
            Manage Orders &rarr;
          </Link>
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Total Products</h2>
            <p className="text-3xl font-bold text-gray-950 mb-3">{products.length}</p>
          </div>
          <Link to="/admin/products" className="text-xs font-semibold text-[#6B543D] hover:text-gray-900 transition-colors uppercase tracking-wider">
            Manage Catalog &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Orders List Table */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-sm">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[160px]">
                      <Link to={`/order/${order._id}`} className="hover:underline">
                        #{order._id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.user?.name || "Guest Account"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${order.totalPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-400">No recent orders registered in Nestora.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;