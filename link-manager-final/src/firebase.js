// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaZLc6tmxJfuUnx6skO9M36tRyF4kacnM",
  authDomain: "aula-firebase-3365e.firebaseapp.com",
  projectId: "aula-firebase-3365e",
  storageBucket: "aula-firebase-3365e.firebasestorage.app",
  messagingSenderId: "863277177096",
  appId: "1:863277177096:web:60cf36e408b83dad7cf4bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);