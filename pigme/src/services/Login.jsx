import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSign = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User data:', user);

      navigate('/home');
    } catch (error) {
      console.error('Google 로그인 실패 :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleGoogleSign} disabled={loading}>
        {loading ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
  );
}
