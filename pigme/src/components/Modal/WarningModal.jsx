import BasicModal from './BasicModal';
import { Block, Text } from '../../styles/UI';

export default function WarningModal({
  isOpen,
  setIsOpen,
  title,
  message,
  actionText,
  onAction,
  imageSrc,
}) {
  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="292px"
      title={title}
      imageSrc={imageSrc}
    >
      <Block.ColumnFlexBox gap="20px">
        <img src={imageSrc} alt="Warning" />
        <Text.ModalText style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          {message}
        </Text.ModalText>
        <button onClick={onAction}>
          <Text.LinkText>{actionText}</Text.LinkText>
        </button>
      </Block.ColumnFlexBox>
    </BasicModal>
  );
}
