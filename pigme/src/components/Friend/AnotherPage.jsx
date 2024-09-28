// AnotherPage.js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { friendListState } from './FriendState';
import { Block, Text } from '../../styles/UI';
import styled from '@emotion/styled';

export default function AnotherPage() {
  const friends = useRecoilValue(friendListState); // 상태 읽기 전용
  const pendingFriends = friends.filter((friend) => !friend.isAccepted); // 수락되지 않은 친구 필터링

  return (
    <AnotherWrapper>
      <Text.Body1 color="black" weight="bold">
        {pendingFriends.length}개
      </Text.Body1>
      <Text.Body1 weight="bold">의 친구 요청</Text.Body1>
    </AnotherWrapper>
  );
}
const AnotherWrapper = styled(Block.FlexBox)`
  white-space: nowrap;
`;
