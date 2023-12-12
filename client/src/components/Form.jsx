import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import OAuth from "./OAuth.jsx";

const Form = ({ type }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Basic validation, you can add more complex validation logic
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type !== SIGN_IN) {
        setLoading(true);
        // signup request
        if (validateForm()) {
          // Handle form submission logic here
          console.log("Form data submitted:", formData);
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          console.log(data, "formData from the server");

          setFormData({
            username: "",
            email: "",
            password: "",
          });
          setErrors({
            username: "",
            email: "",
            password: "",
          });
          setLoading(false);
          setIsError(false);
          navigate("/sign-in");
        }
      } else {
        try {
          dispatch(loginStart());
          const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          setFormData({
            username: "",
            email: "",
            password: "",
          });
          const data = await response.json();
          dispatch(loginSuccess(data));
          navigate("/");
        } catch (err) {
          dispatch(loginFailure());
          console.log(err);
          setLoading(false);
          setIsError(true);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setIsError(true);
    }
    // Validate the form before submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs md:max-w-sm mx-auto mt-8 "
    >
      {type !== SIGN_IN && (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        {type !== SIGN_IN ? (
          <button
            disabled={
              loading ||
              formData.username.trim() === "" ||
              formData.email.trim() === "" ||
              formData.password.trim() === ""
            }
            type="submit"
            className={`w-full ${
              loading ||
              formData.username.trim() === "" ||
              formData.email.trim() === "" ||
              formData.password.trim() === ""
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        ) : (
          <button
            disabled={
              loading ||
              formData.email.trim() === "" ||
              formData.password.trim() === ""
            }
            type="submit"
            className={`w-full  ${
              loading ||
              formData.email.trim() === "" ||
              formData.password.trim() === ""
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <OAuth />
      </div>
      <div className="mt-4">
        <p className="text-center text-sm text-gray-600">
          {type !== SIGN_IN
            ? "Already have an account?"
            : "Don't have an account?"}

          {type !== SIGN_IN ? (
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          ) : (
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          )}
        </p>
      </div>
    </form>
  );
};

export default Form;
