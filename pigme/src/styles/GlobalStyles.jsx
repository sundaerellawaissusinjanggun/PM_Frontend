/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import emotionNormalize from "emotion-normalize";

const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                ${emotionNormalize}
                * {
                    box-sizing: border-box;
                    scrollbar-width: none; // 스크롤의 기본 스타일은 지우고 스크롤의 기능만 사용
                    overscroll-behavior: none; // 스크롤이 오버되는 것을 막아준다.
                }
                html,
                body {
                    margin: 0;
                    padding: 0;
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-sizing: border-box;
                    background: url("/pixel_back2_half.png") no-repeat center;
                    background-size: cover;
                }
                button {
                    border: none;
                    background: none;
                    cursor: pointer;
                    padding: 0;
                }
                p {
                    margin: 0;
                    padding: 0;
                }
                input {
                    border: none;
                }
            `}
        />
    );
};

export default GlobalStyles;
