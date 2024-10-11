import React, { useCallback, useEffect } from "react";
import "animate.css";
import { FaCheckCircle, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { logoutUser } from "../../../redux/slices/authSlice/asyncActions";
import {
  fetchUserInfo,
  getAvatar,
} from "../../../redux/slices/userSlice/asyncActions";
import { useNavigate } from "react-router-dom";
import { SidebarProps } from "../../../utility/types/types";

const SideMenu: React.FC<SidebarProps> = ({
  isVisible,
  show,
  handleContentChange,
  isUsernameHide,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { user, avatar } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  //logout
  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate("/login");
  }, [dispatch, navigate]);

  //get user info from jwt cookie
  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(getAvatar());
  }, [dispatch]);

  return (
    <>
      {isVisible && (
        <div
          className={`bg-white/10 backdrop-blur-lg p-6 w-64 flex flex-col space-y-6 animate__animated transition-all rounded-xl shadow-xl shadow-gray-950 mr-2 ${
            show ? "animate__fadeInLeft" : "animate__fadeOutLeft"
          }`}
        >
          {/* User Avatar */}
          <div className="flex flex-col items-center space-y-1 text-center">
            <img
              src={avatar}
              alt="User Avatar"
              className="rounded-full w-20 h-20 border-2 border-gray-300 shadow-sm "
            />
            <div className="text-white text-lg">
              {isUsernameHide === "yes" ? (
                <div>
                  <h2 className="font-semibold text-xl">{user.firstName}</h2>
                  <p className="text-gray-400 text-sm">{user.lastName}</p>
                </div>
              ) : (
                <h2 className="font-semibold text-xl">{user.userName}</h2>
              )}
            </div>
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
