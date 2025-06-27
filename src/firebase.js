import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
   apiKey: "AIzaSyB_Vc0RZULyUgIRarHYkMHN_dfv5daPqMM",
   authDomain: "chat-b0fcd.firebaseapp.com",
   projectId: "chat-b0fcd",
   storageBucket: "chat-b0fcd.firebasestorage.app",
   messagingSenderId: "659641495174",
   appId: "1:659641495174:web:d00bad93426d1a78366b07",
   measurementId: "G-QWV78DY8C6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Foydalanuvchilar bilan ishlash uchun
export const firestore = getFirestore(app); // Ma'lumotlar bazasi (xabarlar) bilan ishlash uchun
export const googleProvider = new GoogleAuthProvider(); // Google orqali kirish usuli