import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    avatar: {
      color: {
        image: '',
        x: '',
        y: '',
      },
      item: {
        image: '',
        x: '',
        y: '',
      },
    },
    nickname: '',
    email: '',
    introduction: '',
  },
});
