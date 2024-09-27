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

  useEffect(() => {
    const fetchUserSelections = async (userId) => {
      const docRef = doc(db, 'userSelections', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserSelections(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    // 인증 상태 확인 후 UID 가져오기
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserSelections(user.uid);
      } else {
        console.log('사용자가 로그인되어 있지 않습니다.');
      }
    });

    return () => unsubscribe();
  }, []);

  // 우선적으로 prop으로 전달된 값 사용, 없으면 Firestore 데이터 사용
  const selectedColor =
    color || selections.selectedColor || userSelections?.selectedColor;
  const selectedItem =
    item || selections.selectedItem || userSelections?.selectedItem;

  return (
    <Wrapper>
      {selectedColor && <ItemImg src={selectedColor} alt="Color" />}
      {selectedItem && selectedItem.image && (
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
