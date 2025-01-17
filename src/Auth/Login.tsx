import React, { useState } from "react";
import { api } from "../services/api";

type LoginProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token } = await api.login(email, password);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      window.location.href = "/";
    } catch (err) {
      if (err instanceof Error) {
        setError(`Échec de la connexion : ${err.message}`);
      } else {
        setError("Échec de la connexion.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
};

export default Login;
