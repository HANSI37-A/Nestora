import React, { useState } from 'react';

const Showrooms = () => {
  const [parisImageIndex, setParisImageIndex] = useState(0);

  const parisShowroomPhotos = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", 
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800", 
    "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=800"  
  ];

  const handleNextParisPhoto = (e) => {
    e.stopPropagation(); 
    setParisImageIndex((prev) => (prev + 1) % parisShowroomPhotos.length);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased selection:bg-[#1A1A1A] selection:text-white">
      
      <section className="px-6 py-16 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="w-full aspect-[4/3] overflow-hidden bg-[#F4F1EA]">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200" 
            alt="Milan Atelier Flagship" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="space-y-6 md:pl-6">
          <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-[#A8A29E]">
            Flagship Location
          </span>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-[#1A1A1A]">
            Milan Atelier
          </h1>
          <p className="text-sm text-[#555] font-light leading-relaxed max-w-md">
            Located in the heart of Brera, our Milan flagship is a testament to architectural heritage. A curated sanctuary where material honesty meets contemporary form.
          </p>
          <div className="pt-4">
            <p className="text-xs text-[#A8A29E] font-medium tracking-wide mb-2">Via Solferino 12, 20121 Milano</p>
            <button className="text-xs font-semibold tracking-widest uppercase border-b border-[#1A1A1A] pb-1 flex items-center gap-2 hover:opacity-70 transition-opacity">
              Book a Private Viewing <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-[#1A1A1A]/5">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide">Global Studios</h2>
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#A8A29E]">
            4 Locations Worldwide
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="group space-y-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1EA]">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                alt="New York Gallery" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-serif text-[#1A1A1A]">New York Gallery</h3>
              <p className="text-xs text-[#A8A29E] font-light">142 Wooster St, Soho, NY 10012</p>
            </div>
            <button className="inline-block text-[10px] font-bold tracking-wider uppercase border-b border-[#1A1A1A]/30 pb-0.5 group-hover:border-[#1A1A1A] transition-colors">
              Book Private Viewing
            </button>
          </div>

          <div className="group space-y-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1EA]">
              <img 
                src={parisShowroomPhotos[parisImageIndex]} 
                alt={`Paris Studio View ${parisImageIndex + 1}`} 
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
              
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="text-[10px] bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-2 py-1 font-mono tracking-widest rounded">
                  0{parisImageIndex + 1} / 0{parisShowroomPhotos.length}
                </span>
                <button 
                  onClick={handleNextParisPhoto}
                  className="bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-all transform active:scale-95"
                >
                  Next Interior Angle ↗
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-serif text-[#1A1A1A]">Paris Studio</h3>
              <p className="text-xs text-[#A8A29E] font-light">18 Rue de l'Université, 75007 Paris</p>
            </div>
            <button className="inline-block text-[10px] font-bold tracking-wider uppercase border-b border-[#1A1A1A]/30 pb-0.5 group-hover:border-[#1A1A1A] transition-colors">
              Book Private Viewing
            </button>
          </div>
          <div className="group space-y-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F1EA]">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" 
                alt="London Showroom" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-serif text-[#1A1A1A]">London Showroom</h3>
              <p className="text-xs text-[#A8A29E] font-light">32 Pimlico Rd, London SW1W 8LJ</p>
            </div>
            <button className="inline-block text-[10px] font-bold tracking-wider uppercase border-b border-[#1A1A1A]/30 pb-0.5 group-hover:border-[#1A1A1A] transition-colors">
              Book Private Viewing
            </button>
          </div>

        </div>
      </section>

      <section className="bg-white border-t border-[#1A1A1A]/5 py-24 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight">
            Begin the Journey
          </h2>
          <p className="text-xs md:text-sm text-[#A8A29E] font-light tracking-wide leading-relaxed max-w-md mx-auto">
            Join our private circle for early access to new collections and invitations to gallery openings worldwide.
          </p>
          <form className="pt-6 max-w-sm mx-auto space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent text-center text-xs tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A]/30 pb-3 focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#A8A29E]/60 uppercase font-light"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#1A1A1A] text-white text-[10px] font-bold tracking-[0.25em] uppercase py-3.5 hover:bg-[#A8A29E] transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Showrooms;