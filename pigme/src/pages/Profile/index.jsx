import Context from './Context';
import Header from '../../components/Layout/Header';
import { Block } from '../../styles/UI';

export default function Profile() {
  return (
    <>
      <Block.HeaderBox justifyContent="flex-end">
        <Header showHomeIcon={true} />
      </Block.HeaderBox>

      <Block.AbsoluteBox bottom="0">
        <Context />
      </Block.AbsoluteBox>
    </>
  );
}
