import React, { useState } from 'react';
import heroimg from '../assets/heroimg.jpg';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 

const products = [
  { 
    id: 1, 
    name: 'Eames-Inspired Velvet Accent Chair', 
    price: '$899', 
    material: 'Premium Velvet & Walnut',
    collection: 'Mid-Century Icons',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 2, 
    name: 'Minimalist Oak Dining Chair', 
    price: '$149', 
    material: 'Solid White Oak',
    collection: 'Nordic Minimalist',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 3, 
    name: 'Monolithic Travertine Coffee Table', 
    price: '$299', 
    material: 'Honed Travertine Stone',
    collection: 'Contemporary Living',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 4, 
    name: 'Bouclé Lounge Sofa & Ottoman Set', 
    price: '$459', 
    material: 'Textured Italian Bouclé',
    collection: 'Heritage Comfort',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800' 
  },
];

const materialSwatches = [
  { name: 'TRAVERTINE', colorClass: 'bg-[#FAF6F0] ring-1 ring-neutral-200/60' },
  { name: 'WALNUT', colorClass: 'bg-[#4B3621]' },
  { name: 'BOUCLÉ', colorClass: 'bg-[#EAE6DF]' },
  { name: 'MATTE STEEL', colorClass: 'bg-[#2B2B2A]' },
];

const Home = () => {
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
    
      const response = await axiosInstance.post('/subscribe', { email });
      
      setStatus("success");
      setStatusMessage(response.data.message || "Successfully subscribed!");
      setEmail(""); 
    } catch (err) {
      console.error("Subscription transmission failure:", err);
      setStatus("error");
      setStatusMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#FBFBFA] font-sans antialiased text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white">
      
      <section className="relative min-h-screen w-full p-0 overflow-hidden flex flex-col justify-between">
     
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={heroimg}
            alt="Nestora high-end architectural living space showcase" 
            className="w-full h-full object-cover scale-100"
          />
  
          <div className="absolute inset-0 bg-neutral-950/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        </div>
     
        <div className="h-20 w-full" />

        {/* Hero Headline content centering container */}
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 z-10 flex flex-col items-center justify-center text-center flex-grow py-12">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-neutral-300 font-medium mb-6 backdrop-blur-md bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 bg-[#A8A29E] rounded-full animate-pulse" /> Established 1974
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-serif leading-[1.05] tracking-tight text-white mb-8">
            Architectural <br />
            <span className="italic font-normal font-serif text-neutral-100">Rigour & Soul.</span>
          </h1>
        </div>
        
      
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 pb-12 z-10 flex justify-center items-center">
          <div className="flex flex-col items-center text-[9px] tracking-[0.3em] uppercase text-white/70 font-mono gap-2">
            <span>Scroll to Explore</span>
            <div className="w-[1px] h-10 bg-white/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 sm:px-12 lg:px-24 border-t border-neutral-200/60 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md p-3 border border-neutral-200/80 rounded-2xl bg-[#FBFBFA]">
              <div className="relative w-full h-[520px] overflow-hidden rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800" 
                  alt="Nestora Craftsmanship details" 
                  className="w-full h-full object-cover grayscale contrast-110 hover:scale-105 duration-700 ease-out transition-transform"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-4 order-1 lg:order-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#6B543D] font-bold block mb-5">
              The Nestora Heritage
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.15] mb-8 tracking-tight">
              Fifty Years of <br />
              <span className="italic font-normal text-[#6B543D] font-serif">Silent Luxury</span>
            </h2>
            <p className="text-neutral-500 font-sans font-light text-base leading-relaxed mb-12 max-w-2xl">
              Based in the core of architectural structural revivals, Nestora remains committed to the principle that masterfully executed furniture matches the permanence of the buildings they occupy. We define modern lineage using material authenticity and obsessive focus on joinery techniques.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-neutral-200/80 pt-10">
              <div className="group">
                <h4 className="font-serif text-xl text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <span className="text-xs text-[#6B543D] font-mono">01/</span> Sustainable
                </h4>
                <p className="text-sm text-neutral-400 font-light leading-relaxed group-hover:text-neutral-600 transition-colors duration-300">
                  Responsibly sourced European hardwoods only. Integrated preservation metrics.
                </p>
              </div>
              <div className="group">
                <h4 className="font-serif text-xl text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <span className="text-xs text-[#6B543D] font-mono">02/</span> Artisanal
                </h4>
                <p className="text-sm text-neutral-400 font-light leading-relaxed group-hover:text-neutral-600 transition-colors duration-300">
                  Each signature piece vetted by our lead cabinet master. Built for centuries.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <div className="bg-[#FBFBFA]">
        <FeaturedCollection />
      </div>

      <section className="py-24 px-6 border-t border-neutral-200/60 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#6B543D] font-bold block mb-12">Our Materials</span>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-10 sm:gap-16">
            {materialSwatches.map((swatch, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="p-1.5 border border-neutral-100 rounded-full transition-all duration-500 group-hover:border-neutral-300 group-hover:scale-105">
                  <div className={`w-14 h-14 rounded-full transition-shadow duration-300 ${swatch.colorClass}`} />
                </div>
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-neutral-400 group-hover:text-[#1A1A1A] transition-colors duration-300">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-12 px-4 sm:px-8 lg:px-16 bg-[#FBFBFA]">
        <div className="max-w-6xl mx-auto bg-[#1A1A1A] text-white py-20 px-8 sm:px-16 rounded-3xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="max-w-2xl mx-auto relative z-10 text-center">
            <h3 className="text-4xl sm:text-5xl font-serif italic font-normal mb-5 tracking-wide text-white">
              The Journal
            </h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-10 max-w-lg mx-auto tracking-wide">
              Subscribe to receive early access to new collections and architectural insight from our design studio.
            </p>

            <form onSubmit={handleSubscribeSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full bg-neutral-900/60 p-2 border border-neutral-800 rounded-xl focus-within:border-neutral-600 transition-colors duration-300">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                  className="w-full px-4 py-3 bg-transparent text-xs tracking-widest text-white outline-none text-center sm:text-left placeholder-neutral-600 disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto bg-white text-[#1A1A1A] px-8 py-3 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-[#FBFBFA] hover:text-[#6B543D] transition-all duration-300 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Joining..." : "Join"}
                </button>
              </div>

              {status === "success" && (
                <p className="text-[10px] text-emerald-400 font-light tracking-widest uppercase pt-2 animate-fade-in">
                   {statusMessage}
                </p>
              )}
              {status === "error" && (
                <p className="text-[10px] text-rose-400 font-light tracking-widest uppercase pt-2 animate-fade-in">
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;