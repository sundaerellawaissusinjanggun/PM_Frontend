// 친구 추가
import { useState } from 'react';
import styled from '@emotion/styled';
import { Block, Input, Button, Text } from '../../styles/UI';
import Header from '../../components/Layout/Header';
export default function FollowListPage() {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
  };

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
          <Block.FlexBox justifyContent="flex-end">
            <Text.Body1 weight="bold" color="black">
              8개
            </Text.Body1>
            <Text.Body1 weight="bold">의 친구 요청</Text.Body1>
          </Block.FlexBox>

          {/* 친구 목록 영역 */}
          <Block.FlexBox padding="20px 0 " borderBottom="2px solid #E7E7E7">
            <Block.FlexBox> 프로필 사진 </Block.FlexBox>
            <Block.FlexBox justifyContent="center">닉네임</Block.FlexBox>
            <Block.FlexBox>
              {isAccepted ? (
                <Block.FlexBox>친구가 되었어요!</Block.FlexBox>
              ) : (
                <ButtonWrapper>
                  <Button.FriendBtn width="43px" height="24px" bgColor="white">
                    <Text.ButtonText>거절</Text.ButtonText>
                  </Button.FriendBtn>
                  <Button.FriendBtn
                    width="43px"
                    height="24px"
                    bgColor="pink"
                    onClick={handleAccept}
                  >
                    <Text.ButtonText color="white">수락</Text.ButtonText>
                  </Button.FriendBtn>
                </ButtonWrapper>
              )}
            </Block.FlexBox>
          </Block.FlexBox>
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}
const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
