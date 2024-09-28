import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    avatar: {
      color: {
        image: '',
        x: 0,
        y: 0,
      },
      item: {
        image: '',
        x: 0,
        y: 0,
      },
    },
    nickname: '',
    email: '',
    introduction: '',
  },
});
