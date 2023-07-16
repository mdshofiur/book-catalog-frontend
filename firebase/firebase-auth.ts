import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA6KSxJJ1tjErjufskpwLOz76bkU4n_G5o",
  authDomain: "redux-firebase-7b3db.firebaseapp.com",
  projectId: "redux-firebase-7b3db",
  storageBucket: "redux-firebase-7b3db.appspot.com",
  messagingSenderId: "677206979021",
  appId: "1:677206979021:web:58f3893e1c077021721484",
  measurementId: "G-NJD7D4VF8L"
};

// Initialize Firebase
 export const Authapp = initializeApp(firebaseConfig);

export const authConfig = getAuth(Authapp);
