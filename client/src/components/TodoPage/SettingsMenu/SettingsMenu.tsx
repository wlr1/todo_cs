import React, { useEffect, useState } from "react";
import { SettingsMenuProps } from "../../../utility/types/types";

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  currentBlur,
  setCurrentBlur,
  isUsernameHide,
  setIsUsernameHide,
}) => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  //reading blur value from storage and set it as the init value
  useEffect(() => {
    const savedBlur = localStorage.getItem("blurValue");
    if (savedBlur) {
      setCurrentBlur(Number(savedBlur));
    }
  }, [setCurrentBlur]);

  //saving blur value to the storage, when its changes
  useEffect(() => {
    localStorage.setItem("blurValue", currentBlur.toString());
  }, [currentBlur]);

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-full shadow-custom shadow-gray-950">
      <div
        className={`bg-gray-800 bg-opacity-40 backdrop-blur-md p-10 rounded-lg w-96 text-white shadow-lg shadow-gray-900 animate__animated ${
          isFormAnimation ? "animate__zoomIn" : ""
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Settings</h2>

        {/* Blur Control */}
        <div className="mb-8">
          <label className="block text-lg mb-4">Adjust Blur</label>
          <input
            type="range"
            value={currentBlur}
            min="0"
            max="25"
            onChange={(e) => setCurrentBlur(Number(e.target.value))}
            className="w-full appearance-none h-2 bg-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <span className="block text-sm mt-3 text-gray-300">
            Current Blur: {currentBlur}px
          </span>
        </div>

        {/* Sound Control */}
        <div className="mb-8">
          <label className="block text-lg mb-4">Sound</label>
          <button className="w-full p-3 rounded-lg text-lg font-medium bg-teal-500 hover:bg-teal-600 focus:outline-none transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md shadow-teal-500">
            Sound On
          </button>
        </div>

        {/* Background Image Control */}
        <div>
          <label className="block text-lg mb-4">Change Background Image</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600 transition-all duration-200 ease-in-out file:cursor-pointer"
          />
        </div>

        <div className="">
          <label className="block text-lg my-4">
            Show Fullname instead of Username?
          </label>
          <select
            value={isUsernameHide}
            onChange={(e) => setIsUsernameHide(e.target.value)}
            className="w-full p-3 text-white bg-[#1c1e22] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
