import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Text } from "../../styles/UI";

export default function Header({ showHomeIcon, showBackIcon, showMyPageIcon, showNextIcon }) {
    const navigate = useNavigate();

    return (
        <>
            {showBackIcon && (
                <button onClick={() => navigate(-1)}>
                    <Text.MiniTitle2 color="purple">뒤로</Text.MiniTitle2>
                </button>
            )}
            {showHomeIcon && <button onClick={() => navigate("/home")}>홈</button>} {/* 이미지 대체하기 */}
            {showMyPageIcon && <button onClick={() => navigate("/profile")}>프로필</button>} {/* 이미지 대체하기 */}
            {showNextIcon && (
                <button onClick={() => navigate("/profileSetup")}>
                    <Text.MiniTitle2 color="white">완료</Text.MiniTitle2>
                </button>
            )}
        </>
    );
}