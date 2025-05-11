//lib/qr.js
import QRCode from 'qrcode';

export async function generateQRCode(ticketId) {
  try {
    const url = `oolwellnes.vercel.app/validate?ticketId=${ticketId}`;
    return await QRCode.toDataURL(url);
  } catch (err) {
    console.error('Error generando QR:', err);
    throw new Error('No se pudo generar el código QR');
  }
}