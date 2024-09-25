import BasicModal from './BasicModal';
import { Block, Text } from '../../styles/UI';
import styled from '@emotion/styled';

export default function BankModal({
  isOpen,
  setIsOpen,
  message,
  confirmText,
  cancelText,
  onConfirm,
  nickname, // 닉네임을 별도로 받습니다
}) {
  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="292px"
      showCloseIcon={false}
    >
      <Block.FlexBox direction="column" alignItems="center">
        {/* 닉네임 부분 스타일링 */}
        <TitleContainer>
          <Text.ModalTitle>{nickname}</Text.ModalTitle>
          <Text.ModalTitle2>님의 저금통</Text.ModalTitle2>
        </TitleContainer>
        <Text.ModalText style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          {message}
        </Text.ModalText>
        <Block.FlexBox justifyContent="space-between">
          <button onClick={() => setIsOpen(false)}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </Block.FlexBox>
      </Block.FlexBox>
    </BasicModal>
  );
}

// 타이틀 전체를 감싸는 컨테이너
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 16px;
`;
