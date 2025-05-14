import { createWalletPass } from '@/lib/wallet-pass';
import { sendTicketEmail } from '../../../lib/nodeMailer';
import { saveTicket } from '@/lib/firebase';
import Stripe from 'stripe';
import QRCode from 'qrcode';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      const eventDate = '2025-08-01';
      const customerName = session.metadata.customerName || 'Asistente'; // Nombre desde metadata
      const ticketType = session.metadata.ticketType; // priceId desde metadata

      // Determinar el plan basado en el priceId
      const plan = ticketType === 'price_1RLvqlRWJlybi2c9hUQf8Aaa' ? 'KIN - Regular Package' : 'HA - VIP Package';

      console.log(`✅ Procesando ticket para ${email} - Session ID: ${ticketId}`);

      // Guardar ticket en Firebase
      await saveTicket(ticketId, email, eventName, plan, customerName);

      // Generar pase
      const passBuffer = await createWalletPass(ticketId, email, eventName, eventDate, customerName);
      console.log(`Tamaño del pase: ${(passBuffer.length / 1024).toFixed(2)} KB`);

      // Generar QR con URL de validación
      const qrData = `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/validate?ticketId=${ticketId}`;
      const qrImage = await QRCode.toDataURL(qrData);

      // Enviar correo
      const info = await sendTicketEmail(email, ticketId, eventName, eventDate, passBuffer, qrImage);
      console.log('Correo enviado con el pase:', info);
    }

    return NextResponse.json({ message: 'Webhook recibido' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error procesando el ticket:', err);
    return NextResponse.json({ error: `Error: ${err.message}` }, { status: 500 });
  }
}