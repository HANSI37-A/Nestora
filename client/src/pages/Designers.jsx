import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners } from '../redux/slice/designerSlice';
import axiosInstance from '../utils/axiosInstance'; 

const Designers = () => {
  const dispatch = useDispatch();
  const { list: designers, loading, error } = useSelector((state) => state.designers);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); 

  useEffect(() => {
    dispatch(fetchDesigners());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      
      await axiosInstance.post('/api/contact', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setFormStatus('error');
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center font-serif text-sm tracking-widest">Loading Atelier Masters...</div>;
  if (error) return <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center text-xs text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased selection:bg-[#1A1A1A] selection:text-white">

      <section className="px-6 pt-36 md:pt-40 pb-12 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div className="space-y-3">
            <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-[#A8A29E]">The Architects</span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight max-w-2xl leading-[1.1]">Masters of the Geometric Narrative</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {designers.map((designer) => (
            <div key={designer._id} className="group space-y-6">
              <div className="aspect-square w-full overflow-hidden bg-[#F4F1EA]">
                <img src={designer.image} alt={designer.name} className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="space-y-1">
                <span className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#A8A29E]">{designer.role}</span>
                <h3 className="text-2xl font-serif tracking-wide">{designer.name}</h3>
              </div>
              <p className="text-xs text-[#555] font-light leading-relaxed tracking-wide group-hover:text-[#1A1A1A] transition-colors duration-300">
                {designer.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center border-t border-[#1A1A1A]/5">
        <div className="space-y-6">
          <span className="block font-serif text-3xl text-[#A8A29E] leading-none select-none opacity-60">"</span>
          <h2 className="text-3xl md:text-5xl font-serif italic tracking-wide text-[#1A1A1A] leading-[1.3] max-w-3xl mx-auto">
            "Design is the silent ambassador of your brand's heritage."
          </h2>
          <span className="block text-[9px] font-bold tracking-[0.3em] uppercase text-[#A8A29E] pt-2">The Nestora Manifesto</span>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-[#1A1A1A]/5 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
        <div className="md:col-span-5 space-y-10">
          <div className="space-y-3">
            <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-[#A8A29E]">Inquiries</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-[1.1]">Connect with our Atelier</h2>
          </div>
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider">Milan Studio</h4>
              <p className="text-xs text-[#A8A29E] font-light leading-relaxed">Via della Spiga, 15<br />20121 Milano MI, Italy</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider">Office Hours</h4>
              <p className="text-xs text-[#A8A29E] font-light leading-relaxed">Monday — Friday<br />09:00 — 18:00 CET</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center">
          <form onSubmit={handleInquirySubmit} className="space-y-10 w-full">

            <div className="space-y-2">
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#A8A29E]">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Arthur Vance"
                required
                className="w-full bg-transparent text-sm tracking-wide text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-3 focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#A8A29E]/40 font-light"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#A8A29E]">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="studio@example.com"
                required
                className="w-full bg-transparent text-sm tracking-wide text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-3 focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#A8A29E]/40 font-light"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-[#A8A29E]">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your project or inquiry..."
                required
                className="w-full bg-transparent text-sm tracking-wide text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2 focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#A8A29E]/40 font-light resize-none"
              />
            </div>

            {formStatus === 'success' && (
              <p className="text-xs tracking-widest uppercase text-[#6B8F71]">
                ✓ Your inquiry has been transmitted to our Atelier.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-xs tracking-widest uppercase text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="bg-[#1A1A1A] text-white text-[10px] font-bold tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#A8A29E] transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Inquiry →'}
              </button>
            </div>

          </form>
        </div>
      </section>

    </div>
  );
};

export default Designers;