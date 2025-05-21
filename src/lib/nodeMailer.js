import nodemailer from 'nodemailer';

export const sendTicketEmail = async (email, ticketId, eventName, eventDate, passBuffer, qrImage) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
      pool: true,
      maxConnections: 1,
    });

    await transporter.verify();
    console.log('Conexión SMTP verificada');

    const info = await transporter.sendMail({
      from: `"OOL Wellness" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Tu entrada para OOL Wellness 2025',
      text: `Hola \n\nAdjuntamos tu entrada para el evento ${eventName} (ID: ${ticketId}). Si usas Apple Wallet, añádela desde el adjunto. Si usas Android, usa el código QR en la imagen.\n\n¡Gracias por tu compra!`,
      html: `
        <p>Hola</p>
        <p>Adjuntamos tu entrada para el evento <strong>${eventName}</strong> (ID: ${ticketId}).</p>
        <p>Si usas Apple Wallet, añádela desde el adjunto.</p>
        <p>Si usas Android, usa este código QR para validar tu entrada:</p>
        <img src="${qrImage}" alt="Código QR" style="max-width: 200px;" />
        <p>¿Sabias que puedes obtener una noche adicional?</p>
        <p>Si compraste el paquete KIN - REGULAR https://buy.stripe.com/aFaeVd5qP5FEfO2fOM1kA00 </p>
         <p>Si compraste el paquete HA - VIP https://buy.stripe.com/eVq28rf1p1po7hwfOM1kA01 </p>
        <p>¡Gracias por tu compra!</p>
      `,
      attachments: [
        {
          filename: `ticket-${ticketId}.pkpass`,
          content: passBuffer,
          contentType: 'application/vnd.apple.pkpass',
        },
        {
          filename: `ticket-${ticketId}.png`,
          content: qrImage.split(',')[1],
          encoding: 'base64',
          contentType: 'image/png',
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