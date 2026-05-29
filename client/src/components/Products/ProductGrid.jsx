import { Link } from "react-router-dom";

const ProductGrid = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-sm font-light text-gray-400 italic py-6">
        No similar artisanal pieces found in this collection category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={product?._id || index} to={`/product/${product?._id}`} className="block group">
          <div className="bg-white p-4 rounded-lg transition-all duration-300">
            
            <div className="w-full h-96 mb-4 overflow-hidden rounded-md bg-gray-50">
              <img
                src={product?.images?.[0]?.url || "https://placehold.co/300x400?text=No+Image"}
                alt={product?.images?.[0]?.altText || product?.name || "Nestora Design Catalog"}
                className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-102"
              />
            </div>

            <h3 className="text-sm font-medium text-gray-700 tracking-wide mb-1 group-hover:text-black transition-colors">
              {product?.name}
            </h3>

            <p className="text-gray-500 text-sm font-light">
              {typeof product?.price === "number" ? `$${product.price.toFixed(2)}` : product?.price}
            </p>

          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;