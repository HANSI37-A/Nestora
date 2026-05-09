import { useEffect, useState } from 'react'; 
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import Navbar from '../components/Common/Navbar';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutSide = (e) =>{

    if (sidebarRef.current && !sidebarRef.current.contains(e.target)){
      setIsSidebarOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
  });

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
      <button className="lg:hidden border p-2 flex justify-center items-center gap-2 text-sm font-medium">
        <FaFilter className="mr-2" />
        Filter
      </button>

      {/* Sidebar */}
      <div ref={sidebarRef} className="lg:w-1/4">
        <FilterSidebar />
      </div>

      {/* Product Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">Loading products...</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-48 object-cover rounded mb-3"
                onError={(e) => { e.target.src = "https://placehold.co/150x150?text=No+Image"; }}
              />
              <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
          ))
        )}
      </div>

    </div>
    </>
  );
};

export default Collection;