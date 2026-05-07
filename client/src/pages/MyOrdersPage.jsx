import React from 'react';

const MyOrdersPage = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {

    setTimeout(() => {
      const mockOrders = [
        {
          _id: 12345,
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },

          orderItems: [
            {
              name: "Product 1",
              image: "https://via.placeholder.com/150",
            },
          ],

          totalPrice: 100,
          isPaid: true,
        },

         {
          _id: 6789,
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },

          orderItems: [
            {
              name: "Product 2",
              image: "https://via.placeholder.com/150",
            },
          ],

          totalPrice: 100,
          isPaid: true,
        },
      ];

      setOrders(mockOrders);

    }, 1000);

  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Total Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:border-gray-50 cutsor-pointer">
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg" />
                  </td>
                </tr>
            )) 
          ) : (
              <tr>
                <td colSpan={7} className="py-4 px- text-center text-gray-500">
                  No orders found.
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