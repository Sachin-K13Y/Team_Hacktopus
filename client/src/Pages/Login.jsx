import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services";


function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/sign-in',formData);
      console.log(response.data);
      if(response.data.success){
        navigate('/');
      }

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <section className="bg-[#082032] min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-[#0f2d46] p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-[#FF6D52] text-center mb-6">
          Login to MargDarshan Hub
        </h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#082032] text-white border border-[#FF6D52] focus:outline-none focus:ring-2 focus:ring-[#FF6D52]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#082032] text-white border border-[#FF6D52] focus:outline-none focus:ring-2 focus:ring-[#FF6D52]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF6D52] text-white font-semibold py-3 rounded-md hover:bg-[#e04323] transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-[#FF6D52] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;