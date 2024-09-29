import React, { useEffect, useState } from 'react';
import { Block, Input, Button, Img, Text } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import useModal from '../../components/Hooks/useModal';
import AnotherPage from '../../components/Friend/CountFriends';
import styled from '@emotion/styled';
import { auth, db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { userState, friendRequestsState } from '../../recoil/atoms';

export default function AddFriendsPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const confirmModal = useModal();

  const [userData, setUserState] = useRecoilState(userState);

  console.log(userData);

  const [friendRequests, setFriendRequests] =
    useRecoilState(friendRequestsState);

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        setUserState({
          ...userData,
          userId: uid,
        });
      } else {
        console.error('유저 데이터를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(
        'Firestore에서 유저 데이터를 불러오는 중 오류 발생:',
        error
      );
    }
  };

  const handleGoToMessage = async () => {
    confirmModal.closeModal();

    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('해당 이메일을 가진 유저가 없습니다.');
        return;
      }

      let receiverId;
      querySnapshot.forEach((doc) => {
        receiverId = doc.id;
      });

      const existingRequestQuery = query(
        collection(db, 'friendRequests'),
        where('friendSenderId', '==', userData.userId),
        where('friendReceiverId', '==', receiverId),
        where('status', '==', 'pending')
      );

      const existingRequestSnapshot = await getDocs(existingRequestQuery);

      if (!existingRequestSnapshot.empty) {
        alert('이미 친구 요청을 보냈습니다. 다시 요청할 수 없습니다.');
        return;
      }

      console.log('요청 보낸 사람:', userData.userId);
      console.log('요청 받는 사람:', receiverId);
      console.log('요청 상태: pending');

      const friendRequestRef = await addDoc(collection(db, 'friendRequests'), {
        friendSenderId: userData.userId,
        friendReceiverId: receiverId,
        status: 'pending',
      });

      setFriendRequests((prevRequests) => [
        ...prevRequests,
        {
          friendRequestId: friendRequestRef.id,
          friendSenderId: userData.userId,
          friendReceiverId: receiverId,
          status: 'pending',
        },
      ]);

      alert('친구 요청이 성공적으로 전송되었습니다!');
    } catch (error) {
      console.error('친구 요청 전송 오류:', error);
      alert('친구 요청 전송 중 문제가 발생했습니다.');
    }
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

  useEffect(() => {
    const currentUser = auth.currentUser;

    console.log('아뵤' + friendRequests.friendSenderId);

    if (currentUser) {
      const uid = currentUser.uid;
      fetchUserData(uid);
    } else {
      console.error('사용자가 로그인되어 있지 않습니다.');
    }
  }, []);

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
        <Block.ColumnFlexBox height="95%" justifyContent="space-evenly">
          <FriendCount>
            <AnotherPage />
          </FriendCount>
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

const FriendCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
`;
