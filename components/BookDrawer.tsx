import { css } from '@emotion/react';
import { BsBookFill, BsCircleFill, BsCircleHalf, BsFillPlusSquareFill } from 'react-icons/bs';
import DrawerElm from './DrawerElm';
import { useRef, useState } from 'react';
import { Input } from './Input';
import { useBooks } from './useBooks';

const BookDrawer = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rate, setRate] = useState(0);
  const { books, postBooks, fetchBooks, putBooks, deleteBooks } = useBooks();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const onChangeRate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO
    setRate(event.target.value as unknown as number);
  };

  const openDlg = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const resetInput = () => {
    setId(null);
    setTitle('');
    setAuthor('');
    setRate(0);
  };

  const closeDlg = () => {
    if (dialogRef.current) {
      resetInput();
      dialogRef.current.close();
    }
  };

  const closeDlgWithSave = () => {
    if (id) {
      putBooks(id, { title, author, rate }).then((res) => {
        if (res.status === 204) {
          fetchBooks();
          resetInput();
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        } else {
          throw new Error('予期せぬエラーです');
        }
      });
    } else {
      postBooks({ title, author, rate }).then((res) => {
        if (res.status >= 200 && res.status <= 300) {
          fetchBooks();
          resetInput();
          if (dialogRef.current) {
            dialogRef.current.close();
          }
        } else {
          throw new Error('予期せぬエラーです');
        }
      });
    }
  };

  const handleEdit = (id) => {
    const editTarget = books.find((book) => book.id === id);
    setId(id);
    setTitle(editTarget.title);
    setAuthor(editTarget.author);
    setRate(editTarget.rate);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleDelete = (id, category) => {
    deleteBooks(id, category).then((res) => {
      if (res.status === 204) {
        fetchBooks();
      } else {
        throw new Error('予期せぬエラーです');
      }
    });
  };

  return (
    <div css={drawer}>
      <div css={header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <BsBookFill color="#333333" />
          <span style={{ color: '#333333', fontWeight: 900 }}>Books</span>
        </div>
        <BsFillPlusSquareFill color="#333333" onClick={openDlg} style={{ cursor: 'pointer' }} />
      </div>
      <div style={{ height: '95%' }}>
        <DrawerElm category="books" id={-1} icon={<BsCircleFill height="100%" color="#333333" />} sentence="すべての本" />
        {books.map((book) => (
          <DrawerElm
            category="books"
            id={book.id}
            icon={<BsCircleHalf height="100%" color="#333333" />}
            sentence={book.title}
            onEditClick={handleEdit}
            onDeleteClick={handleDelete}
          />
        ))}
      </div>
      <dialog css={dialog} ref={dialogRef}>
        <div style={{ textAlign: 'center', height: '10%', fontSize: '22pt', fontWeight: 700 }}>Add Books</div>

        <div
          style={{
            height: '70%',
            fontSize: '16pt',
            fontWeight: 700,
            padding: 16,
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
            <span style={{ width: '20%' }}>Title</span>
            <Input width={350} value={title} onChange={onChangeTitle} />
          </div>
          <div style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
            <span style={{ width: '20%' }}>Author</span>
            <Input width={350} value={author} onChange={onChangeAuthor} />
          </div>
          <div style={{ display: 'flex', gap: 16, flexDirection: 'row' }}>
            <span style={{ width: '20%' }}>Useful</span>
            <select value={rate} onChange={onChangeRate} style={{ border: 'none', width: 200, fontWeight: 600, color: '#333' }}>
              <option value="0">☆☆☆ - 評価前</option>
              <option value="1">★☆☆ - もう読まない</option>
              <option value="2">★★☆ - 時間があれば読む</option>
              <option value="3">★★★ - また読みたい</option>
            </select>
          </div>
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
              height: '80%',
              width: '20%',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            style={{ background: '#FFF', border: 'none', borderRadius: 4, height: '80%', width: '20%', fontSize: 18, fontWeight: 700 }}
            onClick={closeDlg}
          >
            Cancel
          </button>
        </div>
      </dialog>
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

const dialog = css`
  width: 40%;
  height: 60%;
  border: none;
  border-radius: 16px;
  padding: 24px 32px;
  position: absolute;
  margin: auto;
  &::backdrop {
    background: #666666;
    opacity: 0.5;
  }
`;

export default BookDrawer;
