import styled from '@emotion/styled';
import Pig from '/colors/pig.svg';
import LogoText from '/public/logo.svg';

export default function Login() {
  const handleLogin = () => {
    // 로그인 버튼 클릭 시 실행할 함수
  };

  return (
    <>
      <Style.LogoWrapper>
        <Style.LogoImage>
          <img src={Pig} />
        </Style.LogoImage>
        <img src={LogoText} />
      </Style.LogoWrapper>
      <Style.Footer>
        <Style.LoginButton onClick={handleLogin}>
          구글 로그인 하기
        </Style.LoginButton>
        <Style.CopyRight>
          Copyright ⓒ 2024. 순대렐라와이쑤신장군. All rights reserved.
        </Style.CopyRight>
      </Style.Footer>
    </>
  );
}

const Style = {
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
