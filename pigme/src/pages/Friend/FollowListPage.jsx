// 친구 추가
import { useState } from 'react';
import styled from '@emotion/styled';
import { Block, Input, Button, Text, Img } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import Pig from '/colors/pig.svg';

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
          <Block.FlexBox justifyContent="flex-end" margin="10px 0">
            <Text.Body1 weight="bold" color="black">
              8개
            </Text.Body1>
            <Text.Body1 weight="bold">의 친구 요청</Text.Body1>
          </Block.FlexBox>

          {/* 친구 목록 영역 */}
          <Block.FlexBox padding="20px 0 " borderBottom="2px solid #E7E7E7">
            <Block.FlexBox gap="10px">
              <Img.AngledIcon src={Pig} width="21px" />
              <Block.FlexBox>
                <Text.ModalText>닉네임</Text.ModalText>
              </Block.FlexBox>
            </Block.FlexBox>
            <Block.FlexBox>
              {isAccepted ? (
                <ButtonWrapper>
                  <Text.ButtonText color="grayDeep">
                    친구가 되었어요!
                  </Text.ButtonText>
                </ButtonWrapper>
              ) : (
                <ButtonWrapper>
                  <Button.FriendBtn width="43px" height="24px" bgColor="white">
                    <Text.ButtonText color="grayDeep">거절</Text.ButtonText>
                  </Button.FriendBtn>
                  <Button.FriendBtn
                    width="43px"
                    height="24px"
                    bgColor="pink"
                    border="none"
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
  justify-content: flex-end;
  margin-left: auto;
  gap: 8px;
`;
