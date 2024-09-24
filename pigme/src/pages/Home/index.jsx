import { useState } from "react";
import BasicModal from "../../components/Modal/BasicModal";
import { Block, Text } from "../../styles/UI";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    return (
        <>
            <button onClick={openModal}>모달 열기</button>
            <BasicModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} width="340px" height="292px">
                <Block.FlexBox direction="column" alignItems="center">
                    <Text.Body1>경고</Text.Body1>
                    <Text.Body1>로그인이 필요한 기능입니다!</Text.Body1>
                    <Text.Body1>로그인 페이지로 이동하기</Text.Body1>
                </Block.FlexBox>
            </BasicModal>
        </>
    );
}
