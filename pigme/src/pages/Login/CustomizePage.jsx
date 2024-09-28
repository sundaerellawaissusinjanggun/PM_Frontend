import React from 'react';
import styled from '@emotion/styled';
import Custombox from '../../components/Custom/Custombox';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function CustomizePage() {
  const userData = useRecoilValue(userState);

  return (
    <>
      <Style.Wrapper>
        {userData && (
          <Custombox
            initialColor={userData.avatar.color}
            initialItem={userData.avatar.item}
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
