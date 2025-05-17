// /api/generate-ticket
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveTicket } from '@/lib/firebase';
import { createWalletPass } from '@/lib/wallet-pass';
import { sendTicketEmail } from '@/lib/nodeMailer';
import QRCode from 'qrcode';

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, dob, nationality, plan } = await request.json();

    // Validar campos
    if (!firstName || !lastName || !email || !phone || !dob || !nationality || !plan) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }
    if (!['KIN - Regular Package', 'HA - VIP Package'].includes(plan)) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 });
    }

    const customerName = `${firstName} ${lastName}`.trim();
    const ticketId = `manual-${uuidv4()}`;
    const eventName = 'OOL Wellness 2025';
    const eventDate = '2025-08-01';

    // Guardar ticket en Firebase
    await saveTicket(ticketId, email, eventName, plan, customerName, phone, dob, nationality);

    // Generar pase
    const passBuffer = await createWalletPass(ticketId, email, eventName, eventDate, customerName);

    // Generar QR
    const qrData = `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/validate?ticketId=${ticketId}`;
    const qrImage = await QRCode.toDataURL(qrData);

    // Enviar correo
    await sendTicketEmail(email, ticketId, eventName, eventDate, passBuffer, qrImage);

    return NextResponse.json({ message: 'Entrada generada y enviada exitosamente' }, { status: 200 });
  } catch (error) {
    console.error('Error generando ticket:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}