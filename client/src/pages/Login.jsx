import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      console.log("LOGIN SUCCESS:", result);

      console.log("TOKEN AFTER LOGIN:", result?.token);

      navigate("/");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased select-none">
      <div className="flex flex-1 w-full">
        
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden pt-36 sm:pt-24">
          <img
            src={login}
            alt="Nestora Living Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-serif tracking-wide mb-1">Nestora</h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-300 font-light">
              ESTABLISHED 1924
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 sm:px-16 lg:px-24 bg-[#F9F7F2]">
          <div className="w-full max-w-sm">

            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] mb-3 font-normal tracking-wide">
                Welcome Back
              </h1>
              <p className="text-xs text-[#A8A29E] leading-relaxed max-w-xs font-light">
                Please enter your credentials to access the private gallery.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="relative border-b border-[#1A1A1A]/20 pb-1 focus-within:border-[#1A1A1A] transition-colors duration-300">
                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@nestora.com"
                  className="w-full bg-transparent text-sm font-light tracking-wide placeholder-[#A8A29E]/40 focus:outline-none text-[#1A1A1A]"
                  required
                />
              </div>


              <div className="relative border-b border-[#1A1A1A]/20 pb-1 focus-within:border-[#1A1A1A] transition-colors duration-300">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-[9px] tracking-[0.1em] uppercase text-[#A8A29E] hover:text-[#1A1A1A] transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm font-light tracking-widest placeholder-[#A8A29E]/40 focus:outline-none text-[#1A1A1A]"
                  required
                />
              </div>

              <div className="space-y-4 pt-4">
                
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#6B543D] transition-colors duration-300 shadow-sm"
                >
                  Sign In
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#A8A29E]/10"></div>
                  <span className="flex-shrink mx-4 text-[9px] uppercase tracking-widest text-[#A8A29E] font-light">or</span>
                  <div className="flex-grow border-t border-[#A8A29E]/10"></div>
                </div>

                <Link
                  to="/register"
                  className="block w-full text-center bg-transparent text-[#1A1A1A] border border-[#1A1A1A]/20 py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:border-[#1A1A1A] transition-colors duration-300"
                >
                  Create an Account
                </Link>
              </div>
            </form>


            <div className="mt-20 text-center">
              <p className="text-[10px] tracking-wide text-[#A8A29E]/70 font-light">
                &copy; {new Date().getFullYear()} Nestora Architectural Furniture
              </p>
            </div>

          </div>
        </div>

      </div>

    
    </div>
  );
};

export default Login;