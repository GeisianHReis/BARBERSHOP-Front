import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Agendamentos.css';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get('https://barbershop-8o3l.onrender.com/procedimentos');
        setAgendamentos(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching agendamentos: {error.message}</p>;

  return (
    <div className="agendamentos-container">
      <h1>GABRIEL BARBERSHOP</h1>
      <table className="agendamentos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo de Procedimento</th>
            <th>Data</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(agendamento => (
            <tr key={agendamento.id}>
              <td>{agendamento.nome}</td>
              <td>{agendamento.tipoDeProcedimento}</td>
              <td>{new Date(agendamento.data).toLocaleString()}</td>
              <td>{agendamento.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Agendamentos;