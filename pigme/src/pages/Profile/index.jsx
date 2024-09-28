import React from 'react';
import Context from './Context';
import Header from '../../components/Layout/Header';
import { Block } from '../../styles/UI';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function Profile() {
  const [userData, setUserData] = useRecoilState(userState);
  console.log('userData' + userData.avatar.color.image);

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
        <ProfileAvatar
          color={userData.avatar.color.image}
          item={userData.avatar.color.image}
        />
      </Block.AbsoluteBox>
      <Block.AbsoluteBox bottom="0">
        <Context />
      </Block.AbsoluteBox>
    </>
  );
}
