import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    codeforces: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  // Create twinkling stars for background effect
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Frontend-only: Just simulate loading and navigation
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <section className="min-h-screen mt-[60px] flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#0f2d46] to-[#082032] relative overflow-hidden">
      {/* Twinkling star background */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Glowing orb decoration */}
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-[#FF6D52] opacity-10 filter blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#4C8BF5] opacity-10 filter blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-[#112240] bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-[#1e2a3a] transform transition-all hover:shadow-[0_20px_50px_rgba(255,109,82,0.3)]">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-[#FF6D52] to-[#FF8E7D] h-2"></div>

          <div className="p-8">
            {/* Logo/Title with animation */}
            <div className="flex flex-col items-center mb-8 transform hover:scale-105 transition duration-300">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6D52] to-[#FF9E7D] mb-2">
                Join MargDarshan
              </h1>
              <p className="text-gray-400 text-sm">Begin your competitive programming journey</p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#FF6D52] to-[#FF9E7D] mt-2 rounded-full"></div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg text-red-300 text-sm flex items-center animate-shake">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#FF6D52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Codeforces ID
                </label>
                <input
                  type="text"
                  name="codeforces"
                  value={formData.codeforces}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent transition duration-200 placeholder-gray-500"
                  placeholder="e.g. tourist"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Your Codeforces username for verification</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#FF6D52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent transition duration-200 placeholder-gray-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#FF6D52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0a192f] text-gray-200 border border-[#1e2a3a] focus:outline-none focus:ring-2 focus:ring-[#FF6D52] focus:border-transparent transition duration-200 placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${formData.password.length > 8 ? 'bg-green-500' : formData.password.length > 5 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, formData.password.length * 10)}%` }}></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-400">
                    {formData.password.length > 8 ? 'Strong' : formData.password.length > 5 ? 'Medium' : 'Weak'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-300 flex items-center justify-center ${isLoading ? 'bg-[#FF6D52] opacity-80' : 'bg-gradient-to-r from-[#FF6D52] to-[#FF9E7D] hover:from-[#FF9E7D] hover:to-[#FF6D52] shadow-lg hover:shadow-xl transform hover:-translate-y-1'}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#FF6D52] hover:text-[#FF9E7D] font-medium transition duration-200 relative group"
                >
                  Login
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FF9E7D] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center">
            <span className="h-px w-8 bg-gray-600"></span>
            <span className="text-gray-500 text-xs px-2">Secure Registration</span>
            <span className="h-px w-8 bg-gray-600"></span>
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="p-2 rounded-lg bg-[#112240] border border-[#1e2a3a] flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs text-gray-400">256-bit Encryption</span>
            </div>
            <div className="p-2 rounded-lg bg-[#112240] border border-[#1e2a3a] flex items-center">
              <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-gray-400">Secure Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;