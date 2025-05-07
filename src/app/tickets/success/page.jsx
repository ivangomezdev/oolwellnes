'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Componente que usa useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div>
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por tu compra. Tu ID de sesión es: <strong>{sessionId}</strong></p>
      <p>Recibirás un correo con tu entrada y código QR pronto.</p>
      <a href="/tickets">Volver a la página de boletos</a>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}