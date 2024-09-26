import { useState } from 'react';
import { Block, Text, Img, Input, Button } from '../../styles/UI';
import styled from '@emotion/styled';
import useModal from '../../components/Hooks/useModal';

import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import Header from '../../components/Layout/Header';
import Coin from '/coin.svg';

export default function MessageInputPage() {
  const confirmModal = useModal();
  const navigate = useNavigate();
  const handleGoToMainHome = () => navigate('/home');
  const handleGoToShowMessage = () => navigate('/showMessage');
  return (
    <>
      {/* 메세지 작성 완료 모달 */}
      <ConfirmModal />
      {/* 헤더 영역 */}
      <Block.HeaderBox width="100%" justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      {/* 코인 영역 */}
      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        <Img.AngledIcon width="90px" src={Coin} />
      </Block.AbsoluteBox>

      {/* input 영역 */}
      <Block.BackgroundWhiteBox padding="30px">
        <Block.FlexBox direction="column">
          <InlineTextWrapper>
            <Text.Title>닉네임</Text.Title>
            <Text.Title color="grayLight">님에게</Text.Title>
          </InlineTextWrapper>
          <Text.Title color="grayLight">따뜻한 메세지를 남겨주세요!</Text.Title>
          <Input.TextAreaInput
            height="100%"
            margin="40px 0"
            placeholder="내용을 작성해주세요."
            fontSize="large"
          ></Input.TextAreaInput>
          <Block.FlexBox direction="row" gap="27px" fontSize="medium">
            <Button.SubmitBtn height="50px" color="black">
              취소
            </Button.SubmitBtn>
            <Button.SubmitBtn
              height="50px"
              bgColor="grayLight"
              onClick={confirmModal.openModal}
            >
              작성완료
            </Button.SubmitBtn>
          </Block.FlexBox>
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}

const InlineTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

// 대충 데이터 입력 창 (나중에 삭제예정)
// export default function MessageInputPage({ addMessage }) {
//   const [messageText, setMessageText] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     if (messageText.trim() !== '') {
//       addMessage(messageText); // 메시지를 추가하는 함수 호출
//       setMessageText(''); // 입력 필드 초기화
//       navigate('/piggy-bank'); // 저금통 화면으로 이동
//     }
//   };

//   return (
//     <MessageInputContainer>
//       <h2>메시지 입력</h2>
//       <TextInput
//         value={messageText}
//         onChange={(e) => setMessageText(e.target.value)}
//         placeholder="메시지를 입력하세요"
//       />
//       <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
//     </MessageInputContainer>
//   );
// }

// // 스타일 컴포넌트
// const MessageInputContainer = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const TextInput = styled.textarea`
//   width: 100%;
//   height: 100px;
//   padding: 10px;
//   font-size: 16px;
// `;

// const SubmitButton = styled.button`
//   padding: 10px;
//   font-size: 16px;
//   background-color: #f08;
//   color: white;
//   border: none;
//   cursor: pointer;
// `;
