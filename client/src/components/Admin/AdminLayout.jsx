import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center z-30">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars size={24} />
        </button>

        <h1 className="ml-4 text-xl font-semibold">
          Admin Dashboard
        </h1>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-30 w-64 min-h-screen bg-gray-900 text-white transform transition-transform duration-300 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 mt-16 md:mt-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;