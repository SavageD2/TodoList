import React from 'react';

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
  toggleComplete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, toggleComplete }) => {
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={() => toggleComplete(id)} />
      <span>{text}</span>
    </div>
  );
};

export default TodoItem;
