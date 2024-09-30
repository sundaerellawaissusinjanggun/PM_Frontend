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
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function WriteMessagePage() {
  const successModal = useModal();
  const cancleModal = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const { userData, selectedAvatar, friendNickname } = location.state || {};

  const handleGoToMainHome = () => navigate(-1);
  const handleGoToShowMessage = () => navigate('/showMessage');

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
        onConfirm={handleGoToShowMessage}
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
