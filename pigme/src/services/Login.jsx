// Login.jsx
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY;

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  // Initialize Kakao SDK
  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
  }, []);

  // Check login status and handle redirection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User already logged in:', user);
        const customComplete = user.customComplete; // Example: Check custom completion status
        if (customComplete) {
          navigate('/home'); // Redirect to home if custom is complete
        } else {
          navigate('/custom'); // Redirect to custom if custom is incomplete
        }
      } else {
        // Show the login page only if not logged in
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [auth, navigate]);

  // Handle Kakao login
  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (response) => {
        console.log('Login Success:', response);
        // After login success, fetch user info if needed
      },
      fail: (error) => {
        console.error('Kakao login failed:', error);
      },
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={handleKakaoLogin}>Kakao Login</button>
    </div>
  );
}
