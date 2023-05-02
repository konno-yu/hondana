import { useAddTodo } from "/hooks/useAddTodo";

export const TodoList = () => {
    const { todo } = useAddTodo();
    
    return (
        <>
            <div>todoリスト</div>
            {todo.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </>
    )
}