import React from 'react';
import Context from './Context';
import Header from '../../components/Layout/Header';
import { Block } from '../../styles/UI';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import styled from '@emotion/styled';

export default function Profile() {
  const [userData, setUserData] = useRecoilState(userState);
  if (!userData || !userData.avatar) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

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
          item={userData.avatar.item.image}
        />
      </Block.AbsoluteBox>
      <Block.AbsoluteBox bottom="0">
        <Context />
      </Block.AbsoluteBox>
    </>
  );
}

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #ff7195;
`;
