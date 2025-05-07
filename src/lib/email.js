import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendTicketEmail({ to, ticketId, ticketType, qrCodeUrl }) {
  try {
    await transporter.sendMail({
      from: `"${process.env.NEXT_PUBLIC_EVENT_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Tu entrada para ${process.env.NEXT_PUBLIC_EVENT_NAME}`,
      html: `
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu entrada para <strong>${ticketType}</strong> ha sido confirmada.</p>
        <p><strong>ID de entrada:</strong> ${ticketId}</p>
        <p>Escanea el siguiente código QR en el evento:</p>
        <img src="${qrCodeUrl}" alt="Código QR" />
        <p>¡Nos vemos en el evento!</p>
      `,
    });
  } catch (err) {
    console.error('Error enviando correo:', err);
    throw new Error('No se pudo enviar el correo');
  }
}