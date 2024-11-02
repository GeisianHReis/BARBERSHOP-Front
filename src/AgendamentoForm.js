import React, { useState } from 'react';
import './AgendamentoForm.css';
import axios from 'axios';
import InputMask from 'react-input-mask';

function AgendamentoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    tipoDeProcedimento: '',
    data: '',
    horario: '',
    telefone: '',
  });

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataFormatada = new Date(`${formData.data}T${formData.horario}`).toISOString();

    try {
      const response = await axios.post('https://barbershop-8o3l.onrender.com/procedimentos', {
        ...formData,
        data: dataFormatada,
      });

      if (response.status === 201) {
        setMensagemSucesso('Agendamento realizado com sucesso!');
        setFormData({
          nome: '',
          tipoDeProcedimento: '',
          data: '',
          horario: '',
          telefone: '',
        });
      }
    } catch (error) {
      console.error('Erro ao enviar o agendamento:', error);
      alert('Erro ao realizar o agendamento. Tente novamente.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMensagemSucesso('');
      }, 3000);
    }
  };

  const renderHorarios = () => {
    const horarios = [];
    for (let i = 10; i <= 21; i++) {
      const hora = i < 10 ? `0${i}:00` : `${i}:00`;
      horarios.push(
        <option key={hora} value={hora}>
          {hora}
        </option>
      );
    }
    return horarios;
  };

  return (
    <div className="form-container">
      <h2>Agende seu Procedimento</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

        <label htmlFor="tipoDeProcedimento">Tipo de Procedimento</label>
        <select id="tipoDeProcedimento" name="tipoDeProcedimento" value={formData.tipoDeProcedimento} onChange={handleChange} required>
          <option value="">Selecione um procedimento</option>
          <option value="corte de cabelo">Corte de Cabelo</option>
          <option value="barba">Barba</option>
          <option value="barba e corte">Barba e Corte</option>
        </select>

        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          name="data"
          min={new Date().toISOString().split('T')[0]}
          value={formData.data}
          onChange={handleChange}
          required
        />

        <label htmlFor="horario">Horário</label>
        <select id="horario" name="horario" value={formData.horario} onChange={handleChange} required>
          <option value="">Selecione um horário</option>
          {renderHorarios()}
        </select>

        <label htmlFor="telefone">Telefone</label>
        <InputMask
          mask="(99) 9 9999 9999"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
          placeholder="(11) 9 5432 0988"
        >
          {(inputProps) => <input {...inputProps} type="tel" />}
        </InputMask>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Agendar'}
        </button>
      </form>
      {mensagemSucesso && <div className="mensagem-sucesso">{mensagemSucesso}</div>}
    </div>
  );
}

export default AgendamentoForm;
