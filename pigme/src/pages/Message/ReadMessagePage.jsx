import { Block, Text, Img } from '../../styles/UI';
import styled from '@emotion/styled';
import Header from '../../components/Layout/Header';

import BackgroundCoin from '/background-coin.svg';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';

export default function ReadMessagePage() {
  const [userData, setUserData] = useRecoilState(userState);

  return (
    <>
      {/* 헤더 영역 */}
      <Block.HeaderBox width="100%" justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      {/* 돼지 영역 */}
      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        <ProfileAvatar
          color={userData.avatar.color.image}
          item={userData.avatar.item.image}
        />
        {/* ❌ 받는 사람의 image로 수정하기 */}
      </Block.AbsoluteBox>

      {/* input 영역 */}
      <BackgroundBox padding="30px">
        <Block.FlexBox direction="column" height="100%">
          {/* 받는 사람 */}
          <ReceiverTextWrapper>
            <Text.Title color="grayLight">To.&nbsp;</Text.Title>
            <Text.Title>받는사람</Text.Title>
            {/* ❌ 받는 사람의 nickname으로 수정하기 */}
          </ReceiverTextWrapper>

          {/* 메세지 영역 */}
          <MessageWrapper>
            {'senderId가 receiverId에게 남긴 content'}
            {/* ❌ senderId가 receiverId인 메세지 보여주도록 수정하기 */}
          </MessageWrapper>
          {/* 보낸 사람 */}
          <SenderTextWrapper>
            <Text.Title color="grayLight">From.&nbsp;</Text.Title>
            <Text.Title>{userData.nickname}</Text.Title>
          </SenderTextWrapper>
        </Block.FlexBox>
      </BackgroundBox>
    </>
  );
}
const BackgroundBox = styled(Block.BackgroundWhiteBox)`
  background-image: url(${BackgroundCoin});
  background-repeat: no-repeat;
  background-position: center;
`;
const ReceiverTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
`;
const SenderTextWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  white-space: nowrap;
`;
const MessageWrapper = styled(Block.FlexBox)`
  height: 100%;
  padding: 30px 50px;
  align-items: center;
  color: #838383;
  font-size: 20px;
`;
