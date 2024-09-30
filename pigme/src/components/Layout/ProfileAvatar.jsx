import React from 'react';
import styled from '@emotion/styled';

export default function ProfileAvatar({
  selectedColor,
  selectedItem,
  color,
  item,
  colorSetup,
  itemSetup,
  profileSelectedColor,
  profileSelectedItem,
  myPiggyBankColor,
  myPiggyBankItem,
  bankmodalColor,
  bankmodalItem,
}) {
  return (
    <Wrapper>
      {selectedColor && <ProfilePigImg src={selectedColor.image} alt="Color" />}
      {selectedItem && selectedItem.image !== '/items/none.svg' && (
        <ProfilePigImg src={selectedItem.image} alt="Item" />
      )}

      {/* 홈에서 돌아다니는 미니 돼지들 */}
      {color && <HomePigImg src={color} alt="Color" />}
      {item && item !== '/items/none.svg' && (
        <HomePigImg src={item} alt="Item" />
      )}

      {colorSetup && <ProfileSetupPigImg src={colorSetup} alt="Color" />}
      {itemSetup && item !== '/items/none.svg' && (
        <ProfileSetupPigImg src={itemSetup} alt="Item" />
      )}

      {profileSelectedColor && (
        <MyProfilePigImg src={profileSelectedColor} alt="Color" />
      )}
      {profileSelectedItem && profileSelectedItem !== '/items/none.svg' && (
        <MyProfilePigImg src={profileSelectedItem} alt="Item" />
      )}

      {myPiggyBankColor && <BankPigImg src={myPiggyBankColor} alt="Color" />}
      {myPiggyBankItem && myPiggyBankItem !== '/items/none.svg' && (
        <BankPigImg src={myPiggyBankItem} alt="Item" />
      )}

      {bankmodalColor && <ProfilePigImg src={bankmodalColor} alt="Color" />}
      {bankmodalItem && bankmodalItem !== '/items/none.svg' && (
        <ProfilePigImg src={bankmodalItem} alt="Item" />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HomePigImg = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
`;

const ProfilePigImg = styled.img`
  position: absolute;
  width: 130px;
  height: 130px;
  margin-bottom: 200px;
`;
const BankPigImg = styled.img`
  position: absolute;
  width: 130px;
  height: 130px;
  margin-top: 100px;
`;

const ProfileSetupPigImg = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  margin-top: 1200px;
`;

const MyProfilePigImg = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  margin-top: 100px;
`;
