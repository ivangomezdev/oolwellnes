// api/checkout/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializa Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function POST(request) {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { priceId, email, name, phone, dob, nationality } = await request.json();

    if (!priceId || !email || !name || !phone || !dob || !nationality) {
      return NextResponse.json(
        { error: 'Faltan priceId, email, name, phone, dob o nationality' },
        { status: 400 }
      );
    }

    // Crea una sesión de checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}tickets`,
      metadata: {
        ticketType: priceId,
        customerName: name,
        phone,
        dob,
        nationality,
      },
    });

    // Retorna el ID de la sesión
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creando sesión de Stripe:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}