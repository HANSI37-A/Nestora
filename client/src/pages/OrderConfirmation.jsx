const checkout = {
  _id: "12323",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId:"1",
      name: "Jacket",
      color: "black",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
     {
      productId:"2",
      name: "Jacket",
      color: "black",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    adress: "123 Fashion Street",
    city: "New York",
    country: "USA"
  }
};

const OrderConfirmation = () => {

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); 
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-700">Thank you for your order!</h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div  lassName="flex justify-between mb-20">
            <div>
              <h2>Order ID: {checkout._id}</h2>
              <p className="text-gray-500">
                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>Estimated Delivery: {" "} {calculateEstimatedDelivery(checkout.createdAt)}</p>
            </div>
          </div>
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.color}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
          </div>              
              ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p>{checkout.shippingAddress.adress}</p>
              <p>{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
            </div>
          </div>
         </div> 
      )}
    </div>
  )
}

export default OrderConfirmation