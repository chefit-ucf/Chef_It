// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOg8MmJElzkdIlR0Hr_QgIJ4FGPcdJhS4",
  authDomain: "chef-it-fdbea.firebaseapp.com",
  databaseURL: "https://chef-it-fdbea-default-rtdb.firebaseio.com",
  projectId: "chef-it-fdbea",
  storageBucket: "chef-it-fdbea.appspot.com",
  messagingSenderId: "820133144348",
  appId: "1:820133144348:web:b62f29d4974a0aa4523cd9",
  measurementId: "G-17Q0SYJQZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const db = getFirestore()

