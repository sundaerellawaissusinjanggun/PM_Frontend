// 친구 추가
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { friendRequestsState } from '../../recoil/atoms';
import { Block, Input, Button, Text, Img } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import Pig from '/colors/pig.svg';
import AnotherPage from '../../components/Friend/AnotherPage';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';

export default function FollowListPage() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [friends, setFriends] = useRecoilState(friendRequestsState);

  useEffect(() => {
    console.log(friends);
  }, [friends]);

  const handleAccept = (id) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === id ? { ...friend, isAccepted: true } : friend
      )
    );
  };

  const handleDelete = (id) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== id)
    );
  };

  const pendingFriends = friends.filter((friend) => !friend.isAccepted);

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
              {friends.map((friend) => (
                <Block.FlexBox
                  key={friend.id}
                  padding="20px 0 "
                  borderBottom="2px solid #E7E7E7"
                >
                  <Block.FlexBox gap="10px">
                    {/* 친구의 프로필 사진 */}
                    <ProfileAvatar />
                    <Block.FlexBox>
                      {/* 친구의 닉네임 */}
                      <Text.ModalText>{friend.name}</Text.ModalText>
                    </Block.FlexBox>
                  </Block.FlexBox>
                  {/* 수락/거절 버튼 */}
                  <Block.FlexBox>
                    {friend.isAccepted ? (
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
                          onClick={() => handleDelete(friend.id)}
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
                          onClick={() => handleAccept(friend.id)}
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
