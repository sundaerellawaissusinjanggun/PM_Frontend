import styled from "@emotion/styled";
import Pig from "/public/pig.svg";
import LogoText from "/public/logo-text.svg";
import KakaoLoginBtn from "/public/kakao-login-button.svg";

const SocialKakao = () => {
    const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
    const redirect_uri = "http://localhost:5173/auth"; // Redirect URI
    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL; // 카카오 로그인 요청으로 리디렉션
    };

    return (
        <>
            <Style.Wrapper>
                <Style.LogoWrapper>
                    <Style.LogoImage>
                        <img src={Pig} />
                    </Style.LogoImage>
                    <img src={LogoText} />
                </Style.LogoWrapper>
                <Style.Footer>
                    <Style.LoginButton onClick={handleLogin}>
                        <img src={KakaoLoginBtn} />
                    </Style.LoginButton>
                    <Style.CopyRight>Copyright ⓒ 2024. 순대렐라와이쑤신장군. All rights reserved.</Style.CopyRight>
                </Style.Footer>
            </Style.Wrapper>
        </>
    );
};

const Style = {
    Wrapper: styled.div`
        width: 390px;
        height: 844px;
        background: url(public/background.svg);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
    `,
    LogoWrapper: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 20px;
    `,
    LogoImage: styled.div`
        padding: 20px;
    `,
    Footer: styled.div`
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    `,
    LoginButton: styled.button`
        padding: 0 0 30px;
    `,
    CopyRight: styled.div`
        color: #dadada;
        font-size: 10px;
        margin-top: auto;
        padding: 0 0 15px;
    `,
};

export default SocialKakao;
