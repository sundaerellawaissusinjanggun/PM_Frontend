// 나의 저금통
import { useState } from 'react';
import styled from '@emotion/styled';
import { Block } from '../../styles/UI';
import Background from '../../components/Layout/Background';
import Header from '../../components/Layout/Header';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import PiggyBankMessages from '../../components/Hooks/PiggyBankMessages';
import Coin from '/coin.svg';

export default function MyPiggyBankPage() {
  const [messages, setMessages] = useState([]);

  // 메시지를 추가하는 함수
  const addMessage = (messageText) => {
    const newMessage = {
      id: messages.length + 1,
      text: messageText,
    };
    setMessages([...messages, newMessage]); // 새로운 메시지를 추가
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <AvatarWrapper>
        <ProfileAvatar />
      </AvatarWrapper>
      <Block.AbsoluteBox bottom="0">
        <Background>
          <ProfileTitle>
            <img src={Coin} />
            나의 저금통
          </ProfileTitle>
          <UserStatsContainer>
            <StatsDisplay>
              현재 보유 코인 <StatsCount>12개</StatsCount>
            </StatsDisplay>
          </UserStatsContainer>
          <MessageWrapper>
            <PiggyBankMessages messages={messages} />
          </MessageWrapper>
        </Background>
      </Block.AbsoluteBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
`;

const AvatarWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 90px;
`;

const ProfileTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0;
  font-size: 22px;
  font-weight: bold;
`;
const UserStatsContainer = styled.div`
  padding: 10px 0;
  border-top: 1px solid #bebebe;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
`;
const StatsDisplay = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #808080;
`;
const StatsCount = styled.span`
  font-weight: bold;
  color: black;
`;
const CoinContainer = styled.div``;

const MessageWrapper = styled.div`
  position: absolute;
  padding: 30px;
`;
