import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import { Block, Button, Input, Text } from '../../styles/UI';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import { db, auth } from '../../firebase'; // Firestore 설정 파일
import { doc, setDoc } from 'firebase/firestore'; // Firestore 메서드

export default function ProfileSetupPage() {
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState(''); // 한 줄 소개 상태 추가
  const navigate = useNavigate();

  const handleGoToMainHome = async () => {
    const isNicknameValid = nickname.length >= 2 && nickname.length <= 9;

    if (!isNicknameValid) {
      alert('닉네임은 한글/영문 최소 2자 이상, 최대 9자까지 입력해야 합니다.');
      return;
    }

    // 한 줄 소개가 비어있을 경우 기본 메시지 설정
    const introductionMessage =
      introduction.trim() === ''
        ? '아직 한 줄 소개가 작성되지 않았어요!'
        : introduction;

    try {
      // Firebase에 사용자 데이터 저장
      const userId = auth.currentUser.uid; // 현재 로그인된 사용자의 UID 가져오기
      await setDoc(
        doc(db, 'users', userId),
        {
          nickname,
          introduction: introductionMessage,
          // 필요시 추가 데이터 저장
        },
        { merge: true }
      ); // merge: true로 기존 데이터와 병합

      // 홈 페이지로 이동
      navigate('/home');
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value); // 한 줄 소개 상태 업데이트
  };

  return (
    <>
      {/* 헤더 영역 */}
      <Block.HeaderBox>
        <Header showBackIcon={true} />
      </Block.HeaderBox>

      {/* 돼지 영역 */}
      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        <ProfileAvatar />
      </Block.AbsoluteBox>

      {/* input 영역 */}
      <Block.BackgroundWhiteBox>
        <Block.FlexBox
          direction="column"
          padding="42px 28px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Block.ColumnFlexBox gap="12px">
            <Text.Body3>*이메일</Text.Body3>
            <Block.FlexBox width="94%" padding="0 0 30px 10px">
              <Text.Body2>zuitopia.dev@gmail.com</Text.Body2>
              {/* 현재 로그인 하고 있는 이메일 받아와서 보여주는 부분이므로 추후 수정 */}
            </Block.FlexBox>
            <Text.Body3>*닉네임</Text.Body3>
            <Input.BasicInput
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={handleNicknameChange}
            />
            <Block.FlexBox width="94%" justifyContent="flex-end">
              <Text.Warning>
                한글/영문 최소 2자 이상, 최대 9자까지 가능
              </Text.Warning>
            </Block.FlexBox>

            <Text.Body3>*한 줄 소개 (선택)</Text.Body3>
            <Input.TextAreaInput
              height="190px"
              type="text"
              placeholder="내용을 작성해주세요."
              value={introduction}
              onChange={handleIntroductionChange} // 한 줄 소개 변경 처리
            />
            <Button.SubmitBtn
              width="321px"
              height="50px"
              bgColor="grayDeep"
              onClick={handleGoToMainHome}
            >
              <Text.Body3 color="white">프로필 저장하기</Text.Body3>
            </Button.SubmitBtn>
          </Block.ColumnFlexBox>
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}
