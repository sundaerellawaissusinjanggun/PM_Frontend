// import { useState } from "react";
// import WarningModal from "../../components/Modal/WarningModal";
// import { useNavigate } from "react-router-dom";
// import ConfirmModal from "../../components/Modal/ConfirmModal";

// export default function Home() {
//     const navigate = useNavigate();

//     // 경고 모달 관련
//     const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
//     const openWarningModal = () => setIsWarningModalOpen(true);
//     const handleGoToLogin = () => navigate("/login");

//     // 확인 모달 관련
//     const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//     const openConfirmModal = () => setIsConfirmModalOpen(true);
//     const handleConfirm = () => {
//         alert("작업이 확인되었습니다.");
//         setIsConfirmModalOpen(false);
//     };
//     const handleCancel = () => {
//         alert("작업이 취소되었습니다.");
//         setIsConfirmModalOpen(false);
//     };

//     return (
//         <>
//             <button onClick={openWarningModal}>경고 모달 열기</button>
//             <WarningModal
//                 isOpen={isWarningModalOpen}
//                 setIsOpen={setIsWarningModalOpen}
//                 title="경고"
//                 message="로그인이 필요한 기능입니다!"
//                 actionText="로그인 페이지로 이동하기"
//                 onAction={handleGoToLogin}
//             />
//             <button onClick={openConfirmModal}>확인 모달 열기</button>
//             <ConfirmModal
//                 isOpen={isConfirmModalOpen}
//                 setIsOpen={setIsConfirmModalOpen}
//                 title="작업 확인"
//                 message="이 작업을 정말로 진행하시겠습니까?"
//                 confirmText="확인"
//                 cancelText="취소"
//                 onConfirm={handleConfirm}
//                 onCancel={handleCancel}
//             />
//         </>
//     );
// }

// 메인화면 (와글돼지)

import React from 'react';
import styled from '@emotion/styled';
import Fence from '/fence.svg';
import { Block } from '../../styles/UI';
import Header from '../../components/Layout/Header';

export default function Home() {
  return (
    <>
      <HomeWrapper>
        {/* 헤더 영역 */}
        <Block.HeaderBox width="100%" justifyContent="flex-end">
          <Header showMyPageIcon={true} />
        </Block.HeaderBox>
        <div>돼지 한마리 두마리 ~</div>
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
