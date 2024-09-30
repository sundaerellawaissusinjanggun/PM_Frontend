import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block, Text } from '../../styles/UI';
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
import Skeleton from '@mui/material/Skeleton';

export default function Home() {
  const confirmModal = useModal();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [friendDetails, setFriendDetails] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const containerRef = useRef(null);

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

        const friendDetailsArray = [];
        for (const friendObj of friends) {
          const friendId = friendObj.friend[0];

          try {
            const userDoc = await getDoc(doc(db, 'users', friendId));
            if (userDoc.exists()) {
              const friendDetail = { id: friendId, ...userDoc.data() };
              friendDetailsArray.push(friendDetail);
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
      } catch (error) {
        console.error('Error fetching user data or friends list: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleConfirm = () => {
    confirmModal.closeModal();
    navigate('/message', {
      state: {
        userData,
        selectedAvatar,
        friendNickname: selectedAvatar.nickname,
        friendId: selectedAvatar.id,
      },
    }); // Pass friend's nickname
  };

  const handleCancel = () => {
    confirmModal.closeModal();
  };

  const handleAvatarClick = (friendDetail) => {
    setSelectedAvatar(friendDetail);
    confirmModal.openModal();
  };

  if (!userData || !userData.avatar) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  return (
    <>
      {selectedAvatar && (
        <BankModal
          isOpen={confirmModal.isOpen}
          setIsOpen={confirmModal.setIsOpen}
          nickname={selectedAvatar.nickname}
          message="사람들이 주고 간 코인을 클릭하면
          메세지를 구경할 수 있어요!"
          confirmText="나도 저금할래!"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          imageSrc={selectedAvatar.avatar}
        />
      )}
      <HomeWrapper>
        <Block.HeaderBox width="100%" justifyContent="flex-end">
          <Header showMyPageIcon={true} />
        </Block.HeaderBox>

        <Block.AbsoluteBox bottom="0" left="14px" alignItems="center">
          <FenceImage src={Fence} />
        </Block.AbsoluteBox>

        {/* 친구 목록 표시 */}
        <FriendContainer ref={containerRef}>
          {friendsList.length > 0 ? (
            friendsList.map((friend, index) => {
              const friendId = friend.friend[0];
              const friendDetail = friendDetails.find(
                (detail) => detail.id === friendId
              );

              const containerWidth = containerRef.current?.offsetWidth || 0;
              const containerHeight = containerRef.current?.offsetHeight || 0;

              const randomTop = Math.random() * (containerHeight - 100);
              const randomLeft = Math.random() * (containerWidth - 100);

              return (
                <Block.FlexBox
                  key={index}
                  style={{
                    position: 'absolute',
                    top: `${randomTop}px`,
                    left: `${randomLeft}px`,
                    cursor: 'pointer',
                  }}
                >
                  {friendDetail && friendDetail.avatar ? (
                    <div onClick={() => handleAvatarClick(friendDetail)}>
                      <ProfileAvatar
                        color={friendDetail.avatar.color.image}
                        item={friendDetail.avatar.item.image}
                      />
                    </div>
                  ) : (
                    <Skeleton />
                  )}
                </Block.FlexBox>
              );
            })
          ) : (
            <Block.ColumnFlexBox height="100%" gap="5px">
              <Text.Body2>아직 친구가 없네요.</Text.Body2>
              <Text.Body2>먼저 친구 요청을 해보시는 건 어떨까요?</Text.Body2>
            </Block.ColumnFlexBox>
          )}
        </FriendContainer>
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

const FriendContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
`;
