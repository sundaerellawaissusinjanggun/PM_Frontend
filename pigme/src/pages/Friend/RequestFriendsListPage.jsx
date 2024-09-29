import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  friendRequestsState,
  friendsListState,
  userState,
} from '../../recoil/atoms';
import { Block, Text, Button } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import AnotherPage from '../../components/Friend/CountFriends';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';

export default function RequestFriendsListPage() {
  const [friendRequest, setFriendRequest] = useRecoilState(friendRequestsState);
  const [friendList, setFriendList] = useRecoilState(friendsListState);
  const userData = useRecoilValue(userState);

  const handleAccept = (friend) => {
    const senderId = friend.friendSenderId;

    // userData에서 senderId와 같은 ID를 가진 사용자 정보를 찾는 로직
    const matchedUser = userData.find((user) => user.userId === senderId);
    console.log('?????????????????????????????' + matchedUser);

    if (matchedUser) {
      console.log('친구 요청을 보낸 사용자 정보:', matchedUser);

      // 친구 수락 처리
      setFriendList((prevList) => [
        ...prevList,
        {
          friendId: senderId,
          friendNickname: matchedUser.nickname,
          friendAvatar: matchedUser.avatar,
        },
      ]);

      console.log(`${senderId}의 친구 요청을 수락했습니다.`);
      console.log(friend.friendSenderId);
      console.log(matchedUser.nickname);
      console.log(friend.friendSenderId);

      setFriendRequest((prevFriends) =>
        prevFriends.map((item) =>
          item.friendRequestId === friend.friendRequestId
            ? { ...item, status: 'isAccepted' }
            : item
        )
      );
    } else {
      console.error('해당 사용자 정보를 찾을 수 없습니다.');
    }
  };

  const pendingFriends = friendRequest.filter(
    (friend) => friend.status === 'pending'
  );

  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.BackgroundWhiteBox height="758px">
        <Block.FlexBox direction="column" padding="30px">
          {/* 제목 영역 */}
          <Block.FlexBox padding="20px 0">
            <Text.Title>친구 요청 목록</Text.Title>
          </Block.FlexBox>

          {/* 친구 목록 개수 영역 */}
          <Block.FlexBox justifyContent="flex-end" margin="10px 0">
            <AnotherPage />
          </Block.FlexBox>

          {/* 친구 목록 개수 확인 */}
          {pendingFriends.length === 0 ? (
            <Block.FlexBox
              justifyContent="center"
              alignItem="center"
              height="100%"
              direction="column"
            >
              <TextWrapper>아직 친구가 없어요!</TextWrapper>
              <TextWrapper>
                먼저 친구 요청을 보내서 친구를 만들어보세요.
              </TextWrapper>
            </Block.FlexBox>
          ) : (
            <>
              {/* 친구 목록 영역 */}
              {pendingFriends.map((friend) => (
                <Block.FlexBox
                  key={friend.friendRequestId} // 수정된 부분
                  padding="20px 0 "
                  borderBottom="2px solid #E7E7E7"
                >
                  <Block.FlexBox gap="10px">
                    {/* 친구의 프로필 사진 */}
                    <ProfileAvatar />
                    <Block.FlexBox>
                      {/* 친구의 닉네임 */}
                      <Text.ModalText>{friend.friendSenderId}</Text.ModalText>
                      {/* 친구의 닉네임이 아니라 보내는 사람의 ID를 표시합니다. 필요시 친구의 닉네임을 가져오는 로직을 추가하세요. */}
                    </Block.FlexBox>
                  </Block.FlexBox>
                  {/* 수락/거절 버튼 */}
                  <Block.FlexBox>
                    {friend.status === 'isAccepted' ? (
                      <ButtonWrapper>
                        <Text.ButtonText color="grayDeep">
                          친구가 되었어요!
                        </Text.ButtonText>
                      </ButtonWrapper>
                    ) : (
                      <ButtonWrapper>
                        <Button.FriendBtn
                          width="43px"
                          height="24px"
                          bgColor="white"
                          // onClick={() => handleDelete(friendRequest.friendRequestId)}
                        >
                          <Text.ButtonText color="grayDeep">
                            거절
                          </Text.ButtonText>
                        </Button.FriendBtn>
                        <Button.FriendBtn
                          width="43px"
                          height="24px"
                          bgColor="pink"
                          border="none"
                          onClick={() => handleAccept(friend)}
                        >
                          <Text.ButtonText color="white">수락</Text.ButtonText>
                        </Button.FriendBtn>
                      </ButtonWrapper>
                    )}
                  </Block.FlexBox>
                </Block.FlexBox>
              ))}
            </>
          )}
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  gap: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2px;
  font-size: 16px;
  color: #bebebe;
`;
