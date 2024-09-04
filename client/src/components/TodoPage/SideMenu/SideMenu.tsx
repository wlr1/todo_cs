import React from "react";

const SideMenu = () => {
  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col items-center py-8 shadow-lg rounded-l-lg">
      {/* User Avatar */}
      <div className="mb-8 text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="rounded-full w-24 h-24 border-4 border-gray-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold">Username</h2>
      </div>

      {/* Menu Items */}
      <nav className="w-full">
        <ul className="flex flex-col space-y-2">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-lg font-medium hover:bg-gray-600 hover:text-gray-200 transition duration-300 rounded-md"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-lg font-medium hover:bg-gray-600 hover:text-gray-200 transition duration-300 rounded-md"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-lg font-medium hover:bg-gray-600 hover:text-gray-200 transition duration-300 rounded-md"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-lg font-medium hover:bg-gray-600 hover:text-gray-200 transition duration-300 rounded-md"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
