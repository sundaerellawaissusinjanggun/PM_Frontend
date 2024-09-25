import BasicModal from './BasicModal';
import { Block, Text } from '../../styles/UI';

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
      height="292px"
      title={title}
    >
      <Block.FlexBox direction="column" alignItems="center">
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
