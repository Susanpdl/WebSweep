import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC_nqBmDXcNmkNDY7PkJ-8RfN3rXKzZD_M",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "websweep-2b20e.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "websweep-2b20e",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "websweep-2b20e.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "439470035073",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:439470035073:web:866e7520dc952d1d8ebd80"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 