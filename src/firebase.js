import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASQLe3r6-X7Hlv8mxErmfr8Z5tdNP_rRU",
  authDomain: "infoskjerm-8200f.firebaseapp.com",
  projectId: "infoskjerm-8200f",
  storageBucket: "infoskjerm-8200f.appspot.com",
  messagingSenderId: "249725595281",
  appId: "1:249725595281:web:d9bbfb15a86a42705ed930",
  measurementId: "G-YGCMQ6YRY8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }