import styled from '@emotion/styled';
import React, {useState} from 'react';
import customData from '../../assets/customData.json';
import Item from '/items/watermelon.svg';

export default function Custombox() {
  const [selectedTab, setSelectedTab] = useState('color');
  const [selectedColor, setSelectedColor] = useState(customData.colors[0].image);
  const [selectedItem, setSelectedItem] = useState(null);

  // 색상 선택
  const handleColorChange = (color) => {
    setSelectedColor(color.image);
  }
  // 아이템 선택
  const handleItemChange = (item) => {
    console.log('Selected Item:', item);  // 선택된 아이템의 좌표와 이미지를 확인
    setSelectedItem(item);
  }
  return (
    <CustomizationScreen>
      {/* 돼지 캐릭터 영역 */}
      <PigDisplay>
        <Pig src={selectedColor} alt="Selected Pig" />
        {selectedItem && <ItemImg src={selectedItem.image} alt="Item" 
            style={{
              position: 'absolute',
              top: `${selectedItem.y}px`,  // JSON에서 가져온 y 좌표
              left: `${selectedItem.x}px`  // JSON에서 가져온 x 좌표
            }}/>}
      </PigDisplay>

      {/* 탭 메뉴 */}
      <TabContainer>
        <TabButton isActive={selectedTab === 'color'} onClick={()=>setSelectedTab('color')}>
        COLOR
        </TabButton>
        <TabButton isActive={selectedTab === 'items'} onClick={()=>setSelectedTab('items')}>
        ITEMS
        </TabButton>
      </TabContainer>

      {/* 조건에 따른 콘텐츠 렌더링 */}
      <OptionsContainer>
        {selectedTab === 'color' && (
          <>
            {customData.colors.map((color) => (
              <OptionButton key={color.id} onClick={() => handleColorChange(color)}>
                <Box.Wrapper>
                  <img src={color.image} alt={color.name} />
                </Box.Wrapper>
              </OptionButton>
            ))}
          </>
        )}
        {selectedTab === 'items' && (
          <>
            {customData.items.map((item) => (
              <OptionButton key={item.id} onClick={() => handleItemChange(item)}>
                <Box.Wrapper>
                <img src={item.image} alt={item.name} />
                </Box.Wrapper>
              </OptionButton>
            ))}
          </>
        )}
      </OptionsContainer>
    </CustomizationScreen>
  );
  };

const CustomizationScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const PigDisplay = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  `;

const Pig = styled.img`
  width: 100%;
  height: 100%;
  `;

const ItemImg = styled.img`
  width: 150px;
  height: 150px;
  position: absolute;
  border: 1px solid black; /* 확인을 위해 추가 */
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TabButton = styled.button`
  background: ${({ isActive }) => (isActive ? '#f08' : '#ddd')};
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #f08;
  }
`;


const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼 */
  gap: 30px;
  margin-top: 20px;
  max-height: 300px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로로 스크롤 가능 */ 
`;

const OptionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Box = {
  Wrapper: styled.button`
    width: 88px;
    height: 83px;
    border: 1px solid lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
