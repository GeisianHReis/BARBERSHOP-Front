import React, { useState } from 'react';
import Agendamentos from './Agendamentos';

function PasswordProtected() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPassword = '12345';
    if (password === storedPassword) {
      setIsAuthenticated(true);
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  if (isAuthenticated) {
    return <Agendamentos />;
  }

  return (
    <div>
      <h2>Painel Administrativo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Senha:
          <input type="password" value={password} onChange={handleChange} required />
        </label>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PasswordProtected;
