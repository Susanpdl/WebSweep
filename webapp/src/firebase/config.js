import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDlPf7xaLTcARbZHtVpPYEDpSRRZHWyuWU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "websweep.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "websweep",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "websweep.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1071200842389",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1071200842389:web:d2d3b2adbea581f1ea619c",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-6D5KW2MFV2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 