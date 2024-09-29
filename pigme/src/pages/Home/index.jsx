import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BankModal from '../../components/Modal/BankModal';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { db, auth } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';

export default function Home() {
  const [userData, setUserData] = useRecoilState(userState);
  const confirmModal = useModal();
  const navigate = useNavigate();
  const [friendsList, setFriendsList] = useState([]);

  const handleConfirm = () => {
    console.log('Confirm button clicked');
    confirmModal.closeModal();
    navigate('/message');
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    confirmModal.closeModal();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Firebase 인증 후 사용자 정보 가져오기
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userDataFromDB = userDoc.data();
        setUserData({
          userId: user.uid,
          ...userDataFromDB,
        });
      }
    };

    fetchUserData();
  }, [setUserData]);

  useEffect(() => {
    if (userData && userData.userId) {
      console.log('User data:', userData.userId);

      const fetchFriends = async () => {
        try {
          const q = query(
            collection(db, 'friendsListState'),
            where('friendId', '==', userData.userId)
          );

          const querySnapshot = await getDocs(q);
          const friends = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            friends.push(data.friendReceiverId);
          });

          const friendAvatars = await Promise.all(
            friends.map(async (friendId) => {
              const friendDoc = await getDoc(doc(db, 'users', friendId));
              return { id: friendId, ...friendDoc.data() };
            })
          );

          setFriendsList(friendAvatars);
        } catch (error) {
          console.error('친구 목록 가져오기 오류:', error);
        }
      };

      fetchFriends();
    } else {
      console.log('User data is not ready yet.');
    }
  }, [userData]);

  if (!userData || !userData.avatar) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  return (
    <>
      <BankModal
        isOpen={confirmModal.isOpen}
        setIsOpen={confirmModal.setIsOpen}
        nickname={userData.nickname}
        message="사람들이 주고 간 코인을 클릭하면 
        메세지를 구경할 수 있어요!"
        confirmText="나도 저금할래!"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        imageSrc="/colors/pig.svg"
      />
      <HomeWrapper>
        <Block.HeaderBox width="100%" justifyContent="flex-end">
          <Header showMyPageIcon={true} />
        </Block.HeaderBox>
        <div onClick={confirmModal.openModal}>돼지</div>
        <Block.AbsoluteBox bottom="0" left="14px" alignItems="center">
          <FenceImage src={Fence} />
        </Block.AbsoluteBox>

        {/* 친구 목록 표시 */}
        <div>
          {friendsList.length > 0 ? (
            friendsList.map((friend) => (
              <div key={friend.id}>
                {friend.avatar ? (
                  <>
                    <div>아바타 색상: {friend.avatar.color}</div>
                    <img
                      src={friend.avatar.url}
                      alt={`${friend.avatar.color} 친구 아바타`}
                    />
                  </>
                ) : (
                  <div>아바타 정보가 없습니다.</div>
                )}
                <div>이름: {friend.name}</div>
                <div>아이디: {friend.id}</div>
              </div>
            ))
          ) : (
            <div>친구가 없습니다.</div>
          )}
        </div>
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #fae8e0;
`;

const FenceImage = styled.img`
  margin-left: -14px;
  margin-right: -14px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #ff7195;
`;
