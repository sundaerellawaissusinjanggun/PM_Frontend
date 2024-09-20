import styled from "@emotion/styled";
import Login from "./pages/login";
// import Test from "./services/test";

export default function App() {
    return (
        <Style.Wrapper>
            {/* <Test /> */}
            <Login />
        </Style.Wrapper>
    );
}

const Style = {
    Wrapper: styled.div`
        border: 1px solid red;
    `,
};
