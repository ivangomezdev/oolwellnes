import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function POST(request) {
  try {
    const { priceId, email, name, phone, dob, nationality, paymentOption } = await request.json();

    if (!priceId || !email || !name || !phone || !dob || !nationality || !paymentOption) {
      return NextResponse.json(
        { error: 'Faltan priceId, email, name, phone, dob, nationality o paymentOption' },
        { status: 400 }
      );
    }

    // Obtener el precio base desde el priceId
    const price = await stripe.prices.retrieve(priceId);
    let amount = price.unit_amount; // Precio en centavos

    // Si es en cuotas, aplicar interés (15%) y usar solo la primera cuota
    if (paymentOption === 'installments') {
      amount = Math.round((amount * 1.15) / 3); // 15% de interés, dividido en 3 cuotas
    }

    // Crear un Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      payment_method_types: ['card'],
      receipt_email: email,
      metadata: {
        ticketType: priceId,
        customerName: name,
        phone,
        dob,
        nationality,
        paymentOption,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creando Payment Intent:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}