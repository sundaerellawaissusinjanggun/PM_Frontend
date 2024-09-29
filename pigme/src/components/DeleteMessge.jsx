// 삭제 성공 모달

import styled from '@emotion/styled';
import WarningModal from '../components/Modal/WarningModal.jsx';
import useModal from '../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import Smile from '/sunglasses-smile.svg';
import CancleModal from '../components/Modal/CancleModal.jsx';
import Caution from '/caution-icon.svg';
export default function DeleteMessage() {
  // 경고 모달
  const warningModal = useModal();
  const cancleModal = useModal();
  const navigate = useNavigate();
  const handleGoToMainHome = () => navigate('/home');
  return (
    <>
      {/* 작성 중 삭제 확인 모달 */}
      <CancleModal
        isOpen={cancleModal.isOpen}
        setIsOpen={cancleModal.setIsOpen}
        imageSrc={Caution}
        message={'삭제하면 다시 되돌릴 수 없어요!\n정말 삭제하시겠어요?'}
        cancelText={'아니오'}
        confirmText={'네 삭제할래요'}
        onConfirm={warningModal.openModal}
      />
      {/* 삭제 성공 모달 */}
      <WarningModal
        isOpen={warningModal.isOpen}
        setIsOpen={warningModal.setIsOpen}
        message="성공적으로 삭제되었어요!"
        actionText="메인페이지로 이동하기"
        onAction={handleGoToMainHome}
        imageSrc={Smile}
        style={{ height: '303px' }}
      />
      <DeleteButton onClick={cancleModal.openModal}>삭제하기</DeleteButton>
    </>
  );
}

const DeleteButton = styled.button`
  color: #bebebe;
  font-size: 16px;
  text-decoration: underline;
  display: flex;
  /* border: 1px solid #bebebe; */
  &:hover {
  }
`;
