import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail({ to, ticketId, ticketType, qrCodeUrl }: {
  to: string;
  ticketId: string;
  ticketType: string;
  qrCodeUrl: string;
}) {
  try {
    const { error } = await resend.emails.send({
      from: 'Entradas <noreply@tu-dominio.com>',
      to,
      subject: `Tu entrada para ${ticketType}`,
      html: `
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu entrada para <strong>${ticketType}</strong> ha sido confirmada.</p>
        <p><strong>ID de entrada:</strong> ${ticketId}</p>
        <p>Escanea este código QR:</p>
        <img src="${qrCodeUrl}" alt="QR Code" style="width:200px;height:200px;" />
      `,
    });

    if (error) throw new Error(error.message);
    console.log(`📨 Email enviado a ${to}`);
  } catch (err) {
    console.error('❌ Error enviando correo con Resend:', err);
    throw err;
  }
}