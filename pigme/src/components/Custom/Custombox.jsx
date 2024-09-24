import styled from "@emotion/styled";
import { useState } from "react";
import customData from "../../assets/customData";

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
        <CustomizationScreen>
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

            <div>
                {/* 탭 메뉴 */}
                <TabContainer>
                    <TabButton isActive={selectedTab === "color"} onClick={() => setSelectedTab("color")}>
                        COLOR
                    </TabButton>
                    <TabButton isActive={selectedTab === "items"} onClick={() => setSelectedTab("items")}>
                        ITEMS
                    </TabButton>
                </TabContainer>

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
            </div>
        </CustomizationScreen>
    );
}

const CustomizationScreen = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 90%;
`;

const PigDisplay = styled.div`
    position: relative;
    width: 140px;
    height: 170px;
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
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const TabButton = styled.button`
    background: ${({ isActive }) => (isActive ? "#f08" : "#ddd")};
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
    max-height: 430px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로로 스크롤 가능 */
`;

const OptionButton = styled.button`
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
