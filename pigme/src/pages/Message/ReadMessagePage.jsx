import { Block, Text, Img } from '../../styles/UI';
import styled from '@emotion/styled';
import Header from '../../components/Layout/Header';

import BackgroundCoin from '/background-coin.svg';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import { useLocation } from 'react-router';

export default function ReadMessagePage() {
  // const [userData, setUserData] = useRecoilState(userState);
  const location = useLocation();
  const { userData, selectedAvatar, friendNickname, message } =
    location.state || {};

  return (
    <>
      <Block.HeaderBox width="100%" justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <BackgroundBox padding="30px">
        <Block.FlexBox direction="column" height="100%">
          <ReceiverTextWrapper>
            <Text.Title color="grayLight">To.&nbsp;</Text.Title>
            <Text.Title>{friendNickname}</Text.Title>
          </ReceiverTextWrapper>

          <MessageWrapper>{message}</MessageWrapper>

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
  height: 85%;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #838383;
  font-size: 20px;
`;
