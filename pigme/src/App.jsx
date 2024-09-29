import styled from '@emotion/styled';
import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { auth, db } from '../src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { userState } from '../src/recoil/atoms';

export default function App() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            avatar: userData.avatar || {
              color: { image: '', x: '', y: '' },
              item: { image: '', x: '', y: '' },
            },
            nickname: userData.nickname || '',
            email: user.email,
            introduction: userData.introduction || '',
          });
        }
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <Style.FullWrapper>
      <Style.Wrapper>
        <Outlet />
      </Style.Wrapper>
    </Style.FullWrapper>
  );
}

const Style = {
  FullWrapper: styled.div`
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    background: url(/background.svg);
  `,
  Wrapper: styled.div`
    width: 390px;
    height: 844px;
    background: url(public/background.svg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  `,
};
