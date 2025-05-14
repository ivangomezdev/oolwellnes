'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Componente interno que usa useSearchParams
function ValidateTicketContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketId) {
      setError('No se proporcionó un ID de ticket');
      setLoading(false);
      return;
    }

    async function fetchTicket() {
      try {
        const response = await fetch(`/api/validate-ticket?ticketId=${ticketId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error validando el ticket');
        }
        setTicket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTicket();
  }, [ticketId]);

  return (
    <div className="container">
      <h1>Validación de Entrada - OOL Wellness 2025</h1>
      {loading && <p>Cargando...</p>}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <Link href="/tickets">Volver a la página de boletos</Link>
        </div>
      )}
      {ticket && (
        <div className="ticket-details">
          <h2>Entrada Válida</h2>
          <p><strong>ID de Ticket:</strong> {ticket.ticketId}</p>
          <p><strong>Nombre:</strong> {ticket.customerName}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>Plan:</strong> {ticket.plan}</p>
          <p><strong>Evento:</strong> {ticket.eventName}</p>
          <p><strong>Estado:</strong> {ticket.status}</p>
          <p><strong>Usado:</strong> {ticket.used ? 'Sí' : 'No'}</p>
          <Link href="/tickets">Volver a la página de boletos</Link>
        </div>
      )}

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
        h2 {
          color: #9F9668;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .error {
          background-color: #ffe6e6;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .ticket-details {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }
        a {
          color: #9F9668;
          text-decoration: none;
          font-size: 1.1rem;
          margin-top: 1rem;
          display: inline-block;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

// Componente principal con Suspense
export default function ValidateTicketPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ValidateTicketContent />
    </Suspense>
  );
}

// Forzar renderizado dinámico para evitar prerenderizado estático
export const dynamic = 'force-dynamic';