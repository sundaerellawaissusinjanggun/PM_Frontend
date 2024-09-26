import { atom } from 'recoil';

export const selectionsState = atom({
  key: 'selectionsState',
  default: { selectedColor: null, selectedItem: null },
});
