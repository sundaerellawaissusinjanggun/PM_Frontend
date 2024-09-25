import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Img } from '../../styles/UI';

export default function Header({
  showHomeIcon,
  showBackIcon,
  showMyPageIcon,
  showNextIcon,
}) {
  const navigate = useNavigate();

  return (
    <>
      {showBackIcon && (
        <button onClick={() => navigate(-1)}>
          <Text.MiniTitle2 color="purple">뒤로</Text.MiniTitle2>
        </button>
      )}
      {showHomeIcon && (
        <Img.AngledIcon
          width="20px"
          src="/home-button.svg"
          onClick={() => navigate('/home')}
        />
      )}
      {showMyPageIcon && (
        <Img.AngledIcon
          width="30px"
          src="/profile.svg"
          onClick={() => navigate('/profile')}
        />
      )}
      {showNextIcon && (
        <button onClick={() => navigate('/profileSetup')}>
          <Text.MiniTitle2 color="white">완료</Text.MiniTitle2>
        </button>
      )}
    </>
  );
}
