import React from 'react';
import Avatar from '/colors/pig.svg';
import styled from '@emotion/styled';

export default function ProfileAvatar() {
  return (
    <Wrapper>
      <ImageWrapper src={Avatar} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.img`
  width: 93px;
  height: 88px;
`;
