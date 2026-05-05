import { useEffect, useState } from "react";

const selectedProduct = {
  name: "Stylish Jacket",
  price: "$79.99",
  description: "Elevate your style with our trendy jacket, perfect for any occasion. Crafted from high-quality materials, it offers both comfort and durability. Featuring a sleek design and versatile color options, this jacket is a must-have addition to your wardrobe.",
  brand: "FashionCo",
  category: "Outerwear",
  stock: 25,
  images: [
    {
      url: "https://picsum.photos/500/600?random=1",
      altText: "Stylish Jacket Front View",
    },
  ],
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

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
                className="w-20 h-24 object-cover rounded cursor-pointer border border-gray-200"
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* Center — Main Image */}
          <div className="flex-1">
            <img
              src={selectedProduct.images[0].url}
              alt={selectedProduct.images[0].altText || `Product Image 1`}
              className="w-full h-125 object-cover rounded-lg"
            />
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

            <button className="mt-4 w-full bg-black text-white py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-300">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;