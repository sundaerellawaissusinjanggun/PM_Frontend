import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Block, Text, Button } from '../../styles/UI';
import Header from '../../components/Layout/Header';
import CountFriends from '../../components/Friend/CountFriends';
import ProfileAvatar from '../../components/Layout/ProfileAvatar';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';

export default function RequestFriendsListPage() {
  const db = getFirestore();

  const [pendingFriends, setPendingFriends] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).uid;

    getFriendRequestsForUser(userId).then(async (requests) => {
      const pendingRequests = requests.filter(
        (request) => request.status === 'pending'
      );

      const requestsWithSenderInfo = await Promise.all(
        pendingRequests.map(async (request) => {
          const senderInfo = await getRequestUserInfo(request.friendSenderId);
          return { ...request, senderInfo };
        })
      );

      setPendingFriends(requestsWithSenderInfo);
    });
  }, []);
  // 친구신청한 사용자 정보 가져오기
  async function getRequestUserInfo(userId) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userId', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      let userInfo = null;
      querySnapshot.forEach((doc) => {
        userInfo = doc.data();
      });
      return userInfo;
    } catch (error) {
      console.error('사용자 정보 API 호출 도중 에러 발생 ', error);
      return null;
    }
  }

  // 사용자에게 온 친구신청 목록 가져오기
  async function getFriendRequestsForUser(userId) {
    const friendRequestsRef = collection(db, 'friendRequests');
    const q = query(friendRequestsRef, where('friendReceiverId', '==', userId));
    console.log('me', userId);

    try {
      const querySnapshot = await getDocs(q);
      const friendRequests = [];

      querySnapshot.forEach((doc) => {
        friendRequests.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return friendRequests;
    } catch (error) {
      console.error('친구신청 API 호출 도중 에러 발생: ', error.message); // 에러 메시지 출력
      return [];
    }
  }

  // 친구 신청 수락
  async function handleAccept(friend, action) {
    const friendRequestId = friend.id;
    const friendReceiverId = friend.friendReceiverId;
    const friendSenderId = friend.friendSenderId;
    console.log(friendRequestId, friendReceiverId, friendSenderId);
    try {
      const docRef = doc(db, 'friendRequests', friendRequestId);
      if (action === 'reject') {
        await updateDoc(docRef, {
          status: 'isRejected',
        });
        alert('친구 요청을 거절했습니다.');
      } else if (action === 'accept') {
        await updateDoc(docRef, {
          status: 'isAccepted',
        });
        alert('친구 요청을 수락했습니다.');
        const friendListRef = collection(db, 'friendList');
        const myFriendList = doc(friendListRef, friendReceiverId);
        const theirFriendList = doc(friendListRef, friendSenderId);
        const theirFriendDocSnap = await getDoc(theirFriendList);
        const myFriendListDocSnap = await getDoc(myFriendList); //
        try {
          if (!theirFriendDocSnap.exists()) {
            await setDoc(theirFriendList, {
              friend: arrayUnion(friendReceiverId),
            });
          } else {
            await updateDoc(theirFriendList, {
              friend: arrayUnion(friendReceiverId),
            });
          }

          if (!myFriendListDocSnap.exists()) {
            await setDoc(myFriendList, {
              friend: arrayUnion(friendSenderId),
            });
          } else {
            await updateDoc(myFriendList, {
              friend: arrayUnion(friendSenderId),
            });
          }
        } catch (error) {
          console.error('친구 수락 도중 에러 발생 ', error);
        }
      }
      setPendingFriends((prevFriends) =>
        prevFriends.filter((item) => item.id !== friendRequestId)
      );
      console.log('친구 요청 수락 완료');
    } catch (error) {
      console.error('친구 수락 도중 에러 발생 ', error);
    }
  }

  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.BackgroundWhiteBox height="758px">
        <Block.FlexBox direction="column" padding="30px">
          {/* 제목 영역 */}
          <Block.FlexBox padding="20px 0">
            <Text.Title>친구 요청 목록</Text.Title>
          </Block.FlexBox>

          {/* 친구 목록 개수 영역 */}
          <Block.FlexBox justifyContent="flex-end" margin="10px 0">
            <CountFriends requestCount={pendingFriends.length} />
          </Block.FlexBox>

          {/* 친구 목록 개수 확인 */}
          {pendingFriends.length === 0 ? (
            <Block.FlexBox
              justifyContent="center"
              alignItem="center"
              height="100%"
              direction="column"
            >
              <TextWrapper>아직 친구가 없어요!</TextWrapper>
              <TextWrapper>
                먼저 친구 요청을 보내서 친구를 만들어보세요.
              </TextWrapper>
            </Block.FlexBox>
          ) : (
            <>
              {/* 친구 목록 영역 */}
              {pendingFriends.map((friend) => (
                <Block.FlexBox
                  key={friend.friendRequestId} // 수정된 부분
                  padding="20px 0 "
                  borderBottom="2px solid #E7E7E7"
                >
                  <Block.FlexBox gap="10px">
                    {/* 친구의 프로필 사진 */}
                    <ProfileAvatar />
                    <Block.FlexBox>
                      {/* 친구의 닉네임 */}
                      <Text.ModalText>
                        {friend.senderInfo?.nickname}
                      </Text.ModalText>
                      {/* 친구의 닉네임이 아니라 보내는 사람의 ID를 표시합니다. 필요시 친구의 닉네임을 가져오는 로직을 추가하세요. */}
                    </Block.FlexBox>
                  </Block.FlexBox>
                  {/* 수락/거절 버튼 */}
                  <Block.FlexBox>
                    {friend.status === 'isAccepted' ? (
                      <ButtonWrapper>
                        <Text.ButtonText color="grayDeep">
                          친구가 되었어요!
                        </Text.ButtonText>
                      </ButtonWrapper>
                    ) : (
                      <ButtonWrapper>
                        <Button.FriendBtn
                          width="43px"
                          height="24px"
                          bgColor="white"
                          onClick={() => handleAccept(friend, 'reject')}
                        >
                          <Text.ButtonText color="grayDeep">
                            거절
                          </Text.ButtonText>
                        </Button.FriendBtn>
                        <Button.FriendBtn
                          width="43px"
                          height="24px"
                          bgColor="pink"
                          border="none"
                          onClick={() => handleAccept(friend, 'accept')}
                        >
                          <Text.ButtonText color="white">수락</Text.ButtonText>
                        </Button.FriendBtn>
                      </ButtonWrapper>
                    )}
                  </Block.FlexBox>
                </Block.FlexBox>
              ))}
            </>
          )}
        </Block.FlexBox>
      </Block.BackgroundWhiteBox>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  gap: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2px;
  font-size: 16px;
  color: #bebebe;
`;
