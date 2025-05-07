// src/app/tickets/page.jsx
'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import styles from './styles/tickets.module.css';

// Validar la clave pública de Stripe
console.log('NEXT_PUBLIC_STRIPE_PUBLIC_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  console.error('Error: NEXT_PUBLIC_STRIPE_PUBLIC_KEY no está definida');
  throw new Error('La clave pública de Stripe no está configurada. Verifica tu archivo .env.local');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const ticketOptions = [
  {
    id: 'kin-regular',
    name: 'KIN - Regular Package',
    price: 35000,
    priceId: 'price_1RLvqlRWJlybi2c9hUQf8Aaa',
    features: [
      '3 days / 2 nights en Hotel Xcaret Arte',
      'Early Check-in (desde 9AM) & Late Check-out (6PM)',
      // ... otras características
    ],
  },
  {
    id: 'ha-vip',
    name: 'HA - VIP Package',
    price: 51000,
    priceId: 'price_1RLvrQRWJlybi2c92NvXjLYX',
    features: [
      '3 days / 2 nights en Hotel Xcaret Arte (Ocean Front Suite)',
      'Early Check-in (desde 9AM) & Late Check-out (6PM)',
      // ... otras características
    ],
  },
];

const CheckoutForm = ({ ticket }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: ticket.priceId,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error creando la sesión de pago');
      }

      const { sessionId } = data;

      // Redirigir a Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      setError(err.message || 'Error iniciando el pago');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkout__form}>
      <h3 className={styles.checkout__title}>Completa tu compra</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        className={styles.checkout__input}
        required
      />
      {error && <p className={styles.checkout__error}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={styles.checkout__button}
      >
        {loading ? 'Procesando...' : `Pagar $${ticket.price} MXN`}
      </button>
    </form>
  );
};

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className={styles.tickets}>
      <h1 className={styles.tickets__title}>
        Compra tu entrada para {process.env.NEXT_PUBLIC_EVENT_NAME || 'Evento'}
      </h1>
      <div className={styles.tickets__grid}>
        {ticketOptions.map((ticket) => (
          <div key={ticket.id} className={styles.ticket}>
            <h2 className={styles.ticket__name}>{ticket.name}</h2>
            <p className={styles.ticket__price}>${ticket.price} MXN</p>
            <ul className={styles.ticket__features}>
              {ticket.features.map((feature, idx) => (
                <li key={idx} className={styles.ticket__feature}>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedTicket(ticket)}
              className={styles.ticket__button}
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className={styles.checkout}>
          <CheckoutForm ticket={selectedTicket} />
        </div>
      )}
    </div>
  );
}