import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/slices/authSlice/asyncActions";
import { useNavigate } from "react-router-dom";
import {
  changeEmail,
  changeFullname,
  changePassword,
  changeUsername,
  fetchUserInfo,
  getAvatar,
  uploadAvatar,
} from "../../../redux/slices/userSlice/asyncActions";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { resetUserState } from "../../../redux/slices/userSlice/userSlice";

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
  const [isErrors, setIsErrors] = useState({
    newUsername: "",
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    newPassword: "",
    currentPassword: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  //password validation
  const validatePassword = (password: string): string => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one special character, and be 8-20 characters long.";
    }

    return "";
  };

  //validate current password
  const validateCurrentPassword = (currentPassword: string): string => {
    if (!currentPassword) {
      return "Current password cannot be empty";
    }

    return "";
  };

  const validate = (fieldName: string) => {
    let valid = true;
    const newErrors = {
      ...isErrors,
    };

    // Username validation
    if (fieldName === "newUsername") {
      if (
        formData.newUsername.length < 3 ||
        formData.newUsername.length > 20 ||
        formData.newUsername.trim() === ""
      ) {
        newErrors.newUsername =
          formData.newUsername.length < 3
            ? "Username must be at least 3 characters long"
            : formData.newUsername.length > 20
            ? "Username cannot exceed 20 characters"
            : "Username cannot be empty";
        valid = false;
      }
    }

    //firstname validation
    if (fieldName === "newFirstName") {
      if (
        formData.newFirstName.length < 3 ||
        formData.newFirstName.length > 20 ||
        formData.newFirstName.trim() === ""
      ) {
        newErrors.newFirstName =
          formData.newFirstName.length < 3
            ? "Firstname must be at least 3 characters long"
            : formData.newFirstName.length > 20
            ? "Firstname cannot exceed 20 characters"
            : "Firstname cannot be empty";
        valid = false;
      }
    }

    //lastname validation
    if (fieldName === "newLastName") {
      if (
        formData.newLastName.length < 3 ||
        formData.newLastName.length > 20 ||
        formData.newLastName.trim() === ""
      ) {
        newErrors.newLastName =
          formData.newLastName.length < 3
            ? "Lastname must be at least 3 characters long"
            : formData.newLastName.length > 20
            ? "Lastname cannot exceed 20 characters"
            : "Lastname cannot be empty";
        valid = false;
      }
    }

    //email validation
    if (fieldName === "newEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.newEmail)) {
        newErrors.newEmail = "Invalid email format";
        valid = false;
      }
    }

    //password validation
    if (fieldName === "newPassword") {
      const passwordError = validatePassword(formData.newPassword);
      if (passwordError) {
        newErrors.newPassword = passwordError;
        valid = false;
      }
    }

    //current password validation
    if (fieldName === "currentPassword") {
      const currentPasswordError = validateCurrentPassword(
        formData.currentPassword
      );
      if (currentPasswordError) {
        newErrors.currentPassword = currentPasswordError;
        valid = false;
      }
    }

    setIsErrors(newErrors);
    return valid;
  };

  //onChange
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      setIsErrors({
        ...isErrors,
        [name]: "",
      });
    },
    [formData, isErrors]
  );

  //avatar input
  const handleAvatarClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  //choose avatar
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setAvatarFile(selectedFile);

        const previewUrl = URL.createObjectURL(selectedFile);
        setAvatarPreview(previewUrl);
      }
    },
    []
  );

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
  const handleCancelClick = useCallback(() => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  //username
  const updateUsername = async () => {
    if (!validate("newUsername")) return;

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
    if (!validate("newFirstName") || !validate("newLastName")) return;

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
    if (!validate("newEmail")) return;

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
    if (!validate("newPassword") || !validate("currentPassword")) return;

    if (
      formData.newPassword &&
      formData.currentPassword !== formData.newPassword
    ) {
      const resultAction = await dispatch(
        changePassword({
          newPassword: formData.newPassword,
          currentPassword: formData.currentPassword,
        })
      );

      if (changePassword.fulfilled.match(resultAction)) {
        await dispatch(fetchUserInfo()); // show updated info
        setFormData((prevData) => ({
          ...prevData,
          newPassword: "",
          currentPassword: "",
        }));
      } else {
        // If the password change failed, set error message
        setIsErrors((prevErrors) => ({
          ...prevErrors,
          currentPassword: "Incorrect current password",
        }));
      }
    }
  };
  //delete user
  const handleDeleteClick = useCallback(() => {
    dispatch(deleteUser());
    dispatch(resetUserState());
    navigate("/login");
  }, [dispatch, navigate]);

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
                <span className="text-gray-400">Choose</span>
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
              <>
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
              </>
            ) : (
              <>
                <button
                  onClick={handleAvatarUpload}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
                >
                  Upload
                </button>
              </>
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
          {isErrors.newUsername && (
            <div className="flex space-x-2 ">
              <MdOutlineReportGmailerrorred size={19} color="red" />
              <p className="font-bold text-red-900 text-sm">
                {isErrors.newUsername}
              </p>
            </div>
          )}
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
          {isErrors.newEmail && (
            <div className="flex space-x-2 ">
              <MdOutlineReportGmailerrorred size={19} color="red" />
              <p className="font-bold text-red-900 text-sm">
                {isErrors.newEmail}
              </p>
            </div>
          )}
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
          {isErrors.newFirstName && (
            <div className="flex space-x-2 ">
              <MdOutlineReportGmailerrorred size={19} color="red" />
              <p className="font-bold text-red-900 text-sm">
                {isErrors.newFirstName}
              </p>
            </div>
          )}
          {isErrors.newLastName && (
            <div className="flex space-x-2 ">
              <MdOutlineReportGmailerrorred size={19} color="red" />
              <p className="font-bold text-red-900 text-sm">
                {isErrors.newLastName}
              </p>
            </div>
          )}
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

          {isErrors.currentPassword && (
            <div className="flex items-center mt-2 text-red-500">
              <MdOutlineReportGmailerrorred size={19} />
              <p className="ml-2 text-sm">{isErrors.currentPassword}</p>
            </div>
          )}
          {isErrors.newPassword && (
            <div className="flex text-red-500">
              <MdOutlineReportGmailerrorred size={37} />
              <p className="ml-2 text-sm">{isErrors.newPassword}</p>
            </div>
          )}
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
