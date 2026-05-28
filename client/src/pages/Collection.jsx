import { useEffect, useRef, useState } from 'react'; 
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slice/productsSlice';

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();  
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

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

  return (
    <>
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

          <ProductGrid products={products} loading={loading} error={error} />
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