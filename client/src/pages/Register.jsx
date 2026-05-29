import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import register from "../assets/register.webp";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) return;

    try {
      const result = await dispatch(registerUser({ name, email, password })).unwrap();
      
      if (result) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Failed to register user:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> 
      
      
      {/* Main Section */}
      <div className="flex flex-1">

        {/* Left Side - Register Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:px-16 bg-white">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Rabbit
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Create an account to get started. 
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Register
              </h2>

              <p className="text-sm text-gray-500 text-center mb-8">
                Create a new account to get started
              </p>

              {/* Name */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition duration-300 shadow-md"
              >
                Register
              </button>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "} 
                <Link
                  to="/login" 
                  className="text-black font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden"> 
          <img
            src={register}
            alt="Register for account"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div> 
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white"> 
            <h2 className="text-5xl font-extrabold mb-4 leading-tight">
              Discover Your <br /> Perfect Style
            </h2>
            <p className="text-base text-gray-200 max-w-md leading-relaxed">
              Shop the latest trends with premium quality fashion designed for your everyday lifestyle.
            </p>
          </div>
        </div>

      </div>

      
    </div>
  );
};

export default Register;