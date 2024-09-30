import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Background from '../../components/Layout/Background';
import { db, auth, handleLogout } from '../../firebase';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Block, Text } from '../../styles/UI';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function ProfileDetail() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [coins, setCoins] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserAvatar(userData.avatar);
          setUserEmail(userData.email);
          setNickname(userData.nickname);
          setIntroduction(userData.introduction);
          setCoins(userData.messages);

          console.log('사용자 이메일??????:', userEmail);
          console.log('닉네임:', nickname);
          console.log('한 줄 소개:', introduction);
          console.log('현재 보유 코인:', coins);
          console.log('아바타 color ', userAvatar.color.image);
          console.log('아바타 item ', userAvatar.item.image);

          await fetchUserMessages(userId);
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };

    const fetchUserMessages = async (userId) => {
      try {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const userMessages = [];

        querySnapshot.forEach((doc) => {
          userMessages.push({ id: doc.id, ...doc.data() });
        });

        setMessages(userMessages);
        console.log('사용자의 메시지:', userMessages);
      } catch (error) {
        console.error('메시지 데이터 가져오기 실패:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        console.error('사용자가 로그인되어 있지 않습니다.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handelGoToCustom = () => {
    navigate('/custom', {
      state: {
        userAvatar,
        userEmail,
        nickname,
        introduction,
        coins,
        messages,
      },
    });
  };

  const handelGoToMyBank = () => {
    navigate('/myBank', {
      state: {
        messages,
      },
    });
  };

  return (
    <Background>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #bebebe',
          padding: '0 0 20px 0',
        }}
      >
        <Text.Body4>나의 프로필</Text.Body4>

        <Block.FlexBox width="50px" onClick={handleLogout}>
          <Text.Body1 pointer color="grayLight">
            로그아웃
          </Text.Body1>
        </Block.FlexBox>
      </div>

      <Style.ProfileContainer>
        <Style.UserInfo>
          <Text.MiniTitle1>이메일</Text.MiniTitle1>
          <Style.InfoField>
            <Text.Body1>{userEmail}</Text.Body1>
          </Style.InfoField>

          <Text.MiniTitle1>닉네임</Text.MiniTitle1>
          <Style.InfoField>
            <Text.Body1>{nickname}</Text.Body1>
          </Style.InfoField>

          <Text.MiniTitle1>한 줄 소개</Text.MiniTitle1>
          <Style.InfoField>
            <Text.Body1>{introduction}</Text.Body1>
          </Style.InfoField>

          <Block.FlexBox justifyContent="center">
            <Style.SaveButton onClick={handelGoToCustom}>
              프로필 수정하기
            </Style.SaveButton>
          </Block.FlexBox>
        </Style.UserInfo>
        <Style.UserStatsContainer>
          <Style.StatsButton onClick={handelGoToMyBank}>
            현재 보유 코인{' '}
            <Style.StatsCount>{messages.length}개</Style.StatsCount>
          </Style.StatsButton>
        </Style.UserStatsContainer>
      </Style.ProfileContainer>
    </Background>
  );
}

const Style = {
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  SaveButton: styled.button`
    font-size: 12px;
    padding: 0 10px;
    margin-top: 20px;
    width: 30%;
    height: 25px;
    background-color: white;
    border-radius: 20px;
    color: #8c8c8c;
    border: 1px solid #bebebe;
  `,
  UserDetails: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
  `,
  UserInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,

  ProfileImageContainer: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #bebebe;
    border-radius: 20px;
    width: 66px;
    height: 66px;
  `,
  ProfileImage: styled.img`
    width: 45px;
    height: 42px;
    position: absolute;
    z-index: 1;
  `,
  EditImage: styled.img`
    width: 10px;
    height: 10px;
    position: absolute;
    z-index: 2;
  `,
  FieldEditImage: styled.img`
    display: flex;
    justify-content: flex-end;
    width: 12px;
    height: 12px;
  `,
  ProfileContainer: styled.div`
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 25px;
  `,
  InfoLabel: styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #bebebe;
  `,
  InfoText: styled.p`
    font-size: 12px;
  `,
  UserInfo: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  Input: styled.input`
    width: 100%;
    background-color: #ededed;
    border-radius: 15px;
  `,
  InfoField: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    background-color: #fafafa;
    border-radius: 10px;
  `,
  UserStatsContainer: styled.div`
    padding: 30px 0 0 0;
    margin: 100px 0 0 0;
    border-top: 1px solid #bebebe;
    display: flex;
    align-items: center;
    flex-direction: column;
  `,
  StatsButton: styled.button`
    font-size: 14px;
    font-weight: bold;
    color: #808080;
  `,
  StatsCount: styled.span`
    font-weight: bold;
    color: black;
  `,
};
