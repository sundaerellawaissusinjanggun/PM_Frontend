import Context from './Context';
import Header from '../../components/Layout/Header';
import { Block } from '../../styles/UI';
import Pig from '/colors/pig.svg';

export default function Profile() {
  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.AbsoluteBox
        width="100%"
        top="10%"
        padding="0 0 0 20px"
        justifyContent="center"
      >
        <img src={Pig} /> {/* 나중에 DB에 저장되어있는 돼지로 불러와야 함 */}
      </Block.AbsoluteBox>
      <Block.AbsoluteBox bottom="0">
        <Context />
      </Block.AbsoluteBox>
    </>
  );
}
