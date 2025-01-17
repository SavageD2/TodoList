const API_URL = "https://savagebackend.onrender.com";

export const api = {
  getTodos: async (token: string) => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des tâches");
    }
    return response.json();
  },

  addTodo: async (text: string, token: string) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, completed: false }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de l’ajout de la tâche");
    }
    return response.json();
  },

  updateTodo: async (id: number, completed: boolean, token: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de la tâche");
    }
    return response.json();
  },

  deleteTodo: async (id: number, token: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la tâche");
    }
    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur de connexion : ${error}`);
    }

    return response.json();
  },
};
