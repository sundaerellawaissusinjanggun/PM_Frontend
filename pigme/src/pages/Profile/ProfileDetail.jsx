import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Background from '../../components/Layout/Background';
import { db, auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Block, Text } from '../../styles/UI';
import { onAuthStateChanged } from 'firebase/auth';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function ProfileDetail() {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);

  const [userEmail, setUserEmail] = useState(userData.email);
  const [nickname, setNickname] = useState(userData.nickname);
  const [introduction, setIntroduction] = useState(userData.introduction);
  const [coins, setCoins] = useState(0);
  const [likedMessagesCount, setLikedMessagesCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserEmail(auth.currentUser.email);
          setNickname(userData.nickname);
          setIntroduction(userData.introduction);
          setCoins(userData.coins || 0);
          setLikedMessagesCount(userData.likedMessages?.length || 0);

          console.log('사용자 이메일:', auth.currentUser.email);
          console.log('닉네임:', userData.nickname);
          console.log('한 줄 소개:', userData.introduction);
          console.log('현재 보유 코인:', userData.coins || 0);
          console.log(
            '즐겨찾는 메세지 개수:',
            userData.likedMessages?.length || 0
          );
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
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

  const handelGoToCustom = () => navigate('/custom');
  const handelGoToMyBank = () => navigate('/myBank');
  const handelGoToLike = () => navigate('/like');

  return (
    <Background>
      <Style.ProfileTitle>나의 프로필</Style.ProfileTitle>
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

          <Block.FlexBox justifyContent="flex-end">
            <Style.SaveButton onClick={handelGoToCustom}>
              프로필 수정하기
            </Style.SaveButton>
          </Block.FlexBox>
        </Style.UserInfo>
        <Style.UserStatsContainer>
          <Style.StatsButton onClick={handelGoToMyBank}>
            현재 보유 코인 <Style.StatsCount>{coins}개</Style.StatsCount>
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
    width: 80px;
    color: #808080;
    text-decoration: underline;
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
  ProfileTitle: styled.p`
    padding: 16px 0;
    font-size: 22px;
    font-weight: bold;
    border-bottom: 1px solid #bebebe;
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
    padding: 30px 0;
    border-top: 1px solid #bebebe;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    gap: 10px;
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
