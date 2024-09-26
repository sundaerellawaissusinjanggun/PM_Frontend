import styled from '@emotion/styled';
import theme from './theme';

// 재사용 될 텍스트
export const Text = {
  Title: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.bold};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.title};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  MiniTitle1: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.bold};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.medium};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
    padding: ${(props) => props.padding};
  `,
  MiniTitle2: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.medium};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.subtitle};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  Body1: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.normal};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.small};
    color: ${({ color }) =>
      color ? theme.color[color] : theme.color.grayDeep};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  Body2: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.normal};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.medium};
    color: ${({ color }) =>
      color ? theme.color[color] : theme.color.grayDeep};
    cursor: ${(props) => props.pointer && 'pointer'};
    margin-bottom: 3px;
  `,
  Body3: styled.span`
    display: inline-block;
    width: 100%;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.bold};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.large};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  Warning: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.small};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.mini};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.pink)};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  LinkText: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.normal};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.small};
    color: ${({ color }) =>
      color ? theme.color[color] : theme.color.grayLight};
    cursor: ${(props) => props.pointer && 'pointer'};
    text-decoration: underline;
  `,
  ModalTitle: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.bold};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.title};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  ModalTitle2: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.bold};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.title};
    color: ${({ color }) =>
      color ? theme.color[color] : theme.color.grayLight};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  ModalText: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.medium};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.large};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
    line-height: 1.5;
  `,
  ModalText2: styled.span`
    display: inline-block;
    font-weight: ${({ weight }) =>
      weight ? theme.fontWeight[weight] : theme.fontWeight.medium};
    font-size: ${({ size }) =>
      size ? theme.fontSize[size] : theme.fontSize.medium};
    color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
    cursor: ${(props) => props.pointer && 'pointer'};
    line-height: 1.5;
  `,
};

// 재사용 될 블록
export const Block = {
  AbsoluteBox: styled.div`
    position: absolute;
    top: ${(props) => props.top};
    right: ${(props) => props.right};
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    z-index: ${(props) => props.zIndex};
    display: flex;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${({ bgColor }) => theme.color[bgColor]};
    cursor: ${(props) => props.pointer && 'pointer'};
  `,
  FlexBox: styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${({ bgColor }) => theme.color[bgColor]};
    cursor: ${(props) => props.pointer && 'pointer'};
    gap: ${(props) => props.gap};
  `,
  ColumnFlexBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${({ bgColor }) => theme.color[bgColor]};
    cursor: ${(props) => props.pointer && 'pointer'};
    gap: ${(props) => props.gap};
  `,

  RowFlexBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${({ bgColor }) => theme.color[bgColor]};
    cursor: ${(props) => props.pointer && 'pointer'};
    gap: ${(props) => props.gap};
  `,
  HeaderBox: styled.div`
    position: absolute;
    top: 0;
    margin-top: 35px;
    right: ${(props) => props.right};
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    z-index: ${(props) => props.zIndex};
    display: flex;
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    width: 85%;
    height: ${(props) => (props.height ? props.height : 'auto')};
    padding: ${(props) => props.padding};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${({ bgColor }) => theme.color[bgColor]};
    cursor: ${(props) => props.pointer && 'pointer'};
    /* border: 1px solid red; */
  `,
  BackgroundWhiteBox: styled.div`
    width: 100%;
    height: ${(props) => props.height};
    padding: ${(props) => props.padding};
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    border-radius: 30px;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    /* border: 1px solid red; */
  `,
};

// 재사용 될 이미지
export const Img = {
  RoundIcon: styled.img`
    display: block;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    border: ${(props) => props.border};
    border-radius: 100%;
    cursor: pointer;
  `,
  AngledIcon: styled.img`
    display: block;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    border: ${(props) => props.border};
    cursor: pointer;
  `,
};

export const Button = {
  SubmitBtn: styled.button`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    border: ${(props) => props.border};
    border-radius: 10px;
    background-color: ${({ bgColor }) =>
      bgColor ? theme.color[bgColor] : '#F7F7F7'};
    color: ${(props) => (props.color ? props.color : 'white')};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #aa9ecb;
    }
  `,
};

export const Input = {
  BasicInput: styled.input`
    width: 321px;
    height: 45px;
    padding-left: 18px;
    background-color: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    outline: none;
    ::placeholder {
      color: #bebebe;
      font-size: small;
    }
  `,
  TextAreaInput: styled.textarea`
    width: 321px;
    height: ${(props) => (props.height ? props.height : '190px')};
    padding: 18px 20px;
    margin: ${(props) => props.margin};
    background-color: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    resize: none;
    outline: none;
    ::placeholder {
      color: #bebebe;
      font-size: ${(props) => props.fontSize};
    }
  `,
};

//클릭 시 나오는 메뉴
export const DropdownMenu = styled.ul`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
`;

export const MenuItem = styled.li``;
