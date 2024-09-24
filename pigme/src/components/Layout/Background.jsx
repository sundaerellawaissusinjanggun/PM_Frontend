import styled from "@emotion/styled";

export default function Background({ children }) {
    return <Style.Wrapper>{children}</Style.Wrapper>;
}

const Style = {
    Wrapper: styled.div`
        width: 390px;
        height: 619px;
        padding: 30px;
        background-color: #fff;
        border-radius: 20px 20px 0 0;
        box-shadow: rgba(0, 0, 0, 0.35) 0px -10px 15px -2px;
    `,
};
