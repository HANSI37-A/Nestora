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
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const materials = ["Wood", "Iron", "Plastic"];
  const brands = ["Urban Threads", "Modern Fit", "Street Breeze"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setFilters({ ...filters, category: cat });
  };

  const handleColorChange = (color) => {
    setFilters({ ...filters, color });
  };

  const handleCheckbox = (key, value) => {
    const updated = filters[key].includes(value)
      ? filters[key].filter((i) => i !== value)
      : [...filters[key], value];
    setFilters({ ...filters, [key]: updated });
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, e.target.value]);
    setFilters({ ...filters, maxPrice: e.target.value });
  };

  return (
    <div className="p-4 w-64 border-r border-gray-100 min-h-screen">

      <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wide">Filters</h2>

      {/* Category */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Category</h3>
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
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              title={color}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                filters.color === color ? "border-black scale-110" : "border-gray-200"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
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
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$100</span>
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;