// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AgendamentoForm from './AgendamentoForm';
import PasswordProtected from './PasswordProtected';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>GABRIEL BARBERSHOP</h1>
          <nav>
            <Link to="/" className="nav-button">Agendamento</Link>
            <Link to="/admin" className="nav-button">Painel Administrativo</Link>
          </nav>
          <Routes>
            <Route path="/" element={<AgendamentoForm />} />
            <Route path="/admin" element={<PasswordProtected />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
