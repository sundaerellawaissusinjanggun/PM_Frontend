// Import Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Auth 추가
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (Vite 환경 변수를 사용)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 및 Auth 내보내기
export const db = getFirestore(app); // Firestore 초기화
export const auth = getAuth(app); // Firebase Auth 초기화
