// ✅ Firebase SDK Imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Firebase Console → Project Settings → Web App Config 그대로 복사한 값 사용!
const firebaseConfig = {
  apiKey: "AIzaSyCXdlT5b2vHQZO9E5UA1A5Vj74YtOX-F1s",
  authDomain: "mindpalette-1b5f3.firebaseapp.com",
  projectId: "mindpalette-1b5f3",
  storageBucket: "mindpalette-1b5f3.firebasestorage.app",
  messagingSenderId: "12192307709",
  appId: "1:12192307709:web:ad2c10b6f2020d9fa76194"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
