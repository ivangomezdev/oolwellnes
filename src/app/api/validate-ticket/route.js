import { validateTicket } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json({ error: 'ticketId es requerido' }, { status: 400 });
  }

  // Remover prefijo 'ticket-' si está presente
  ticketId = ticketId.replace('ticket-', '');

  try {
    const result = await validateTicket(ticketId);
    return NextResponse.json(result, { status: result.valid ? 200 : 400 });
  } catch (error) {
    console.error('Error validando ticket:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}