import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";

const Signup = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgAuth bg-cover bg-center relative">
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Register Form */}
      <div
        className={`relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg shadow-gray-800 w-full max-w-md animate__animated animate__slow ${
          isFormAnimation ? "animate__fadeInDown" : ""
        }`}
      >
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          Register
        </h1>

        <form className="space-y-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your last name"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-2 bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          Already have an account?{" "}
          <a className="text-indigo-400 hover:underline">
            <Link to="/login">Sign In</Link>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
