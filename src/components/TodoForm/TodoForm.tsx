import React, { useState } from 'react';
import './TodoForm.css';

type TodoFormProps = {
  addTodo: (text: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter une tâche"
        className="todo-input"
      />
      <button type="submit" className="todo-submit">Ajouter</button>
    </form>
  );
};

export default TodoForm;