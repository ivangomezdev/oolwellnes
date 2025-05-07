import { adminDb } from '../../../lib/firebase';
import { doc, setDoc } from 'firebase-admin/firestore'; // Importaciones explícitas
import Stripe from 'stripe';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // Usa STARTTLS para puerto 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET no está definido');
    }
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Error verificando webhook:', err.message);
    return new Response(JSON.stringify({ error: 'Webhook Error: ' + err.message }), {
      status: 400,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const priceId = session.metadata.ticketType;
    const sessionId = session.id;

    if (session.payment_status === 'paid' && session.mode === 'payment') {
      try {
        if (!adminDb) {
          throw new Error('adminDb no está inicializado');
        }

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
          throw new Error('NEXT_PUBLIC_BASE_URL no está definido');
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
          throw new Error('Credenciales de correo no están definidas');
        }

        console.log(`Procesando ticket para email: ${email}, sessionId: ${sessionId}`);

        const ticketId = sessionId;
        const qrContent = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-ticket/${ticketId}`;
        console.log(`Generando QR para: ${qrContent}`);
        const qrCode = await QRCode.toDataURL(qrContent);

        console.log(`Guardando ticket en Firestore: ${ticketId}`);
        const ticketRef = doc(adminDb, 'tickets', ticketId);
        await setDoc(ticketRef, {
          ticketId,
          email,
          priceId,
          qrCode,
          createdAt: new Date(),
          status: 'active',
          used: false,
        });

        console.log(`Enviando correo a: ${email}`);
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Tu entrada para Xcaret Wellness Ret',
          html: `
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu entrada para el evento está lista. Escanea el código QR a continuación para acceder:</p>
            <img src="${qrCode}" alt="Código QR de la entrada" />
            <p>Detalles de la entrada:</p>
            <ul>
              <li>ID: ${ticketId}</li>
              <li>Evento: ${process.env.NEXT_PUBLIC_EVENT_NAME || 'Xcaret Wellness Ret'}</li>
              <li>Tipo: ${priceId === 'price_1RLvqlRWJlybi2c9hUQf8Aaa' ? 'KIN - Regular' : 'HA - VIP'}</li>
            </ul>
          `,
        });

        console.log(`Entrada generada y enviada para ${email}`);
      } catch (error) {
        console.error('Error procesando webhook:', error.message, error.stack);
        return new Response(JSON.stringify({ error: 'Error interno: ' + error.message }), {
          status: 500,
        });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}