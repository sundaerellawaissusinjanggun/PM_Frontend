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
      <Block.BackgroundWhiteBox padding="30px">
        <Block.FlexBox direction="column" height="100%">
          <Block.RowFlexBox>
            <ReceiverTextWrapper>
              <Text.Title color="grayLight">To.&nbsp;</Text.Title>
              <Text.Title>닉네임</Text.Title>
            </ReceiverTextWrapper>
            <Block.FlexBox justifyContent="flex-end">
              <Like />
            </Block.FlexBox>
          </Block.RowFlexBox>
          <SenderTextWrapper>
            <Text.Title color="grayLight">From.</Text.Title>
            <Text.Title>닉네임</Text.Title>
          </SenderTextWrapper>
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}

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
