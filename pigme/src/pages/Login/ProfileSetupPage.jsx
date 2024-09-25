import Header from "../../components/Layout/Header";
import { Block, Button, Text } from "../../styles/UI";
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
                <Block.FlexBox direction="column" padding="28px" alignItem="space-between" border="1px solid red">
                    <Text.Body3>*이메일</Text.Body3>
                    <Text.Body2>zuitopia.dev@gmail.com</Text.Body2>
                    {/* 현재 로그인 하고 있는 이메일 받아와서 보여주는 부분이므로 추후 수정 */}

                    <Text.Body3>*닉네임</Text.Body3>
                    <input type="text" placeholder="닉네임을 입력해주세요." />
                    <Text.Body1>한글/영문 최소 2자 이상, 최대 9자까지 가능</Text.Body1>

                    <Text.Body3>*한 줄 소개 (선택)</Text.Body3>
                    <textarea type="text" placeholder="내용을 작성해주세요." />

                    <Button.SubmitBtn height="50px" bgColor="grayDeep">
                        프로필 저장하기
                    </Button.SubmitBtn>
                </Block.FlexBox>
            </Block.BackgroundWhiteBox>
        </>
    );
}
