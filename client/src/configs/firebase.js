// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider ,signInWithPopup } from 'firebase/auth';

 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import {  signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmdg00kizs7-7faHVUvU7nHNA1etH7JFA",
  authDomain: "sparegear-e6502.firebaseapp.com",
  projectId: "sparegear-e6502",
  storageBucket: "sparegear-e6502.firebasestorage.app",
  messagingSenderId: "377120456775",
  appId: "1:377120456775:web:a77f0795b567a4ca5e3162",
  measurementId: "G-LB0L5RMP21"
};
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});


 const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
 
export { auth, googleProvider, provider};