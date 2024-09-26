// 좋아요 개수, 좋아요 목록
import styled from '@emotion/styled';
import WarningModal from '../components/Modal/WarningModal.jsx';
import useModal from '../components/Hooks/useModal';
import { useNavigate } from 'react-router-dom';
import Smile from '/sunglasses-smile.svg';

export default function DeleteButton() {
  // 경고 모달
  const warningModal = useModal();
  const navigate = useNavigate();
  const handleGoToMainHome = () => navigate('/home');
  return (
    <>
      <WarningModal
        isOpen={warningModal.isOpen}
        setIsOpen={warningModal.setIsOpen}
        message="성공적으로 삭제되었어요!"
        actionText="메인페이지로 이동하기"
        onAction={handleGoToMainHome}
        imageSrc={Smile}
      />
      <DeleteButton onClick={warningModal.openModal}>삭제하기</DeleteButton>
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
