import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetProfileState } from '../redux/slice/userSlice';
import { updateAuthUser } from '../redux/slice/authSlice';

const AccountSettingsPage = ({ user }) => {
  const dispatch = useDispatch();
  
  const { loading, success, error } = useSelector((state) => state.user);

  // Form Field State Definitions
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');

  // Structured Shipping Address State Definitions
  const [addressLine, setAddressLine] = useState(user?.shippingAddress?.addressLine || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [state, setState] = useState(user?.shippingAddress?.state || '');
  const [postalCode, setPostalCode] = useState(user?.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(user?.shippingAddress?.country || '');

  // Operational Notification Toggle States
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [invitations, setInvitations] = useState(true);

  // Synchronize state values reactively if parent context changes or loads
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddressLine(user.shippingAddress?.addressLine || '');
      setCity(user.shippingAddress?.city || '');
      setState(user.shippingAddress?.state || '');
      setPostalCode(user.shippingAddress?.postalCode || '');
      setCountry(user.shippingAddress?.country || '');
    }
  }, [user]);

  // Clean up thunk lifecycle flags on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetProfileState());
    };
  }, [dispatch]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Group structural document changes for payload submission
    const payload = { 
      name, 
      email, 
      phone,
      shippingAddress: {
        addressLine,
        city,
        state,
        postalCode,
        country
      } 
    };

    if (password.trim() !== '') {
      payload.password = password;
    }

    dispatch(updateProfile(payload)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        const responsePayload = action.payload?.user ? action.payload.user : action.payload;
        const responseToken = action.payload?.token || responsePayload?.token;

        // Dispatches structural update back to authorization storage
        dispatch(updateAuthUser({
          ...responsePayload,
          token: responseToken,
        }));

        if (responseToken) {
          localStorage.setItem('userToken', responseToken);
        }

        setPassword('');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-16">
      <form onSubmit={handleUpdateProfile} className="w-full space-y-16 text-[#1A1A1A] font-sans antialiased animate-fadeIn">
        
        {/* Profile Details Header and Submission */}
        <section className="space-y-8">
          <div className="flex justify-between items-baseline border-b border-[#1A1A1A]/10 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-[#1A1A1A]">
              Profile Information
            </h2>
            <button 
              type="submit" 
              disabled={loading}
              className="text-[11px] tracking-widest uppercase font-semibold text-[#6B543D] hover:text-[#1A1A1A] transition-colors disabled:opacity-50 focus:outline-none"
            >
              {loading ? "Saving..." : "Save Edits"}
            </button>
          </div>

          {error && <p className="text-xs text-red-600 bg-red-50 p-3 border border-red-200 rounded">{error}</p>}
          {success && <p className="text-xs text-emerald-600 bg-emerald-50 p-3 border border-emerald-200 rounded">Account metadata updated cleanly.</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
                placeholder="+1 (555) 234-8901"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Update Security Password (Optional)
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
              />
            </div>
          </div>
        </section>

        {/* Shipping Address Inputs Section */}
        <section className="space-y-8">
          <div className="flex justify-between items-baseline border-b border-[#1A1A1A]/10 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif tracking-wide text-[#1A1A1A]">
              Shipping Address
            </h2>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
              Default Address
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300 md:col-span-2">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
                placeholder="420 Artisan Row, Suite 12"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
                placeholder="Tribeca"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                State / Region
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
                placeholder="New York"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Postal / ZIP Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
                placeholder="10013"
              />
            </div>

            <div className="relative border-b border-[#1A1A1A]/20 pb-2 focus-within:border-[#1A1A1A] transition-colors duration-300">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-transparent text-sm font-light tracking-wide focus:outline-none text-[#1A1A1A]"
                placeholder="United States"
              />
            </div>
          </div>
        </section>

        {/* Visual Brand Section — Material Identity */}
        <section className="pt-4">
          <div className="bg-[#F4F1EA] p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="w-24 h-24 bg-zinc-800 shrink-0 border border-[#1A1A1A]/10 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-black via-zinc-900 to-transparent repeating-linear"></div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-serif text-[#1A1A1A]">Material Identity</h3>
              <p className="text-xs text-[#57534E] font-light leading-relaxed max-w-xl">
                Your preferences help us curate materials that resonate with your personal aesthetic. Currently tracking: <span className="font-medium text-[#1A1A1A]">American Walnut</span> and <span className="font-medium text-[#1A1A1A]">Honed Travertine</span>.
              </p>
              <div className="flex gap-2 pt-1">
                <span className="w-4 h-4 rounded-full bg-[#3A2E2B] border border-black/10 block" title="American Walnut"></span>
                <span className="w-4 h-4 rounded-full bg-[#E5DCCB] border border-black/10 block" title="Honed Travertine"></span>
                <span className="w-4 h-4 rounded-full bg-[#F5F5F5] border border-black/10 block" title="Minimal Canvas"></span>
              </div>
            </div>
          </div>
        </section>

      </form>
    </div>
  );
};

export default AccountSettingsPage;