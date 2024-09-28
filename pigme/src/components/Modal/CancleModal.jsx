import { Block, Button, Text } from '../../styles/UI';
import BasicModal from './BasicModal';
import styled from '@emotion/styled';

export default function CancleModal({
  isOpen,
  setIsOpen,
  message,
  confirmText,
  cancelText,
  onConfirm,
  imageSrc,
}) {
  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="303px"
    >
      <Block.FlexBox direction="column" alignItems="center" gap="20px">
        {imageSrc && <LogoImg src={imageSrc} alt="모달 이미지" />}
        <Text.ModalText
          style={{
            whiteSpace: 'pre-line',
            textAlign: 'center',
            padding: '0 30px',
          }}
        >
          {message}
        </Text.ModalText>
        <Block.FlexBox justifyContent="space-evenly">
          <Button.SubmitBtn
            width="123px"
            height="50px"
            onClick={() => setIsOpen(false)}
          >
            <Text.ModalText2> {cancelText}</Text.ModalText2>
          </Button.SubmitBtn>
          <Button.SubmitBtn
            width="123px"
            height="50px"
            bgColor="pink"
            onClick={onConfirm}
          >
            <Text.Body2 color="white">{confirmText}</Text.Body2>
          </Button.SubmitBtn>
        </Block.FlexBox>
      </Block.FlexBox>
    </BasicModal>
  );
}
const LogoImg = styled.img`
  width: 62px;
  height: 55px;
`;
