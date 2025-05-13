import { adminDb } from '../../../lib/firebase';
import Stripe from 'stripe';
import QRCode from 'qrcode';
import { Resend } from 'resend';
import { createWalletPass } from '../../../lib/wallet-pass';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Falta STRIPE_WEBHOOK_SECRET');
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
          throw new Error('Firebase Admin no está inicializado');
        }

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
          throw new Error('Falta NEXT_PUBLIC_BASE_URL');
        }

        console.log(`✅ Procesando ticket para ${email} - Session ID: ${sessionId}`);

        const ticketId = sessionId;
        const qrContent = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-ticket/${ticketId}`;
        const qrCode = await QRCode.toDataURL(qrContent);

        // Generar el pase de Apple Wallet
        let passBuffer;
        try {
          passBuffer = await createWalletPass(
            ticketId,
            email,
            'OOL Wellness 2025',
            '2025-05-20'
          );
        } catch (passError) {
          console.error('Error generando el pase de Apple Wallet:', passError);
          throw new Error('No se pudo generar el pase de Apple Wallet: ' + passError.message);
        }

        // Guardar los datos en Firestore
        await adminDb.collection('tickets').doc(ticketId).set({
          ticketId,
          email,
          priceId,
          qrCode,
          createdAt: new Date().toISOString(),
        });

        // Enviar correo con Resend
        const emailSent = await resend.emails.send({
          from: 'ivansangomez6@gmail.com',
          to: email,
          subject: 'Tu entrada con QR y pase para Apple Wallet',
          html: `
            <h1>Gracias por tu compra</h1>
            <p>Escanea este código QR al ingresar:</p>
            <img src="${qrCode}" alt="QR Code" style="width:200px;height:200px;" />
            <p>Adjunto encontrarás tu pase para Apple Wallet. Haz clic para añadirlo.</p>
          `,
          attachments: [
            {
              filename: 'event-pass.pkpass',
              content: passBuffer.toString('base64'),
              contentType: 'application/vnd.apple.pkpass',
            },
          ],
        });

        console.log('📨 Correo enviado con pase:', emailSent);

        return new Response(JSON.stringify({ message: 'Webhook procesado con éxito' }), {
          status: 200,
        });
      } catch (err) {
        console.error('❌ Error procesando el ticket:', err);
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
        });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}