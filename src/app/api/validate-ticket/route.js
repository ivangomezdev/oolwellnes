import { NextResponse } from 'next/server';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyClkbyTOCU0iA3iC1d1DLtqtAFcI2pAnsA',
  authDomain: 'oolwell.firebaseapp.com',
  projectId: 'oolwell',
  storageBucket: 'oolwell.firebasestorage.app',
  messagingSenderId: '749442381409',
  appId: '1:749442381409:web:e4323c727666cb1aa35c20',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json({ error: 'ticketId es requerido' }, { status: 400 });
  }

  try {
    const ticketRef = doc(db, 'tickets', ticketId);
    const ticketSnap = await getDoc(ticketRef);

    if (!ticketSnap.exists()) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 });
    }

    const ticket = ticketSnap.data();
    if (ticket.used) {
      return NextResponse.json({ error: 'Ticket ya usado' }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      ticketId: ticket.ticketId,
      email: ticket.email,
      eventName: ticket.eventName,
      plan: ticket.plan,
      customerName: ticket.customerName,
      status: ticket.status,
      used: ticket.used,
    });
  } catch (error) {
    console.error('Error validando ticket:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}