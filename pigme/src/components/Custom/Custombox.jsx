import styled from '@emotion/styled';
import { useState } from 'react';
import customData from '../../assets/customData';
import { Block, Text } from '../../styles/UI';
import Header from '../Layout/Header';
import { db, auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectionsState } from '../../recoil/atoms';
import ProfileAvatar from '../Layout/ProfileAvatar';

export default function Custombox() {
  const [selectedTab, setSelectedTab] = useState('color');
  const [selectedColor, setSelectedColor] = useState(customData.colors[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const [selections, setSelections] = useRecoilState(selectionsState);

  // useEffect(() => {
  // 	console.log("selectedColor => ", selectedColor);
  // }, [selectedColor]);

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

    try {
      const colorImage = selectedColor.image;
      const itemData = selectedItem
        ? {
            image: selectedItem.image,
            x: selectedItem.x || 0,
            y: selectedItem.y || 0,
          }
        : null;

      setSelections({
        selectedColor: colorImage,
        selectedItem: itemData,
      });

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
        <PigDisplay>
          {/* 값을 위에서 아래로 넘겨줄 땐 넘겨줄 값만 보내는 것이 좋다 */}
          <ProfileAvatar color={selectedColor.image} item={selectedItem} />
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
                    <Box.Button>
                      <img src={color.image} alt={color.name} />
                    </Box.Button>
                  </OptionWrapper>
                ))}
              </>
            )}
            {selectedTab === 'items' && (
              <>
                <OptionWrapper
                  onClick={handleEmptyItemSelection}
                  isSelected={selectedItem === null}
                >
                  <Box.Button>
                    <img
                      src="/none.svg"
                      alt="Empty"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </Box.Button>
                </OptionWrapper>

                {customData.items.map((item) => (
                  <OptionWrapper
                    key={item.id}
                    onClick={() => handleItemChange(item)}
                    isSelected={selectedItem?.id === item.id}
                  >
                    <Box.Button>
                      <img src={item.image} alt={item.name} />
                    </Box.Button>
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

const Box = {
  Button: styled.button`
    width: 88px;
    height: 83px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
