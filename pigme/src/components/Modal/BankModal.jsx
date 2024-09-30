import React, { useEffect, useState } from 'react';
import BasicModal from './BasicModal';
import { Block, Button, Text } from '../../styles/UI';
import styled from '@emotion/styled';
import ProfileAvatar from '../Layout/ProfileAvatar';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { db } from '../../firebase'; // Ensure you have this import
import { collection, query, where, getDocs } from 'firebase/firestore';

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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (nickname) {
        try {
          const q = query(
            collection(db, 'messages'), // Replace 'messages' with your actual collection name
            where('receiverNickname', '==', nickname) // Adjust the field name as necessary
          );
          const querySnapshot = await getDocs(q);
          const messagesArray = [];
          querySnapshot.forEach((doc) => {
            messagesArray.push({ id: doc.id, ...doc.data() });
          });
          setMessages(messagesArray);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, nickname]);

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
        <Block.FlexBox justifyContent="center">
          <Text.ModalTitle>{nickname}</Text.ModalTitle>
          <Text.ModalTitle2>님의 저금통</Text.ModalTitle2>
        </Block.FlexBox>
        <ProfileAvatar
          color={imageSrc.color.image}
          item={imageSrc.item.image}
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
          {messages.length > 0 ? (
            messages.map((msg) => (
              <Text.ModalText key={msg.id}>{msg.content}</Text.ModalText> // Adjust 'content' to your actual message field
            ))
          ) : (
            <Text.ModalText>메시지가 없습니다.</Text.ModalText>
          )}
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
