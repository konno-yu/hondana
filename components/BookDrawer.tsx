import { css } from '@emotion/react';
import { BsBookFill, BsCircleFill, BsCircleHalf, BsFillPlusSquareFill } from 'react-icons/bs';
import DrawerElm from './DrawerElm';

const BookDrawer = () => {
  const dammy = ['解像度を上げ', 'センスは知識からはじめる', '不確実性 超入門'];
  return (
    <div css={drawer}>
      <div css={header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <BsBookFill color="#333333" />
          <span style={{ color: '#333333', fontWeight: 700 }}>Books</span>
        </div>
        <BsFillPlusSquareFill color="#333333" />
      </div>
      <DrawerElm icon={<BsCircleFill height="100%" color="#333333" />} sentence="すべての本" />
      {dammy.map((d) => (
        <DrawerElm icon={<BsCircleHalf height="100%" color="#333333" />} sentence={d} />
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
  height: 5%;
  padding: 0px 12px;
  font-size: 12pt;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  border-bottom: 1px dashed #dedede;
`;

export default BookDrawer;
