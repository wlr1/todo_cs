import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";

const Signin = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgAuth bg-cover bg-center relative ">
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Sign In Form */}
      <div
        className={`relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg shadow-gray-800 w-full max-w-md animate__animated animate__slow ${
          isFormAnimation ? "animate__fadeInDown" : ""
        }`}
      >
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          Sign In
        </h1>

        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 bg-white/20 border-gray-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-300 text-sm">
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-indigo-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Option */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          Don't have an account?{" "}
          <a className="text-indigo-400 hover:underline">
            <Link to="/register">SignUp</Link>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
