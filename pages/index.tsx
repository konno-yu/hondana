import { css } from '@emotion/react';
import { Header } from '/components/Header';
import { InputTodoForm } from '/components/InputTodoForm';
import { TodoList } from '/components/TodoList';

const Home = () => {
  return (
    <div css={rootStyle}>
      <Header />
      <InputTodoForm />
      <TodoList />
    </div>
  );
};

const rootStyle = css`
  height: 100vh;
  /* background: gray; */
`;

export default Home;
