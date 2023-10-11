import { css } from '@emotion/react';
import { BsBookmarksFill, BsBookmarkFill, BsFillPlusSquareFill } from 'react-icons/bs';
import { TbSectionSign } from 'react-icons/tb';
import DrawerElm from './DrawerElm';
import { useEffect, useRef, useState } from 'react';
import { Input } from './Input';
import { AiFillDelete } from 'react-icons/ai';
import { useSections } from './useSections';

export type Section = Array<{ index: number; title: string }>;
const SectionDrawer = ({ bookId, selected, onChange }: { bookId: number; selected: number; onChange: (selected: number) => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { sections, fetchSections, postSections, putSections } = useSections();

  const [editableSections, setEditableSections] = useState<Section>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleChangeSection = (sectionTitle: string, index: number) => {
    setEditableSections((prev) => prev.map((p) => (p.index === index ? { ...p, title: sectionTitle } : p)));
  };

  const openDlg = () => {
    const target = sections.find((section) => section.book_id === bookId);
    setEditableSections(target?.section ?? []);
    setIsOpen(true);
  };

  const closeDlg = () => {
    setEditableSections([]);
    setIsOpen(false);
  };

  const closeDlgWithSave = () => {
    if (sections.filter((s) => s.book_id === bookId).length > 0) {
      putSections(bookId, editableSections).then((res) => {
        if (res.status === 204) {
          fetchSections();
          setEditableSections([]);
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        } else {
          throw new Error('予期せぬエラーです');
        }
      });
    } else {
      postSections(bookId, editableSections).then((res) => {
        if (res.status >= 200 && res.status <= 300) {
          fetchSections();
          setEditableSections([]);
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        } else {
          throw new Error('予期せぬエラーです');
        }
      });
    }
    setIsOpen(false);
  };

  const handleDeleteSection = (index: number) => {
    const afterDelete = editableSections.filter((section) => section.index !== index);
    setEditableSections(
      afterDelete.map((d, index) => {
        return { ...d, index: index + 1 };
      })
    );
  };

  const handleAddSection = () => {
    setEditableSections((prev) => [...prev, { index: prev.length + 1, title: '' }]);
  };

  const handleClick = (id: number) => {
    onChange(id);
  };

  return (
    <div css={drawer}>
      <div css={header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TbSectionSign color="#333333" />
          <span style={{ color: '#333333', fontWeight: 900 }}>Sections</span>
        </div>
        <BsFillPlusSquareFill color="#333333" onClick={openDlg} style={{ cursor: 'pointer' }} />
      </div>
      <div style={{ height: '95%' }}>
        <DrawerElm
          selected={selected === -2}
          onRowClick={() => onChange(-2)}
          category="sections"
          id={-2}
          icon={<BsBookmarksFill height="100%" color="#333333" />}
          sentence="すべてのセクション"
        />
        {sections
          ?.find((sec) => sec.book_id === bookId)
          ?.section?.map((section) => (
            <DrawerElm
              selected={section.index === selected}
              onRowClick={handleClick}
              category="sections"
              id={section.index}
              icon={<BsBookmarkFill height="100%" color="#333333" />}
              sentence={section.title}
              showContextMenu={false}
            />
          ))}
      </div>
      {isOpen && (
        <dialog css={dialog} ref={dialogRef}>
          <div style={{ textAlign: 'center', height: '10%', fontSize: '22pt', fontWeight: 700 }}>Add Sections</div>
          <div
            style={{
              height: '60%',
              fontSize: '16pt',
              fontWeight: 700,
              padding: 16,
              display: 'flex',
              justifyContent: 'start',
              flexDirection: 'column',
              overflow: 'scroll',
              gap: 16,
            }}
          >
            {editableSections.map((section) => (
              <div style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
                <span style={{ width: '10%', fontSize: 18 }}>{section.index}.</span>
                <Input width={400} value={section.title} onChange={(event) => handleChangeSection(event.target.value, section.index)} />
                <AiFillDelete
                  size={18}
                  color="#333"
                  onClick={() => {
                    handleDeleteSection(section.index);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
          <div style={{ height: '7%', width: '100%' }}>
            <button
              style={{
                cursor: 'pointer',
                height: '100%',
                width: '100%',
                background: '#546e7a',
                border: '1px solid #546e7a',
                color: '#FFF',
                borderRadius: 50,
                fontWeight: 700,
              }}
              onClick={handleAddSection}
            >
              Add
            </button>
          </div>
          <div
            style={{
              height: '15%',
              fontSize: '22pt',
              fontWeight: 700,
              display: 'flex',
              gap: 24,
              alignItems: 'end',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={closeDlgWithSave}
              style={{
                background: '#333333',
                color: '#FFF',
                border: 'none',
                borderRadius: 4,
                height: '60%',
                width: '25%',
                fontSize: 18,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Save
            </button>
            <button
              style={{
                background: '#FFF',
                border: 'none',
                borderRadius: 4,
                height: '60%',
                width: '25%',
                fontSize: 18,
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={closeDlg}
            >
              Cancel
            </button>
          </div>
        </dialog>
      )}
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

const dialog = css`
  width: 40%;
  height: 90%;
  border: none;
  border-radius: 16px;
  padding: 24px 32px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  &::backdrop {
    background: #666666;
    opacity: 0.5;
  }
`;

export default SectionDrawer;

/**
 * bookId:n,
 * sections: {
 *   ordinary: 1,
 *   title: "aaa"
 * }
 *
 */
