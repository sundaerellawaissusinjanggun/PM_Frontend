import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import customData from '../../assets/customData';
import { Block, Text } from '../../styles/UI';
import Header from '../Layout/Header';
import { db, auth } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import ProfileAvatar from '../Layout/ProfileAvatar';

export default function Custombox() {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
  const [selectedTab, setSelectedTab] = useState('color');
  const [selectedColor, setSelectedColor] = useState(
    userData.avatar.color.image || customData.colors[0]
  );
  const [selectedItem, setSelectedItem] = useState(
    userData.avatar.item.image || customData.items[0]
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleItemChange = (item) => {
    setSelectedItem(item);
  };

  const handleSave = async () => {
    const userId = auth.currentUser.uid;

    if (!userId) {
      console.error('로그인을 해주세요.');
      return;
    }

    const updatedAvatar = {
      color: selectedColor,
      item: selectedItem,
    };

    setUserData((prevUserData) => ({
      ...prevUserData,
      avatar: updatedAvatar,
    }));

    console.log('Updated User Data:', {
      ...userData,
      avatar: updatedAvatar,
    });

    try {
      await setDoc(
        doc(db, 'users', userId),
        {
          avatar: updatedAvatar,
        },
        { merge: true }
      );

      navigate('/profileSetup');
    } catch (error) {
      console.error('Firestore에 저장하지 못 했습니다.', error);
    }
  };

  useEffect(() => {
    console.log(auth.currentUser.uid);
  });

  return (
    <>
      <Block.HeaderBox justifyContent="space-between">
        <Header
          showNextIcon={true}
          showBackIcon={true}
          onComplete={handleSave}
        />
      </Block.HeaderBox>
      <CustomizationScreen>
        <PigDisplay>
          <ProfileAvatar
            selectedColor={selectedColor}
            selectedItem={
              selectedItem && selectedItem.id !== 1 ? selectedItem : null
            }
          />
        </PigDisplay>

        <TabContainer>
          <TabButton
            isActive={selectedTab === 'color'}
            onClick={() => setSelectedTab('color')}
          >
            <Text.MiniTitle1 color="pink">COLOR</Text.MiniTitle1>
          </TabButton>
          <TabButton
            isActive={selectedTab === 'items'}
            onClick={() => setSelectedTab('items')}
          >
            <Text.MiniTitle1 color="pink">ITEMS</Text.MiniTitle1>
          </TabButton>
        </TabContainer>

        <Block.AbsoluteBox
          width="100%"
          height="60%"
          justifyContent="center"
          alignItems="center"
          borderRadius="30px"
          bgColor="white"
          bottom="0"
          left="0"
        >
          <OptionsContainer>
            {selectedTab === 'color' && (
              <>
                {customData.colors.map((color) => (
                  <OptionWrapper
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    isSelected={selectedColor.id === color.id}
                  >
                    <OptionButton>
                      <img src={color.image} alt={color.name} />
                    </OptionButton>
                  </OptionWrapper>
                ))}
              </>
            )}
            {selectedTab === 'items' && (
              <>
                {customData.items.map((item) => (
                  <OptionWrapper
                    key={item.id}
                    onClick={() => handleItemChange(item)}
                    isSelected={selectedItem && selectedItem.id === item.id} // null 체크 추가
                  >
                    <OptionButton>
                      <img src={item.image} alt={item.name} />
                    </OptionButton>
                  </OptionWrapper>
                ))}
              </>
            )}
          </OptionsContainer>
        </Block.AbsoluteBox>
      </CustomizationScreen>
    </>
  );
}

const CustomizationScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 35%;
  margin-bottom: 370px;
`;

const PigDisplay = styled.div`
  position: relative;
  padding: 20px 0 0 30px;
`;

const TabContainer = styled.div`
  position: absolute;
  width: 90%;
  height: 43px;
  top: 280px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #f6e5ea;
  border-radius: 30px;
  padding: 10px 0;
  border: 6px solid white;
`;

const TabButton = styled.button`
  background: ${({ isActive }) => (isActive ? '#faf1f4' : '#f6e5ea')};
  border: none;
  height: 32px;
  padding: 0px 64px;
  border-radius: 20px;
  font-size: 16px;
  color: #ff7195;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-top: 20px;
  max-height: 430px;
  overflow-y: auto;
  padding: 0 30px;
`;

const OptionWrapper = styled.div`
  width: 88px;
  background: none;
  border: none;
  cursor: pointer;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#FF7195' : '#BEBEBE')};
  border-radius: 20px;
  img {
    width: 50px;
    height: 50px;
  }
`;

const OptionButton = styled.button`
  width: 88px;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
