import { css } from '@emotion/react';
import { BsFillKanbanFill, BsGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';

export const Header = () => {
  return (
    <div css={header}>
      <div css={buttons}>
        {createHeaderButton('一覧', <FaThList size={18} style={{ marginRight: 8 }} />)}
        {createHeaderButton('カンバン', <BsFillKanbanFill size={18} style={{ marginRight: 8 }} />)}
        {createHeaderButton('ギャラリー', <BsGridFill size={18} style={{ marginRight: 8 }} />)}
      </div>
    </div>
  );
};

const createHeaderButton = (label: string, icon: JSX.Element) => {
  return (
    <div css={button}>
      {icon}
      {label}
    </div>
  );
};

const button = css`
  cursor: pointer;
  padding: 4px 10px;
  height: 100%;
  border-radius: 4px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: left;
  text-align: center;
  &:hover {
    background: #eeeeee;
    color: #9e9e9e;
  }
  &:active {
    background: #fff;
    color: #757575;
  }
`;

const header = css`
  height: 10%;
  padding: 0 20px;
  background: #fff;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const buttons = css`
  height: 100%;
  width: 40%;
  padding: 8px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
