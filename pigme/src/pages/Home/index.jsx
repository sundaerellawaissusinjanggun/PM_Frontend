import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BankModal from '../../components/Modal/BankModal';
import { useRecoilState } from 'recoil';
import { userState, friendsListState } from '../../recoil/atoms';

export default function Home() {
  const [userData, setUserData] = useRecoilState(userState);
  const [friendsList, setFriendsList] = useRecoilState(friendsListState);
  const confirmModal = useModal();
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log('Confirm button clicked');
    confirmModal.closeModal();
    navigate('/message');
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    confirmModal.closeModal();
  };

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
        {/* 헤더 영역 */}
        <Block.HeaderBox width="100%" justifyContent="flex-end">
          <Header showMyPageIcon={true} />
        </Block.HeaderBox>
        <div onClick={confirmModal.openModal}>돼지</div>
        <Block.AbsoluteBox bottom="0" left="14px" alignItems="center">
          <FenceImage src={Fence} />
        </Block.AbsoluteBox>
        {/* 친구 목록 표시 */}
        <div>
          <h3>친구 목록</h3>
          {friendsList.length > 0 ? (
            friendsList.map((friend, index) => (
              <div key={index}>
                <div>친구 닉네임: {friend.friendNickname}</div>
                <div>아바타 색상: {friend.friendAvatar.color}</div>
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
