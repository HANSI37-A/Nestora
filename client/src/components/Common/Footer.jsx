import { Link } from "react-router-dom"; 
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F7] border-t border-gray-200 ">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-light text-gray-800 mb-4 tracking-wide">
            Stay Inspired
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Get updates on new arrivals, curated collections, and exclusive offers.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Enjoy 10% off your first order.
          </p>

          <form className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-[#8C7A6B]">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 w-full text-sm outline-none"
              required
            />
            <button className="bg-[#2C2C2C] text-white px-5 py-3 text-sm hover:bg-[#8C7A6B] transition-colors">
              Join
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-light text-gray-800 mb-4 tracking-wide">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="#" className="hover:text-[#8C7A6B]">About Us</Link></li>
            <li><Link to="#" className="hover:text-[#8C7A6B]">Contact</Link></li>
            <li><Link to="#" className="hover:text-[#8C7A6B]">FAQ</Link></li>
            <li><Link to="#" className="hover:text-[#8C7A6B]">Features</Link></li>
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-lg font-light text-gray-800 mb-4 tracking-wide">
            Customer Care
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="#" className="hover:text-[#8C7A6B]">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-[#8C7A6B]">Order Tracking</Link></li>
            <li><Link to="#" className="hover:text-[#8C7A6B]">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-[#8C7A6B]">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-light text-gray-800 mb-4 tracking-wide">
            Connect
          </h3>

          <div className="flex space-x-4 mb-6 text-gray-600">
            <a href="#" className="hover:text-[#8C7A6B] transition-colors">
              <TbBrandMeta size={20} />
            </a>
            <a href="#" className="hover:text-[#8C7A6B] transition-colors">
              <IoLogoInstagram size={20} />
            </a>
            <a href="#" className="hover:text-[#8C7A6B] transition-colors">
              <RiTwitterXLine size={20} />
            </a>
          </div>

          <p className="text-sm text-gray-500 mb-2">Call us</p>
          <p className="text-sm text-gray-700 flex items-center">
            <FiPhoneCall className="mr-2" /> 012 345 6789
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2026 NestOra. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;