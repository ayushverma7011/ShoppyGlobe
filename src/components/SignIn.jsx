import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLogin } from '../utils/userSlice';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isSignUp) {
      // 🔹 REGISTER
      const res = await axios.post(
        "http://localhost:8080/api/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      alert(res.data.message || "Account created successfully");
    } else {
      // 🔹 LOGIN
      const res = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      // const token= res.data.accessToken;
      const userName = res.data.name;
      const token = res.data.accessToken; // Check both common names
// console.log("Token received:", token);

      // save token
      localStorage.setItem("token",token);
      localStorage.setItem("userName", userName);
      dispatch(setLogin({name: userName, token: token})); 

      alert("Login successful");
    }

    navigate("/");
  } catch (error) {
    alert(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong"
    );
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {isSignUp ? "Join ShoppyGlobe today!" : "Please enter your details."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* ✅ CONDITIONAL NAME FIELD (Only shows if isSignUp is true) */}
          {isSignUp && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
          >
            {isSignUp ? "Create My Account" : "Sign In"}
          </button>
        </form>

        <div className="pt-4 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button 
              type="button"
              className="ml-2 text-indigo-600 font-bold hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Log in instead" : "Create one now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;