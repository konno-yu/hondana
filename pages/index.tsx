import { css } from '@emotion/react';
import { Kanban } from './kanban';
import { Header } from '/components/Header';

const Home = () => {
  return (
    <div css={rootStyle}>
      <Header />
      <Kanban />
    </div>
  );
};

const rootStyle = css`
  height: 100vh;
  /* background: gray; */
`;

export default Home;
