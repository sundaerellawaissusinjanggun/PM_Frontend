import BasicModal from "./BasicModal";
import { Block, Text } from "../../styles/UI";

export default function ConfirmModal({ isOpen, setIsOpen, onConfirm }) {
    return (
        <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} width="340px" height="292px" title="확인">
            <Block.FlexBox direction="column" alignItems="center">
                <Text.Body1>이 작업을 정말로 진행하시겠습니까?</Text.Body1>
                <Block.FlexBox justifyContent="space-between">
                    <button onClick={() => setIsOpen(false)}>취소</button>
                    <button onClick={onConfirm}>확인</button>
                </Block.FlexBox>
            </Block.FlexBox>
        </BasicModal>
    );
}
