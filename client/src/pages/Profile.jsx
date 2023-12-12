import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

// firebase image upload rules
// allow read;
// allow write : if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')
const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.floor(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      },
    );
  };
  useEffect(() => {
    if (profilePicture) {
      handleImageUpload(profilePicture);
    }
  }, [profilePicture]);

  console.log(formData);

  return (
    <div>
      <h1 className="text-3xl text-center my-4">Profile</h1>
      <div className="container mx-auto">
        <form className="flex flex-col max-w-xs md:max-w-sm mx-auto mt-8 space-y-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-36 w-36 rounded-full self-center cursor-pointer object-cover border-4 border-blue-500 p-0.5 "
            onClick={() => {
              setImageError(false);
              fileRef.current.click();
            }}
          />

          {imageError ? (
            <div className="text-red-500 text-center">Image too large</div>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <div className="text-center text-blue-500">{uploadPercentage}%</div>
          ) : (
            uploadPercentage === 100 && (
              <div className="text-center text-blue-500">Image uploaded</div>
            )
          )}

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
