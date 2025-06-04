import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { NextResponse } from 'next/server';
import { createWalletPass } from '@/lib/wallet-pass';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    console.error('Error: ticketId es requerido');
    return NextResponse.json({ error: 'ticketId es requerido' }, { status: 400 });
  }

  const filePath = path.join(os.tmpdir(), `ticket-${ticketId}.pkpass`);
  console.log(`Intentando leer pase desde: ${filePath}`);

  try {
    const fileBuffer = await fs.readFile(filePath);
    console.log(`Pase encontrado, tamaño: ${(fileBuffer.length / 1024).toFixed(2)} KB`);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename=ticket-${ticketId}.pkpass`,
      },
    });
  } catch (err) {
    console.error('Error al leer el pase:', err);
    console.log('Intentando regenerar el pase...');

    try {
      const session = await stripe.checkout.sessions.retrieve(ticketId);
      const email = session.customer_details?.email;
      const customerName = session.metadata?.customerName || 'Asistente'; // Obtener el nombre desde metadata
      const plan = session.metadata?.plan || 'KIN - Regular Package'; // 

      if (!email) {
        console.error('Error: Email no encontrado en la sesión de Stripe');
        throw new Error('Email no encontrado en la sesión');
      }

      console.log(`Regenerando pase para ticketId: ${ticketId}, email: ${email}`);
      const passBuffer = await createWalletPass(
        ticketId,
        email,
        'OOL Wellness 2025',
        '2025-08-01',
        customerName, // 
        plan
      );
      await fs.writeFile(filePath, passBuffer);
      console.log(`Pase regenerado y guardado en: ${filePath}`);

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