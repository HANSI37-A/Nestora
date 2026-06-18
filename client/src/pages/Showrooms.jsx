import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; 
import { Link } from "react-router-dom";

const Showroom = () => {
  const [showrooms, setShowrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicShowrooms = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get('/showrooms');
        setShowrooms(data.data);
      } catch (err) {
        console.error("Public showroom extraction failure:", err);
        setError(err.response?.data?.message || "Failed to stream architectural showcase catalogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicShowrooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center font-sans tracking-[0.2em] uppercase text-xs text-[#A8A29E] antialiased">
        Forming spatial coordinates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center font-sans text-xs text-red-500 p-6 antialiased">
        <div className="border border-red-200 bg-red-50/50 p-4 max-w-md text-center rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased select-none px-6 pt-36 sm:pt-40 pb-16 sm:px-12 lg:px-24">
      {/* Structural Header Block */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-[#1A1A1A]/10 pb-8">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#A8A29E] uppercase block mb-3">
          Curated Environments
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-wide text-[#1A1A1A] mb-4">
          Architectural Showrooms
        </h1>
        <p className="text-sm text-[#A8A29E] max-w-xl leading-relaxed font-light">
          Step across structural dimensional horizons. Explore our carefully curated design configurations and masterfully framed environments.
        </p>
      </div>

      {/* Grid Layout System */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {showrooms && showrooms.length > 0 ? (
          showrooms.map((room) => (
            <div key={room._id} className="group flex flex-col space-y-4 bg-white/40 p-4 rounded-xl border border-transparent hover:border-[#1A1A1A]/5 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-md">
              
              <Link to={`/showrooms/${room._id}`} className="w-full aspect-[3/2] overflow-hidden rounded-lg bg-gray-100 relative block cursor-pointer">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  onError={(e) => { 
                    const target = e.currentTarget;
                    target.onerror = null; 
                    target.src = "https://placehold.co/600x400?text=Asset+Render+Missing"; 
                  }}
                />
                <div className="absolute top-4 right-4 bg-[#1A1A1A] text-white text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded shadow-sm">
                  {room.dimensions}
                </div>
              </Link>

              {/* Composition Matrix Text Strings */}
              <div className="flex flex-col flex-1 pt-2">
                <div className="flex items-baseline justify-between mb-1.5">
                  <h2 className="text-xl font-serif font-normal tracking-wide text-[#1A1A1A] group-hover:text-[#6B543D] transition-colors duration-300">
                    <Link to={`/showrooms/${room._id}`}>
                      {room.name}
                    </Link>
                  </h2>
                </div>
                
                <span className="text-[10px] font-semibold text-[#A8A29E] tracking-widest uppercase block mb-3">
                   {room.location}
                </span>

                <p className="text-xs text-[#A8A29E] leading-relaxed font-light text-justify line-clamp-3 group-hover:text-[#1A1A1A] transition-colors duration-500 mb-4">
                  {room.description}
                </p>
                <div className="pt-2 mt-auto">
                  <Link 
                    to={`/showrooms/${room._id}`}
                    className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/60 group-hover:text-[#6B543D] transition-colors duration-300 pointer-events-auto"
                  >
                    Explore Space <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-[#1A1A1A]/10 rounded-xl">
            <p className="text-xs font-light text-[#A8A29E] tracking-widest uppercase">
              No exhibition showcases are actively deployed to the grid.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showroom;