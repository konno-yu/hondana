import { css } from '@emotion/react';
import BookDrawer from '../components/BookDrawer';
import SectionDrawer from '/components/SectionDrawer';
import AwarenessDrawer from '/components/AwarenessDrawer';

const Home = () => {
  return (
    <div css={rootStyle}>
      <BookDrawer />
      <SectionDrawer />
      <AwarenessDrawer />
    </div>
  );
};

const rootStyle = css`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export default Home;
