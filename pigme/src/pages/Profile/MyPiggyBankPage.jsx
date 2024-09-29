// 나의 저금통
import { useState } from 'react';
import styled from '@emotion/styled';
import { Block } from '../../styles/UI';
import Background from '../../components/Layout/Background';
import Header from '../../components/Layout/Header';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import PiggyBankMessages from '../../components/Hooks/PiggyBankMessages';
import Coin from '/coin.svg';
import useModal from '../../components/Hooks/useModal';

import { useNavigate } from 'react-router-dom';
import WarningModal from '../../components/Modal/WarningModal';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function MyPiggyBankPage() {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useRecoilState(userState);

  // 메시지를 추가하는 함수
  const addMessage = (messageText) => {
    const newMessage = {
      id: messages.length + 1,
      text: messageText,
    };
    setMessages([...messages, newMessage]); // 새로운 메시지를 추가
  };

  // 경고 모달
  const warningModal = useModal();
  const navigate = useNavigate();
  const handleGoToMainHome = () => navigate('/home');

  return (
    <>
      <WarningModalWrapper>
        <WarningModal
          isOpen={warningModal.isOpen}
          setIsOpen={warningModal.setIsOpen}
          message="아직 동전이 2개밖에 없어요!
        받은 편지가 3개 이상일 때부터
        편지를 확인할 수 있어요."
          actionText="홈으로 이동하기"
          onAction={handleGoToMainHome}
          imageSrc="/sad-pig.svg"
        />
      </WarningModalWrapper>
      <Wrapper>
        <Block.HeaderBox justifyContent="flex-end" alignItems="center">
          <Header showHomeIcon={true} />
        </Block.HeaderBox>
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
            <MessageWrapper onClick={warningModal.openModal}>
              <PiggyBankMessages messages={messages} />
            </MessageWrapper>
          </Background>
        </Block.AbsoluteBox>
      </Wrapper>
    </>
  );
}
const WarningModalWrapper = styled.div`
  position: absolute;
  bottom: 30px; /* 아래쪽으로 이동 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10; /* 다른 요소보다 위에 나타나도록 */
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
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
