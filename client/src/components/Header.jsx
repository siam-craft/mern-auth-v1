import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <NavLink
            to="/"
            exact
            className="text-white hover:text-gray-300"
            activeClassName="font-bold"
          >
            Auth App
          </NavLink>
        </div>
        <nav className="space-x-4">
          <NavLink
            to="/"
            exact
            className="text-white hover:text-gray-300"
            activeClassName="font-bold"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-white hover:text-gray-300"
            activeClassName="font-bold"
          >
            About
          </NavLink>
          <NavLink
            to="/profile"
            className="text-white hover:text-gray-300"
            activeClassName="font-bold"
          >
            Profile
          </NavLink>
          <NavLink
            to="/sign-in"
            className="text-white hover:text-gray-300"
            activeClassName="font-bold"
          >
            Login
          </NavLink>
          <NavLink
            to="/sign-up"
            className="text-white hover:text-gray-300"
            activeClassName="font-bold"
          >
            Register
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
