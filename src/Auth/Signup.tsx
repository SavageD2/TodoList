import React, { useState } from "react";

type SignupProps = {
  onSignup: (email: string, password: string) => void;
};

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSignup(email, password);  // Appel de la fonction onSignup passée en props
    } catch (err) {
        if (err instanceof Error) {
            setError(`Échec de l'inscription : ${err.message}`);
          } else {
            setError("Échec de l'inscription.");
          }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
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
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Signup;
