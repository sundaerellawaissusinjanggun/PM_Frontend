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
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        // 유저 데이터가 없으면 Firestore에 새로 저장 (초기값으로 저장)
        if (!userDoc.exists()) {
          // Firestore에 기본 데이터를 저장
          await setDoc(userDocRef, { avatar: null, nickname: null });
          navigate('/custom');
        } else {
          const userData = userDoc.data();

          // avatar와 nickname이 있으면 home 페이지로 이동
          if (userData.avatar && userData.nickname) {
            navigate('/home');
          } else {
            navigate('/custom'); // 없으면 custom 페이지로 이동
          }
        }
      } else {
        setLoading(false); // 로그인 상태가 아닐 때 로딩 해제
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [navigate]);

  const handleGoogleSign = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithRedirect(auth, provider); // 리디렉션 방식으로 로그인
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
