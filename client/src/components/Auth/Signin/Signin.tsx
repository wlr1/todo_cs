import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../../redux/slices/authSlice/asyncActions";
import { AppDispatch, RootState } from "../../../redux/store";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        dispatch(loginUser({ email, password })).unwrap();

        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }

        navigate("/todo");
      } catch (error) {
        console.error("Login failed: ", error);
      }
    },
    [dispatch, email, password, navigate, rememberMe]
  );

  const togglePassword = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2  bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </>

          {/* Password Field */}
          <>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative ">
              <input
                type={!isVisible ? "password" : "text"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full pl-4 pr-8 py-2  bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <div
                className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={togglePassword}
              >
                {isVisible ? (
                  <IoEyeOutline size={23} color="lightgray" />
                ) : (
                  <IoEyeOffOutline size={23} color="lightgray" />
                )}
              </div>
            </div>
          </>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center ">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className=" h-4 w-4 text-indigo-600 bg-white/20 border-gray-600 rounded focus:ring-indigo-500"
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
            disabled={isLoading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all duration-300"
          >
            Sign In
          </button>
        </form>
        {/* Error Handling */}
        {error && (
          <p className="text-red-500 text-center mt-4">
            {typeof error === "string"
              ? error
              : "An error occurred. Try again."}
          </p>
        )}

        {/* Sign Up Option */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
