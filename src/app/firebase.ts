// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNsHXBT48lSqFlbZQQZVoztyZYZeb_8Qs",
  authDomain: "ratepeopleapp.firebaseapp.com",
  projectId: "ratepeopleapp",
  storageBucket: "ratepeopleapp.appspot.com",
  messagingSenderId: "1029028258745",
  appId: "1:1029028258745:web:6e436e84d46f23b63fcc68",
  measurementId: "G-XXE3NLNX0V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app)


