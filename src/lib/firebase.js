import { initializeApp as initializeClientApp } from 'firebase/app';
import { getFirestore as getClientFirestore } from 'firebase/firestore';
import { initializeApp as initializeAdminApp, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const clientApp = initializeClientApp(firebaseConfig);
export const db = getClientFirestore(clientApp);

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

let adminApp;
try {
  adminApp = initializeAdminApp({
    credential: cert(serviceAccount),
  });
} catch (error) {
  console.error('Error inicializando Firebase Admin:', error);
}

export const adminDb = adminApp ? getAdminFirestore(adminApp) : null;