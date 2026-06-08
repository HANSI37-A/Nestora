import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { BiHomeAlt, BiBed, BiChair, BiBriefcase, BiCompass, BiLayer, BiDisc } from "react-icons/bi";
import { fetchCategories } from "../../redux/slice/categoriesSlice";

const FilterSidebar = ({ closeMobileSidebar }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 5000, 
  });

  const [maxPriceValue, setMaxPriceValue] = useState(5000);

  const iconMap = {
    "living room": <BiHomeAlt size={15} />,
    "bedroom": <BiBed size={15} />,
    "dining room": <BiChair size={15} />,
    "office": <BiBriefcase size={15} />,
    "decor": <BiCompass size={15} />,
  };

  const materials = [
    { name: "Walnut", icon: <BiLayer size={14} /> },
    { name: "Italian Bouclé", icon: <BiDisc size={14} /> },
    { name: "Travertine", icon: <BiLayer size={14} /> }
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const parsedMaxPrice = Number(params.maxPrice) || 5000;

    setFilters({
      category: params.category || "",
      color: params.color || "",
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: parsedMaxPrice,
    });
    
    setMaxPriceValue(parsedMaxPrice);
  }, [searchParams]);

  const updateURLParams = (updatedFilters) => {
    const newParams = new URLSearchParams(searchParams);

    if (updatedFilters.category) newParams.set("category", updatedFilters.category);
    else newParams.delete("category");

    if (updatedFilters.color) newParams.set("color", updatedFilters.color);
    else newParams.delete("color");

    if (updatedFilters.material.length > 0) newParams.set("material", updatedFilters.material.join(","));
    else newParams.delete("material");

    if (updatedFilters.brand.length > 0) newParams.set("brand", updatedFilters.brand.join(","));
    else newParams.delete("brand");

    if (updatedFilters.minPrice > 0) newParams.set("minPrice", updatedFilters.minPrice);
    else newParams.delete("minPrice");

    if (updatedFilters.maxPrice !== 5000) newParams.set("maxPrice", updatedFilters.maxPrice);
    else newParams.delete("maxPrice");

    setSearchParams(newParams);
  };

  const handleCategoryChange = (catName) => {
    const normalizedName = catName.toLowerCase();
    const updatedCat = filters.category.toLowerCase() === normalizedName ? "" : catName;
    
    const updated = { ...filters, category: updatedCat };
    setFilters(updated);
    updateURLParams(updated); 
  };

  const handleMaterialToggle = (matName) => {
    const updatedMaterials = filters.material.includes(matName)
      ? filters.material.filter((m) => m !== matName)
      : [...filters.material, matName];
      
    const updated = { ...filters, material: updatedMaterials };
    setFilters(updated);
        const newParams = new URLSearchParams(searchParams);
      if (updatedMaterials.length > 0) {
        newParams.set("material", updatedMaterials.join(","));
      } else {
        newParams.delete("material");
      }
      setSearchParams(newParams);
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setMaxPriceValue(val);
    setFilters(prev => ({ ...prev, maxPrice: val }));
  };

  const handleApplyFilters = () => {
    updateURLParams(filters);
    if (closeMobileSidebar) closeMobileSidebar();
  };

  return (
    <div className="w-full bg-[#F9F7F2] pl-6 pr-4 py-8 flex flex-col h-full select-none justify-between">
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-serif text-[#1A1A1A] tracking-wide mb-1">Filters</h2>
            <span className="text-[9px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase block">Curated Selection</span>
          </div>
          <button onClick={closeMobileSidebar} className="p-2 text-[#1A1A1A] hover:text-[#6B543D] lg:hidden">
            <IoMdClose size={18} />
          </button>
        </div>

        <div className="space-y-8">
          {/* CATEGORIES SECTION */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.25em] text-[#1A1A1A] uppercase mb-3">Categories</h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => {
                const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs tracking-wider font-medium transition-all duration-300 ${
                      isSelected 
                        ? "bg-[#1A1A1A]/5 text-[#1A1A1A] font-semibold border-l-2 border-[#6B543D]" 
                        : "text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2 border-l-2 border-transparent"
                    }`}
                  >
                    <span className={`${isSelected ? "text-[#6B543D]" : "text-[#A8A29E]"}`}>
                      {iconMap[cat.name.toLowerCase()] || <BiHomeAlt size={15} />}
                    </span>
                    <span className="capitalize">{cat.name}</span>
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
                    type="button"
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

          <div>
            <h3 className="text-[10px] font-bold tracking-[0.25em] text-[#1A1A1A] uppercase mb-3">Price Range</h3>
            <div className="px-1">
              <input
                type="range"
                min={0}
                max={5000}
                value={maxPriceValue}
                onChange={handlePriceChange}
                onMouseUp={handleApplyFilters}
                onTouchEnd={handleApplyFilters}
                className="w-full accent-[#1A1A1A] h-1 bg-[#A8A29E]/30 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-medium tracking-widest text-[#A8A29E] mt-3">
                <span>$0</span>
                <span className="text-[#1A1A1A] font-bold">${maxPriceValue.toLocaleString()}</span>
                <span>$5000</span>
              </div>
            </div>
          </div>

        </div>
      </div>

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