import { css } from '@emotion/react';
import { ReactNode, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

interface DrawerElmProps {
  category: 'books' | 'sections' | 'awareness';
  id: number;
  icon: ReactNode;
  sentence: string;
  selected: boolean;
  showContextMenu?: boolean;
  onRowClick: (id) => void;
  onEditClick?: (id) => void;
  onDeleteClick?: (id, category) => void;
}

const DrawerElm = ({ id, category, icon, sentence, selected, showContextMenu = true, onRowClick, onEditClick, onDeleteClick }: DrawerElmProps) => {
  const [show, setShow] = useState(false);

  return (
    <div css={elmStyle(selected)} onClick={() => onRowClick(id)} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {showContextMenu && show && id > 0 && (
        <div css={contextMenu}>
          <AiFillEdit size={18} color="#333" onClick={() => onEditClick(id)} />
          <AiFillDelete size={18} color="#333" onClick={() => onDeleteClick(id, category)} />
        </div>
      )}
      {icon}
      <span title={sentence} css={sentenceStyle}>
        {sentence}
      </span>
    </div>
  );
};

const contextMenu = css`
  height: 90%;
  width: 70px;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 0px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
`;

const elmStyle = (selected?: boolean) => css`
  ${selected === true
    ? css`
        background: #eceff1;
      `
    : css`
        background: #fefefe;
      `}
  height: 5%;
  padding: 0px 12px;
  font-size: 12px;
  display: flex;
  position: relative;
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
