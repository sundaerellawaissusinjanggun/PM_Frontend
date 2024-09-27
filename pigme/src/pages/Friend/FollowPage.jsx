import { useState } from 'react';
import { Block, Input, Button, Img, Text } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import useModal from '../../components/Hooks/useModal';
import { useNavigate } from 'react-router';
import { auth, db } from '../../firebase'; // Firestore 설정 파일
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function FollowPage() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState(''); // 닉네임 상태 추가
  const [emailError, setEmailError] = useState(false);
  const confirmModal = useModal();
  const navigate = useNavigate();

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Firestore에서 이메일로 닉네임 가져오기
  const fetchNickname = async (email) => {
    try {
      const userDocRef = doc(db, 'users', email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.nickname || '알 수 없는 사용자'; // 닉네임 없으면 기본 메시지
      } else {
        return null; // 사용자가 없으면 null 반환
      }
    } catch (error) {
      console.error('닉네임 가져오기 실패:', error);
      return null;
    }
  };

  // 모달에서 확인 버튼 클릭 시 친구 요청 보내기
  const handleSendFriendRequest = async () => {
    try {
      const currentUserEmail = auth.currentUser.email; // 실제로 로그인된 사용자 이메일로 교체

      // 친구 요청을 받는 사용자의 Firestore 문서에 friendRequests 필드 업데이트
      const userDocRef = doc(db, 'users', email); // 입력된 이메일 사용자의 doc 참조
      await updateDoc(userDocRef, {
        friendRequests: arrayUnion({
          from: currentUserEmail, // 요청을 보낸 사람
          status: 'pending', // 상태를 'pending'으로 설정
        }),
      });

      confirmModal.closeModal();
      navigate('/message'); // 친구 요청 목록 페이지로 이동
    } catch (error) {
      console.error('친구 요청 실패:', error);
      alert('친구 요청을 보내는 중 문제가 발생했습니다.');
    }
  };

  // 이메일 입력 시 유효성 검사
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (validateEmail(inputEmail)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  // 확인 버튼 눌렀을 때 실행
  const handleConfirm = async () => {
    if (validateEmail(email)) {
      setEmailError(false);

      // Firestore에서 해당 이메일 사용자의 닉네임 가져오기
      const fetchedNickname = await fetchNickname(email);
      if (fetchedNickname) {
        setNickname(fetchedNickname);
        confirmModal.openModal(); // 닉네임 가져온 후 모달 열기
      } else {
        alert('해당 이메일을 가진 사용자를 찾을 수 없습니다.');
      }
    } else {
      setEmailError(true);
      alert('이메일 형식을 확인해주세요.');
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        setIsOpen={confirmModal.setIsOpen}
        title="알림"
        message={`${nickname} 에게 친구 요청을 보낼까요?`} // 닉네임 표시
        confirmText="보낼래요"
        cancelText="취소"
        onConfirm={handleSendFriendRequest} // 모달에서 친구 요청 전송
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
