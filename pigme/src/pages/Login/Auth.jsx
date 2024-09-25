// Auth.jsx
import { useEffect } from 'react';
import axios from 'axios'; // Axios for API requests
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the authentication code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      // Check if Kakao SDK is initialized
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
      }

      // Use the authentication code to request an access token
      axios
        .post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_KAKAO_APP_KEY, // Fetch Kakao App Key from .env
            redirect_uri: 'http://localhost:5173/auth', // Redirect URI
            code: authCode,
            client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET, // Add client_secret if necessary
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then((response) => {
          const accessToken = response.data.access_token;
          console.log('Access Token:', accessToken);

          // Set the access token and request user info
          if (window.Kakao) {
            window.Kakao.Auth.setAccessToken(accessToken);
            window.Kakao.API.request({
              url: '/v2/user/me',
              success: (res) => {
                console.log('User Info:', res);
                navigate('/custom'); // On success, redirect to the custom page
              },
              fail: (error) => {
                console.error('Failed to get user info:', error);
              },
            });
          }
        })
        .catch((error) => {
          console.error('Kakao authentication failed:', error);
        });
    } else {
      console.error('Kakao authentication failed or no authorization code');
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
}
