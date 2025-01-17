import React, { useState, useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import Filter from './components/Filter/Filter';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const API_URL = "https://savagebackend.onrender.com";

const App: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodos = async () => {
      if (!isAuthenticated || !token) return;

      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          toast.error('Erreur lors du chargement des tâches.');
          handleLogout();
        }
      } catch (error) {
        toast.error('Erreur réseau : impossible de charger les tâches.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [isAuthenticated, token]);

  const addTodo = async (text: string) => {
    if (!isAuthenticated || !token) return;

    try {
      const newTodo = { text, completed: false };
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const createdTodo = await response.json();
        setTodos((prevTodos) => [...prevTodos, createdTodo]);
        toast.success('Tâche ajoutée avec succès !');
      } else {
        toast.error('Erreur lors de l’ajout de la tâche.');
      }
    } catch (error) {
      toast.error('Erreur réseau : impossible d’ajouter la tâche.');
    }
  };

  const toggleComplete = async (id: number) => {
    if (!isAuthenticated || !token) return;

    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });

      if (response.ok) {
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
        toast.success('Tâche mise à jour.');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de la tâche.');
    }
  };

  const deleteTodo = async (id: number) => {
    if (!isAuthenticated || !token) return;

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTodos(todos.filter((t) => t.id !== id));
        toast.success('Tâche supprimée.');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression de la tâche.');
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success('Inscription réussie ! Redirection vers la connexion.');
        window.location.href = '/login';
      } else {
        toast.error('Erreur lors de l\'inscription.');
      }
    } catch (error) {
      toast.error('Erreur réseau lors de l\'inscription.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    toast.info('Déconnecté.');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div>
                <h1>To-Do List</h1>
                <button onClick={handleLogout}>Déconnexion</button>
                <TodoForm addTodo={addTodo} />
                <Filter filter={filter} setFilter={setFilter} />
                {loading ? (
                  <div className="loader">Chargement des tâches…</div>
                ) : (
                  <TodoList todos={filteredTodos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
                )}
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? '/todos' : '/login'} />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
