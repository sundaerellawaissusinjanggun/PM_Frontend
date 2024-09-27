import { useState } from 'react';
import { Block, Input, Button, Img, Text } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router';

export default function FollowPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const confirmModal = useModal();
  const navigate = useNavigate();

  const handleGoToMessage = () => {
    confirmModal.closeModal();
    navigate('/friendList');
    // 추후에 친구 요청 목록으로 이동하게 변경!!
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleConfirm = () => {
    if (validateEmail(email)) {
      setEmailError(false);
      confirmModal.openModal();
    } else {
      setEmailError(true);
      alert('이메일 형식을 확인해주세요.');
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (validateEmail(inputEmail)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        setIsOpen={confirmModal.setIsOpen}
        title="알림"
        message="친구 요청을 보낼까요?"
        confirmText="보낼래요"
        cancelText="취소"
        onConfirm={handleGoToMessage}
      />

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

            <Block.FlexBox
              direction="column"
              alignItems="center"
              justifyContent="flex-start"
              width="84%"
              height="70px"
            >
              <Input.BasicInput
                placeholder="example@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <Block.FlexBox
                  justifyContent="flex-end"
                  padding="10px 10px 0  0"
                >
                  <Text.Warning>
                    올바른 형식의 이메일을 입력해주세요.
                  </Text.Warning>
                </Block.FlexBox>
              )}
            </Block.FlexBox>

            <Button.SubmitBtn
              bgColor="pink"
              width="123px"
              height="45px"
              onClick={handleConfirm}
            >
              <Text.Body2 color="white">나랑 친구하자!</Text.Body2>
            </Button.SubmitBtn>
          </Block.ColumnFlexBox>
        </Block.ColumnFlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}
