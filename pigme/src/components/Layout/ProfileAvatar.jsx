import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function ProfileAvatar({ selectedColor, selectedItem }) {
  return (
    <Wrapper>
      {selectedColor && <ItemImg src={selectedColor.image} alt="Color" />}
      {selectedItem && <ItemImg src={selectedItem.image} alt="Item" />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid red;
`;

const ItemImg = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
`;
