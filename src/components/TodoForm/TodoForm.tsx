import React, { useState } from 'react';
import './TodoForm.css';

type TodoFormProps = {
  addTodo: (text: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setIsSubmitting(true);
      await addTodo(text);
      setText('');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter une tâche"
        disabled={isSubmitting}
        className="todo-input"
      />
      <button type="submit" className="todo-submit">Ajouter</button>
      {isSubmitting ? 'Ajout...' : 'Ajouter une tâche'}
    </form>
  );
};

export default TodoForm;