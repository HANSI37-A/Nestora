import { RiDeleteBin6Line } from "react-icons/ri";

const CartContents = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="space-y-4">
      {cartItems.map((product, idx) => {
        const itemId = product.productId || product._id || product.id || idx;
        const itemImage = product.image || product.Image || "https://placehold.co/80x96?text=No+Image";
        return (
          <div 
            key={`${itemId}-${product.size}-${product.color}-${idx}`}
            className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-start gap-4">
              <img
                src={itemImage}
                alt={product.name}
                className="w-20 h-24 object-cover rounded"
                onError={(e) => {
                  e.target.src = "https://placehold.co/80x96?text=No+Image";
                }}
              />
              <div>
                <h3 className="text-sm font-medium text-neutral-800 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Size: {product.size} · Color: {product.color}
                </p>

                <div className="flex items-center mt-3 border border-neutral-200 rounded w-fit">
                  <button
                    onClick={() =>
                      onUpdateQuantity(itemId, product.quantity - 1, product.size, product.color)
                    }
                    className="px-2.5 py-1 text-sm text-neutral-500 hover:text-[#8C7A6B] hover:bg-neutral-50 transition-colors focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 text-xs font-medium text-neutral-700">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(itemId, product.quantity + 1, product.size, product.color)
                    }
                    className="px-2.5 py-1 text-sm text-neutral-500 hover:text-[#8C7A6B] hover:bg-neutral-50 transition-colors focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between min-h-[96px]">
              <p className="text-sm font-semibold text-neutral-800">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => onRemoveItem(itemId, product.size, product.color)}
                aria-label="Remove item"
                className="text-neutral-300 hover:text-red-500 p-1.5 transition-colors duration-300 focus:outline-none"
              >
                <RiDeleteBin6Line className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;