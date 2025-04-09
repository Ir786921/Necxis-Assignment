
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider,   signInWithPopup,
  signInWithRedirect,
  getRedirectResult } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBO0CF-HiVHQb_CEg2NhFLXdYKIluH_Xck",
  authDomain: "assignment-necxis.firebaseapp.com",
  projectId: "assignment-necxis",
  storageBucket: "assignment-necxis.firebasestorage.app",
  messagingSenderId: "164859707845",
  appId: "1:164859707845:web:ad7c010e33f8d2a0018bac",
  measurementId: "G-B6M836GLKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();


const auth = getAuth(app);

export { auth, provider,   signInWithPopup,
  signInWithRedirect,
  getRedirectResult };