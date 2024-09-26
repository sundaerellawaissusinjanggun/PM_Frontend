// 친구 추가
import { Block, Input, Button } from '../../styles/UI';
import Header from '../../components/Layout/Header';
export default function FollowPage() {
  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.BackgroundWhiteBox height="758px">
        <Block.FlexBox direction="column">
          <Block.FlexBox justifyContent="flex-end">친구요청목록</Block.FlexBox>
          <Block.FlexBox justifyContent="center">이미지</Block.FlexBox>
          <Block.FlexBox justifyContent="center">문구</Block.FlexBox>
          <Block.FlexBox>
            <Input.BasicInput />
          </Block.FlexBox>
          <Block.FlexBox justifyContent="center">경고문구</Block.FlexBox>
          <Block.FlexBox>
            <Button.SubmitBtn>나랑 친구하자</Button.SubmitBtn>
          </Block.FlexBox>
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}
