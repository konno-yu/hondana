import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface DrawerElmProps {
  icon: ReactNode;
  sentence: string;
}

const DrawerElm = ({ icon, sentence }: DrawerElmProps) => (
  <div css={elmStyle}>
    {icon}
    <span title={sentence} css={sentenceStyle}>
      {sentence}
    </span>
  </div>
);

const elmStyle = css`
  height: 5%;
  padding: 0px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    background: #f5f5f5;
    cursor: pointer;
  }
  &:active {
    background: #fefefe;
    cursor: pointer;
  }
`;

const sentenceStyle = css`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default DrawerElm;
