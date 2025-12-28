// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ZtupsXPMWZMPyWwhpLdabRK5wmY7bNk",
  authDomain: "orbit-ai-46863.firebaseapp.com",
  projectId: "orbit-ai-46863",
  storageBucket: "orbit-ai-46863.firebasestorage.app",
  messagingSenderId: "822293762838",
  appId: "1:822293762838:web:25d8ecc959814e44bdb637",
  measurementId: "G-STGMN7SE43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);