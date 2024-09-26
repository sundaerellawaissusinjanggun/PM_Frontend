// 친구 추가
import { Block, Input, Button, Img, Text } from '../../styles/UI';
import Header from '../../components/Layout/Header';
export default function FollowPage() {
  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.BackgroundWhiteBox height="758px">
        <Block.ColumnFlexBox
          height="80%"
          justifyContent="space-evenly"
          gap="100px"
        >
          <div>
            <Text.Body3>8개의 친구 요청</Text.Body3>
          </div>

          <Block.ColumnFlexBox gap="20px">
            <Img.AngledIcon width="120px" src="/friends-pig.svg" />

            <Text.ModalTitle>친구 추가</Text.ModalTitle>

            <Text.Body1>이메일을 입력하고 친구를 만들어요!</Text.Body1>

            <div>
              <Input.BasicInput />
              <Block.FlexBox justifyContent="flex-end" padding="10px 10px 0  0">
                <Text.Warning>올바른 이메일 형식을 입력해주세요.</Text.Warning>
              </Block.FlexBox>
            </div>

            <Button.SubmitBtn bgColor="pink" width="123px" height="45px">
              <Text.Body2 color="white">나랑 친구하자!</Text.Body2>
            </Button.SubmitBtn>
          </Block.ColumnFlexBox>
        </Block.ColumnFlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}
