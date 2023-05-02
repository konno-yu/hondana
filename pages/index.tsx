import { InputTodoForm } from "/components/InputTodoForm";
import { TodoList } from "/components/TodoList";


const Home = () => {
  return (
    <>
      <InputTodoForm />
      <TodoList/>
    </>
  )
}

export default Home;