import { FaMeta } from "react-icons/fa6";
import { FaInstagram, FaFacebook } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="bg-[#2C2C2C] text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaMeta className="h-5 w-5" />
          </a>
           <a href="#" className="hover:text-gray-300 transition-colors">
            <FaInstagram className="h-5 w-5" />
          </a>
           <a href="#" className="hover:text-gray-300 transition-colors">
            <FaFacebook className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center grow">
          <span className="tracking-wide text-gray-200">&copy; 2026 Nestora. All rights reserved.</span>
        </div>
      </div>


    </div>
  );
};

export default Topbar;
