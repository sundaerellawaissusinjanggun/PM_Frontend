import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    avatar: null,
    nickname: '',
    introduction: '',
    color: null,
    item: null,
  },
});

export const selectionsState = atom({
  key: 'selectionsState',
  default: { selectedColor: null, selectedItem: null },
});
