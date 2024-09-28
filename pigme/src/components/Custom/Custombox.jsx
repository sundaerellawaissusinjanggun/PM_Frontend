import styled from '@emotion/styled';
import { useState } from 'react';
import customData from '../../assets/customData';
import { Block, Text } from '../../styles/UI';
import Header from '../Layout/Header';
import { db, auth } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';

export default function Custombox() {
  const navigate = useNavigate();
  const userData = useRecoilValue(userState);
  const [selectedTab, setSelectedTab] = useState('color');
  const [selectedColor, setSelectedColor] = useState(
    userData.avatar.color.image || customData.colors[0]
  );
  const [selectedItem, setSelectedItem] = useState(
    userData.avatar.item.image || null
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleItemChange = (item) => {
    setSelectedItem(item);
  };

  const handleEmptyItemSelection = () => {
    setSelectedItem(null);
  };

  const handleSave = async () => {
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, 'users', userId));
    console.log('저장');

    try {
      const colorImage = selectedColor.image;
      const itemData = selectedItem
        ? {
            image: selectedItem.image,
            x: selectedItem.x || 0,
            y: selectedItem.y || 0,
          }
        : null;

      await setDoc(doc(db, 'userSelections', userId), {
        userId,
        selectedColor: colorImage,
        ...(itemData && { selectedItem: itemData }),
      });

      navigate('/profileSetup');
    } catch (error) {
      console.error('커스텀을 저장하지 못 했습니다.', error);
    }
  };

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
        {/* <PigDisplay>
          <ProfileAvatar color={selectedColor} item={selectedItem} />
        </PigDisplay> */}

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
                  <OptionButton
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    isSelected={selectedColor.id === color.id}
                  >
                    <Box.Wrapper>
                      <img src={color.image} alt={color.name} />
                    </Box.Wrapper>
                  </OptionButton>
                ))}
              </>
            )}
            {selectedTab === 'items' && (
              <>
                <OptionButton
                  onClick={handleEmptyItemSelection}
                  isSelected={selectedItem === null}
                >
                  <Box.Wrapper>
                    <img
                      src="/none.svg"
                      alt="Empty"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </Box.Wrapper>
                </OptionButton>

                {customData.items.map((item) => (
                  <OptionButton
                    key={item.id}
                    onClick={() => handleItemChange(item)}
                    isSelected={selectedItem?.id === item.id}
                  >
                    <Box.Wrapper>
                      <img src={item.image} alt={item.name} />
                    </Box.Wrapper>
                  </OptionButton>
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

const ItemImg = styled.img`
  position: absolute;
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

const OptionButton = styled.button`
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

const Box = {
  Wrapper: styled.button`
    width: 88px;
    height: 83px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
