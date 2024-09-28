import { Block, Text, Img, Input, Button } from '../../styles/UI';
import styled from '@emotion/styled';
import useModal from '../../components/Hooks/useModal';

import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/Modal/SuccessModal';
import Header from '../../components/Layout/Header';
import Coin from '/coin.svg';
import CoinPig from '/pig-coin.svg';
import SadPig from '/sad-pig.svg';
import CancleModal from '../../components/Modal/CancleModal';

export default function MessageInputPage() {
  const successModal = useModal();
  const cancleModal = useModal();
  const navigate = useNavigate();
  const handleGoToMainHome = () => navigate(-1);
  const handleGoToShowMessage = () => navigate('/showMessage');

  const userNickname = '닉네임';

  return (
    <>
      {/* 메세지 작성 완료 모달 */}
      <SuccessModal
        isOpen={successModal.isOpen}
        setIsOpen={successModal.setIsOpen}
        title={'저금이 완료되었어요!'}
        imageSrc={CoinPig}
        message={
          <MessageText>
            따뜻한 메세지가 저장된 코인이
            <br />
            <ColoredNickname>{userNickname}</ColoredNickname>님의 저금통에
            들어갔어요!
          </MessageText>
        }
        cancelText={'메인으로'}
        confirmText={'내용확인하기'}
        onCancle={handleGoToMainHome}
        onConfirm={handleGoToShowMessage}
      />
      {/* 메세지 작성 도중 취소 모달 */}
      <CancleModal
        isOpen={cancleModal.isOpen}
        setIsOpen={cancleModal.setIsOpen}
        imageSrc={SadPig}
        message={'아직 글을 다 작성하지 못 했어요! \n정말 돌아가시겠어요?'}
        cancelText={'아니오'}
        confirmText={'네, 돌아갈래요'}
        onConfirm={handleGoToMainHome}
      />
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
            height="390px"
            margin="40px 0"
            placeholder="내용을 작성해주세요."
            fontSize="large"
          ></Input.TextAreaInput>
          <Block.FlexBox direction="row" gap="27px" fontSize="medium">
            <Button.SubmitBtn
              height="50px"
              color="black"
              onClick={cancleModal.openModal}
            >
              취소
            </Button.SubmitBtn>
            <Button.SubmitBtn
              height="50px"
              bgColor="grayLight"
              onClick={successModal.openModal}
            >
              작성완료
            </Button.SubmitBtn>
          </Block.FlexBox>
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}

const SuccessModalWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const InlineTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const ColoredNickname = styled.span`
  color: black;
  text-overflow: ellipsis; // 너무 길 경우 ... 처리
`;
const MessageText = styled.div`
  white-space: nowrap; // 줄바꿈을 방지하여 한 줄로 표시
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
