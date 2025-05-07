import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

// Configura el transporte de Nodemailer (ajusta según tu proveedor de correo)
const transporter = nodemailer.createTransport({
  service: 'gmail', // O usa SendGrid, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Agrega esto a .env.local
    pass: process.env.EMAIL_PASS, // Agrega esto a .env.local
  },
});

export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;

  try {
    // Verifica la firma del webhook
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Agrega esto a .env.local
    );
  } catch (err) {
    console.error('Error verificando webhook:', err.message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Maneja el evento checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const priceId = session.metadata.ticketType; // Usamos el priceId de metadata
    const sessionId = session.id;

    try {
      // Genera un ID único para la entrada (puedes usar sessionId o generar otro)
      const ticketId = sessionId;

      // Genera el contenido del QR (puede ser un enlace o el ticketId)
      const qrContent = `https://oolwellnes.vercel.app/verify-ticket/${ticketId}`;
      const qrCode = await QRCode.toDataURL(qrContent); // Genera el QR como Data URL

      // Almacena la entrada en Firestore
      await setDoc(doc(db, 'tickets', ticketId), {
        ticketId,
        email,
        priceId,
        qrCode, // Almacena el QR como Data URL
        createdAt: new Date(),
        status: 'active',
      });

      // Envía el correo con el QR
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Tu entrada para el evento',
        html: `
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu entrada para el evento está lista. Escanea el código QR a continuación para acceder:</p>
          <img src="${qrCode}" alt="Código QR de la entrada" />
          <p>Detalles de la entrada:</p>
          <ul>
            <li>ID: ${ticketId}</li>
            <li>Evento: ${process.env.NEXT_PUBLIC_EVENT_NAME}</li>
            <li>Tipo: ${priceId === 'price_1RLvqlRWJlybi2c9hUQf8Aaa' ? 'KIN - Regular' : 'HA - VIP'}</li>
          </ul>
        `,
      });

      console.log(`Entrada generada y enviada para ${email}`);
    } catch (error) {
      console.error('Error procesando webhook:', error);
      return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}