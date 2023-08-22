// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1o7JS6I1r8ZiQXIympH0eB0XbtUXSM44",
  authDomain: "react-firebase-ea086.firebaseapp.com",
  projectId: "react-firebase-ea086",
  storageBucket: "react-firebase-ea086.appspot.com",
  messagingSenderId: "439544499311",
  appId: "1:439544499311:web:8653ed10a5c615bc85519a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
export const auth = getAuth(app)
export const provider = new  GoogleAuthProvider()
export const db = getFirestore(app)
