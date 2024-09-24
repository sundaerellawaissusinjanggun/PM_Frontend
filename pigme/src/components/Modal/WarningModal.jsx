import BasicModal from "./BasicModal";
import { Block, Text } from "../../styles/UI";

export default function WarningModal({ isOpen, setIsOpen }) {
    return (
        <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} width="340px" height="292px" title="경고">
            <Block.FlexBox direction="column" alignItems="center">
                <Text.Body1>로그인이 필요한 기능입니다!</Text.Body1>
                <button onClick={() => alert("로그인 페이지로 이동")}>로그인 페이지로 이동하기</button>
            </Block.FlexBox>
        </BasicModal>
    );
}
