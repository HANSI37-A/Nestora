import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ShowroomDetails = () => {
  const { id } = useParams();
  const [showroom, setShowroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    date: "",
    timeSlot: "Morning (10:00 - 12:00)",
    interest: "General Viewing"
  });
  const [formStatus, setFormStatus] = useState("idle"); 
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchShowroomDetails = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const response = await axios.get(`${BACKEND_URL}/api/showrooms/${id}`);
        setShowroom(response.data);
      } catch (err) {
        console.error("Error loading showroom layout details:", err);
        setError("Failed to resolve dynamic showroom layout profiling.");
      } finally {
        setLoading(false);
      }
    };

    fetchShowroomDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setFormStatus("sending");

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      
      const payload = {
        name: bookingData.fullName,
        email: bookingData.email,
        message: `Private Viewing Request for ${showroom.name} (${showroom.location}). Scheduled Date: ${bookingData.date} during ${bookingData.timeSlot}. Nature of interest: ${bookingData.interest}.`
      };

      await axios.post(`${BACKEND_URL}/api/contact`, payload);
      
      setFormStatus("success");
      setBookingData({
        fullName: "",
        email: "",
        date: "",
        timeSlot: "Morning (10:00 - 12:00)",
        interest: "General Viewing"
      });
    } catch (err) {
      console.error("Booking transmission failure:", err);
      setFormStatus("error");
      setBookingError(err.response?.data?.message || "Failed to submit invitation request.");
    }
  };

  if (loading) return <div className="text-center py-20 text-sm tracking-widest text-gray-400">LOADING SPATIAL ENVIRONMENT...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!showroom) return <div className="text-center py-20">Showroom not found.</div>;

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-12 lg:px-24">
        {/* Back Navigation */}
        <Link to="/showrooms" className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black mb-12 inline-block transition-colors">
          ← Back to Showrooms
        </Link>

        {/* Structural Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 max-w-7xl mx-auto">
          
          {/* Left Column: Editorial Narrative & Architectural Profile */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#A8A29E] uppercase block">
                The Narrative
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-normal text-[#1A1A1A] tracking-wide leading-tight max-w-md">
                {showroom.name}
              </h1>
              <p className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest block pt-1">
                {showroom.location}
              </p>
            </div>

            <div className="space-y-6 border-b border-[#1A1A1A]/10 pb-8 text-sm text-gray-600 leading-relaxed font-light text-justify">
              <p>
                {showroom.description}
              </p>
              <p className="text-xs text-[#A8A29E] font-normal italic">
                Inviting a slower, more deliberate appreciation of form and structural balance.
              </p>
            </div>

            {/* Technical Matrix Specifications Footer */}
            <div className="pt-2 text-xs font-sans">
              <span className="text-[#A8A29E] font-bold uppercase tracking-widest block mb-2 text-[10px]">
                Spatial Footprint
              </span>
              <p className="text-xl font-mono tracking-tight text-[#1A1A1A]">{showroom.dimensions}</p>
            </div>
          </div>

          {/* Right Column: Image Representation */}
          <div className="relative order-1 lg:order-2 w-full aspect-square sm:aspect-[4/5] lg:aspect-square bg-[#F4F2EC] rounded-none overflow-hidden shadow-sm">
            <img 
              src={showroom.image} 
              alt={showroom.name} 
              className="w-full h-full object-cover scale-100 hover:scale-[1.02] transition-all duration-1000 ease-out"
            />
          </div>

        </div>

        <div className="bg-black text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl antialiased">
          
          {/* Left Text Detail Area */}
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-wide text-white leading-tight">
                Schedule a Private <br className="hidden sm:inline" /> Viewing
              </h2>
              <p className="text-sm text-gray-400 font-light max-w-md leading-relaxed">
                Reserve a dedicated hour with a senior curator to explore the collection in a private setting. We recommend booking 48 hours in advance.
              </p>
            </div>

            {/* Meta Footer Row Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs font-sans">
              <div>
                <span className="text-gray-500 font-bold uppercase tracking-widest block mb-2 text-[10px]">Opening Hours</span>
                <p className="text-gray-300 font-light">Mon — Fri: 10:00 — 18:00</p>
                <p className="text-gray-400 font-light italic mt-0.5">Sat: By appointment only</p>
              </div>
              <div>
                <span className="text-gray-500 font-bold uppercase tracking-widest block mb-2 text-[10px]">Email</span>
                <a href="mailto:milan@nestora.design" className="text-gray-300 font-light hover:underline block">
                  milan@nestora.design
                </a>
              </div>
            </div>
          </div>

          {/* Right Floating Interactivity Form Card */}
          <div className="bg-[#FAF9F5] text-[#1A1A1A] p-8 sm:p-12 lg:col-span-5 flex flex-col justify-center">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Full Name Input Field */}
              <div className="flex flex-col border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                <label className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  placeholder="E.g. Elena Rossi"
                  value={bookingData.fullName}
                  onChange={handleInputChange}
                  className="bg-transparent border-none outline-none text-sm placeholder-gray-300 font-light py-1"
                />
              </div>

              {/* Email Address Input Field */}
              <div className="flex flex-col border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                <label className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="studio@example.com"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  className="bg-transparent border-none outline-none text-sm placeholder-gray-300 font-light py-1"
                />
              </div>

              {/* Date & Time Dynamic Flex Box Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Select Date Input */}
                <div className="flex flex-col border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                  <label className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Select Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-sm font-light py-1 cursor-pointer"
                  />
                </div>

                {/* Select Time Dropdown */}
                <div className="flex flex-col border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                  <label className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Time</label>
                  <select
                    name="timeSlot"
                    value={bookingData.timeSlot}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-sm font-light py-1 cursor-pointer appearance-none"
                  >
                    <option value="Morning (10:00 - 12:00)">Morning (10:00 - 12:00)</option>
                    <option value="Afternoon (13:00 - 15:00)">Afternoon (13:00 - 15:00)</option>
                    <option value="Late Afternoon (15:30 - 17:30)">Late Afternoon (15:30 - 17:30)</option>
                  </select>
                </div>
              </div>

              {/* Interest Assessment Dropdown */}
              <div className="flex flex-col border-b border-gray-300 pb-2 focus-within:border-black transition-colors">
                <label className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Interest</label>
                <select
                  name="interest"
                  value={bookingData.interest}
                  onChange={handleInputChange}
                  className="bg-transparent border-none outline-none text-sm font-light py-1 cursor-pointer appearance-none"
                >
                  <option value="General Viewing">General Viewing</option>
                  <option value="Architectural Consultancy">Architectural Consultancy</option>
                  <option value="Interior Framework Customization">Interior Framework Customization</option>
                  <option value="Commercial Structural Acquisition">Commercial Structural Acquisition</option>
                </select>
              </div>

              {/* Server Context State Messaging Indicators */}
              {formStatus === 'success' && (
                <div className="text-xs text-[#6B8F71] bg-[#6B8F71]/5 p-2.5 rounded border border-[#6B8F71]/20 text-center font-medium tracking-widest uppercase">
                  ✓ Your invitation has been transmitted to our Atelier.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200 text-center font-medium uppercase tracking-wider">
                  {bookingError || "Something went wrong. Please try again."}
                </div>
              )}

              {/* Action Invitation Request Button */}
              <button 
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-black text-white text-xs font-bold tracking-[0.2em] uppercase py-4 rounded hover:bg-gray-900 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? 'Transmitting...' : 'Request Invitation'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowroomDetails;