// FriendState.js
import { atom } from 'recoil';

// 친구 목록 상태
export const friendListState = atom({
  key: 'friendListState', // 고유한 key 값
  default: [
    { id: 1, name: '닉네임1', profilePic: 'url1', isAccepted: false },
    { id: 2, name: '닉네임2', profilePic: 'url2', isAccepted: false },
    { id: 3, name: '닉네임3', profilePic: 'url3', isAccepted: false },
  ], // 기본 값
});
