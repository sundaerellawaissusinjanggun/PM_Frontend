import BasicModal from "./BasicModal";
import { Block, Text } from "../../styles/UI";

export default function ConfirmModal({
    isOpen,
    setIsOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
}) {
    return (
        <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} width="340px" height="292px" title={title}>
            <Block.FlexBox direction="column" alignItems="center">
                <Text.Body1>{message}</Text.Body1>
                <Block.FlexBox justifyContent="space-between">
                    <button onClick={onCancel || (() => setIsOpen(false))}>{cancelText}</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </Block.FlexBox>
            </Block.FlexBox>
        </BasicModal>
    );
}
