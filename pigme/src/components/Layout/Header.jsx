import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Text } from "../../styles/UI";

export default function Header({ showHomeIcon, showBackIcon, showMyPageIcon, showNextIcon }) {
    const navigate = useNavigate();

    return (
        <Style.Wrapper>
            {showBackIcon && <button onClick={() => navigate(-1)}>뒤로가기</button>}
            {showHomeIcon && <button onClick={() => navigate("/home")}>홈</button>}
            {showMyPageIcon && <button onClick={() => navigate("/profile")}>마이페이지</button>}
            {showNextIcon && (
                <button onClick={() => navigate("/profileSetup")}>
                    <Text.MiniTitle2 color="white">완료</Text.MiniTitle2>
                </button>
            )}
        </Style.Wrapper>
    );
}

const Style = {
    Wrapper: styled.div`
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
    `,
};
