import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyAMvQkllh32RCrHnnhjTwxT8dGrD0mgo",
  authDomain: "auth-firebase-89841.firebaseapp.com",
  projectId: "auth-firebase-89841",
  storageBucket: "auth-firebase-89841.appspot.com",
  messagingSenderId: "955135917450",
  appId: "1:955135917450:web:4ad03d1f3429ea9e209c73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app);