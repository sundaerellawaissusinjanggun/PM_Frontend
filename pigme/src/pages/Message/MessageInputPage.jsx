import React, { useState } from 'react';
import { Block, Text, Img } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import Coin from '/coin.svg';

export default function MessageInputPage() {
  return (
    <>
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
        <Text.Title padding="">
          닉네임
          <Text.Title color="titleGray">
            님에게 <br />
            따뜻한 메세지를 남겨주세요!
          </Text.Title>
        </Text.Title>
      </Block.BackgroundWhiteBox>
    </>
  );
}

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
