import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Inscription.css';

function Inscription() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message); // "Nom d’utilisateur déjà pris"
        return;
      }

      alert(data.message); // "Inscription réussie"

      navigate('/connexion');

    } catch (err) {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container">
      <div className="formulaire">
        <h1>Inscription</h1>
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

          <button type="submit">S'inscrire</button>
        </form>
        <Link className="redirection" to="/connexion">
          Vous avez déjà un compte ?<br />
          <strong>Cliquez ici pour vous connecter</strong>
        </Link>
      </div>
    </div>
  );
}

export default Inscription;