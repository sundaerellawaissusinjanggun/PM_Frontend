import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { db, auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { selectionsState } from '../../recoil/atoms';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfileAvatar({ color, item }) {
  const [userSelections, setUserSelections] = useState(null);
  const selections = useRecoilValue(selectionsState);

  //  로그인된 사용자의 정보를 최신화하는 로직에서 문제가 생김.
  // 아래 코드를 주석 처리하면 이미지가 전달되는데 또 프로필에서 아바타를 수정하려고 하면 수정이 되지않는 문제가 있음 ..
  // useEffect(() => {
  //   const fetchUserSelections = async (userId) => {
  //     const docRef = doc(db, 'userSelections', userId);
  //     const docSnap = await getDoc(docRef);

  //     console.log('Selected Color:', selectedColor);

  //     if (docSnap.exists()) {
  //       setUserSelections(docSnap.data());
  //     } else {
  //       console.log('No such document!');
  //     }
  //   };

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       fetchUserSelections(user.uid);
  //     } else {
  //       console.log('사용자가 로그인되어 있지 않습니다.');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  const selectedColor =
    selections.selectedColor || userSelections?.selectedColor || color;
  const selectedItem =
    selections.selectedItem || userSelections?.selectedItem || item;

  // console.log(selectedColor);
  return (
    <Wrapper>
      {selectedColor && <ItemImg src={selectedColor} alt="Color" />}
      {/* 'selectedItem && selectedItem'을 아래 코드로 수정. */}
      {selectedItem?.image && (
        <ItemImg
          src={selectedItem.image}
          alt="Item"
          style={{
            position: 'absolute',
            top: `${selectedItem.y}px`,
            left: `${selectedItem.x}px`,
          }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid red;
`;

const ItemImg = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
`;
