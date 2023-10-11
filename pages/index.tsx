import { css } from '@emotion/react';
import BookDrawer from '../components/BookDrawer';
import SectionDrawer from '/components/SectionDrawer';
import AwarenessDrawer from '/components/AwarenessDrawer';
import { Major_Mono_Display } from 'next/font/google';
import { useState } from 'react';

const MMD400 = Major_Mono_Display({
  weight: '400',
  preload: false,
});

const Home = () => {
  const [selected, setSelected] = useState(-1);

  const handleSelectChange = (newSelected) => {
    setSelected(newSelected);
  };
  return (
    <div css={rootStyle}>
      <div
        className={MMD400.className}
        style={{
          fontSize: 24,
          height: '5%',
          width: '100%',
          background: '#f5f5f5',
          borderBottom: '0.5px solid #DEDEDE',
          display: 'flex',
          alignItems: 'flex-start',
          padding: '4px 8px',
          fontWeight: 900,
          color: '#546e7a',
          letterSpacing: 1.5,
        }}
      >
        HONDANA
      </div>
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <BookDrawer selected={selected} onChange={handleSelectChange} />
        <SectionDrawer bookId={selected} />
        <AwarenessDrawer />
      </div>
    </div>
  );
};

const rootStyle = css`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Home;
