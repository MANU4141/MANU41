// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_lFhcojYEitouKfZbMQc5VJO1Lbr-5Wk",
  authDomain: "week-1time.firebaseapp.com",
  projectId: "week-1time",
  storageBucket: "week-1time.firebasestorage.app",
  messagingSenderId: "647659234574",
  appId: "1:647659234574:web:0fd745fe0923a32acde35f",
  measurementId: "G-C3BREJY8S4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
