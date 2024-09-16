import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="bg-bgNotFound min-h-screen flex items-center justify-center bg-cover bg-center relative ">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div
        className={`relative bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-md shadow-red-800 w-full max-w-md animate__animated  ${
          isFormAnimation ? "animate__fadeInDown" : ""
        }`}
      >
        <img
          src="/utility/img/notfound.png"
          alt="not found"
          className="size-32 mx-auto"
        />
        <h1 className="text-3xl font-bold text-center text-red-600">
          PAGE NOT FOUND!
        </h1>
        <div className="flex justify-center mt-4">
          <h2 className="font-semibold text-xl text-btnTodo text-wrap text-center">
            This page is does not exist! Please go back to the{" "}
            <span className="font-bold underline text-red-600 hover:text-red-900">
              <Link to="/login">Login</Link>
            </span>{" "}
            screen.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
