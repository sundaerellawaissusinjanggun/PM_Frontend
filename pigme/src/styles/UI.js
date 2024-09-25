import styled from "@emotion/styled";
import theme from "./theme";

// 재사용 될 텍스트
export const Text = {
    Title: styled.span`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.fontWeight[weight] : theme.fontWeight.medium)};
        font-size: ${({ size }) => (size ? theme.fontSize[size] : theme.fontSize.title)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    MiniTitle1: styled.span`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.fontWeight[weight] : theme.fontWeight.bold)};
        font-size: ${({ size }) => (size ? theme.fontSize[size] : theme.fontSize.medium)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    MiniTitle2: styled.span`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.fontWeight[weight] : theme.fontWeight.medium)};
        font-size: ${({ size }) => (size ? theme.fontSize[size] : theme.fontSize.subtitle)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body1: styled.span`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.fontWeight[weight] : theme.fontWeight.normal)};
        font-size: ${({ size }) => (size ? theme.fontSize[size] : theme.fontSize.small)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.grayDeep)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    Body2: styled.span`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.fontWeight[weight] : theme.fontWeight.normal)};
        font-size: ${({ size }) => (size ? theme.fontSize[size] : theme.fontSize.medium)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.grayDeep)};
        cursor: ${props => props.pointer && "pointer"};
        margin-bottom: 3px;
    `,
    Body3: styled.span`
        display: inline-block;
        font-weight: ${({ weight }) => (weight ? theme.fontWeight[weight] : theme.fontWeight.bold)};
        font-size: ${({ size }) => (size ? theme.fontSize[size] : theme.fontSize.large)};
        color: ${({ color }) => (color ? theme.color[color] : theme.color.black)};
        cursor: ${props => props.pointer && "pointer"};
    `,
};

// 재사용 될 블록
export const Block = {
    AbsoluteBox: styled.div`
        position: absolute;
        top: ${props => props.top};
        right: ${props => props.right};
        bottom: ${props => props.bottom};
        left: ${props => props.left};
        z-index: ${props => props.zIndex};
        display: flex;
        flex-direction: ${props => props.direction};
        justify-content: ${props => props.justifyContent};
        align-items: ${props => props.alignItems};
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        margin: ${props => props.margin};
        padding: ${props => props.padding};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        background-color: ${({ bgColor }) => theme.color[bgColor]};
        cursor: ${props => props.pointer && "pointer"};
    `,
    FlexBox: styled.div`
        display: flex;
        flex-direction: ${props => props.direction};
        justify-content: ${props => props.justifyContent};
        align-items: ${props => props.alignItems};
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        margin: ${props => props.margin};
        padding: ${props => props.padding};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        background-color: ${({ bgColor }) => theme.color[bgColor]};
        cursor: ${props => props.pointer && "pointer"};
        gap: 20px;
    `,
    HeaderBox: styled.div`
        position: absolute;
        top: 0;
        margin-top: 35px;
        right: ${props => props.right};
        bottom: ${props => props.bottom};
        left: ${props => props.left};
        z-index: ${props => props.zIndex};
        display: flex;
        flex-direction: ${props => props.direction};
        justify-content: ${props => props.justifyContent};
        align-items: ${props => props.alignItems};
        width: 85%;
        height: ${props => (props.width ? props.height : "auto")};
        padding: ${props => props.padding};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        background-color: ${({ bgColor }) => theme.color[bgColor]};
        cursor: ${props => props.pointer && "pointer"};
        /* border: 1px solid red; */
    `,
    BackgroundWhiteBox: styled.div`
        width: 100%;
        height: 70%;
        padding: ${props => props.padding};
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        border-radius: 30px;
        background-color: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    `,
};

// 재사용 될 이미지
export const Img = {
    RoundIcon: styled.img`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: ${props => props.border};
        border-radius: 100%;
        cursor: ${props => props.pointer && "pointer"};
    `,
    AngledIcon: styled.img`
        display: block;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: ${props => props.border};
        cursor: ${props => props.pointer && "pointer"};
    `,
};

export const Button = {
    SubmitBtn: styled.button`
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        border: ${props => props.border};
        border-radius: 20;
        background-color: ${({ bgColor }) => theme.color[bgColor]};
        color: white;
    `,
};
