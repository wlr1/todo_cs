import React, { useEffect } from "react";
import "animate.css";
import { FaCheckCircle, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { logoutUser } from "../../../redux/slices/authSlice";
import { fetchUserInfo, getAvatar } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { SidebarProps } from "../../../utility/types/types";

const SideMenu: React.FC<SidebarProps> = ({
  isVisible,
  show,
  handleContentChange,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { user, avatar } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  //logout
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  //get user info from jwt cookie
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  useEffect(() => {
    dispatch(getAvatar());
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`bg-white/10 backdrop-blur-lg p-6 w-64 flex flex-col space-y-6 animate__animated transition-all rounded-xl shadow-xl shadow-gray-950 mr-2 ${
            show ? "animate__zoomInLeft" : "animate__zoomOutLeft"
          }`}
        >
          {/* User Avatar */}
          <div className="flex items-center space-x-4">
            <img
              src={avatar}
              alt="User Avatar"
              className="rounded-full w-20 h-20 border-2 border-gray-200"
            />
            <h2 className="text-white text-xl font-bold">{user.userName}</h2>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <button
                  onClick={() => handleContentChange("todo")}
                  className="flex items-center text-gray-300 text-sm hover:text-white transition  "
                >
                  <FaCheckCircle className="mr-3" />
                  Todo
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContentChange("profile")}
                  className="flex items-center text-gray-300 text-sm hover:text-white transition"
                >
                  <FaUserAlt className="mr-3" />
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleContentChange("settings")}
                  className="flex items-center text-gray-300 text-sm hover:text-white transition"
                >
                  <FaCog className="mr-3" />
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-300 text-sm hover:text-white transition"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default SideMenu;
