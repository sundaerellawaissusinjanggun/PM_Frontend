import BasicModal from './BasicModal';
import { Block, Button, Text } from '../../styles/UI';
import styled from '@emotion/styled';

export default function BankModal({
  isOpen,
  setIsOpen,
  message,
  confirmText,
  cancelText,
  onConfirm,
  nickname,
  imageSrc,
}) {
  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="692px"
      showCloseIcon={false}
    >
      <Block.ColumnFlexBox gap="30px">
        {/* 닉네임 부분 스타일링 */}
        <Block.FlexBox justifyContent="center">
          <Text.ModalTitle>{nickname}</Text.ModalTitle>
          <Text.ModalTitle2>님의 저금통</Text.ModalTitle2>
        </Block.FlexBox>
        {imageSrc && <img src={imageSrc} alt="모달 이미지" />}
        <Text.ModalText style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          {message}
        </Text.ModalText>
        <Block.FlexBox padding="20px" height="250px">
          메시지 랜덤으로 보이는 곳
        </Block.FlexBox>
        <Block.FlexBox justifyContent="space-evenly">
          <Button.SubmitBtn
            width="124px"
            height="50px"
            onClick={() => setIsOpen(false)}
          >
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
