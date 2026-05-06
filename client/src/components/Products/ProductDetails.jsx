import { useState } from "react";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: "$79.99",
  description: "Elevate your style with our trendy jacket, perfect for any occasion. Crafted from high-quality materials, it offers both comfort and durability. Featuring a sleek design and versatile color options, this jacket is a must-have addition to your wardrobe.",
  brand: "FashionCo",
  category: "Outerwear",
  stock: 25,
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Red", "Black", "White"],
  images: [
    { url: "https://picsum.photos/500/600?random=1", altText: "Stylish Jacket Front View" },
    { url: "https://picsum.photos/500/600?random=2", altText: "Stylish Jacket Side View" },
    { url: "https://picsum.photos/500/600?random=3", altText: "Stylish Jacket Back View" },
  ],
};

const similarProducts = [
  {
    _id: "1",
    name: "Casual Hoodie",
    price: "$49.99",
    images: [{ url: "https://picsum.photos/300/400?random=4", altText: "Casual Hoodie" }],
  },
  {
    _id: "2",
    name: "Slim Fit Jeans",
    price: "$69.99",
    images: [{ url: "https://picsum.photos/300/400?random=5", altText: "Slim Fit Jeans" }],
  }
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(selectedProduct?.images?.[0]?.url || null); 
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    }
    alert(`Added ${quantity} x ${selectedProduct.name} (${selectedSize}, ${selectedColor}) to cart!`);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left — Image Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText || `Product Image ${index + 1}`}
                className={`w-20 h-24 object-cover rounded cursor-pointer border-2 transition-all ${
                  mainImage === img.url ? "border-black" : "border-gray-200" 
                }`}
                onClick={() => setMainImage(img.url)}
                onError={(e) => { e.target.src = "https://placehold.co/80x96?text=N/A"; }}
              />
            ))}
          </div>

          {/* Center — Main Image */}
          <div className="flex-1">
            {mainImage && ( 
              <img
                src={mainImage}
                alt={selectedProduct?.images?.[0]?.altText || "Product Image"}
                className="w-full h-125 object-cover rounded-lg"
                onError={(e) => { e.target.src = "https://placehold.co/500x600?text=Image+Not+Found"; }} 
              />
            )}
          </div>

          {/* Right — Product Info */}
          <div className="flex-1 flex flex-col justify-start space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">{selectedProduct.name}</h1>
            <p className="text-xl text-gray-600">{selectedProduct.price}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{selectedProduct.description}</p>

            <div className="text-sm text-gray-500 space-y-1">
              <p><span className="font-medium text-gray-700">Brand:</span> {selectedProduct.brand}</p>
              <p><span className="font-medium text-gray-700">Category:</span> {selectedProduct.category}</p>
              <p><span className="font-medium text-gray-700">Stock:</span> {selectedProduct.stock} available</p>
            </div>

            {/* Size Selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
              <div className="flex gap-2 flex-wrap">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-sm border rounded transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Color:</p>
              <div className="flex gap-2 flex-wrap">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 text-sm border rounded transition-all ${
                      selectedColor === color
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))} 
                  className="border px-3 py-1 rounded text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))} 
                  className="border px-3 py-1 rounded text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-black text-white py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
       <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
          <ProductGrid products={similarProducts} />
        </div>
    </div>
  );
};

export default ProductDetails;