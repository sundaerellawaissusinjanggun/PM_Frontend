import { useEffect } from 'react';
import axios from 'axios'; // Axios로 API 요청
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인증 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      // 카카오 SDK 초기화 확인
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
      }

      // 인증 코드를 사용하여 액세스 토큰 요청
      axios
        .post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_KAKAO_APP_KEY, // .env에서 Kakao App Key 가져오기
            redirect_uri: 'http://localhost:5173/auth', // 리디렉트 URI
            code: authCode,
            client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET, // client_secret이 활성화된 경우 추가
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then((response) => {
          const accessToken = response.data.access_token;
          console.log('Access Token:', accessToken);

          // 토큰 설정 및 사용자 정보 요청
          if (window.Kakao) {
            window.Kakao.Auth.setAccessToken(accessToken);
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                console.log('User Info:', res);
                navigate('/custom'); // 인증 성공 후 custom 페이지로 이동
              },
              fail: (error) => {
                console.error('Failed to get user info:', error);
              },
            });
          }
        })
        .catch((error) => {
          console.error('카카오 인증 실패:', error);
        });
    } else {
      // 인증 코드가 없으면 에러 처리
      console.error('카카오 인증 실패 또는 인증 코드 없음');
    }
  }, [navigate]);

  return <div>인증 처리 중...</div>;
}
