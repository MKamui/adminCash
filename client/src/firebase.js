// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkEZbUMSxXYILBlzO25YlTG4HcG4CnMYQ",
  authDomain: "admincash-auth.firebaseapp.com",
  projectId: "admincash-auth",
  storageBucket: "admincash-auth.appspot.com",
  messagingSenderId: "525454784500",
  appId: "1:525454784500:web:702952b94eea8aa18feba1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app