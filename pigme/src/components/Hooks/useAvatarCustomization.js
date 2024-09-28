import { useState } from 'react';

// 아바타 색상과 아이템을 관리하는 커스텀 훅
export default function useAvatarCustomization(initialColor, initialItem) {
  const [selectedColor, setSelectedColor] = useState(initialColor || null);
  const [selectedItem, setSelectedItem] = useState(initialItem || null);

  // 색상 변경 함수
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // 아이템 변경 함수
  const handleItemChange = (item) => {
    setSelectedItem(item);
  };

  return {
    selectedColor,
    setSelectedColor,
    selectedItem,
    setSelectedItem,
    handleColorChange,
    handleItemChange,
  };
}
