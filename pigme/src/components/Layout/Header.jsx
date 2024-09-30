import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Text, Img, Block } from '../../styles/UI';

export default function Header({
  showHomeIcon,
  showBackIcon,
  showMyPageIcon,
  showNextIcon,
  onComplete,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {showBackIcon && (
        <button onClick={() => navigate(-1)}>
          <Text.MiniTitle2 color="purple">뒤로</Text.MiniTitle2>
        </button>
      )}
      {showHomeIcon && (
        <Img.AngledIcon
          pointer
          width="20px"
          src="/home-button.svg"
          onClick={() => navigate('/home')}
        />
      )}
      {showMyPageIcon && (
        <>
          <Block.FlexBox
            justifyContent="flex-end"
            height="20px"
            margin="0 0 50px 0"
          >
            <MenuButtonWrapper
              onMouseOver={toggleMenu}
              onMouseLeave={closeMenu}
            >
              <MenuButton width="30px" src="/profile.svg" />
            </MenuButtonWrapper>
          </Block.FlexBox>
          <DropDown
            isVisible={isOpen}
            onMouseLeave={closeMenu}
            onMouseOver={toggleMenu}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              나의 프로필
            </MenuItem>
            <MenuItem onClick={() => navigate('/friend')}>친구 추가</MenuItem>
            {/* <MenuItem>나의 즐겨찾기</MenuItem> */}
            <MenuItem onClick={() => navigate('/myBank')}>나의 저금통</MenuItem>
          </DropDown>
        </>
      )}
      {showNextIcon && (
        <button onClick={onComplete}>
          <Text.MiniTitle2 color="white">완료</Text.MiniTitle2>
        </button>
      )}
    </>
  );
}

const MenuButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MenuButton = styled(Img.AngledIcon)`
  color: #838383;
  cursor: pointer;
  font-size: 12px;
  list-style-type: none;
  padding: 0 0 30px 0;
  &:last-child {
    padding: 0;
  }
`;

const DropDown = styled.ul`
  padding: 19px;
  border: 1px solid #e7e7e7;
  border-radius: 14px;
  position: absolute;
  flex-direction: column;
  background-color: white;
  top: 30px;
  z-index: 3;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const MenuItem = styled.li`
  color: #838383;
  font-size: 12px;
  list-style-type: none;
  padding: 0 0 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    padding: 0;
  }

  &:hover {
    color: #da9b9b;
  }
`;
