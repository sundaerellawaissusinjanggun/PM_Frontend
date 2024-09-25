import styled from "@emotion/styled";
import { useState } from "react";
import customData from "../../assets/customData";
import { Block, Text } from "../../styles/UI";
import Header from "../Layout/Header";

export default function Custombox() {
    const [selectedTab, setSelectedTab] = useState("color");
    const [selectedColor, setSelectedColor] = useState(customData.colors[0]);
    const [selectedItem, setSelectedItem] = useState(null);

    // 색상 선택
    const handleColorChange = color => {
        setSelectedColor(color); // Set the selected color object
    };

    // 아이템 선택
    const handleItemChange = item => {
        console.log("Selected Item:", item); // 선택된 아이템의 좌표와 이미지를 확인
        setSelectedItem(item);
    };

    // 비어있는 아이템으로 초기화
    const handleEmptyItemSelection = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <CustomizationScreen>
                <Block.FlexBox width="90%" justifyContent="space-between">
                    <Header showNextIcon={true} showBackIcon={true} />
                </Block.FlexBox>
                {/* 돼지 캐릭터 영역 */}
                <PigDisplay>
                    <Pig src={selectedColor.image} alt="Selected Pig" /> {/* Use the selected color's image */}
                    {selectedItem && selectedItem.image && (
                        <ItemImg
                            src={selectedItem.image}
                            alt="Item"
                            style={{
                                position: "absolute",
                                top: `${selectedItem.y}px`, // JSON에서 가져온 y 좌표
                                left: `${selectedItem.x}px`, // JSON에서 가져온 x 좌표
                            }}
                        />
                    )}
                </PigDisplay>
                {/* 탭 메뉴 */}
                <TabContainer>
                    <TabButton isActive={selectedTab === "color"} onClick={() => setSelectedTab("color")}>
                        <Text.MiniTitle1 color="pink">COLOR</Text.MiniTitle1>
                    </TabButton>
                    <TabButton isActive={selectedTab === "items"} onClick={() => setSelectedTab("items")}>
                        <Text.MiniTitle1 color="pink">ITEMS</Text.MiniTitle1>
                    </TabButton>
                </TabContainer>
                <Block.AbsoluteBox
                    width="100%"
                    height="60%"
                    padding="10px 0 0 3px"
                    borderRadius="30px"
                    bgColor="white"
                    bottom="0"
                    left="0"
                >
                    {/* 조건에 따른 콘텐츠 렌더링 */}
                    <OptionsContainer>
                        {selectedTab === "color" && (
                            <>
                                {customData.colors.map(color => (
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
                        {selectedTab === "items" && (
                            <>
                                <OptionButton onClick={handleEmptyItemSelection} isSelected={selectedItem === null}>
                                    <Box.Wrapper>
                                        <img src="/none.svg" alt="Empty" style={{ width: "50px", height: "50px" }} />
                                    </Box.Wrapper>
                                </OptionButton>

                                {customData.items.map(item => (
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
    width: 140px;
`;

const Pig = styled.img`
    width: 156px;
    height: 148px;
`;

const ItemImg = styled.img`
    width: 150px;
    height: 150px;
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
    background: ${({ isActive }) => (isActive ? "#faf1f4" : "#f6e5ea")};
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
    max-height: 430px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로로 스크롤 가능 */
    padding: 0 30px;
`;

const OptionButton = styled.button`
    width: 88px;
    background: none;
    border: none;
    cursor: pointer;
    border: 1px solid ${({ isSelected }) => (isSelected ? "#FF7195" : "#BEBEBE")}; // Change border color based on selection
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
