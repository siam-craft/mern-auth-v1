import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  console.log(currentUser, "currentUser");
  return (
    <div className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold ">
          <NavLink to="/" className="text-white hover:text-gray-300">
            Auth App
          </NavLink>
        </div>
        <nav className="space-x-4 flex items-center justify-center">
          <NavLink to="/" className="text-white hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white hover:text-gray-300">
            About
          </NavLink>
          <NavLink to="/profile" className="text-white hover:text-gray-300">
            Profile
          </NavLink>
          {currentUser ? (
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={currentUser.profilePicture}
              alt=""
            />
          ) : (
            <NavLink to="/sign-in" className="text-white hover:text-gray-300">
              Login
            </NavLink>
          )}

          {currentUser ? (
            <button type="button" className="text-white hover:opacity-70">
              Log Out
            </button>
          ) : (
            <NavLink to="/sign-up" className="text-white hover:text-gray-300">
              Register
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
