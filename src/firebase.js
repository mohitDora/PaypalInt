// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7BA5L5YQsg0t-sg0ywr_gL66oeaugRbY",
  authDomain: "task1-3ef15.firebaseapp.com",
  projectId: "task1-3ef15",
  storageBucket: "task1-3ef15.appspot.com",
  messagingSenderId: "861386929499",
  appId: "1:861386929499:web:05d530e936b3c87945167e",
  measurementId: "G-FZ2SBJ305D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;