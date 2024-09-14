import React, { useEffect, useState } from "react";
import "animate.css";
import { FaCheckCircle, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { logoutUser } from "../../../redux/slices/authSlice";
interface SidebarProps {
  isVisible: boolean;
  show: boolean;
}

interface DecodedToken {
  username: string;
}

const SideMenu: React.FC<SidebarProps> = ({ isVisible, show }) => {
  const [username, setUsername] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  //logout
  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  //get user info from jwt cookie
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
    }
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
              src="https://i.pinimg.com/236x/86/3c/48/863c488b8c2f8add74213aa888a2eeb2.jpg"
              alt="User Avatar"
              className="rounded-full w-20 h-20 border-2 border-gray-200"
            />
            <h2 className="text-white text-xl font-bold">{username}</h2>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 text-sm hover:text-white transition "
                >
                  <FaCheckCircle className="mr-3" />
                  Todo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 text-sm hover:text-white transition"
                >
                  <FaUserAlt className="mr-3" />
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-300 text-sm hover:text-white transition"
                >
                  <FaCog className="mr-3" />
                  Settings
                </a>
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
          {/* check for loading */}
          {isLoading && <p className="text-sm text-blue-500">Logging out...</p>}

          {/* check for error */}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )}
    </>
  );
};

export default SideMenu;
