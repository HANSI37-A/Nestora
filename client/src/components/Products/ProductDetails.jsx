import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slice/productsSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();


  const { selectedProduct, similarProducts, loading, error } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);
 
  const [mainImage, setMainImage] = useState(null); 
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [show3DViewer, setShow3DViewer] = useState(false);

  const productFetchId = productId || id;

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

  const availableSizes = selectedProduct?.sizes || selectedProduct?.size || [];
  const sizeArray = Array.isArray(availableSizes) ? availableSizes : [availableSizes].filter(Boolean);

  const availableColors = selectedProduct?.colors || selectedProduct?.color || [];
  const colorArray = Array.isArray(availableColors) ? availableColors : [availableColors].filter(Boolean);


  useEffect(() => {
    if (sizeArray.length > 0 && !selectedSize) {
      setSelectedSize(sizeArray[0]);
    }
    if (colorArray.length > 0 && !selectedColor) {
      setSelectedColor(colorArray[0]);
    }
  }, [selectedProduct, sizeArray, colorArray]);

  const getSwatchHex = (colorName) => {
    const clean = colorName.trim().toLowerCase();
    const finishes = {
      walnut: '#4E3629',
      'solid walnut': '#4E3629',
      oak: '#E5DFD3',
      white: '#FFFFFF',
      charcoal: '#2D2D2D',
      boucle: '#F4F1EA',
      'italian bouclé': '#F4F1EA',
      travertine: '#E2D9C8',
      brass: '#D4AF37'
    };
    return finishes[clean] || '#A8A29E';
  };

  const handleAddToCart = () => {
    const finalSize = selectedSize || sizeArray[0] || "Standard";
    const finalColor = selectedColor || colorArray[0] || "Default";

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        color: finalColor,
        size: finalSize,
        guestId,
        userId: user?._id,
      })
    );
  }; 

  if (loading) {
    return <div className="text-center py-32 font-light text-xs tracking-widest uppercase text-[#A8A29E]">Loading premium catalog details...</div>;
  }

  if (error) {
    return <div className="text-center py-32 text-xs font-semibold uppercase tracking-wider text-red-500">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div className="text-center py-32 font-serif text-lg text-[#A8A29E] italic">Design piece not found.</div>;
  }

  return (
  
    <div className="w-full bg-[#F9F7F2] min-h-screen text-[#1A1A1A] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-16">
        
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

          {/* LEFT COLUMN — ASYMMETRIC SCROLLING GALLERY LAYOUT */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            {/* Featured Hero Display */}
            <div className="w-full aspect-[4/3] bg-[#1A1A1A]/5 overflow-hidden relative">
              {show3DViewer && selectedProduct.modelUrl ? (
              <model-viewer
                src={selectedProduct.modelUrl}
                alt="A 3D model of the product"
                auto-rotate
                camera-controls
                style={{ width: "100%", height: "100%", backgroundColor: "#F9F7F2" }}
              >
                <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-[#F9F7F2]">
                  <span className="text-xs tracking-widest text-[#A8A29E] uppercase animate-pulse">Loading 3D Model...</span>
                </div>
              </model-viewer>
              ) : mainImage && (
                <img
                  src={mainImage}
                  alt={selectedProduct?.name || "Featured Display"}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200"; }}
                />
              )}
            </div>

            {/* Thumbnail Navigation Strip Grid */}
            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {selectedProduct.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => { setMainImage(img.url); setShow3DViewer(false); }}
                    className={`aspect-[4/3] bg-[#1A1A1A]/5 overflow-hidden border transition-all duration-300 ${
                      mainImage === img.url && !show3DViewer ? "border-[#1A1A1A]" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {selectedProduct.modelUrl && (
              <button
                onClick={() => setShow3DViewer(true)}
                className="w-full mt-2 py-3 border border-[#1A1A1A] text-[#1A1A1A] text-xs font-semibold tracking-widest uppercase hover:bg-[#1A1A1A] hover:text-[#F9F7F2] transition-colors duration-300"
              >
                View in 3D
              </button>
            )}
          </div>

          {/* RIGHT COLUMN — INTERACTIVE PRODUCT DETAILS SYSTEM */}
          <div className="w-full lg:w-[40%] flex flex-col pt-2">
            
            {/* Header Typography Grouping */}
            <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] tracking-normal leading-[1.1] mb-4">
              {selectedProduct.name}
            </h1>
            
            <p className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mb-8">
              {typeof selectedProduct.price === "number" 
                ? `$${selectedProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                : selectedProduct.price}
            </p>

            {/* MATERIAL FINISH SELECTION ROW */}
            {colorArray.length > 0 && (
              <div className="mb-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-3">
                  Material Selection
                </h3>
                <div className="flex gap-4 items-center">
                  {colorArray.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <div key={color} className="flex flex-col items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-xl transition-all duration-300 relative ${
                            isSelected 
                              ? "ring-2 ring-[#1A1A1A] ring-offset-2 scale-105" 
                              : "border border-[#1A1A1A]/10 hover:scale-105"
                          }`}
                          style={{ backgroundColor: getSwatchHex(color), '--tw-ring-offset-color': '#F9F7F2' }}
                          title={color}
                        />
                        <span className={`text-[11px] tracking-wide transition-colors ${isSelected ? "text-[#1A1A1A] font-medium" : "text-[#A8A29E]"}`}>
                          {color}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PRODUCT CORE NARRATIVE LAYOUT BLOCK */}
            <div className="border-t border-[#A8A29E]/20 pt-6 mb-8">
              <p className="text-[#1A1A1A]/80 font-light text-sm leading-relaxed tracking-wide">
                {selectedProduct.description || "A testament to architectural rigour and material honesty. Designed for the modern luxury gallery home environment."}
              </p>
            </div>

            {/* Quantity Selector */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quantity:</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="border px-3 py-1 rounded text-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(selectedProduct.countInStock || 10, q + 1))}
                    className="border px-3 py-1 rounded text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
              </div>
            </div>

            {/* ACTION TRIGGERS BAR SECTION */}
            <div className="space-y-3 mt-auto pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#6B543D] transition-colors duration-300 shadow-sm"
              >
                Add to Bag
              </button>
            </div>

          </div>
        </div>

        {/* CURATED PAIRINGS SECTION SLOT */}
        <div className="mt-24 border-t border-[#A8A29E]/20 pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase block mb-1">Curated Pairings</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">Complete the Room</h2>
            </div>
          </div>
          <ProductGrid products={similarProducts || []} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;