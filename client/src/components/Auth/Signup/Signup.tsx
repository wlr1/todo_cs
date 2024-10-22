import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/slices/authSlice/asyncActions";
import { AppDispatch, RootState } from "../../../redux/store";
import EmailModal from "../EmailModal/EmailModal";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //check if email
  const validateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "email") {
      setIsEmailValid(validateEmail(value));
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isEmailValid) {
        dispatch(registerUser(formData));
        if (!error) {
          navigate("/login");
        }
      }
    },
    [dispatch, formData, navigate, error, isEmailValid]
  );

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

        <form className="space-y-6" onSubmit={handleSubmit}>
          {["firstname", "lastname", "username", "email", "password"].map(
            (field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-300"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 bg-white/20 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    !isEmailValid && field === "email"
                      ? "border border-red-500"
                      : ""
                  }`}
                  placeholder={`Enter your ${field}`}
                />
                {!isEmailValid && field === "email" && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
            )
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {typeof error === "string"
                ? error
                : "An error occurred. Try again."}
            </p>
          )}
        </form>
        {/* Already have an account? */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      <EmailModal />
    </div>
  );
};

export default Signup;
