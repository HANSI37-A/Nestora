import { useEffect, useRef, useState } from 'react'; 
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters, setFilters, clearFilters } from '../redux/slice/productsSlice';

const Collection = () => {
  const [searchParams] = useSearchParams();
  const { collection } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    
    const targetCollection = collection || 'all';
    const appliedFilters = { 
      collection: targetCollection, 
      ...queryParams 
    };

    if (queryParams.size && !queryParams.sizes) {
      appliedFilters.sizes = queryParams.size;
      delete appliedFilters.size;
    }

    dispatch(clearFilters());
    dispatch(setFilters(appliedFilters));
    dispatch(fetchProductsByFilters(appliedFilters));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutSide = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []); 

  return (

    <div className="w-full bg-[#F9F7F2] min-h-screen text-[#1A1A1A] font-sans antialiased pt-28 sm:pt-32">
 
      <div className="w-full px-4 sm:px-6 lg:pl-0 lg:pr-0 flex flex-col lg:flex-row items-stretch lg:h-[calc(100vh-8rem)] lg:overflow-hidden">
        <div className="w-full lg:hidden px-6 py-4 border-b border-[#A8A29E]/20 bg-[#F9F7F2] sticky top-[5.5rem] z-20 flex justify-between items-center">
          <button
            onClick={toggleSidebar} 
            className="border border-[#1A1A1A] px-5 py-2.5 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-[#1A1A1A] text-white transition-all"
          >
            <FaFilter size={10} />
            Filter Space
          </button>
          <span className="text-xs tracking-wider text-[#A8A29E] font-medium">
            Showing {products?.length || 0} Results
          </span>
        </div>

        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-80 bg-[#F9F7F2] border-r border-[#A8A29E]/20 z-50 transform transition-transform duration-300 
            lg:relative lg:translate-x-0 lg:w-64 lg:shrink-0 lg:z-10 lg:border-t-0
            lg:sticky lg:top-0 lg:h-full lg:overflow-hidden ${
            isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:shadow-none" 
          }`}
        >
          <FilterSidebar closeMobileSidebar={() => setIsSidebarOpen(false)} />
        </div>

        <div className="grow pt-4 pb-16 px-4 sm:px-6 lg:pl-10 lg:pr-6 lg:h-full lg:overflow-y-auto custom-product-shelf">
          
          <div className="border-b border-[#A8A29E]/20 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] tracking-wide mb-3 capitalize">
                {collection?.toLowerCase() === 'all' ? 'All Products' : `${collection} Collection`}
              </h1>
              <p className="text-[#A8A29E] font-light text-xs sm:text-sm leading-relaxed tracking-wide">
                A curated assembly of pieces that define modern luxury through material integrity and structural grace.
              </p>
            </div>
            <div className="hidden lg:block shrink-0 text-right">
              <span className="text-xs tracking-[0.15em] text-[#A8A29E] font-medium uppercase">
                Showing {products?.length || 0} Results
              </span>
            </div>
          </div>

          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

      </div>
    </div>
  );
};

export default Collection;