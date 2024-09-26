import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { selectionsState } from '../../recoil/atoms';

export default function ProfileAvatar() {
  const [userSelections, setUserSelections] = useState(null);
  const selections = useRecoilValue(selectionsState);

  useEffect(() => {
    const fetchUserSelections = async () => {
      const userId = '3704053471';
      const docRef = doc(db, 'userSelections', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserSelections(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchUserSelections();
  }, []);

  return (
    <Wrapper>
      {userSelections && (
        <>
          <ItemImg src={userSelections.selectedColor} alt="Color" />
          {userSelections.selectedItem && (
            <ItemImg
              src={userSelections.selectedItem.image}
              alt="Item"
              style={{
                position: 'absolute',
                top: `${userSelections.selectedItem.y}px`,
                left: `${userSelections.selectedItem.x}px`,
              }}
            />
          )}
        </>
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
