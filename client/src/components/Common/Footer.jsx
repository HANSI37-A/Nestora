import { Link } from "react-router-dom"; 
import { RiInstagramLine, RiTwitterXLine, RiFacebookCircleLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-neutral-900">
      
      
      <div className="max-w-7xl mx-auto px-8 sm:px-12 py-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

      
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-2xl font-serif tracking-[0.2em] uppercase text-white mb-6">
              Nestora
            </h3>
            <p className="text-[#A8A29E] text-xs font-light leading-relaxed max-w-sm tracking-wide">
              Architectural furniture for spaces of distinction. Crafting heritage since 1974.
            </p>
          </div>
          
          <div className="flex space-x-5 text-[#A8A29E]">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram link">
              <RiInstagramLine size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter link">
              <RiTwitterXLine size={16} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook link">
              <RiFacebookCircleLine size={18} />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-3 lg:col-start-7">
          <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A8A29E] mb-6">
            Company
          </h4>
          <ul className="space-y-4 text-xs font-light tracking-wide text-[#A8A29E]">
            <li><Link to="#" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Our Heritage</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Design Studio Journal</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Artisanal Showrooms</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-3">
          <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A8A29E] mb-6">
            Legal
          </h4>
          <ul className="space-y-4 text-xs font-light tracking-wide text-[#A8A29E]">
            <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Cookie Configurations</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">White-Glove Logistics</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-neutral-900 max-w-7xl mx-auto px-8 sm:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.15em] uppercase text-neutral-500 font-medium">
        <div>
          © 2026 Nestora Architectural Furniture. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-white transition-colors">EU</span>
          <span className="cursor-pointer hover:text-white transition-colors">US</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;