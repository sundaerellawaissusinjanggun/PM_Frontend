import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { friendRequestsState, userState } from '../../recoil/atoms';
import { Block, Text } from '../../styles/UI';
import styled from '@emotion/styled';

export default function AnotherPage() {
  const userData = useRecoilValue(userState);
  const friendRequests = useRecoilValue(friendRequestsState);

  const pendingFriends = friendRequests.filter(
    (request) =>
      request.friendReceiver === userData.uid && request.status === 'pending'
  );

  useEffect(() => {
    console.log(userData.userId);
    console.log('받은 친구 요청 목록:', friendRequests);

    const userPendingRequests = friendRequests.filter(
      (request) => request.friendReceiver === userData.userId
    );
    console.log('현재 사용자의 친구 요청 목록:', userPendingRequests);

    const sentRequestsCount = friendRequests.filter(
      (request) =>
        request.friendSender === userData.userId && request.status === 'pending'
    ).length;

    const receivedRequestsCount = userPendingRequests.length;

    console.log('보낸 친구 요청 개수:', sentRequestsCount);
    console.log('받은 친구 요청 개수:', receivedRequestsCount);
  }, [friendRequests, userData]);

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
