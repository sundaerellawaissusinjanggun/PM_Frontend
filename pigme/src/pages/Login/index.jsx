import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth, db } from '../../firebase';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styled from '@emotion/styled';
import Pig from '/colors/pig.svg';
import LogoText from '/public/logo.svg';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const data = await signInWithPopup(auth, provider);

      const uid = data.user.uid;

      const response = await setUser({
        uid: uid,
        email: data.user.email,
        displayName: data.user.displayName,
      });

      if (response && response.payload === false) {
        alert('회원가입을 진행해주세요');
        navigate('/signup');
      } else {
        navigate('/custom');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('로그인된 유저:', user);

          const userDoc = await getDoc(doc(db, 'users', user.uid));

          if (!userDoc.exists()) {
            console.log('No user document found for uid:', user.uid);

            const newUserInfo = {
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
            // 유저는 있는데 프로필 저장은 안 되어 있는 경우 !!
            const userData = userDoc.data();

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

        setLoading(false);
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
