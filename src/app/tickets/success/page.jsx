'use client';
import { useSearchParams } from 'next/navigation';


export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div >
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por tu compra. Tu ID de sesión es: <strong>{sessionId}</strong></p>
      <p>Recibirás un correo con tu entrada y código QR pronto.</p>
      <a href="/tickets" >
        Volver a la página de boletos
      </a>
    </div>
  );
}