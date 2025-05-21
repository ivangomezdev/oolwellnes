'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import "./success.css"

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [qrImage, setQrImage] = useState('');

  useEffect(() => {
    if (sessionId) {
      QRCode.toDataURL(`${process.env.NEXT_PUBLIC_BASE_URL}/tickets/validate?ticketId=${sessionId}`, (err, url) => {
        if (!err) setQrImage(url);
      });
    }
  }, [sessionId]);

  const handleDownloadPass = () => {
    if (sessionId) {
      window.location.href = `/api/get-pass?ticketId=${sessionId}`;
    }
  };

  return (
    <div className="container container__success">
      <div className='container__success_card'>
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por tu compra para OOL Wellness 2025.</p>
      <p>Recibirás un correo con tu entrada y código QR pronto.</p>
      <div className="download-section">
        <button onClick={handleDownloadPass} disabled={!sessionId}>
          Descargar Entrada para Apple Wallet
        </button>
        {qrImage && (
          <div className="qr-section">
            <p>Para Android, usa este código QR:</p>
            <img src={qrImage} alt="Código QR" />
          </div>
        )}
      </div>
      </div>
      <Link className='container_container_link' href="/tickets">Volver a la página de boletos</Link>

      <style jsx>{`
     
       
       
        .download-section {
          margin: 1.5rem 0;
        }
        button {
          background-color: #9F9668;
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          margin: 0.5rem;
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
        .qr-section {
          margin-top: 1rem;
        }
        .qr-section img {
          max-width: 200px;
          border: 2px solid #9F9668;
          border-radius: 8px;
        }
       
        a:hover {
          text-decoration: underline;
        }
      `}</style>
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