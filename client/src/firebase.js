// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "scribeway-8db9d.firebaseapp.com",
  projectId: "scribeway-8db9d",
  storageBucket: "scribeway-8db9d.appspot.com",
  messagingSenderId: "1042391450883",
  appId: "1:1042391450883:web:4b2265e8562eb396c89536"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

