import styled from '@emotion/styled';
import { useState } from 'react';
import customData from '../../assets/customData';
import { Block, Text } from '../../styles/UI';
import Header from '../Layout/Header';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Custombox() {
  const [selectedTab, setSelectedTab] = useState('color');
  const [selectedColor, setSelectedColor] = useState(customData.colors[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleItemChange = (item) => {
    console.log('Selected Item:', item);
    setSelectedItem(item);
  };

  const handleEmptyItemSelection = () => {
    setSelectedItem(null);
  };

  const handleSave = async () => {
    const userId = '3704053471';

    try {
      await setDoc(doc(db, 'userSelections', userId), {
        userId,
        selectedColor: selectedColor.image,
        ...(selectedItem && { selectedItem: selectedItem.image }),
      });
      console.log('Selections saved to Firebase');
      navigate('/profileSetup');
    } catch (error) {
      console.error('Error saving selections:', error);
    }
  };

  return (
    <>
      {/* Header Area */}
      <Block.HeaderBox justifyContent="space-between">
        <Header
          showNextIcon={true}
          showBackIcon={true}
          onComplete={handleSave}
        />
      </Block.HeaderBox>
      <CustomizationScreen>
        <PigDisplay>
          <Pig src={selectedColor.image} alt="Selected Pig" />
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
  margin-bottom: 470px;
`;

const PigDisplay = styled.div`
  position: relative;
  padding: 20px 0 0 30px;
`;

const Pig = styled.img`
  width: 156px;
  height: 148px;
`;

const ItemImg = styled.img`
  position: absolute;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 43px;
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
  max-height: 430px; /* Set maximum height */
  overflow-y: auto; /* Allow vertical scrolling */
  padding: 0 30px;
`;

const OptionButton = styled.button`
  width: 88px;
  background: none;
  border: none;
  cursor: pointer;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#FF7195' : '#BEBEBE')}; // Change border color based on selection
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
