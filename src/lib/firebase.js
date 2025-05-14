import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyClkbyTOCU0iA3iC1d1DLtqtAFcI2pAnsA',
  authDomain: 'oolwell.firebaseapp.com',
  projectId: 'oolwell',
  storageBucket: 'oolwell.firebasestorage.app',
  messagingSenderId: '749442381409',
  appId: '1:749442381409:web:e4323c727666cb1aa35c20',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export async function saveTicket(ticketId, email, eventName, priceId, name) {
  try {
    await setDoc(doc(db, 'tickets', ticketId), {
      ticketId,
      email,
      eventName,
      priceId,
      name,
      status: 'valid',
      used: false,
      createdAt: new Date().toISOString(),
    });
    console.log(`Ticket ${ticketId} guardado en Firestore con priceId: ${priceId}, name: ${name}`);
  } catch (error) {
    console.error('Error guardando ticket:', error);
    throw error;
  }
}

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

    await updateDoc(ticketRef, { used: true });
    return { valid: true, ticket: { ticketId, email: ticket.email, name: ticket.name } };
  } catch (error) {
    console.error('Error validando ticket:', error);
    throw error;
  }
}

export async function savePass(ticketId, passBuffer) {
  try {
    const passRef = ref(storage, `passes/ticket-${ticketId}.pkpass`);
    await uploadBytes(passRef, passBuffer);
    console.log(`Pase guardado en Firebase Storage: ticket-${ticketId}.pkpass`);
  } catch (error) {
    console.error('Error guardando pase en Storage:', error);
    throw error;
  }
}

export async function getPass(ticketId) {
  try {
    const passRef = ref(storage, `passes/ticket-${ticketId}.pkpass`);
    const passBuffer = await getBytes(passRef);
    console.log(`Pase recuperado de Firebase Storage: ticket-${ticketId}.pkpass`);
    return Buffer.from(passBuffer);
  } catch (error) {
    console.error('Error recuperando pase de Storage:', error);
    throw error;
  }
}