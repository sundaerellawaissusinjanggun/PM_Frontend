import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Text, Img } from '../../styles/UI';

export default function Header({
  showHomeIcon,
  showBackIcon,
  showMyPageIcon,
  showNextIcon,
  onComplete, // Add onComplete prop
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          width="20px"
          src="/home-button.svg"
          onClick={() => navigate('/home')}
        />
      )}
      {showMyPageIcon && (
        <>
          <MenuButton width="30px" src="/profile.svg" onClick={toggleMenu} />
          <DropDown isVisible={isOpen}>
            <MenuItem>나의 프로필</MenuItem>
            <MenuItem onClick={() => navigate('/friends')}>나의 친구</MenuItem>
            <MenuItem>나의 즐겨찾기</MenuItem>
            <MenuItem>나의 저금통</MenuItem>
          </DropDown>
        </>
      )}
      {showNextIcon && (
        <button onClick={onComplete}>
          {/* Call the onComplete function here */}
          <Text.MiniTitle2 color="white">완료</Text.MiniTitle2>
        </button>
      )}
    </>
  );
}

const MenuButton = styled(Img.AngledIcon)`
  color: #838383;
  font-size: 12px;
  list-style-type: none;
  padding: 0 0 10px;
  &:last-child {
    padding: 0;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;
const DropDown = styled.ul`
  margin: 45px 0 0;
  padding: 19px;
  border: 1px solid #e7e7e7;
  border-radius: 14px;
  position: absolute;
  flex-direction: column;
  display: ${({ isVisible }) =>
    isVisible ? 'block' : 'none'}; /* 상태에 따른 가시성 제어 */
`;

const MenuItem = styled.li`
  color: #838383;
  font-size: 12px;
  list-style-type: none;
  padding: 0 0 10px;

  &:last-child {
    padding: 0;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;
