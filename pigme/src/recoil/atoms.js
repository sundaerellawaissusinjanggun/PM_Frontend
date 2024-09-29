import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

// user의 정보
export const userState = atom({
  key: 'userState',
  default: {
    userId: '',
    avatar: '',
    nickname: '',
    email: '',
    introduction: '',
  },
  effects_UNSTABLE: [persistAtom], // 자동으로 LocalStorage에 저장 및 불러오기
});

// user가 받은 친구 요청 목록
export const friendRequestsState = atom({
  key: 'friendRequestsState',
  default: [], // requestId, friendSenderId, friendReceiverId, status
  effects_UNSTABLE: [persistAtom],
});

// user의 친구 목록
export const friendsListState = atom({
  key: 'friendsListState',
  default: [], // friendId, friendNickname, friendAvatar
  effects_UNSTABLE: [persistAtom],
});

// 모든 user와 친구 사이의 메시지 목록
export const messagesState = atom({
  key: 'messagesState',
  default: [], // messageId, messageSenderId, messageReceiverId, content
  effects_UNSTABLE: [persistAtom],
});
