import styled from "@emotion/styled";
import Profile from "/colors/pig.svg";
import Edit from "/pencil.svg";
import Background from "../Layout/Background";

export default function Context() {
    return (
        <Background>
            <Style.ProfileTitle>나의 프로필</Style.ProfileTitle>
            <Style.ProfileContainer>
                <Style.UserInfo>
                    <Style.UserInfoContainer>
                        <Style.UserDetails>
                            <Style.InfoContainer>
                                <Style.InfoLabel>이메일</Style.InfoLabel>
                                <Style.InfoText>kyoul10121@naver.com</Style.InfoText>
                            </Style.InfoContainer>
                            <Style.ProfileImageContainer>
                                <Style.ProfileImage src={Profile} />
                                <Style.EditImage src={Edit} />
                            </Style.ProfileImageContainer>
                        </Style.UserDetails>
                    </Style.UserInfoContainer>

                    <Style.InfoLabel>닉네임</Style.InfoLabel>
                    <Style.EditableField>
                        <span>나 돼지임 ㅋㅋ</span>
                        <Style.FieldEditImage src={Edit} />
                    </Style.EditableField>

                    <Style.InfoLabel>한 줄 소개</Style.InfoLabel>
                    <Style.EditableField>
                        <span> 나 얼마나 먹을 거 같아 ? </span>
                        <Style.FieldEditImage src={Edit} />
                    </Style.EditableField>

                    <Style.SaveButton>저장하기</Style.SaveButton>
                </Style.UserInfo>
            </Style.ProfileContainer>
        </Background>
    );
}

const Style = {
    InfoContainer: styled.div``,
    SaveButton: styled.button`
        font-size: 12px;
        color: #808080;
        text-decoration: underline;
    `,
    UserDetails: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    `,
    UserInfoContainer: styled.div`
        display: flex;
        flex-direction: row;
    `,
    ProfileTitle: styled.p`
        padding: 16px 0;
        font-size: 22px;
        font-weight: bold;
        border-bottom: 1px solid #bebebe;
    `,
    ProfileImageContainer: styled.button`
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #bebebe;
        border-radius: 20px;
        width: 66px;
        height: 66px;
    `,
    ProfileImage: styled.img`
        width: 45px;
        height: 42px;
        opacity: 0.2;
        position: absolute;
        z-index: 1;
    `,
    EditImage: styled.img`
        width: 10px;
        height: 10px;
        position: absolute;
        z-index: 2;
    `,
    FieldEditImage: styled.img`
        display: flex;
        justify-content: flex-end;
        width: 12px;
        height: 12px;
    `,
    ProfileContainer: styled.div`
        padding: 30px 0;
        margin: 0 0 30px;
        display: flex;
        flex-direction: row;
        gap: 25px;
        border-bottom: 1px solid #bebebe;
    `,
    InfoLabel: styled.p`
        font-size: 14px;
        font-weight: bold;
        color: #bebebe;
    `,
    InfoText: styled.p`
        font-size: 12px;
    `,
    UserInfo: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `,
    Input: styled.input`
        width: 100%;
        background-color: #ededed;
        border-radius: 15px;
    `,
    EditableField: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
        background-color: #fafafa;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
    `,
};
