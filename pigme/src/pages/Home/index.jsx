import { useState } from "react";
import WarningModal from "../../components/Modal/WarningModal";

export default function Home() {
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const openWarningModal = () => setIsWarningModalOpen(true);

    return (
        <>
            <button onClick={openWarningModal}>경고 모달 열기</button>
            <WarningModal isOpen={isWarningModalOpen} setIsOpen={setIsWarningModalOpen} />
        </>
    );
}
