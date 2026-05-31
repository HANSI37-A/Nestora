import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer'; 

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F9F7F2] font-sans text-[#1A1A1A] antialiased">
      {/* Structural Sticky Header layout */}
      <Navbar />
      
      <main className="min-h-[calc(100vh-24rem)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout;