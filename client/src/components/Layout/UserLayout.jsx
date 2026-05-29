import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer'; 

const UserLayout = () => {
  return (
    <>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAFAFA] font-sans">
        {/* Your premium sticky navbar is now declared globally here */}
        <Navbar />
        
        {/* The Outlet dynamically switches between Home, Collection, Profile, etc. */}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default UserLayout;