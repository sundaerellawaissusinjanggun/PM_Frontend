import Header from "../../components/Layout/Header";
import { Block } from "../../styles/UI";

export default function ProfileSetupPage() {
    return (
        <>
            {/* 헤더 영역 */}
            <Block.HeaderBox>
                <Header showBackIcon={true} />
            </Block.HeaderBox>
            닉네임과 한줄설명을 입력받는 페이지입니다
        </>
    );
}
