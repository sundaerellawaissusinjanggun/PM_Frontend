import { Block, Button, Text } from '../../styles/UI';
import BasicModal from './BasicModal';

export default function ConfirmModal({
  isOpen,
  setIsOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
}) {
  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="252px"
    >
      <Block.FlexBox direction="column" alignItems="center" gap="20px">
        {title && <Text.ModalTitle>{title}</Text.ModalTitle>}
        <Text.ModalText style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
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
