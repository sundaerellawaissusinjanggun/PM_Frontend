import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY;

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  // Kakao SDK 초기화
  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.init(KAKAO_APP_KEY);
    }
  }, []);

  // 로그인 상태 확인 및 리다이렉트 처리
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 만약 로그인된 상태라면
        console.log('User already logged in:', user);
        // 커스텀 완료 여부에 따라 페이지 리다이렉트
        const customComplete = user.customComplete; // 예시, 실제 customComplete 여부를 확인
        if (customComplete) {
          navigate('/home'); // 커스텀 완료된 경우 홈으로 리다이렉트
        } else {
          navigate('/custom'); // 커스텀 미완료된 경우 커스텀 페이지로 리다이렉트
        }
      } else {
        // 로그인되지 않은 경우에만 로그인 페이지 표시
        setLoading(false);
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [auth, navigate]);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (response) => {
        console.log('Login Success:', response);
        // 로그인 성공 후 사용자 정보 가져오기
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
      <button onClick={handleKakaoLogin}>Kakao 로그인</button>
    </div>
  );
}
