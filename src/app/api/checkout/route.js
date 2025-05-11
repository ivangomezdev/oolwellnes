// api/checkout/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializa Stripe con la clave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20', // Usa la versión más reciente de la API
});

export async function POST(request) {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { priceId, email } = await request.json();

    if (!priceId || !email) {
      return NextResponse.json(
        { error: 'Faltan priceId o email' },
        { status: 400 }
      );
    }


    // Crea una sesión de checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Métodos de pago aceptados
      line_items: [
        {
          price: priceId, // ID del precio desde el frontend
          quantity: 1, // Cantidad fija (1 boleto)
        },
      ],
      customer_email: email, // Email del cliente
      mode: 'payment', // Modo de pago único (no suscripción)
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}tickets`,
      metadata: {
        ticketType: priceId, // Puedes usar esto para rastrear el tipo de boleto
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