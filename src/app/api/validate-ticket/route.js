import { adminDb } from '../../../lib/firebase';
import { z } from 'zod';
import { doc, getDoc, updateDoc } from 'firebase-admin/firestore';

const schema = z.object({
  ticketId: z.string(),
});

export async function POST(req) {
  try {
    // Verificar que adminDb esté inicializado
    if (!adminDb) {
      throw new Error('Firebase Admin no está inicializado. Verifica las variables de entorno.');
    }

    const { ticketId } = schema.parse(await req.json());

    // Referencia al documento del ticket
    const ticketRef = doc(adminDb, 'tickets', ticketId);
    const ticketSnap = await getDoc(ticketRef);

    if (!ticketSnap.exists()) {
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

    // Marca el ticket como usado
    await updateDoc(ticketRef, { used: true });

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
    return new Response(
      JSON.stringify({ error: 'Error validando entrada: ' + err.message }),
      { status: 500 }
    );
  }
}