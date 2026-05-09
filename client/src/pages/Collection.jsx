import { useEffect, useRef, useState } from 'react'; 
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import Navbar from '../components/Common/Navbar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutSide = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => { 
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []); 

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://placehold.co/150x150?text=Product+1", altText: "Product 1" }],
          category: "Clothing",
          color: "Red",
          size: ["S", "M", "L"],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 200,
          images: [{ url: "https://placehold.co/150x150?text=Product+2", altText: "Product 2" }],
          category: "Clothing",
          color: "Blue",
          size: ["M", "L", "XL"],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 300,
          images: [{ url: "https://placehold.co/150x150?text=Product+3", altText: "Product 3" }],
          category: "Accessories",
          color: "Black",
          size: ["One Size"],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 p-4">

        {/* Mobile Filter Button */}
        <button
          onClick={toggleSidebar} 
          className="lg:hidden border p-2 flex justify-center items-center gap-2 text-sm font-medium"
        >
          <FaFilter className="mr-2" />
          Filter
        </button>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-1/4 lg:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full" 
          }`}
        >
          <FilterSidebar />
        </div>
        <div className="grow p-4">
          <h2 className="text-2xl uppercase mb-4">All Collection</h2>

          <SortOptions />

          <ProductGrid products={products} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}


      </div>
    </>
  );
};

export default Collection;