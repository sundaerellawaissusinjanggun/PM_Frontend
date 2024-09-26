import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <Style.FullWrapper>
        <Style.Wrapper>
          <Outlet />
        </Style.Wrapper>
      </Style.FullWrapper>
    </RecoilRoot>
  );
}

const Style = {
  FullWrapper: styled.div`
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    background: url(/background.svg);
  `,
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
};
