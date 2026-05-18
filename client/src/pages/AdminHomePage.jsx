import React from 'react'

const AdminHomePage = () => {
  const orders = [
  {
    _id: 123123,
    user: {
      name: "John Doe",
    },
    totalPrice: 110,
    status: "Processing",
  },
  {
    _id: 123123,
    user: {
      name: "John Doe",
    },
    totalPrice: 110,
    status: "Processing",
  },

];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$10000</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">200</p>
          <a href="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </a>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Product</h2>
          <p className="text-2xl">100</p>
          <a href="/admin/products" className="text-blue-500 hover:underline">
            Manage Products
          </a>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">${order.totalPrice}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage