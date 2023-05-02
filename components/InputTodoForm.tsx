import { useAddTodo } from '../hooks/useAddTodo';
import { useState } from 'react';
import { css } from '@emotion/react';
import supabase from '/utils/supabase';

export const InputTodoForm = () => {
  const [title, setTitle] = useState('');
  const { fetchTodos } = useAddTodo();

  const pushTodo = async (e: any) => {
    await supabase.from('todos').insert({ title });
    fetchTodos();
    setTitle('');
  };

  return (
    <form onSubmit={pushTodo}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        css={css`
          background-color: red;
        `}
      >
        追加
      </button>
    </form>
  );
};
