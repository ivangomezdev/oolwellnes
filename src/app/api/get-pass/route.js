import { NextResponse } from 'next/server';
import { createWalletPass } from '@/lib/wallet-pass';
import { getPass } from '@/lib/firebase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    console.error('Error: ticketId es requerido');
    return NextResponse.json({ error: 'ticketId es requerido' }, { status: 400 });
  }

  try {
    const passBuffer = await getPass(ticketId);
    console.log(`Pase enviado, tamaño: ${(passBuffer.length / 1024).toFixed(2)} KB`);
    return new NextResponse(passBuffer, {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename=ticket-${ticketId}.pkpass`,
      },
    });
  } catch (err) {
    console.error('Error al recuperar el pase de Storage:', err);
    console.log('Intentando regenerar el pase...');

    try {
      const session = await stripe.checkout.sessions.retrieve(ticketId);
      const email = session.customer_details?.email;
      if (!email) {
        console.error('Error: Email no encontrado en la sesión de Stripe');
        throw new Error('Email no encontrado en la sesión');
      }

      console.log(`Regenerando pase para ticketId: ${ticketId}, email: ${email}`);
      const passBuffer = await createWalletPass(
        ticketId,
        email,
        'OOL Wellness 2025',
        '2025-05-20'
      );
      await savePass(ticketId, passBuffer);
      console.log(`Pase regenerado y guardado en Firebase Storage`);

      return new NextResponse(passBuffer, {
        headers: {
          'Content-Type': 'application/vnd.apple.pkpass',
          'Content-Disposition': `attachment; filename=ticket-${ticketId}.pkpass`,
        },
      });
    } catch (regenErr) {
      console.error('Error regenerando el pase:', regenErr);
      return NextResponse.json({ error: 'No se pudo generar el pase' }, { status: 500 });
    }
  }
}