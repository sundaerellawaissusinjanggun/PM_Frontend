import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Custombox from '../../components/Custom/Custombox';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function CustomizePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);
        } else {
          console.log('사용자 데이터가 없습니다.');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Style.Wrapper>
        {userData && (
          <Custombox
            initialColor={userData.avatar}
            initialItem={userData.item}
          />
        )}
      </Style.Wrapper>
    </>
  );
}

const Style = {
  Wrapper: styled.div`
    width: 390px;
    height: 844px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    scrollbar-width: none;
    overscroll-behavior: none;
    overflow-y: auto;
  `,
};
