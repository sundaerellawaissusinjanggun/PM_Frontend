import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Block, Img } from '../../styles/UI';
import Background from '../../components/Layout/Background';
import Header from '../../components/Layout/Header';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import Coin from '/coin.svg';
import useModal from '../../components/Hooks/useModal';

import { useLocation, useNavigate } from 'react-router-dom';
import WarningModal from '../../components/Modal/WarningModal';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function MyPiggyBankPage() {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useRecoilState(userState);

  // 경고 모달
  const warningModal = useModal();
  const navigate = useNavigate();
  const handleGoToMainHome = () => navigate('/home');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.uid;

      if (!userId) {
        console.error('No userId found');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No such user!');
        }
      } catch (error) {
        console.error(
          `Error fetching user data for friendId ${userId}:`,
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const handleCoinClick = () => {
    if (messages.length <= 2) {
      warningModal.openModal();
    } else {
      console.log('You have enough messages!');
    }
  };

  return (
    <>
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
      <Wrapper>
        <Block.HeaderBox justifyContent="flex-end">
          <Header showHomeIcon={true} />
        </Block.HeaderBox>
        <AvatarWrapper>
          <ProfileAvatar
            color={userData.avatar.color.image}
            item={userData.avatar.item.image}
          />
        </AvatarWrapper>
        <Block.AbsoluteBox bottom="0">
          <Background>
            <ProfileTitle>
              <img src={Coin} />
              나의 저금통
            </ProfileTitle>
            <UserStatsContainer>
              <StatsDisplay>
                현재 보유 코인 <StatsCount> {messages.length}개</StatsCount>
              </StatsDisplay>
            </UserStatsContainer>

            <Img.RoundIcon
              width="50px"
              src="/coin.svg"
              onClick={handleCoinClick} // 코인 클릭 시 함수 호출
            />
          </Background>
        </Block.AbsoluteBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

const MessageWrapper = styled.div`
  position: absolute;
  padding: 30px;
`;
