// 남의 메세지 구경 화면
import { Block, Text, Img, Input, Button } from '../../styles/UI';
import styled from '@emotion/styled';
import Header from '../../components/Layout/Header';
import Like from '../../components/Like';
import BackgroundCoin from '/background-coin.svg';
import Pig from '/colors/pig.svg';

export default function MessageShowPage() {
  return (
    <>
      {/* 헤더 영역 */}
      <Block.HeaderBox width="100%" justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      {/* 돼지 영역 */}
      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        <Img.AngledIcon width="90px" src={Pig} /> {/* db에서 받아와야 함  */}
      </Block.AbsoluteBox>

      {/* input 영역 */}
      <BackgroundBox padding="30px">
        <Block.FlexBox direction="column" height="100%">
          <Block.RowFlexBox>
            {/* 받는 사람 */}
            <ReceiverTextWrapper>
              <Text.Title color="grayLight">To.&nbsp;</Text.Title>
              <Text.Title>닉네임</Text.Title>
            </ReceiverTextWrapper>

            {/* 좋아요 버튼 영역*/}
            <Block.FlexBox justifyContent="flex-end">
              <Like />
            </Block.FlexBox>
          </Block.RowFlexBox>

          {/* 메세지 영역 */}
          <MessageWrapper>
            내 우리 놀러와서 나도 돈 줘 저금 100개만 해주라 .. 제 발 나 지금
            2픽밖에 없어서 나한테 쓴글 못보는중이야 궁금해 궁금해애애
          </MessageWrapper>
          {/* 보낸 사람 */}
          <SenderTextWrapper>
            <Text.Title color="grayLight">From.&nbsp;</Text.Title>
            <Text.Title>닉네임</Text.Title>
          </SenderTextWrapper>
        </Block.FlexBox>
      </BackgroundBox>
    </>
  );
}
const BackgroundBox = styled(Block.BackgroundWhiteBox)`
  background-image: url(${BackgroundCoin});
  background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
  background-position: center;
`;
const ReceiverTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap; // 텍스트가 한 줄로 나오도록 강제
`;
const SenderTextWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  white-space: nowrap;
  /* width: 100%; */
`;
const MessageWrapper = styled(Block.FlexBox)`
  height: 100%;
  padding: 30px 50px;
  align-items: center;
  color: #838383;
  font-size: 20px;
`;
