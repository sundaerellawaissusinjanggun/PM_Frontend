import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'; // Firebase Auth 추가
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

// 로그인 상태 확인 후 새로고침 시 자동 로그인을 방지
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // return signInWithEmailAndPassword(auth);
    // 페이지 새로고침 시 현재 로그인 상태 확인
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user);
        // 유저가 로그인되어 있을 때의 로직
      } else {
        console.log('User is not logged in.');
        // 로그인되지 않은 경우 추가 로직 (예: 로그인 페이지로 이동)
      }
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error setting persistence: ${errorCode}, ${errorMessage}`);
  });

// 로그아웃 함수
export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log('User logged out');
      // 로그아웃 후 새로고침 또는 다른 로직
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload(); // 새로고침하여 로그인 페이지로 이동
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
};
