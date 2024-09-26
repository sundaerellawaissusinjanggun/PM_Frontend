import styled from '@emotion/styled';
import Pig from '/colors/pig.svg';
import LogoText from '/public/logo.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { db } from '../../firebase'; // Assuming Firestore is set up

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSign = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User data:', user);

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.avatar && userData.nickname) {
          navigate('/home');
        } else {
          navigate('/custom');
        }
      } else {
        navigate('/custom');
      }
    } catch (error) {
      console.error('Google 로그인 실패 :', error);
      alert('Google 로그인 실패! 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <Style.LogoWrapper>
        <Style.LogoImage>
          <img src={Pig} alt="Pig Logo" />
        </Style.LogoImage>
        <img src={LogoText} alt="Logo Text" />
      </Style.LogoWrapper>
      <Style.Footer>
        <Style.LoginButton onClick={handleGoogleSign}>
          구글 로그인 하기
        </Style.LoginButton>
        <Style.CopyRight>
          Copyright ⓒ 2024. 순대렐라와이쑤신장군. All rights reserved.
        </Style.CopyRight>
      </Style.Footer>
    </>
  );
}

const Style = {
  LogoWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
  `,
  LogoImage: styled.div`
    padding: 20px;
  `,
  Footer: styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  LoginButton: styled.button`
    padding: 0 0 30px;
  `,
  CopyRight: styled.div`
    color: #dadada;
    font-size: 10px;
    margin-top: auto;
    padding: 0 0 15px;
  `,
};
