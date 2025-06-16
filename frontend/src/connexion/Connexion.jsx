import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Connexion.css';

function Connexion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message); // "Identifiants incorrects"
        return;
      }

      alert(`Bienvenue, ${username} !`);
      localStorage.setItem('token', data.token);

    } catch (err) {
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <div className="container">
      <div className="formulaire">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <label>Username :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Se connecter</button>
        </form>
        <Link className="redirection" to="/inscription">
          Vous n'avez pas encore de compte ?<br />
          <strong>Cliquez ici pour vous inscrire</strong>
        </Link>
      </div>
    </div>
  );
}

export default Connexion;