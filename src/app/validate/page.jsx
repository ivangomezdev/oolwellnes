// src/app/validate/page.jsx
'use client';
import { useState } from 'react';

export default function ValidatePage() {
  const [ticketId, setTicketId] = useState('');
  const [result, setResult] = useState(null);

  const handleValidate = async () => {
    try {
      const response = await fetch('/api/validate-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Error validando entrada' });
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Validar Entrada</h1>
      <input
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="ID de entrada"
      />
      <button onClick={handleValidate}>Validar</button>
      {result && (
        <div>
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <div>
              <p>Entrada válida para: {result.ticketType}</p>
              <p>Email: {result.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}