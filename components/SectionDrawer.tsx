import { css } from '@emotion/react';
import { BsBookmarksFill, BsBookmarkFill, BsCircleHalf, BsFillPlusSquareFill } from 'react-icons/bs';
import { TbSectionSign } from 'react-icons/tb';
import DrawerElm from './DrawerElm';

const SectionDrawer = () => {
  const dammy = ['1.「センスのよさ」が、スキルとして求められている時代', '2. センスで仕事を最適化する', '3. センスとは何かを定義する'];
  return (
    <div css={drawer}>
      <div css={header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TbSectionSign color="#333333" />
          <span style={{ color: '#333333', fontWeight: 700 }}>Sections</span>
        </div>
        <BsFillPlusSquareFill color="#333333" />
      </div>
      <DrawerElm icon={<BsBookmarksFill height="100%" color="#333333" />} sentence="すべてのセクション" />
      {dammy.map((d) => (
        <DrawerElm icon={<BsBookmarkFill height="100%" color="#333333" />} sentence={d} />
      ))}
    </div>
  );
};

const drawer = css`
  height: 100%;
  width: 20%;
  border-right: 1px solid #dedede;
`;

const header = css`
  width: 100%;
  height: 5%;
  padding: 0px 12px;
  font-size: 12pt;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  border-bottom: 1px dashed #dedede;
`;

export default SectionDrawer;
