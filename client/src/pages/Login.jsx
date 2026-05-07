import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
import login from "../assets/login.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-1">

        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:px-16 bg-white">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Rabbit
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Welcome back! Please sign in to continue.
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Sign In
              </h2>

              <p className="text-sm text-gray-500 text-center mb-8">
                Enter your username and password to login
              </p>

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
                Sign In
              </button>

            
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </p>

            </form>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <img
            src={login}
            alt="Login to account"
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

      <Footer />
    </div>
  );
};

export default Login;