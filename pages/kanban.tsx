import { css } from '@emotion/react';
import { ReactElement, useState } from 'react';
import { Column } from '../components/Column';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCorners, DragOverEvent, DragEndEvent } from '@dnd-kit/core';

export type ColumnData = {
  id: string;
  title: string;
  icon?: ReactElement;
  cards: CardData[];
  color: string;
};

export type CardData = {
  id: string;
  title;
  imagePath: string;
};

// TODO SVから取ってくる
export const columnData: ColumnData[] = [
  {
    id: 'want',
    title: 'ほしい',
    cards: [
      {
        id: 'want-1',
        title: '事例で学ぶBtoBマーケティングの理論と実践',
        imagePath: 'https://m.media-amazon.com/images/P/B08JYX8MH6.01._SCLZZZZZZZ_SX500_.jpg',
      },
    ],
    color: '#bdbdbd',
  },
  {
    id: 'wait',
    title: '積読',
    cards: [
      {
        id: 'wait-1',
        title: 'イノベーションのジレンマ',
        imagePath: 'https://m.media-amazon.com/images/I/41hHEkh7RKL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
      },
    ],
    color: '#80cbc4',
  },
  {
    id: 'read',
    title: '読書中',
    cards: [
      { id: 'read-1', title: 'ジョブ理論', imagePath: 'https://m.media-amazon.com/images/I/51n6ZTZyHyL._SY291_BO1,204,203,200_QL40_ML2_.jpg' },
      { id: 'read-2', title: '解像度を上げる', imagePath: 'https://m.media-amazon.com/images/I/41XXrZyVAjL._SY346_.jpg' },
    ],
    color: '#f48fb1',
  },
  {
    id: 'end',
    title: '読破',
    cards: [{ id: 'end-1', title: '熊とワルツを', imagePath: 'https://m.media-amazon.com/images/I/519tXufgx6L._SY346_.jpg' }],
    color: '#ce93d8',
  },
];

export const Kanban = () => {
  const [column, setColumn] = useState(columnData);

  const findColumn = (uniq: string | null) => {
    if (!uniq) {
      return null;
    }
    if (column.some((c) => c.id === uniq)) {
      return column.find((c) => c.id === uniq) ?? null;
    }
    const id = String(uniq);
    const itemWithColId = column.flatMap((c) => {
      return c.cards.map((i) => ({ itemId: i.id, colId: c.id }));
    });
    const colId = itemWithColId.find((i) => i.itemId === id)?.colId;
    return column.find((c) => c.id === colId) ?? null;
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over, delta } = e;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumn((prev) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prev.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [...overItems.slice(0, newIndex()), activeItems[activeIndex], ...overItems.slice(newIndex(), overItems.length)];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumn((prev) => {
        return prev.map((col) => {
          if (col.id === activeColumn.id) {
            col.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return col;
          } else {
            return col;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div css={kanban}>
        {columnData.map((pd) => (
          <Column id={pd.id} title={pd.title} cards={pd.cards} color={pd.color} />
        ))}
      </div>
    </DndContext>
  );
};

const kanban = css`
  height: 90%;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
