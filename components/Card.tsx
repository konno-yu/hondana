import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/react';
import { BsFillPersonFill, BsFillBuildingFill } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useState } from 'react';

interface CardProps {
  id: string;
  title: string;
  author?: string; // todo 動作確認後にoptional外す
  publisher?: string; // todo 動作確認後にoptional外す
  imgPath: string;
  color: string;
}

export const Card = ({ id, title, author = 'やまだたろう', publisher = '怪しい社', imgPath, color }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const [show, setShow] = useState(false);

  return (
    <div
      id={id}
      css={card(color)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && <ContextMenu />}
      <div css={cardBody}>
        <p css={[bookTitle, omitOverflow]}>{title}</p>
        <div css={bookInfo}>
          <BsFillPersonFill size={14} />
          <p css={omitOverflow}>{author}</p>
        </div>
        <div css={bookInfo}>
          <BsFillBuildingFill size={14} />
          <p css={omitOverflow}>{publisher}</p>
        </div>
      </div>
      <div
        style={{
          width: '25%',
          height: '100%',
        }}
      >
        <img width="100%" height="100%" style={{ objectFit: 'contain' }} src={imgPath} />
      </div>
    </div>
  );
};

const ContextMenu = () => {
  return (
    <div css={contextMenu}>
      <AiFillEdit size={18} color="#f5f5f5" />
      <AiFillDelete size={18} color="#f5f5f5" />
    </div>
  );
};

const contextMenu = css`
  height: 30px;
  width: 70px;
  background: rgba(115, 115, 115, 0.6);
  position: absolute;
  left: auto;
  right: 4px;
  border-radius: 4px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const card = (color: string) => css`
  background: ${color};
  padding: 8px 4px 8px 8px;
  height: 90px;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const cardBody = css`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const bookTitle = css`
  font-weight: bold;
  font-size: 11pt;
`;

const bookInfo = css`
  width: 100%;
  font-weight: normal;
  font-size: 9pt;
  padding-left: 4px;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 4px;
`;

const omitOverflow = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
