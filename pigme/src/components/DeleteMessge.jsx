// 좋아요 개수, 좋아요 목록
import styled from '@emotion/styled';
import Heart from '/red-heart.svg';
import { Text } from '../styles/UI';
import { useState } from 'react';

export default function Like() {
  return (
    <>
      <DeleteButton>삭제하기</DeleteButton>
    </>
  );
}

const DeleteButton = styled.button`
  color: #bebebe;
  font-size: 16px;
  text-decoration: underline;
  display: flex;
  /* border: 1px solid #bebebe; */
  &:hover {
  }
`;
