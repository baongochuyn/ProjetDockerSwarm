import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Bienvenue.css';

function Bienvenue() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username || 'Utilisateur';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Pas de token => redirection vers la page connexion
      navigate('/connexion');
    }
  }, [navigate]);

  return (
    <div className="container bienvenue-container">
      <div className="formulaire-bienvenue bienvenue-box">
        <h1>Bienvenue, {username} !</h1>
        <p>Vous êtes connecté avec succès.</p>
        <Link
          className="redirection-bienvenue"
          to="/connexion"
          onClick={() => localStorage.removeItem('token')}
        >
          Déconnexion
        </Link>
      </div>
    </div>
  );
}

export default Bienvenue;
