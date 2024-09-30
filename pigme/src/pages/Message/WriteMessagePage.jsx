import { Block, Text, Img, Input, Button } from '../../styles/UI';
import styled from '@emotion/styled';
import useModal from '../../components/Hooks/useModal';
import { useNavigate, useLocation } from 'react-router-dom';
import SuccessModal from '../../components/Modal/SuccessModal';
import Header from '../../components/Layout/Header';
import Coin from '/coin.svg';
import CoinPig from '/pig-coin.svg';
import SadPig from '/sad-pig.svg';
import CancleModal from '../../components/Modal/CancleModal';
import { useState } from 'react'; // Import useState
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function WriteMessagePage() {
  const successModal = useModal();
  const cancleModal = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, selectedAvatar, friendNickname, friendId } =
    location.state || {};

  // State for message input
  const [message, setMessage] = useState('');

  const handleGoToMainHome = () => navigate(-1);

  const handleGoToReadMessage = () => {
    // Prepare the additional message data to pass along
    const messageData = {
      senderId: auth.currentUser.uid,
      senderNickname: userData.nickname,
      receiverId: friendId,
      receiverNickname: friendNickname,
      message: message,
      timestamp: new Date(),
    };

    // Navigate to the readMessage page and pass all relevant data
    navigate('/readMessage', {
      state: {
        userData,
        selectedAvatar,
        friendNickname,
        messageData, // Pass the message data object
      },
    });
  };

  const handleSaveMessage = async () => {
    try {
      // Firestore의 컬렉션에 메시지 저장
      const docRef = await addDoc(collection(db, 'messages'), {
        senderId: auth.currentUser.uid, // 메세지 작성자 ID
        senderNickname: userData.nickname, // 메세지 작성자 닉네임
        receiverId: friendId, // 메세지 받는 사람 ID
        receiverNickname: friendNickname, // 메세지 받는 사람 닉네임
        message: message, // 작성한 메세지
        timestamp: new Date(), // 메시지 작성 시간
      });

      console.log('메세지 저장 성공: ', docRef.id);
      // 저장한 메시지 데이터 콘솔에 출력
      console.log('저장된 메시지 데이터: ', {
        senderId: userData.uid,
        senderNickname: userData.nickname,
        receiverId: friendId,
        receiverNickname: friendNickname,
        message: message,
        timestamp: new Date(),
      });

      // 메시지 저장 후 성공 모달 열기
      successModal.openModal();
    } catch (e) {
      console.error('메세지 저장 실패: ', e);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={successModal.isOpen}
        setIsOpen={successModal.setIsOpen}
        title={'저금이 완료되었어요!'}
        imageSrc={CoinPig}
        message={
          <MessageText>
            따뜻한 메세지가 저장된 코인이
            <br />
            <ColoredNickname>{friendNickname}</ColoredNickname>님의 저금통에
            들어갔어요!
          </MessageText>
        }
        cancelText={'메인으로'}
        confirmText={'내용확인하기'}
        onCancle={handleGoToMainHome}
        onConfirm={handleGoToReadMessage} // Use updated function
      />

      <CancleModal
        isOpen={cancleModal.isOpen}
        setIsOpen={cancleModal.setIsOpen}
        imageSrc={SadPig}
        message={'아직 글을 다 작성하지 못 했어요! \n정말 돌아가시겠어요?'}
        cancelText={'아니오'}
        confirmText={'네, 돌아갈래요'}
        onConfirm={handleGoToMainHome}
      />

      <Block.HeaderBox width="100%" justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        <Img.AngledIcon width="90px" src={Coin} />
      </Block.AbsoluteBox>

      <Block.BackgroundWhiteBox padding="30px">
        <Block.FlexBox direction="column">
          <InlineTextWrapper>
            <Text.Title>{friendNickname}</Text.Title>{' '}
            <Text.Title color="grayLight">님에게</Text.Title>
          </InlineTextWrapper>
          <Text.Title color="grayLight">따뜻한 메세지를 남겨주세요!</Text.Title>
          <Input.TextAreaInput
            height="390px"
            margin="40px 0"
            placeholder="내용을 작성해주세요."
            fontSize="large"
            value={message} // Bind the state
            onChange={(e) => setMessage(e.target.value)} // Update state on change
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
              onClick={handleSaveMessage}
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
const ColoredNickname = styled.span`
  color: black;
  text-overflow: ellipsis;
`;
const MessageText = styled.div`
  white-space: nowrap;
`;
