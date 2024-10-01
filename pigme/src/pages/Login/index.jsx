import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth, db } from '../../firebase';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styled from '@emotion/styled';
import Pig from '/colors/pig.svg';
import LogoText from '/public/logo.svg';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const data = await signInWithPopup(auth, provider);

      const uid = data.user.uid;

      // uid 콘솔에 찍어보기
      console.log('Google Sign-in 성공! 유저의 uid:', uid);

      // 유저 정보 Firestore에 저장
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (!userDoc.exists()) {
        const newUserInfo = {
          uid,
          avatar: {
            color: { image: '', x: 0, y: 0 },
            item: { image: '', x: 0, y: 0 },
          },
          nickname: '',
          email: data.user.email,
          introduction: '',
        };

        await setDoc(doc(db, 'users', uid), newUserInfo);
        setUser(newUserInfo);
        localStorage.setItem('user', JSON.stringify(newUserInfo));

        console.log('New user document created:', newUserInfo);

        navigate('/custom');
      } else {
        const userData = userDoc.data();
        setUser({ ...userData, userId: uid });
        navigate('/home');
      }
    } catch (error) {
      console.log('Error during Google sign-in');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // 유저의 uid 콘솔에 찍기
          localStorage.setItem('user', JSON.stringify(user));
          const userDoc = await getDoc(doc(db, 'users', user.uid));

          if (!userDoc.exists()) {
            const newUserInfo = {
              userId: user.uid,
              avatar: {
                color: { image: '', x: 0, y: 0 },
                item: { image: '', x: 0, y: 0 },
              },
              nickname: '',
              email: user.email,
              introduction: '',
            };

            await setDoc(doc(db, 'users', user.uid), newUserInfo);
            setUser(newUserInfo);
            localStorage.setItem('user', JSON.stringify(newUserInfo));

            console.log('New user document created:', newUserInfo);
          } else {
            const userData = userDoc.data();
            setUser(userData);

            if (
              (!userData.avatar.color.image && !userData.avatar.item.image) ||
              !userData.nickname
            ) {
              navigate('/custom');
            }
          }
        } else {
          console.log('No user is signed in.');
        }
      });

      return () => unsubscribe();
    };

    checkUser();
  }, [setUser]);

  return (
    <>
      <Style.LogoWrapper>
        <Style.LogoImage>
          <img src={Pig} alt="Pig Logo" />
        </Style.LogoImage>
        <img src={LogoText} alt="Logo Text" />
      </Style.LogoWrapper>
      <Style.Footer>
        <Style.LoginButton onClick={handleGoogleSignIn}>
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
    justify-content: center;
    width: 100%;
    height: 150px;
  `,
  LoginButton: styled.div`
    width: 300px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 30px;
    background-color: white;
    color: #808080;
    font-weight: 600;
    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
      background-color: #ff7195;
      color: white;
    }
  `,
  CopyRight: styled.div`
    color: #dadada;
    font-size: 10px;
    margin-top: auto;
    padding: 0 0 15px;
  `,
};
