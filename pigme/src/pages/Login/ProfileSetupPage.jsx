import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import { Block, Button, Input, Text } from '../../styles/UI';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import { db, auth } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function ProfileSetupPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
  const [nickname, setNickname] = useState(userData.nickname || '');
  const [introduction, setIntroduction] = useState(userData.introduction | '');

  const [nicknameError, setNicknameError] = useState(false);

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
      const email = auth.currentUser.email;

      await setDoc(
        doc(db, 'users', userId),
        {
          email,
          nickname,
          introduction: introductionMessage,
        },
        { merge: true }
      );

      navigate('/home');
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleNicknameChange = (e) => {
    const inputNickname = e.target.value;
    setNickname(inputNickname);

    if (
      inputNickname.length > 0 &&
      (inputNickname.length < 2 || inputNickname.length > 9)
    ) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  // 저장됐는지 확인
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log('User Avatar Info:', data.avatar);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
            <Block.FlexBox width="94%" padding="0 0 10px 10px">
              <Text.Body2>{userData.email}</Text.Body2>
            </Block.FlexBox>

            <Text.Body3>*닉네임</Text.Body3>
            <Block.FlexBox
              direction="column"
              alignItems="center"
              justifyContent="flex-start"
              height="70px"
            >
              <Input.BasicInput
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleNicknameChange}
                onFocus={() => setNicknameError(false)}
              />
              {nicknameError && (
                <Block.FlexBox
                  justifyContent="flex-end"
                  padding="10px 10px 0  0"
                >
                  <Text.Warning>
                    한글/영문 최소 2자 이상, 최대 9자까지 가능
                  </Text.Warning>
                </Block.FlexBox>
              )}
            </Block.FlexBox>

            <Text.Body3>*한 줄 소개 (선택)</Text.Body3>
            <Input.TextAreaInput
              height="190px"
              type="text"
              placeholder="내용을 작성해주세요."
              value={introduction}
              onChange={handleIntroductionChange}
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
