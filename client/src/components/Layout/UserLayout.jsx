import React from 'react'
import { Header } from '../Common/Header'
import Footer from '../Common/Footer'
import heroimg from '../../assets/heroimg.jpg'


const products = [
  { id: 1, name: 'Modern Sofa', price: '$899', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Minimalist Dining Chair', price: '$149', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Wooden Coffee Table', price: '$299', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Elegant Lounge Chair', price: '$459', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800' },
]

const rooms = [
  { name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' },
  { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800' },
  { name: 'Office', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800' },
]

const UserLayout = () => {
  return (
    <>
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-[#EAE8E3]">
        <img 
          src={heroimg}
          alt="Modern living room" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide drop-shadow-sm">Elevate Your Space</h1>
            <p className="text-lg md:text-xl font-light mb-10 tracking-wide text-gray-100">Curated collections for the modern home.</p>
            <button className="bg-white text-[#2C2C2C] px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#8C7A6B] hover:text-white transition-all duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-20">
        
        {/* Shop by Room */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-light text-[#2C2C2C] mb-2 tracking-wide">Shop by Room</h2>
              <p className="text-gray-500 font-light">Find exactly what you need for every space.</p>
            </div>
            <a href="#" className="text-sm border-b border-[#2C2C2C] pb-1 hover:text-[#8C7A6B] hover:border-[#8C7A6B] transition-colors">View All Rooms</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room, idx) => (
              <div key={idx} className="group relative h-100 overflow-hidden cursor-pointer">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl text-white font-light tracking-wide">{room.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-light text-[#2C2C2C] mb-2 tracking-wide">New Arrivals</h2>
              <p className="text-gray-500 font-light">Discover the latest additions to our collection.</p>
            </div>
            <a href="#" className="text-sm border-b border-[#2C2C2C] pb-1 hover:text-[#8C7A6B] hover:border-[#8C7A6B] transition-colors">Shop All</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative h-87.5 mb-4 overflow-hidden bg-[#F5F5F5]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white/95 backdrop-blur text-[#2C2C2C] py-3 text-sm font-medium hover:bg-[#2C2C2C] hover:text-white transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
                <h3 className="text-gray-800 font-medium mb-1 tracking-wide">{product.name}</h3>
                <p className="text-gray-500 font-light">{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
    <Footer />
    </>
  )
}

export default UserLayout