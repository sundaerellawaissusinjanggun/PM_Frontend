import { atom } from 'recoil';

// user의 정보
export const userState = atom({
  key: 'userState',
  default: [
    // {
    //   id: null,
    // },
  ], // userId, avatar(color, item), nickname, email, introduction
});

// user가 받은 친구 요청 목록
export const friendRequestsState = atom({
  key: 'friendRequestsState',
  default: [], // friendRequestId, friendSenderId, friendReceiverId, status
});

// user의 친구 목록
export const friendsListState = atom({
  key: 'friendsListState',
  default: [], // friendId, friendNickname, friendAvatar(color, item)
});

// 로그인한 user가 좋아요를 누른 메시지 목록
// export const likesState = atom({
//   key: 'likesState',
//   default: [],
// });

// 모든 user와 친구 사이의 메시지 목록
export const messagesState = atom({
  key: 'messagesState',
  default: [], // id, messageSenderId, messageReceiverId, content
});
