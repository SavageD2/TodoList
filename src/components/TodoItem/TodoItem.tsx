import React from 'react';
import './TodoItem.css';

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, toggleComplete, deleteTodo }) => {
  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
  <span
    onClick={() => toggleComplete(id)}
    className={`todo-text ${completed ? 'completed-text' : ''}`}
  >
    {text}
    {completed && <i className="fa fa-check completed-icon"></i>} {/* Afficher l'icône si complétée */}
  </span>
  <button onClick={() => deleteTodo(id)} className="delete-button">Supprimer</button>
</div>
  );
};

export default TodoItem;
