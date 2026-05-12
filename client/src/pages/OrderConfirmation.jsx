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
      image: "https://picsum.photos/150?random=1",
    },
  ],
  shippingAddress: {
    adress: "123 Fashion Street",
    city: "New York",
    country: "USA"
  }
};

const OrderConfirmation = () => {
  return (
    <div>OrderConfirmation</div>
  )
}

export default OrderConfirmation