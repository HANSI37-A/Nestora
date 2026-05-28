import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slice/productsSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";



const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Pull live data from Redux stores
  const { selectedProduct, similarProducts, loading, error } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);
  
  // Controlled internal layout state properties
  const [mainImage, setMainImage] = useState(null); 
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const productFetchId = productId || id;

  // 1. Fetch data from backend on mount or route shift
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      // Swapped warning language to align with interior studio parameters
      alert("Please select your desired configuration and finish options before adding to your collection.");
      return;
    }

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        color: selectedColor,
        size: selectedSize,
        guestId,
        userId: user?._id,
      })
    );
    alert(`Added ${quantity} x ${selectedProduct.name} (${selectedSize}, ${selectedColor}) to your order selection!`);
  }; 


  if (loading) {
    return <div className="text-center p-10 font-light text-gray-500">Loading premium catalog details...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div className="text-center p-10 text-gray-400">Design piece not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left — Image Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            
            {selectedProduct.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText || `Showroom Angle ${index + 1}`}
                className={`w-20 h-24 object-cover rounded cursor-pointer border-2 transition-all ${
                  mainImage === img.url ? "border-black" : "border-gray-200" 
                }`}
                onClick={() => setMainImage(img.url)}
                onError={(e) => { e.target.src = "https://placehold.co/80x96?text=Studio+View"; }}
              />
            ))}
          </div>

          {/* Center — Main Image */}
          <div className="flex-1">
            {mainImage && ( 
              <img
                src={mainImage}
                alt={selectedProduct?.images?.[0]?.altText || "Featured Showroom Display"}
                className="w-full h-125 object-cover rounded-lg shadow-sm"
                onError={(e) => { e.target.src = "https://placehold.co/500x600?text=Showroom+Piece+Not+Found"; }} 
              />
            )}
          </div>

          {/* Right — Product Info */}
          <div className="flex-1 flex flex-col justify-start space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">{selectedProduct.name}</h1>
            <p className="text-xl text-gray-600">
              {typeof selectedProduct.price === "number" ? `$${selectedProduct.price.toFixed(2)}` : selectedProduct.price}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">{selectedProduct.description}</p>

            <div className="text-sm text-gray-500 space-y-1">
              <p><span className="font-medium text-gray-700">Studio / Craftsman:</span> {selectedProduct.brand}</p>
              <p><span className="font-medium text-gray-700">Living Zone:</span> {selectedProduct.category}</p>
              <p><span className="font-medium text-gray-700">Availability:</span> {selectedProduct.stock} units remaining in studio</p>
            </div>

            {/* Size Selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Dimensions & Configuration:</p>
              <div className="flex gap-2 flex-wrap">
                {selectedProduct.sizes?.map((size) => (
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
              <p className="text-sm font-medium text-gray-700 mb-2">Finish & Material Palette:</p>
              <div className="flex gap-2 flex-wrap">
                {selectedProduct.colors?.map((color) => (
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
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stock || 10, q + 1))} 
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

        {/* Similar Products Recommendation Slider Panel */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-6">You May Also Like</h2>
          
          <ProductGrid products={similarProducts || []} loading={loading} error={error}/>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;