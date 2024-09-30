import { Block, Text, Img } from '../../styles/UI';
import styled from '@emotion/styled';
import Header from '../../components/Layout/Header';
import BackgroundCoin from '/background-coin.svg';
import { useLocation } from 'react-router';

export default function ReadMessagePage() {
  const location = useLocation();
  const { messageData } = location.state || {}; // location.state가 undefined일 경우 빈 객체로 초기화

  console.log(messageData);

  return (
    <>
      <Block.HeaderBox width="100%" justifyContent="space-between">
        <Header showHomeIcon={true} showBackIcon={true} />
      </Block.HeaderBox>

      <BackgroundBox padding="30px">
        <Block.FlexBox direction="column" height="100%">
          {messageData ? (
            <>
              <ReceiverTextWrapper>
                <Text.Title color="grayLight">To.&nbsp;</Text.Title>
                <Text.Title>{messageData.receiverNickname}</Text.Title>
              </ReceiverTextWrapper>

              <MessageWrapper>{messageData.message}</MessageWrapper>

              <SenderTextWrapper>
                <Text.Title color="grayLight">From.&nbsp;</Text.Title>
                <Text.Title>{messageData.senderNickname}</Text.Title>
              </SenderTextWrapper>
            </>
          ) : (
            <Block.FlexBox
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text.Title>메세지를 읽을 수 없어요 :{'('} </Text.Title>
            </Block.FlexBox>
          )}
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
