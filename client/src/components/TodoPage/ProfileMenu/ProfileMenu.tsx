import React, { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  changeEmail,
  changeFullname,
  changePassword,
  changeUsername,
  fetchUserInfo,
  getAvatar,
  uploadAvatar,
} from "../../../redux/slices/userSlice";

const ProfileMenu = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isFormAnimation, setIsFormAnimation] = useState(false);
  const [formData, setFormData] = useState({
    newUsername: "",
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    newPassword: "",
    currentPassword: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  //onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //avatar input
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //choose avatar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setAvatarFile(selectedFile);

      const previewUrl = URL.createObjectURL(selectedFile);
      setAvatarPreview(previewUrl);
    }
  };

  //upload avatar
  const handleAvatarUpload = async () => {
    if (avatarFile) {
      await dispatch(uploadAvatar(avatarFile));
      await dispatch(getAvatar()); //update avatar without reload
      setAvatarFile(null);
      setAvatarPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  //cancel avatar upload
  const handleCancelClick = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //username
  const updateUsername = async () => {
    if (formData.newUsername.trim()) {
      await dispatch(changeUsername(formData.newUsername));
      await dispatch(fetchUserInfo()); // show updated username without refreshing
      setFormData((prevData) => ({
        //clear input after update
        ...prevData,
        newUsername: "",
      }));
    }
  };

  //fullname
  const updateFullname = async () => {
    if (formData.newFirstName && formData.newLastName) {
      await dispatch(
        changeFullname({
          newFirstName: formData.newFirstName,
          newLastName: formData.newLastName,
        })
      );
      await dispatch(fetchUserInfo()); // show updated info
      setFormData((prevData) => ({
        ...prevData,
        newFirstName: "",
        newLastName: "",
      }));
    }
  };

  //email
  const updateEmail = async () => {
    if (formData.newEmail) {
      await dispatch(changeEmail(formData.newEmail));
      await dispatch(fetchUserInfo()); // show updated info
      setFormData((prevData) => ({
        ...prevData,
        newEmail: "",
      }));
    }
  };

  //password
  const updatePassword = async () => {
    if (
      formData.newPassword &&
      formData.currentPassword !== formData.newPassword
    ) {
      await dispatch(
        changePassword({
          newPassword: formData.newPassword,
          currentPassword: formData.currentPassword,
        })
      );
      await dispatch(fetchUserInfo()); // show updated info
      setFormData((prevData) => ({
        ...prevData,
        newPassword: "",
        currentPassword: "",
      }));
    }
  };
  //delete user
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
              {avatarFile ? (
                <img
                  src={avatarPreview ?? undefined}
                  alt="Avatar preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Avatar</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {avatarFile ? (
              <div>
                <button
                  onClick={handleCancelClick}
                  className="ml-4 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAvatarUpload}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
                >
                  Upload
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleAvatarUpload}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Username Change */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <div className="flex">
            <input
              name="newUsername"
              value={formData.newUsername}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
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
              name="newEmail"
              value={formData.newEmail}
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
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
              name="newFirstName"
              value={formData.newFirstName}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
              placeholder="First name"
            />
            <input
              name="newLastName"
              value={formData.newLastName}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
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
          <div className="flex space-x-2">
            <input
              name="currentPassword"
              value={formData.currentPassword}
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
              placeholder="Current password"
            />
            <input
              name="newPassword"
              value={formData.newPassword}
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
              placeholder="New password"
            />
            <button
              onClick={updatePassword}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
            >
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
