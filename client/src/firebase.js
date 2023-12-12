// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-v1.firebaseapp.com",
  projectId: "mern-auth-v1",
  storageBucket: "mern-auth-v1.appspot.com",
  messagingSenderId: "963712007508",
  appId: "1:963712007508:web:59f93c2b413bc7fa8d9cc1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
