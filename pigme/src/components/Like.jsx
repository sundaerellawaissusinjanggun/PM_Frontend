// 좋아요 개수, 좋아요 목록
import styled from '@emotion/styled';
import Heart from '/red-heart.svg';
import { Text } from '../styles/UI';

export default function Like() {
  return (
    <LikeButton>
      <img src={Heart} />
      <Text.MiniTitle1 padding="2px 0 0">5</Text.MiniTitle1>
    </LikeButton>
  );
}

const LikeButton = styled.button`
  width: 60px;
  height: 34px;
  display: flex;
  justify-content: center;
  padding: 7px 13px 0 11px;
  gap: 7px;
  border: 1px solid #bebebe;
  border-radius: 14px;
`;
