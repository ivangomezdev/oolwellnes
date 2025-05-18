// generate/page.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import "./generate.css"
export default function GenerateTicketPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '', // Nuevo campo
    dob: '', // Nuevo campo
    nationality: '', // Nuevo campo
    plan: 'KIN - Regular Package',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const FIXED_PASSWORD = 'ool2025admin';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError(null);
    if (password === FIXED_PASSWORD) {
      setIsUnlocked(true);
    } else {
      setPasswordError('Contraseña incorrecta');
      setPassword('');
    }
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
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        nationality: '',
        plan: 'KIN - Regular Package',
      });
    } catch (err) {
      setError(err.message || 'Error generando la entrada');
    } finally {
      setLoading(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="container">
        <h1 className='container__h1'>Acceso Restringido - OOL Retreats 2025</h1>
        <p className='container__p'>Ingrese la contraseña para acceder al generador de entradas.</p>
        <form onSubmit={handlePasswordSubmit} className="form">
          <div className="form-group">
            <label className='container__label' htmlFor="password">Contraseña</label>
            <input
            
              type="password"
              id="password"
              value={password}
              className='container__input'
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese la contraseña"
              required
            />
          </div>
          <button className='container__button' type="submit">Desbloquear</button>
        </form>
        {passwordError && <p className="error">{passwordError}</p>}
        {/* Estilos existentes */}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className='container__h1'>Generar Entrada - OOL Retreats 2025</h1>
      <p className='container__p'>Complete el formulario para generar y enviar una entrada al usuario.</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className='container__label' htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
             className='container__input'
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
            required
          />
        </div>
        <div className="form-group">
          <label className='container__label' htmlFor="lastName">Apellido</label>
          <input
           className='container__input'
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
          <label className='container__label' htmlFor="email">Email</label>
          <input
           className='container__input'
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
          <label className='container__label' htmlFor="phone">Teléfono</label>
          <input
           className='container__input'
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ingrese el número de teléfono"
            required
          />
        </div>
        <div className="form-group">
          <label className='container__label' htmlFor="dob">Fecha de Nacimiento</label>
          <input
           className='container__input'
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className='container__label' htmlFor="nationality">Nacionalidad</label>
          <input
           className='container__input'
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Ingrese la nacionalidad"
            required
          />
        </div>
        <div className="form-group">
          <label className='container__label' htmlFor="plan">Plan</label>
          <select className="container__select" id="plan" name="plan" value={formData.plan} onChange={handleChange} required>
            <option value="KIN - Regular Package">KIN - Regular Package</option>
            <option value="HA - VIP Package">HA - VIP Package</option>
          </select>
        </div>
        <button className='container__button' type="submit" disabled={loading}>
          {loading ? 'Generando...' : 'Generar y Enviar Entrada'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <Link href="/tickets">Volver a la página de boletos</Link>

      {/* Estilos existentes */}
      <style jsx>{`
        
      `}</style>
    </div>
  );
}