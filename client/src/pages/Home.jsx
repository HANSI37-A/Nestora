import React from 'react'
import heroimg from '../assets/heroimg.jpg'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import { Link } from 'react-router-dom'

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
]

const materialSwatches = [
  { name: 'TRAVERTINE', colorClass: 'bg-[#FAF6F0] border border-neutral-200' },
  { name: 'WALNUT', colorClass: 'bg-[#4B3621]' },
  { name: 'BOUCLÉ', colorClass: 'bg-[#EAE6DF]' },
  { name: 'MATTE STEEL', colorClass: 'bg-[#2B2B2A]' },
]

const Home = () => {
  return (
    <div className="bg-[#F9F7F2] font-sans antialiased text-[#1A1A1A]">
      
      <section className="relative h-[90vh] w-full px-4 sm:px-8 lg:px-12 pb-12">
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src={heroimg}
            alt="Nestora high-end architectural living space showcase" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/40 via-transparent to-[#1A1A1A]/20" />
          
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 sm:px-16 max-w-2xl text-white z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A8A29E] font-semibold mb-3">
              Established 1974
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8 tracking-tight">
              Architectural <br />
              <span className="italic font-normal text-white">Rigour & Soul.</span>
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-[#1A1A1A] text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#6B543D] transition-all duration-300">
                Explore Catalogue
              </button>
              <button className="border border-white/60 text-white backdrop-blur-sm px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all duration-300">
                Our Philosophy
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/60 pointer-events-none">
            Scroll
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 lg:px-16 border-t border-[#A8A29E]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-[480px] bg-neutral-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800" 
                alt="Nestora Craftsmanship details" 
                className="w-full h-full object-cover grayscale contrast-115"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6B543D] font-bold block mb-4">
              The Nestora Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-[1.2] mb-6 tracking-wide">
              Fifty Years of <br />
              <span className="italic font-normal text-[#6B543D]">Silent Luxury</span>
            </h2>
            <p className="text-[#1A1A1A]/80 font-sans font-light text-sm leading-relaxed mb-8 max-w-xl">
              Based in the core of architectural structural revivals, Nestora remains committed to the principle that masterfully executed furniture matches the permanence of the buildings they occupy. We define modern lineage using material authenticity and obsessive focus on joinery techniques.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#A8A29E]/30 pt-8">
              <div>
                <h4 className="font-serif text-lg text-[#1A1A1A] mb-2">Sustainable</h4>
                <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
                  Responsibly sourced European hardwoods only.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#1A1A1A] mb-2">Artisanal</h4>
                <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
                  Each signature piece vetted by our lead cabinet master.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <FeaturedCollection />

      <section className="py-16 px-4 border-t border-[#A8A29E]/20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#6B543D] font-bold block mb-10">Our Materials</span>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {materialSwatches.map((swatch, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-xl shadow-inner transition-transform duration-300 hover:scale-105 cursor-pointer ${swatch.colorClass}`} />
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1A1A1A]">{swatch.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto bg-[#1A1A1A] text-white py-16 px-6 sm:px-12 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <h3 className="text-3xl sm:text-4xl font-serif italic font-normal mb-4 tracking-wide text-neutral-100">
              The Journal
            </h3>
            <p className="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-8 tracking-wide">
              Subscribe to receive early access to new collections and architectural insight from our design studio.
            </p>

            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full px-5 py-3.5 bg-transparent border border-neutral-700 text-xs tracking-widest text-white outline-none focus:border-[#A8A29E] transition-colors text-center sm:text-left placeholder-neutral-500"
                required
              />
              <button className="w-full sm:w-auto bg-white text-[#1A1A1A] px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-[#F9F7F2] hover:text-[#6B543D] transition-colors shrink-0">
                Join
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;