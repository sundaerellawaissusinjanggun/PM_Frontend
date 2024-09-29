import BasicModal from './BasicModal';
import { Block, Button, Text } from '../../styles/UI';
import styled from '@emotion/styled';
import ProfileAvatar from '../Layout/ProfileAvatar';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function BankModal({
  isOpen,
  setIsOpen,
  message,
  confirmText,
  cancelText,
  onConfirm,
  nickname,
  imageSrc,
}) {
  const [userData, setUserData] = useRecoilState(userState);
  if (!userData || !userData.avatar) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="340px"
      height="651px"
      showCloseIcon={false}
    >
      <Block.ColumnFlexBox gap="30px">
        {/* 닉네임 부분 스타일링 */}
        <Block.FlexBox justifyContent="center">
          <Text.ModalTitle>{nickname}</Text.ModalTitle>
          <Text.ModalTitle2>님의 저금통</Text.ModalTitle2>
        </Block.FlexBox>
        <ProfileAvatar
          color={userData.avatar.color.image}
          item={userData.avatar.item.image}
        />
        <Block.FlexBox justifyContent="center" margin="70px 0 0 0 ">
          <Text.ModalText
            style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
          >
            {message}
          </Text.ModalText>
        </Block.FlexBox>
        <Block.FlexBox
          width="90%"
          border="1px solid #e7e7e7"
          borderRadius="20px"
          padding="20px"
          height="260px"
        >
          메시지 랜덤으로 보이는 곳
        </Block.FlexBox>
        <Block.FlexBox justifyContent="space-evenly">
          <Button.SubmitBtn
            width="124px"
            height="50px"
            onClick={() => setIsOpen(false)}
          >
            <Text.ModalText> {cancelText}</Text.ModalText>
          </Button.SubmitBtn>
          <Button.SubmitBtn
            bgColor="pink"
            width="124px"
            height="50px"
            onClick={onConfirm}
          >
            <Text.ModalText color="white"> {confirmText}</Text.ModalText>
          </Button.SubmitBtn>
        </Block.FlexBox>
      </Block.ColumnFlexBox>
    </BasicModal>
  );
}

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #ff7195;
`;
