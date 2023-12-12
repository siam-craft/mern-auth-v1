import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice.js";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleLogin = async () => {
    try {
      // Handle Google login
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log("google sing in error", error);
    }
  };
  return (
    <button
      type="button"
      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
