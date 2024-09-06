import React from "react";
import "animate.css";
import { FaCheckCircle, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  isVisible: boolean;
  show: boolean;
}

const SideMenu: React.FC<SidebarProps> = ({ isVisible, show }) => {
  return (
    <>
      {isVisible && (
        <div
          className={`bg-white/10 backdrop-blur-lg p-6 w-64 h-1/2 flex flex-col space-y-6 animate__animated transition-all rounded-xl shadow-xl shadow-gray-950 mr-2 ${
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
            <h2 className="text-white text-xl font-bold">Username</h2>
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
                <a
                  href="#"
                  className="flex items-center text-gray-300 text-sm hover:text-white transition"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default SideMenu;
