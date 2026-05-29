import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../redux/slice/authSlice'; 
import MyOrdersPage from './MyOrdersPage';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 font-light text-gray-400">
          Redirecting to login...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

          {/* Profile Card */}
          <div className="w-full md:w-1/4 lg:w-1/4 shadow-md rounded-lg p-6 bg-white h-fit">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 truncate">
              {user?.name || "User Profile"}
            </h1>
            <p className="text-lg text-gray-600 mb-6 truncate">
              {user?.email}
            </p>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded font-medium hover:bg-red-600 transition duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4 bg-white shadow-sm rounded-lg p-6">
            <MyOrdersPage />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;