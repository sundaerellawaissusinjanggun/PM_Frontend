import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import { Block, Button, Input, Text } from '../../styles/UI';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import { db, auth } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileSetupPage() {
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const navigate = useNavigate();

  const handleGoToMainHome = async () => {
    const isNicknameValid = nickname.length >= 2 && nickname.length <= 9;

    if (!isNicknameValid) {
      alert('닉네임은 한글/영문 최소 2자 이상, 최대 9자까지 입력해야 합니다.');
      return;
    }

    const introductionMessage =
      introduction.trim() === ''
        ? '아직 한 줄 소개가 작성되지 않았어요!'
        : introduction;

    try {
      const userId = auth.currentUser.uid;
      await setDoc(
        doc(db, 'users', userId),
        {
          nickname,
          introduction: introductionMessage,
        },
        { merge: true } // merge: true로 기존 데이터와 병합
      );

      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        // console.log('저장된 사용자 정보:', userDoc.data());
      } else {
        console.log('사용자 정보가 존재하지 않습니다.');
      }

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
    setIntroduction(e.target.value);
  };

  const userEmail = auth.currentUser.email;

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
              <Text.Body2>{userEmail}</Text.Body2>
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
              type="text"
              placeholder="내용을 작성해주세요."
              value={introduction}
              onChange={handleIntroductionChange}
              height="190px"
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
