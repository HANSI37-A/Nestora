import { RiDeleteBin6Line } from "react-icons/ri";

const CartContents = () => {

  const cartProducts = [
    {
      id: 1,
      name: "Product 1",
      size: "M",
      color: "Red",
      price: 29.99, 
      Image: "https://via.placeholder.com/80"

    },
    {
      id: 2,  
      name: "Product 2",
      size: "L",
      color: "Blue",  
      price: 49.99,
      Image: "https://via.placeholder.com/80"
    },
  ];

  return (
    <div>
      {cartProducts.map((product, index) => (
        <div key={index}
          className="flex items-start justify-between py-4 border-b">
            <div className="flex items-start">
              <img src={product.Image}
                   alt={product.name}
                   className="w-20 h-24 obhect-cover mr-4 rounded" />
                   <div>
                    <h3>{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      size: {product.size} | color: {product.color}
                    </p>
                    <div className="flex items-center mt-2">
                      <button className="border rounded px-2 py-1 text-xl font-medium"
                      >
                        -
                      </button>
                      <span className="mx-4">{product.quantity}</span>
                      <button className="border rounded px-2 py-1 text-xl font-medium"
                      >
                        +
                      </button>
                    </div>
                   </div>
                </div>
                <div>
                  <p className="font-medium"> ${product.price.toLocaleString()}</p>
                  <button>
                    <RiDeleteBin6Line className="h-6 w-6 mt-2 text-red-600"/>
                  </button>
                </div>
              </div>
      ))}
</div>
  );
};

export default CartContents;
