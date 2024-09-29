import React, { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  changeEmail,
  changeFullname,
  changeUsername,
  fetchUserInfo,
} from "../../../redux/slices/userSlice";

const ProfileMenu = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFormAnimation, setIsFormAnimation] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateUsername = async () => {
    if (newUsername.trim()) {
      await dispatch(changeUsername(newUsername));
      await dispatch(fetchUserInfo()); // show updated username without refreshing
    }
  };

  const updateFullname = async () => {
    if (newFirstName && newLastName) {
      await dispatch(changeFullname({ newFirstName, newLastName }));
      await dispatch(fetchUserInfo()); // show updated info
    }
  };

  const updateEmail = async () => {
    if (newEmail) {
      await dispatch(changeEmail(newEmail));
      await dispatch(fetchUserInfo()); // show updated info
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteUser());
    navigate("/login");
  };

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-full  shadow-custom shadow-gray-950">
      <div
        className={`bg-gray-800 bg-opacity-40 backdrop-blur-md p-10 rounded-lg  text-white shadow-lg shadow-gray-900  w-full max-w-md animate__animated ${
          isFormAnimation ? "animate__zoomIn" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Profile Settings
        </h2>

        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Avatar Upload
          </label>
          <div className="flex items-center">
            <div
              onClick={handleAvatarClick}
              className="h-16 w-16 rounded-full cursor-pointer bg-gray-600 flex items-center justify-center"
            >
              <span className="text-gray-400">Avatar</span>
            </div>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              ref={fileInputRef}
              className="hidden"
            />
            <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900">
              Upload
            </button>
          </div>
        </div>

        {/* Username Change */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <div className="flex">
            <input
              value={newUsername}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
            />
            <button
              onClick={updateUsername}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
            >
              Update
            </button>
          </div>
        </div>

        {/* Email Change */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <div className="flex">
            <input
              value={newEmail}
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
            <button
              onClick={updateEmail}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
            >
              Update
            </button>
          </div>
        </div>

        {/* First and Last Name Change */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First and Last Name
          </label>
          <div className="flex space-x-2">
            <input
              value={newFirstName}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder="First name"
            />
            <input
              value={newLastName}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder="Last name"
            />
            <button
              onClick={updateFullname}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
            >
              Update
            </button>
          </div>
        </div>

        {/* Password Change */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="flex">
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter new password"
            />
            <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900">
              Update
            </button>
          </div>
        </div>
        <hr />
        {/* Delete account */}
        <div className=" mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Delete account
          </label>
          <div className="flex justify-center">
            <button
              onClick={handleDeleteClick}
              className="bg-red-800 rounded-lg py-2 text-white w-full hover:bg-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
