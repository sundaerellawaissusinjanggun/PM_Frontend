import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BankModal from '../../components/Modal/BankModal';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function Home() {
  const [userDataState, setUserDataState] = useRecoilState(userState);
  const confirmModal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log('사용자 avatar 정보:', userData.avatar);
          console.log('사용자 닉네임:', userData.nickname);
          console.log('사용자 한 줄 소개:', userData.introduction);
        } else {
          console.log('사용자 데이터를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('사용자 데이터 가져오기 실패:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('현재 로그인한 사용자:', user);
        console.log('사용자 UID:', user.uid);
        console.log('사용자 이메일:', user.email);

        fetchUserData(user.uid);
      } else {
        console.log('사용자가 로그인되어 있지 않습니다.');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleConfirm = () => {
    confirmModal.closeModal();
    navigate('/message');
  };
  const handleCancel = () => {
    confirmModal.closeModal();
  };

  return (
    <>
      <BankModal
        isOpen={confirmModal.isOpen}
        setIsOpen={confirmModal.setIsOpen}
        nickname={userDataState.nickname} // 닉네임을 전달
        message="사람들이 주고 간 코인을 클릭하면 메세지를 구경할 수 있어요!"
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
    margin-right: 0; /* 마지막 이미지는 오른쪽이 겹치지 않도록 */
  }
`;
