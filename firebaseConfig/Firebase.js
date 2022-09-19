
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ8EEQqrOP6uvQBkjDKCgqy70ElLQOnc8",
  authDomain: "recording-app-505fe.firebaseapp.com",
  projectId: "recording-app-505fe",
  storageBucket: "recording-app-505fe.appspot.com",
  messagingSenderId: "581028922382",
  appId: "1:581028922382:web:4f7bf26039c9f33b2c285f",
  measurementId: "G-H7Z67V57YB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {auth,db};
