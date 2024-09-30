import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BankModal from '../../components/Modal/BankModal';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';

export default function Home() {
  const confirmModal = useModal();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [friendDetails, setFriendDetails] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.userId;
      console.log('userID', userId);

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

        const q = query(
          collection(db, 'friendList'),
          where('friend', 'array-contains', userId)
        );
        const querySnapshot = await getDocs(q);

        const friends = [];
        querySnapshot.forEach((doc) => {
          friends.push(doc.data());
        });
        setFriendsList(friends);

        // Firebase에서 사용자 정보를 가져오는 부분
        const friendDetailsArray = []; // 친구 세부 정보를 저장할 배열
        for (const friendObj of friends) {
          const friendId = friendObj.friend[0]; // 첫 번째 친구 ID 저장
          console.log(`Fetching user data for friendId: ${friendId}`);

          try {
            // Firebase에서 해당 사용자 정보 가져오기
            const userDoc = await getDoc(doc(db, 'users', friendId));
            if (userDoc.exists()) {
              const friendDetail = { id: friendId, ...userDoc.data() }; // ID 포함
              friendDetailsArray.push(friendDetail);
              console.log('User data found:', friendDetail);
            } else {
              console.log('No user data found for friendId:', friendId);
            }
          } catch (error) {
            console.error(
              `Error fetching user data for friendId ${friendId}:`,
              error
            );
          }
        }

        setFriendDetails(friendDetailsArray);
        console.log('Friend Details:', friendDetailsArray);
      } catch (error) {
        console.error('Error fetching user data or friends list: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleConfirm = () => {
    confirmModal.closeModal();
    navigate('/message');
  };

  const handleCancel = () => {
    confirmModal.closeModal();
  };

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
            friendsList.map((friend, index) => {
              const friendId = friend.friend[0];
              const friendDetail = friendDetails.find(
                (detail) => detail.id === friendId
              );

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: `${Math.random() * 80}vh`,
                    left: `${Math.random() * 80}vw`,
                  }}
                >
                  {friendDetail && friendDetail.avatar ? (
                    <>
                      <ProfileAvatar
                        color={friendDetail.avatar.color.image}
                        item={friendDetail.avatar.item.image}
                      />
                    </>
                  ) : (
                    <div>아바타 정보가 없습니다.</div>
                  )}
                </div>
              );
            })
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
