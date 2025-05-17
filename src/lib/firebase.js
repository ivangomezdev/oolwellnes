// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

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

// Guardar ticket
export async function saveTicket(ticketId, email, eventName, plan, customerName, phone, dob, nationality) {
  try {
    await setDoc(doc(db, 'tickets', ticketId), {
      ticketId,
      email,
      eventName,
      plan,
      customerName,
      phone,
      dob,
      nationality,
      status: 'valid',
      used: false,
      createdAt: new Date().toISOString(),
    });
    console.log(`Ticket ${ticketId} guardado en Firestore`);
  } catch (error) {
    console.error('Error guardando ticket:', error);
    throw error;
  }
}

// Validar ticket
export async function validateTicket(ticketId) {
  try {
    const ticketRef = doc(db, 'tickets', ticketId);
    const ticketSnap = await getDoc(ticketRef);
    
    if (!ticketSnap.exists()) {
      return { valid: false, message: 'Ticket no encontrado' };
    }

    const ticket = ticketSnap.data();
    if (ticket.used) {
      return { valid: false, message: 'Ticket ya usado' };
    }

    // Marcar como usado
    await updateDoc(ticketRef, { used: true });
    return { valid: true, ticket };
  } catch (error) {
    console.error('Error validando ticket:', error);
    throw error;
  }
}