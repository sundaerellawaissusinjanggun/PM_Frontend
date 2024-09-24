import { useState } from "react";
import WarningModal from "../../components/Modal/WarningModal";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/Modal/ConfirmModal";

export default function Home() {
    const navigate = useNavigate();

    // 경고 모달 관련
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const openWarningModal = () => setIsWarningModalOpen(true);
    const handleGoToLogin = () => navigate("/login");

    // 확인 모달 관련
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const handleConfirm = () => {
        alert("작업이 확인되었습니다.");
        setIsConfirmModalOpen(false);
    };
    const handleCancel = () => {
        alert("작업이 취소되었습니다.");
        setIsConfirmModalOpen(false);
    };

    return (
        <>
            <button onClick={openWarningModal}>경고 모달 열기</button>
            <WarningModal
                isOpen={isWarningModalOpen}
                setIsOpen={setIsWarningModalOpen}
                title="경고"
                message="로그인이 필요한 기능입니다!"
                actionText="로그인 페이지로 이동하기"
                onAction={handleGoToLogin}
            />
            <button onClick={openConfirmModal}>확인 모달 열기</button>
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                setIsOpen={setIsConfirmModalOpen}
                title="작업 확인"
                message="이 작업을 정말로 진행하시겠습니까?"
                confirmText="확인"
                cancelText="취소"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
}
