import { BsCheckCircleFill, BsLightbulbFill } from 'react-icons/bs';
import { Header } from './Header';
import { css } from '@emotion/react';
import DrawerElm from './DrawerElm';

const AwarenessDrawer = () => {
  const dammy = [
    '100が200になったものは欲しくなく、100が101~110になったものをみたときに多くの人が「新鮮だ、ほしい！」と思うもの',
    '単に利益だけでなく、社会的な価値が必要',
  ];
  return (
    <div css={drawer}>
      <div style={{ height: '90%' }}>
        <div css={header}>
          <BsLightbulbFill color="#333333" />
          <span style={{ color: '#333333', fontWeight: 700 }}>Awareness</span>
        </div>
        {dammy.map((d) => (
          <DrawerElm icon={<BsCheckCircleFill color="#333333" />} sentence={d} />
        ))}
      </div>
      <Header />
    </div>
  );
};

const drawer = css`
  height: 100%;
  width: 60%;
`;

const header = css`
  height: 5%;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px dashed #dedede;
`;

export default AwarenessDrawer;
