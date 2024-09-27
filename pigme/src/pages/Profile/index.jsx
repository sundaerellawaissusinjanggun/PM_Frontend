import React, { useEffect, useState } from 'react';
import Context from './Context';
import Header from '../../components/Layout/Header';
import { Block } from '../../styles/UI';
import { auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Profile() {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'userSelections', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.selectedColor) {
            setAvatar(userData.selectedColor);
          }
        } else {
          console.log('사용자 데이터가 없습니다.');
        }
      }
    };

    fetchUserAvatar();
  }, []);

  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        {avatar ? (
          <img src={avatar} alt="User Avatar" />
        ) : (
          <img src="/colors/pig.svg" alt="Default Pig" />
        )}
      </Block.AbsoluteBox>
      <Block.AbsoluteBox bottom="0">
        <Context />
      </Block.AbsoluteBox>
    </>
  );
}
