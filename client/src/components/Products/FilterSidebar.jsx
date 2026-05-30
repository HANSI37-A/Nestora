import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 5000, 
  });

  const [priceRange, setPriceRange] = useState([0, 5000]); 

  const categories = ["Living Room", "Dining Room", "Bedroom", "Office", "Decor"];
  const colors = ["Walnut", "Oak", "Charcoal", "Emerald", "Boucle", "Travertine", "Beige", "Brass"];
  const materials = ["Solid Wood", "Honed Travertine", "Premium Velvet", "Italian Bouclé", "Cast Iron"];
  const brands = ["Atelier Nestora", "Nordic Minimalist", "Heritage Craft"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 5000,
    });
    setPriceRange([0, params.maxPrice || 5000]);
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = {};
    if (newFilters.category) params.category = newFilters.category;
    if (newFilters.color) params.color = newFilters.color;
    if (newFilters.material.length > 0) params.material = newFilters.material.join(",");
    if (newFilters.brand.length > 0) params.brand = newFilters.brand.join(",");
    if (newFilters.minPrice > 0) params.minPrice = newFilters.minPrice;
    if (newFilters.maxPrice !== 5000) params.maxPrice = newFilters.maxPrice;
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    const updated = { ...filters, category: cat };
    setFilters(updated);
    updateURLParams(updated);
  };

  const handleColorChange = (color) => {
    const updated = { ...filters, color };
    setFilters(updated);
    updateURLParams(updated);
  };

  const handleCheckbox = (key, value) => {
    const updatedArray = filters[key].includes(value)
      ? filters[key].filter((i) => i !== value)
      : [...filters[key], value];
    const updated = { ...filters, [key]: updatedArray };
    setFilters(updated);
    updateURLParams(updated);
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, e.target.value]);
    const updated = { ...filters, maxPrice: e.target.value };
    setFilters(updated);
    updateURLParams(updated);
  };

  const getColorHexValue = (colorName) => {
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
    return finishes[colorName.toLowerCase()] || colorName.toLowerCase();
  };

  return (
    <div className="w-full bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">Filters</h2>

      {/* Category */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Collection Area</h3>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={() => handleCategoryChange(cat)}
              className="accent-black"
            />
            <span className="text-sm text-gray-600">{cat}</span>
          </label>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Finish / Hue</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              title={color}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                filters.color === color ? "border-black scale-110" : "border-gray-200"
              }`}
              style={{ backgroundColor: getColorHexValue(color) }}
            />
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Material</h3>
        {materials.map((mat) => (
          <label key={mat} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.material.includes(mat)}
              onChange={() => handleCheckbox("material", mat)}
              className="accent-black"
            />
            <span className="text-sm text-gray-600">{mat}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Brand</h3>
        {brands.map((b) => (
          <label key={b} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.brand.includes(b)}
              onChange={() => handleCheckbox("brand", b)}
              className="accent-black"
            />
            <span className="text-sm text-gray-600">{b}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Max Price: ${priceRange[1]}
        </h3>
        <input
          type="range"
          min={0}
          max={5000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$5,000</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;