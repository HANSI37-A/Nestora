import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import register from "../assets/register.webp";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [joinJournal, setJoinJournal] = useState(false); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) return;
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
  
    <div className="flex min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased select-none"> 
      <div className="flex flex-1 w-full sm:pt-24">

        <div className="hidden md:flex md:w-1/2 relative overflow-hidden "> 
          <img
            src={register}
            alt="Nestora Architectural Space"
            className="w-full h-full object-cover"
          />
                 

          <div className="absolute bottom-16 left-12 right-12 text-white max-w-md"> 
            <span className="text-[10px] font-bold tracking-[0.25em] text-gray-300 uppercase block mb-2">
              Architectural Heritage
            </span>
            <h2 className="text-4xl font-serif leading-tight tracking-wide">
              Design that transcends <br /> time and space.
            </h2>
          </div>
        </div>


        <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 sm:px-16 lg:px-24 bg-[#F9F7F2]">
          <div className="w-full max-w-sm">

            <div className="mb-10">
              <h1 className="text-3xl font-serif text-[#1A1A1A] mb-2 font-normal tracking-wide">
                Create an Account
              </h1>
              <p className="text-xs text-[#A8A29E] leading-relaxed font-light">
                Join our curated community of designers and collectors.
              </p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="relative border-b border-[#1A1A1A]/20 pb-1 focus-within:border-[#1A1A1A] transition-colors duration-300">
                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mies van der Rohe"
                  className="w-full bg-transparent text-sm font-light tracking-wide placeholder-[#A8A29E]/40 focus:outline-none text-[#1A1A1A]"
                  required
                />
              </div>

              <div className="relative border-b border-[#1A1A1A]/20 pb-1 focus-within:border-[#1A1A1A] transition-colors duration-300">
                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                  Email Address
                </label>
                <input
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mies@bauhaus.de"
                  className="w-full bg-transparent text-sm font-light tracking-wide placeholder-[#A8A29E]/40 focus:outline-none text-[#1A1A1A]"
                  required
                />
              </div>

              <div className="relative border-b border-[#1A1A1A]/20 pb-1 focus-within:border-[#1A1A1A] transition-colors duration-300">
                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm font-light tracking-widest placeholder-[#A8A29E]/40 focus:outline-none text-[#1A1A1A]"
                  required
                />
              </div>

              <div className="relative border-b border-[#1A1A1A]/20 pb-1 focus-within:border-[#1A1A1A] transition-colors duration-300">
                <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm font-light tracking-widest placeholder-[#A8A29E]/40 focus:outline-none text-[#1A1A1A]"
                  required
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="journal-opt-in"
                  type="checkbox"
                  checked={joinJournal}
                  onChange={(e) => setJoinJournal(e.target.checked)}
                  className="mt-0.5 w-3.5 h-3.5 accent-[#1A1A1A] border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="journal-opt-in" className="text-[11px] text-[#A8A29E] leading-normal font-light">
                  Join the <span className="font-medium text-[#1A1A1A]">Nestora Journal</span> for early access to new collections and architectural stories.
                </label>
              </div>

              <div className="pt-4 space-y-6">
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#6B543D] transition-colors duration-300 shadow-sm"
                >
                  Join Nestora
                </button>

                <p className="text-center text-xs text-[#A8A29E] font-light">
                  Already a member?{" "} 
                  <Link
                    to="/login" 
                    className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:text-[#6B543D] transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

            </form>

            <div className="mt-16 flex items-center justify-between text-[10px] tracking-wide text-[#A8A29E]/50 font-light">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-black block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#6B543D]/50 block"></span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;