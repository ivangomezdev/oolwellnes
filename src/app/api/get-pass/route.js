import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticketId');
  
  if (!ticketId) {
    return NextResponse.json({ error: 'ticketId es requerido' }, { status: 400 });
  }

  const filePath = path.join('/tmp', `ticket-${ticketId}.pkpass`);

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename=ticket-${ticketId}.pkpass`,
      },
    });
  } catch (err) {
    console.error('Error al leer el pase:', err);
    return NextResponse.json({ error: 'Pase no encontrado' }, { status: 404 });
  }
}