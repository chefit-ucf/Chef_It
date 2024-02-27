import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

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

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }