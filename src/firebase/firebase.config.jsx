// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_api,
  authDomain: import.meta.env.VITE_domain,
  projectId: import.meta.env.VITE_project,
  storageBucket: import.meta.env.VITE_storage,
  messagingSenderId: import.meta.env.VITE_sender,
  appId: import.meta.env.VITE_app
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);