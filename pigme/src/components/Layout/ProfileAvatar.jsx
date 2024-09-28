import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function ProfileAvatar({
  selectedColor,
  selectedItem,
  color,
  item,
}) {
  return (
    <Wrapper>
      {selectedColor && <ItemImg src={selectedColor.image} alt="Color" />}
      {selectedItem && <ItemImg src={selectedItem.image} alt="Item" />}
      {color && <ItemImg src={color} alt="Color" />}
      {item && <ItemImg src={item} alt="Item" />}
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
  width: 100px;
  height: 100px;
`;
