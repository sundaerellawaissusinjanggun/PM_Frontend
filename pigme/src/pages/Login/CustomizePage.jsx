import React from 'react';
import styled from '@emotion/styled';
import Custombox from '../../components/Custom/Custombox';
import { useLocation } from 'react-router';

export default function CustomizePage() {
  const location = useLocation();
  const { userAvatar } = location.state || {};

  return (
    <>
      <Style.Wrapper>
        {userAvatar && (
          <Custombox color={userAvatar.color} item={userAvatar.item} />
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
