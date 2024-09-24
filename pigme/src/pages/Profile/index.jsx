import styled from "@emotion/styled";
import Context from "../../components/Custom/Context";
import Header from "../../components/Layout/Header";

export default function Profile() {
    return (
        <>
            <Style.HeaderWrapper>
                <Header />
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
    ContextWrapper: styled.div`
        position: absolute;
        bottom: 0;
    `,
};
