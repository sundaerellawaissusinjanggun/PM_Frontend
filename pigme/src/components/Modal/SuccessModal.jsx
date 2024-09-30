import BasicModal from './BasicModal';
import { Block, Button, Text } from '../../styles/UI';
import styled from '@emotion/styled';

export default function SuccessModal({
  isOpen,
  setIsOpen,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancle,
  title,
  imageSrc,
}) {
  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="auto"
      showCloseIcon={false}
    >
      <Block.ColumnFlexBox gap="30px">
        {/* 닉네임 부분 스타일링 */}
        <Block.FlexBox justifyContent="center">
          <Text.ModalTitle>{title}</Text.ModalTitle>
        </Block.FlexBox>
        {imageSrc && <LogoImg src={imageSrc} alt="모달 이미지" />}
        <Text.ModalText
          style={{
            whiteSpace: 'pre-line',
            textAlign: 'center',
            padding: '0 25px',
            color: '#BDBDBD',
          }}
        >
          {message}
        </Text.ModalText>
        <Block.FlexBox justifyContent="space-evenly">
          <Button.SubmitBtn width="124px" height="50px" onClick={onCancle}>
            <Text.ModalText> {cancelText}</Text.ModalText>
          </Button.SubmitBtn>
          <Button.SubmitBtn
            bgColor="pink"
            width="124px"
            height="50px"
            onClick={onConfirm}
          >
            <Text.ModalText color="white"> {confirmText}</Text.ModalText>
          </Button.SubmitBtn>
        </Block.FlexBox>
      </Block.ColumnFlexBox>
    </BasicModal>
  );
}

const LogoImg = styled.img`
  width: 93px;
  height: 88px;
`;
