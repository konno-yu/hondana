import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { css } from '@emotion/react';
import { ReactElement } from 'react';
import { MdAdd } from 'react-icons/md';
import { Card } from './Card';
import { CardData } from '/pages/kanban';

interface ColumnProps {
  id: string;
  title: string;
  icon?: ReactElement;
  cards: CardData[];
  color: string;
}

export const Column = ({ id, title, cards, color }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  const getColumnColor = (id: string) => {
    switch (id) {
      case 'want':
        return '#eeeeee';
      case 'wait':
        return '#e0f2f1';
      case 'read':
        return '#fce4ec';
      case 'end':
        return '#f3e5f5';
      default:
        break;
    }
  };

  const columnColor = getColumnColor(id);

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div css={column} ref={setNodeRef}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #eeeeee',
            marginBottom: 8,
          }}
        >
          <div css={columnTitle(color)}>{title}</div>
          <MdAdd size={20} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cards.map((c) => (
            <Card key={c.id} id={c.id} title={c.title} imgPath={c.imagePath} color={columnColor} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

const column = css`
  height: 100%;
  width: calc(25% - 10px);
  padding: 8px;
  background: #ffffff;
  border: 2px solid #eeeeee;
  border-radius: 8px;
`;

const columnTitle = (color: string) => css`
  padding: 4px 4px;
  color: ${color};
  font-weight: 700;
`;
