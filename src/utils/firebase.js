// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1Nxj0q9opvUJz27GB7oe4i8t3zyBf9DI",
  authDomain: "netflixgpt-92114.firebaseapp.com",
  projectId: "netflixgpt-92114",
  storageBucket: "netflixgpt-92114.firebasestorage.app",
  messagingSenderId: "747663013270",
  appId: "1:747663013270:web:4f3d72d97db5700995d9b7",
  measurementId: "G-F3E8Q960L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();