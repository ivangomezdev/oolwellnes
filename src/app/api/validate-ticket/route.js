// api/validate-ticket/route.js
import { adminDb } from '../../../lib/firebase';
import { z } from 'zod';

const schema = z.object({
  ticketId: z.string(),
});

export async function POST(req) {
  try {
    // Verificar que adminDb esté inicializado
    if (!adminDb) {
      throw new Error('Firebase Admin no está inicializado. Verifica la configuración de serviceAccountKey.json');
    }

    const { ticketId } = schema.parse(await req.json());

    const ticketRef = adminDb.collection('tickets').doc(ticketId);
    const ticketSnap = await ticketRef.get();

    if (!ticketSnap.exists) {
      return new Response(JSON.stringify({ error: 'Entrada no encontrada' }), {
        status: 404,
      });
    }

    const ticketData = ticketSnap.data();

    if (ticketData.used) {
      return new Response(JSON.stringify({ error: 'Entrada ya utilizada' }), {
        status: 400,
      });
    }

    await ticketRef.update({ used: true });

    return new Response(
      JSON.stringify({
        message: 'Entrada válida',
        ticketType: ticketData.ticketType,
        email: ticketData.email,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error validando entrada:', err.message, err.stack);
    return new Response(JSON.stringify({ error: 'Error validando entrada: ' + err.message }), {
      status: 500,
    });
  }
}