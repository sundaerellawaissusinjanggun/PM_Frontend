import React from 'react';
import styled from '@emotion/styled';
import HomeButton from '/home-button.svg';
import LeftAngle from '/left-angle.svg';

export default function Header() {
  return (
    <Style.Wrapper>
      <button>
        <img src={LeftAngle} />
      </button>
      <button>
        <img src={HomeButton} />
      </button>
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 20px;
    width: 100%;
  `,
  // HomeButtonWrapper: styled.div`

  // `
};
