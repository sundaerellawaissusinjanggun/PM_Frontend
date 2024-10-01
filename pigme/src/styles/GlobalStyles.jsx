/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Pretendard-Regular';
          src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
            format('woff');
          font-weight: 400;
          font-style: normal;
        }
        ${emotionNormalize}
        * {
          font-family: 'Pretendard-Regular';
          box-sizing: border-box;
          scrollbar-width: none;
          overscroll-behavior: none;
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
          background: url('/pixel_back2_half.png') no-repeat center;
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
        ul,
        li {
          padding: 0;
        }
      `}
    />
  );
};

export default GlobalStyles;
