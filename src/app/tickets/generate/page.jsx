'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function GenerateTicketPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    plan: 'KIN - Regular Package',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/generate-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error generando la entrada');
      }

      setSuccess('¡Entrada generada y enviada exitosamente!');
      setFormData({ firstName: '', lastName: '', email: '', plan: 'KIN - Regular Package' });
    } catch (err) {
      setError(err.message || 'Error generando la entrada');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Generar Entrada - OOL Retreats 2025</h1>
      <p>Complete el formulario para generar y enviar una entrada al usuario.</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ingrese el apellido"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese el email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan</label>
          <select id="plan" name="plan" value={formData.plan} onChange={handleChange} required>
            <option value="KIN - Regular Package">KIN - Regular Package</option>
            <option value="HA - VIP Package">HA - VIP Package</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generando...' : 'Generar y Enviar Entrada'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <Link href="/tickets">Volver a la página de boletos</Link>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #F2E2C6;
          color: #000000;
          font-family: 'Arial', sans-serif;
          text-align: center;
          padding: 20px;
        }
        h1 {
          color: #9F9668;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .form {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        label {
          font-size: 1.1rem;
          color: #9F9668;
          margin-bottom: 0.5rem;
        }
        input,
        select {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #9F9668;
          border-radius: 4px;
          outline: none;
        }
        input:focus,
        select:focus {
          border-color: #8A8257;
        }
        button {
          background-color: #9F9668;
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.3s, transform 0.2s;
        }
        button:hover {
          background-color: #8A8257;
          transform: scale(1.05);
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error {
          color: #d32f2f;
          background-color: #ffe6e6;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .success {
          color: #388e3c;
          background-color: #e8f5e9;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        a {
          color: #9F9668;
          text-decoration: none;
          font-size: 1.1rem;
          margin-top: 1rem;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}