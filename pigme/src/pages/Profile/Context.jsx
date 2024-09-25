import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Profile from '/colors/pig.svg';
import Edit from '/pencil.svg';
import Background from '../../components/Layout/Background';

export default function Context() {
  const navigate = useNavigate();

  const handelGoToMyBank = () => navigate('/myBank');
  const handelGoToLike = () => navigate('/like');
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
            <Style.InfoText>나 돼지임 ㅋㅋ</Style.InfoText>
            <Style.FieldEditImage src={Edit} />
          </Style.EditableField>

          <Style.InfoLabel>한 줄 소개</Style.InfoLabel>
          <Style.EditableField>
            <Style.InfoText> 나 얼마나 먹을 거 같아 ? </Style.InfoText>
            <Style.FieldEditImage src={Edit} />
          </Style.EditableField>

          <Style.SaveButton>저장하기</Style.SaveButton>
        </Style.UserInfo>
        <Style.UserStatsContainer>
          <Style.StatsButton onClick={handelGoToMyBank}>
            현재 보유 코인 <Style.StatsCount>12개</Style.StatsCount>
          </Style.StatsButton>
          <Style.StatsButton onClick={handelGoToLike}>
            즐겨찾는 메세지 <Style.StatsCount>2개</Style.StatsCount>
          </Style.StatsButton>
        </Style.UserStatsContainer>
      </Style.ProfileContainer>
    </Background>
  );
}

const Style = {
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  SaveButton: styled.button`
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #808080;
    text-decoration: underline;
  `,
  UserDetails: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
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
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 25px;
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
    gap: 15px;
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
  UserStatsContainer: styled.div`
    padding: 30px 0;
    border-top: 1px solid #bebebe;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    gap: 10px;
  `,
  StatsButton: styled.button`
    font-size: 14px;
    font-weight: bold;
    color: #808080;
  `,
  StatsCount: styled.span`
    font-weight: bold;
    color: black;
  `,
};
