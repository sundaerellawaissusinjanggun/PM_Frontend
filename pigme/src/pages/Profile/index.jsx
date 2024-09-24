import styled from "@emotion/styled";
import Context from "../../components/Custom/Context";
import Header from "../../components/Layout/Header";

export default function Profile() {
    return (
        <Style.Wrapper>
            <Style.HeaderWrapper>
                <Header />
            </Style.HeaderWrapper>
            <Style.ContextWrapper>
                <Context />
            </Style.ContextWrapper>
        </Style.Wrapper>
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
        overflow: hidden;
    `,
    HeaderWrapper: styled.div`
        width: 100%;
        position: absolute;
        top: 0;
        align-items: flex-start;
    `,
    ContextWrapper: styled.div`
        position: absolute;
        bottom: 0;
    `,
};
