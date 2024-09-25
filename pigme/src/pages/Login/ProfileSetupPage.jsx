import Header from "../../components/Layout/Header";
import { Block } from "../../styles/UI";
import Pig from "/colors/pig.svg";

export default function ProfileSetupPage() {
    return (
        <>
            {/* 헤더 영역 */}
            <Block.HeaderBox>
                <Header showBackIcon={true} />
            </Block.HeaderBox>

            {/* 돼지 영역 */}
            <Block.AbsoluteBox width="100%" top="10%" padding="0 0 0 20px" justifyContent="center">
                <img src={Pig} /> {/* 나중에 DB에 저장되어있는 돼지로 불러와야 함 */}
            </Block.AbsoluteBox>

            {/* input 영역*/}
            <Block.BackgroundWhiteBox>
                <input type="text" />
            </Block.BackgroundWhiteBox>
        </>
    );
}
