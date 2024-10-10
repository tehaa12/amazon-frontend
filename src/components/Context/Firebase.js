// firebase.js in components/Context
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Firebase Auth
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage"; // Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyA7IcmUkwglEYtvNOi2h86ZjotZm18WQlE",
  authDomain: "clone-36550.firebaseapp.com",
  projectId: "clone-36550",
  storageBucket: "clone-36550.appspot.com",
  messagingSenderId: "334191210665",
  appId: "1:334191210665:web:3fcedd46d89c328b85b9b8",
  measurementId: "G-0J3X7CWT3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore
const storage = getStorage(app); // Firebase Storage

// Exporting initialized Firebase services
export { app, analytics, auth, db, storage };
