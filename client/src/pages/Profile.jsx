import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { logout } from '../redux/slice/authSlice'; 
import MyOrdersPage from './MyOrdersPage';
import AccountSettings from './AccountSettings';
import { clearCart } from '../redux/slice/cartSlice'; 
import axiosInstance from '../utils/axiosInstance'; 

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, useStateActiveTab] = useState('overview');

  const { user, token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const checkoutId = searchParams.get('checkout_id');
    const sessionId = searchParams.get('session_id');

    if (checkoutId && sessionId && token) {
      const finalizeOrderProcess = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          await axiosInstance.put(
            `/checkout/${checkoutId}/pay`,
            { sessionId },
            config
          );

          dispatch(clearCart());
          localStorage.removeItem('cartItems');
          navigate(`/order-confirmation/${checkoutId}`, { replace: true });
        } catch (error) {
          console.error("Failed to securely process order fulfillment context:", error);
          navigate('/profile', { replace: true });
        }
      };

      finalizeOrderProcess();
    }
  }, [searchParams, navigate, token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <div className="text-center p-10 font-serif text-[#A8A29E] tracking-wide text-lg animate-pulse">
          Loading your sanctuary...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased">

      <aside className="hidden md:flex flex-col w-64 border-r border-[#1A1A1A]/5 bg-[#F4F1EA] p-6 pt-28 justify-between shrink-0">
        <div className="space-y-10">
         
          <div className="pt-2">
            <h2 className="text-2xl font-serif tracking-wide text-[#1A1A1A]">Nestora</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <span className="block text-[9px] font-bold tracking-widest uppercase text-[#A8A29E]">
                Welcome Back
              </span>
              <h4 className="text-xs font-semibold tracking-wide text-[#1A1A1A] max-w-[140px] truncate">
                {user?.name || "Member"}
              </h4>
              <p className="text-[10px] text-[#A8A29E] max-w-[140px] truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => useStateActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wide rounded transition-all duration-200 ${
                activeTab === 'overview' 
                  ? 'bg-[#EAE5DB] text-[#1A1A1A]' 
                  : 'text-[#A8A29E] hover:text-[#1A1A1A]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'overview' ? 'bg-[#1A1A1A]' : 'bg-transparent'}`}></span>
              Overview
            </button>
            
            <button 
              onClick={() => useStateActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium tracking-wide rounded transition-all duration-200 ${
                activeTab === 'settings' 
                  ? 'bg-[#EAE5DB] text-[#1A1A1A]' 
                  : 'text-[#A8A29E] hover:text-[#1A1A1A]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'settings' ? 'bg-[#1A1A1A]' : 'bg-transparent'}`}></span>
              Account Settings
            </button>
          </nav>
        </div>

        <div>
          <button 
            onClick={handleLogout}
            className="w-full text-center bg-transparent border border-[#1A1A1A]/10 text-[#1A1A1A] text-[10px] font-semibold tracking-[0.2em] uppercase py-2.5 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </aside>

  
      <main className="flex-1 overflow-y-auto px-6 pt-36 sm:pt-40 pb-12 md:px-12 lg:px-16 w-full">
  
        <header className="mb-10 w-full border-b border-[#1A1A1A]/10 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-4">
            Welcome back, {user?.name?.split(' ')[0] || "Collector"}.
          </h1>
          <p className="text-sm text-[#A8A29E] leading-relaxed font-light max-w-3xl">
            Your personal sanctuary of design and heritage. Review your recent acquisitions, shipping allocations, and curated selections.
          </p>
        </header>

        {activeTab === 'overview' ? (
          <div className="space-y-4 w-full animate-fadeIn">
            <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#A8A29E]">
              01. Latest Acquisitions
            </span>
            <div className="bg-[#F4F1EA]/50 border border-[#1A1A1A]/5 rounded p-2 sm:p-4 w-full">
              {token ? <MyOrdersPage token={token} /> : <p className="text-xs text-gray-400">Verifying session token context...</p>}
            </div>
          </div>
        ) : (
          <div className="w-full animate-fadeIn">
            <AccountSettings user={user} />
          </div>
        )}

      </main>
    </div>
  );
};

export default Profile;