import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  return (
    <div>
      <h1 className="text-3xl text-center my-4">Profile</h1>
      <div className="container mx-auto">
        <form className="flex flex-col max-w-xs md:max-w-sm mx-auto mt-8 space-y-4">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 rounded-full self-center cursor-pointer object-cover"
          />

          <input
            defaultValue={currentUser.username}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder=" Username"
            id="username"
          />

          <input
            defaultValue={currentUser.email}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder=" Email"
            id="email"
          />

          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder=" Password"
            id="password"
          />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>

          <div className="flex justify-between">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
