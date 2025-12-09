// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjvKLd1CIgxuHKx9xb7QyoMYhTj-isOTI",
  authDomain: "scholar-stream-791d1.firebaseapp.com",
  projectId: "scholar-stream-791d1",
  storageBucket: "scholar-stream-791d1.firebasestorage.app",
  messagingSenderId: "737343090946",
  appId: "1:737343090946:web:8cc89f807625751ccc521b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth