
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADQk4UPC_5HXTPPYEdlgCTB2oNLICXsd8",
  authDomain: "chat-1a2a1.firebaseapp.com",
  projectId: "chat-1a2a1",
  storageBucket: "chat-1a2a1.appspot.com",
  messagingSenderId: "70367164050",
  appId: "1:70367164050:web:a3f8b77bbb8873b1ded84b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();