import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { BiHomeAlt, BiBed, BiChair, BiBriefcase, BiCompass, BiLayer, BiDisc } from "react-icons/bi";

const FilterSidebar = ({ closeMobileSidebar }) => {
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

  const categories = [
    { name: "Living Room", icon: <BiHomeAlt size={15} /> },
    { name: "Bedroom", icon: <BiBed size={15} /> },
    { name: "Dining Room", icon: <BiChair size={15} /> },
    { name: "Office", icon: <BiBriefcase size={15} /> },
    { name: "Decor", icon: <BiCompass size={15} /> }
  ];

  const materials = [
    { name: "Walnut", icon: <BiLayer size={14} /> },
    { name: "Italian Bouclé", icon: <BiDisc size={14} /> },
    { name: "Travertine", icon: <BiLayer size={14} /> }
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 5000,
    });
    setPriceRange([0, Number(params.maxPrice) || 5000]);
  }, [searchParams]);

  const handleCategoryChange = (catName) => {
    const updatedCat = filters.category === catName ? "" : catName;
    setFilters(prev => ({ ...prev, category: updatedCat }));
  };

  const handleMaterialToggle = (matName) => {
    const updatedMaterials = filters.material.includes(matName)
      ? filters.material.filter((m) => m !== matName)
      : [...filters.material, matName];
    setFilters(prev => ({ ...prev, material: updatedMaterials }));
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setPriceRange([0, val]);
    setFilters(prev => ({ ...prev, maxPrice: val }));
  };

  const handleApplyFilters = () => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.color) params.color = filters.color;
    if (filters.material.length > 0) params.material = filters.material.join(",");
    if (filters.brand.length > 0) params.brand = filters.brand.join(",");
    if (filters.minPrice > 0) params.minPrice = filters.minPrice;
    if (filters.maxPrice !== 5000) params.maxPrice = filters.maxPrice;
    
    setSearchParams(params);
    if (closeMobileSidebar) closeMobileSidebar();
  };

  return (

    <div className="w-full bg-[#F9F7F2] pl-6 pr-4 py-8 flex flex-col h-full select-none justify-between">
      
      <div>
        {/* Sidebar Navigation Header Block */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-serif text-[#1A1A1A] tracking-wide mb-1">Filters</h2>
            <span className="text-[9px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase block">Curated Selection</span>
          </div>
          <button onClick={closeMobileSidebar} className="p-2 text-[#1A1A1A] hover:text-[#6B543D] lg:hidden">
            <IoMdClose size={18} />
          </button>
        </div>

        {/* Content Options Area */}
        <div className="space-y-8">
          
          {/* CATEGORIES SECTION */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.25em] text-[#1A1A1A] uppercase mb-3">Categories</h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => {
                const isSelected = filters.category === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs tracking-wider font-medium transition-all duration-300 ${
                      isSelected 
                        ? "bg-[#1A1A1A]/5 text-[#1A1A1A] font-semibold border-l-2 border-[#6B543D]" 
                        : "text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2 border-l-2 border-transparent"
                    }`}
                  >
                    <span className={`${isSelected ? "text-[#6B543D]" : "text-[#A8A29E]"}`}>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MATERIALS SECTION */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.25em] text-[#1A1A1A] uppercase mb-3">Materials</h3>
            <div className="flex flex-col gap-1">
              {materials.map((mat) => {
                const isSelected = filters.material.includes(mat.name);
                return (
                  <button
                    key={mat.name}
                    onClick={() => handleMaterialToggle(mat.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs tracking-wider font-medium transition-all duration-300 ${
                      isSelected 
                        ? "bg-[#1A1A1A]/5 text-[#1A1A1A] font-semibold border-l-2 border-[#6B543D]" 
                        : "text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2 border-l-2 border-transparent"
                    }`}
                  >
                    <span className={`${isSelected ? "text-[#6B543D]" : "text-[#A8A29E]"}`}>{mat.icon}</span>
                    <span>{mat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PRICE RANGE SECTION */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.25em] text-[#1A1A1A] uppercase mb-3">Price Range</h3>
            <div className="px-1">
              <input
                type="range"
                min={0}
                max={5000}
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full accent-[#1A1A1A] h-1 bg-[#A8A29E]/30 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-medium tracking-widest text-[#A8A29E] mt-3">
                <span>$0</span>
                <span className="text-[#1A1A1A] font-bold">${priceRange[1].toLocaleString()}</span>
                <span>$5000</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FIXED BASE CTA SUBMISSION LAYER */}
      <div className="pt-6 border-t border-[#A8A29E]/20 mt-6">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#6B543D] transition-colors duration-300"
        >
          Apply Filters
        </button>
      </div>

    </div>
  );
};

export default FilterSidebar;