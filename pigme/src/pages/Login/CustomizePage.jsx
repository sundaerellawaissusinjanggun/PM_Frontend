import React, { useState } from "react";
import styled from "@emotion/styled";
import Custombox from "../../components/Custom/Custombox";
import { useNavigate } from "react-router-dom";
import { Block } from "../../styles/UI";

export default function CustomizePage() {
    const navigate = useNavigate();
    const handleGoToMain = () => {
        navigate("/home");
    };
    return (
        <>
            <button onClick={handleGoToMain}>다음</button>
            <Style.Wrapper>
                <Custombox />
            </Style.Wrapper>
        </>
    );
}

const Style = {
    Wrapper: styled.div`
        width: 390px;
        height: 844px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        scrollbar-width: none; // 스크롤의 기본 스타일은 지우고 스크롤의 기능만 사용
        overscroll-behavior: none; // 스크롤이 오버되는 것을 막아준다.
        overflow-y: auto; /* 스크롤을 세로로만 허용 */
    `,
};
