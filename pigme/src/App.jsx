import styled from "@emotion/styled";
import Login from "./pages/login";
// import Test from "./services/test";
import Profile from "./pages/Profile";
import CustomizePage from "./pages/Login/CustomizePage";

export default function App() {
    return (
        <Style.Wrapper>
            {/* <Test /> */}
            <Login />
            {/* <Profile /> */}
            {/* <CustomizePage/> */}
        </Style.Wrapper>
    );
}

const Style = {
    Wrapper: styled.div`
        border-radius: 30px;
        overflow: hidden;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
        background: url(/background.svg);
    `,
};
