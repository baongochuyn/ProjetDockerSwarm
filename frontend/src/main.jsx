import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Connexion from './connexion/Connexion';
import Inscription from './inscription/Inscription';
import Bienvenue from './bienvenue/Bienvenue';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" replace />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/bienvenue" element={<Bienvenue />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
