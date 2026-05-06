import { RiDeleteBin6Line } from "react-icons/ri";

const CartContents = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map((product) => (
        <div key={product.id}
          className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            <img
               src={product.Image}
               alt={product.name}
               className="w-20 h-24 object-cover mr-4 rounded"
               onError={(e) => { e.target.src = "https://placehold.co/80x96?text=No+Image"; }} 
/>
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">${product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin6Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;