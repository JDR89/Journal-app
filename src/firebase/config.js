// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJL6KdoqT6k_iuXHynnmhNxYSbu2Zj9SQ",
  authDomain: "journal-app-f56fa.firebaseapp.com",
  projectId: "journal-app-f56fa",
  storageBucket: "journal-app-f56fa.appspot.com",
  messagingSenderId: "775469477218",
  appId: "1:775469477218:web:3c884a56d7f47247b2103b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp) 
export const FirebaseDB = getFirestore(FirebaseApp)
