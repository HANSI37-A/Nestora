import { useState } from 'react'
import { FaBars } from 'react-icons/fa';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
       <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-medium ml-4">Admin Dashboard</h1>
       </div>
    </div>

  );

};

export default AdminLayout;