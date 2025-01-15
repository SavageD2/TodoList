import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import Filter from './components/Filter/Filter';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    try {
      const newTodo = { text, completed: false };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const createdTodo = await response.json();
        setTodos([...todos, createdTodo]);
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout de la tâche :', error);
    }
  };

  const toggleComplete = async (id: number) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });

      if (response.ok) {
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
