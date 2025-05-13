import { createWalletPass } from '@/lib/wallet-pass';
import Stripe from 'stripe';
import EmailJS from '@emailjs/nodejs';
import { NextResponse } from 'next/server';

// Inicializar Stripe y EmailJS
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
EmailJS.init({
  userId: process.env.EMAILJS_USER_ID,
  serviceId: process.env.EMAILJS_SERVICE_ID,
});

export async function POST(req) {
  try {
    const sig = req.headers.get('stripe-signature');
    const body = await req.text();

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
      console.log(`Tamaño del pase: ${(passBuffer.length / 1024).toFixed(2)} KB`);

      // Configurar los parámetros de la plantilla
      const templateParams = {
        to_email: email,
        recipient_name: 'Cliente', // Placeholder para el nombre
        event_name: eventName, // Placeholder para el nombre del evento
        message: 'Adjuntamos tu entrada para el evento. Por favor, añádela a tu Apple Wallet.', // Placeholder para el mensaje
        attachment: {
          filename: 'ticket.pkpass',
          content: passBuffer.toString('base64'),
          contentType: 'application/vnd.apple.pkpass',
        },
      };

      // Enviar correo con EmailJS
      const response = await EmailJS.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        templateParams
      );
      console.log('Correo enviado con el pase:', response);
    }

    return NextResponse.json({ message: 'Webhook recibido' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error procesando el ticket:', err);
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 });
  }
}