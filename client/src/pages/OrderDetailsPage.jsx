import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";  

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard Shipping",
      shippingAddress: { city: "New York", country: "USA", adress: "123 Main St" },
      orderItems: [
        {
          productId: "1",
          name: "Product 1",
          color: "black",
          price: 150,
          quantity: 1,
          image: "https://picsum.photos/150?random=1"
        },
        {
          productId: "1",
          name: "Product 1",
          color: "black",
          price: 150,
          quantity: 1,
          image: "https://picsum.photos/150?random=1"
        },
      ]
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3>Order ID: #{orderDetails._id}</h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span className={`${!orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {!orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span className={`${!orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {!orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetailsPage