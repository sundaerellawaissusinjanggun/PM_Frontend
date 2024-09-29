import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BankModal from '../../components/Modal/BankModal';
import { useRecoilState } from 'recoil';
import {
  friendRequestsState,
  friendsListState,
  userState,
} from '../../recoil/atoms';
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
  const confirmModal = useModal();
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const [friendRequests, setFriendRequests] =
    useRecoilState(friendRequestsState);
  const [friendsList, setFriendsList] = useRecoilState(friendsListState);

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
            friendsList.map((friend) => (
              <div key={friend.id}>
                {friend.avatar ? (
                  <>
                    <div onClick={confirmModal.openModal}>
                      아바타 색상: {friend.avatar.color}
                    </div>
                    <img
                      src={friend.avatar.url}
                      alt={`${friend.avatar.color} 친구 아바타`}
                    />
                  </>
                ) : (
                  <div>아바타 정보가 없습니다.</div>
                )}
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
