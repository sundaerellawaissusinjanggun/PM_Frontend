// 메인화면 (와글돼지)

import React, { useState } from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BankModal from '../../components/Modal/BankModal';

export default function Home() {
  const [nickname, setNickname] = useState('저돼지아닌데요');
  // 경고 모달
  const confirmModal = useModal();
  const navigate = useNavigate();

  const handleConfirm = () => {
    confirmModal.closeModal();
    navigate('/custom');
  };
  const handleCancel = () => {
    confirmModal.closeModal();
  };

  return (
    <>
      <BankModal
        isOpen={confirmModal.isOpen}
        setIsOpen={confirmModal.setIsOpen}
        nickname={nickname} // 닉네임을 전달
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
        <div onClick={confirmModal.openModal}>돼지 한마리 두마리 ~</div>
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
  background: url(background-purple.svg);
`;

const FenceImage = styled.img`
  margin-left: -14px;
  margin-right: -14px;

  &:last-of-type {
    margin-right: 0; /* 마지막 이미지는 오른쪽이 겹치지 않도록 */
  }
`;
