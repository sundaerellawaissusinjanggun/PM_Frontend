// // 좋아요 개수, 좋아요 목록
// import styled from '@emotion/styled';
// import Heart from '/red-heart.svg';
// import { Text } from '../styles/UI';
// import { useState } from 'react';

// export default function Like() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <>
//       <LikeButton onClick={toggleMenu}>
//         <img src={Heart} />
//         <Text.MiniTitle1 padding="2px 0 0">5</Text.MiniTitle1>
//       </LikeButton>
//       <DropDown isVisible={isOpen}>
//         <MenuItem>돼지 안녕</MenuItem>
//         <MenuItem>꿀꿀</MenuItem>
//         <MenuItem>배고파</MenuItem>
//       </DropDown>
//     </>
//   );
// }

// const LikeButton = styled.button`
//   width: 60px;
//   height: 34px;
//   display: flex;
//   justify-content: center;
//   padding: 7px 13px 0 11px;
//   gap: 7px;
//   border: 1px solid #bebebe;
//   border-radius: 14px;
//   &:hover {
//   }
// `;
// const DropDown = styled.ul`
//   margin: 45px 0 0;
//   padding: 19px;
//   border: 1px solid #e7e7e7;
//   border-radius: 14px;
//   position: absolute;
//   flex-direction: column;
//   display: ${({ isVisible }) =>
//     isVisible ? 'block' : 'none'}; /* 상태에 따른 가시성 제어 */
// `;

// const MenuItem = styled.li`
//   color: #838383;
//   font-size: 12px;
//   list-style-type: none;
//   padding: 0 0 10px;

//   &:last-child {
//     padding: 0;
//   }

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;
