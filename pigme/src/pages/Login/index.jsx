import styled from '@emotion/styled';
import Pig from '/colors/pig.svg';
import LogoText from '/public/logo.svg';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('현재 사용자 정보:', user);

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, { avatar: null, nickname: null });
          navigate('/custom');
        } else {
          const userData = userDoc.data();

          console.log('사용자 아바타:', userData.avatar);
          console.log('사용자 닉네임:', userData.nickname);
          console.log('한 줄 소개:', userData.introduction);

          if (userData.avatar && userData.nickname) {
            navigate('/home');
          } else {
            navigate('/custom');
          }
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSign = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google 로그인 실패:', error);
      alert('Google 로그인 실패! 다시 시도해 주세요.');
    }
  };

  if (loading) {
    return <div>로딩중</div>;
  }

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
