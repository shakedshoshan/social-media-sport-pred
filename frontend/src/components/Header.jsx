import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../zustand/useAuth';

const Header = () => {
  const [showProfileHover, setShowProfileHover] = useState(false);
  const { authUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex justify-between items-center shadow-lg transition-shadow duration-300">
      <Link to="/">
        <img src="/logo.png" alt="Sports Social Logo" className="h-12 w-auto" />
      </Link>
      <nav className="flex items-center space-x-4 md:space-x-6">
        <Link
          to="/tables"
          className="px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Tables
        </Link>
        <Link
          to="/predictions"
          className="px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Predictions
        </Link>
        <div
          className="flex items-center relative cursor-pointer"
          onMouseEnter={() => setShowProfileHover(true)}
          onMouseLeave={() => setShowProfileHover(false)}
        >
          <img
            src={authUser.profilePic}
            alt={authUser.name}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <span className="ml-3 font-semibold">{authUser.name}</span>
          {showProfileHover && (
            <div className="absolute right-0 mt-12 w-40 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
              >
                Visit Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
