import React from 'react'
import heroimg from '../../assets/heroimg.jpg'
import { Link } from 'react-router-dom'

const FeaturedCollection = () => {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 bg-[#F9F7F2] border-t border-[#A8A29E]/20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-stretch gap-12 lg:gap-16">
        
        {/* Left Editorial Content */}
        <div className="lg:w-1/2 flex flex-col justify-center py-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#6B543D] font-bold block mb-3">
            Featured Collection
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] leading-[1.2] mb-6 tracking-wide">
            Artisanal curation <br />
            <span className="italic font-normal text-[#6B543D]">made for your living space</span>
          </h2>

          <p className="text-[#1A1A1A]/80 font-sans font-light text-sm leading-relaxed mb-8 max-w-xl">
            Discover our latest studio arrivals, meticulously engineered for structural longevity, timeless comfort, and refined minimalism. Each piece brings a quiet permanence to your architecture.
          </p>

          <div>
            {/* Explicit Clean Premium Black CTA Button */}
            <Link 
              to="/collection/all" 
              className="inline-block bg-[#1A1A1A] text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#6B543D] transition-all duration-300 shadow-md"
            >
              Shop The Collection
            </Link>
          </div>
        </div>

        {/* Right Large Product Image Slot */}
        <div className="lg:w-1/2 min-h-[400px] lg:min-h-[500px] bg-[#1A1A1A]/5 overflow-hidden">
          <img 
            src={heroimg} 
            alt="Nestora Featured Collection Showcase" 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-102"
          />
        </div>

      </div>
    </section>
  )
}

export default FeaturedCollection;