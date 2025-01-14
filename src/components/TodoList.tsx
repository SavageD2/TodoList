import React from 'react';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: { id: number; text: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
