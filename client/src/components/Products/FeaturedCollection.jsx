import React from 'react'
import heroimg from '../../assets/heroimg.jpg'

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        
        {/* left Content */}
          <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Featured Collection</h2>

          {/* Re-engineered from apparel text to premium furniture alignment */}
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-neutral-900 mb-4 font-serif">
            Artisanal curation made for your living space
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            Discover our latest studio arrivals, meticulously engineered for structural longevity, timeless comfort, and refined minimalism.
          </p>
          <a href="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">Shop Now </a>
          </div>

          {/* right image */}
          <div className="lg:w-1/2">
            <img src={heroimg} alt="NestOra Featured Collection Showroom" className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"/>
          </div>
      </div>
    </section>
  )
}

export default FeaturedCollection;