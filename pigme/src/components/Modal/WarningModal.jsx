import BasicModal from "./BasicModal";
import { Block, Text } from "../../styles/UI";

export default function WarningModal({ isOpen, setIsOpen, title, message, actionText, onAction }) {
    return (
        <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} width="340px" height="292px" title={title}>
            <Block.FlexBox direction="column" alignItems="center">
                <Text.Body1>{message}</Text.Body1>
                <button onClick={onAction}>{actionText}</button>
            </Block.FlexBox>
        </BasicModal>
    );
}
