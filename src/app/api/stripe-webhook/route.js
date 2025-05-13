import { createWalletPass } from '@/lib/wallet-pass';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Inicializar Stripe y Resend
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const sig = req.headers.get('stripe-signature');
    const body = await req.text(); // Usar req.text() en App Router

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Error verificando webhook:', err);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_details.email;
      const ticketId = session.id;
      const eventName = 'OOL Wellness 2025';
      const eventDate = '2025-05-20';

      console.log(`✅ Procesando ticket para ${email} - Session ID: ${ticketId}`);

      // Generar el pase
      const passBuffer = await createWalletPass(ticketId, email, eventName, eventDate);

      // Enviar correo con el pase
      await resend.emails.send({
        from: 'tickets@oolwellness.com',
        to: email,
        subject: 'Tu entrada para OOL Wellness 2025',
        text: 'Adjuntamos tu entrada para el evento. Por favor, añádela a tu Apple Wallet.',
        attachments: [
          {
            filename: 'ticket.pkpass',
            content: passBuffer.toString('base64'),
            contentType: 'application/vnd.apple.pkpass',
          },
        ],
      });

      console.log('Correo enviado con el pase');
    }

    return NextResponse.json({ message: 'Webhook recibido' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error procesando el ticket:', err);
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 });
  }
}