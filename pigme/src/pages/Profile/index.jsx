import styled from '@emotion/styled';
import Context from '../../components/Custom/Context';
import Header from '../../components/Layout/Header';
import { Block } from '../../styles/UI';

export default function Profile() {
    return (
        <>
            <Style.HeaderWrapper>
                <Header showHomeIcon={true} />
            </Style.HeaderWrapper>
            <Style.ContextWrapper>
                <Context />
            </Style.ContextWrapper>
        </>
    );
}

const Style = {
  HeaderWrapper: styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    align-items: flex-start;
  `,
};
