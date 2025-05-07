// src/app/tickets/success/page.jsx
export default function SuccessPage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>¡Compra Exitosa!</h1>
      <p>Recibirás un correo con tu entrada y código QR pronto.</p>
      <a href="/tickets">Volver</a>
    </div>
  );
}