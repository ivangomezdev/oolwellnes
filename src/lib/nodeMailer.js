import nodemailer from 'nodemailer';

export const sendTicketEmail = async (email, ticketId, eventName, eventDate, passBuffer) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
      pool: true, // Conexión pooling para serverless
      maxConnections: 1, // Limita conexiones simultáneas
    });

    // Verificación opcional
    await transporter.verify();
    console.log('Conexión SMTP verificada');

    const info = await transporter.sendMail({
      from: `"OOL Wellness" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tu entrada para OOL Wellness 2025',
      text: `Hola Cliente,\n\nAdjuntamos tu entrada para el evento ${eventName} (ID: ${ticketId}). Por favor, añádela a tu Apple Wallet.\n\n¡Gracias por tu compra!`,
      html: `
        <p>Hola Cliente,</p>
        <p>Adjuntamos tu entrada para el evento <strong>${eventName}</strong> (ID: ${ticketId}).</p>
        <p>Por favor, añádela a tu Apple Wallet.</p>
        <p>¡Gracias por tu compra!</p>
      `,
      attachments: [
        {
          filename: `ticket-${ticketId}.pkpass`,
          content: passBuffer,
          contentType: 'application/vnd.apple.pkpass',
        },
      ],
    });

    console.log('Email enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
};