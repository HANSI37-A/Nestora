import { Link } from "react-router-dom";

const ProductGrid = ({ products = [], loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-20 font-light text-xs tracking-widest uppercase text-[#A8A29E] animate-pulse">
        Curating design pieces...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-xs font-semibold uppercase tracking-wider text-red-500 bg-red-50 border border-red-200 rounded p-6">
        Error cataloging pieces: {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-xs tracking-wider font-light text-[#A8A29E] italic py-16">
        No similar architectural pieces found in this collection category.
      </p>
    );
  }

  const ensureString = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (Array.isArray(value) && value.length > 0) return String(value[0]);
    return String(value);
  };

  const formatMaterialTag = (product) => {
    const rawMaterial = product?.material || product?.color;
    if (!rawMaterial) return "ARCHITECTURAL EDITION";
    
    const cleanString = ensureString(rawMaterial);
    return cleanString.toUpperCase();
  };

 
  const getSwatchColor = (colorInput) => {
    const cleanColor = ensureString(colorInput).trim().toLowerCase();

    const finishes = {
      walnut: '#4E3629',
      oak: '#B59473',
      charcoal: '#2D2D2D',
      emerald: '#046307',
      boucle: '#F4F1EA',
      travertine: '#E2D9C8',
      beige: '#F5F5DC',
      brass: '#D4AF37'
    };
    
    return finishes[cleanColor] || '#A8A29E';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product, index) => {
        const materialTag = formatMaterialTag(product);
   
        const swatchColor = getSwatchColor(
          Array.isArray(product?.color) ? product.color[0] : product?.color || product?.material
        );

        return (
          <Link 
            key={product?._id || index} 
            to={`/product/${product?._id}`} 
            className="block group select-none"
          >
           
            <div className="w-full h-[420px] mb-4 overflow-hidden bg-[#1A1A1A]/5 relative">
              <img
                src={product?.images?.[0]?.url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"}
                alt={product?.images?.[0]?.alt || product?.images?.[0]?.altText || product?.name || "Nestora Design Catalog"}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors duration-500" />
            </div>

            <h3 className="text-lg font-serif text-[#1A1A1A] tracking-normal leading-[1.25] mb-2 group-hover:text-[#6B543D] transition-colors">
              {product?.name}
            </h3>

            <div className="flex items-center gap-2 mb-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block shrink-0 border border-[#1A1A1A]/10" 
                style={{ backgroundColor: swatchColor }}
              />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#A8A29E] uppercase truncate">
                {materialTag}
              </span>
            </div>

            <p className="text-[#1A1A1A] font-sans font-medium text-xs tracking-wider">
              {typeof product?.price === "number" 
                ? `$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                : product?.price}
            </p>

          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;