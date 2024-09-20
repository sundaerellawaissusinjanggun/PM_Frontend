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
                    background-color: black;
                    overflow: hidden;
                }
                button {
                    border: none;
                    background: none;
                    cursor: pointer;
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
