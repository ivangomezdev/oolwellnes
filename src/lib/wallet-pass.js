// src/lib/wallet-pass.js
const { Pass } = require('@walletpass/pass-js');
const fs = require('fs');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    const pass = new Pass({
      model: 'eventTicket',
      passTypeIdentifier: 'pass.com.oolwellness.event2025', // Reemplaza con TU Pass Type ID
      teamIdentifier: 'TU_TEAM_ID', // Reemplaza con TU Team ID
      organizationName: 'OOL Wellness',
      description: 'Entrada para OOL Wellness 2025',
      serialNumber: ticketId,
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(0, 0, 0)',
      labelColor: 'rgb(0, 0, 0)',
    });

    // Añadir campos al pase
    pass.addStructure({
      primaryFields: [
        {
          key: 'event',
          label: 'Evento',
          value: eventName,
        },
      ],
      secondaryFields: [
        {
          key: 'date',
          label: 'Fecha',
          value: eventDate,
        },
      ],
    });

    // Añadir código QR
    pass.addBarcode({
      message: `https://oolwellness.vercel.app/verify-ticket/${ticketId}`,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1',
    });

    // Configurar certificados
    pass.setCertificates({
      certificate: fs.readFileSync('./src/certs/pass_certificate.pem'),
      key: fs.readFileSync('./src/certs/pass_key.pem'),
      wwdr: fs.readFileSync('./src/certs/wwdr.pem'),
      password: '', // Ajusta si usaste una contraseña
    });

    // Añadir imágenes
    pass.addFile('icon.png', fs.readFileSync('../images/2525.png'));
    pass.addFile('logo.png', fs.readFileSync('../images/591.png'));

    // Generar el pase
    const buffer = await pass.generate();
    return buffer;
  } catch (err) {
    console.error('Error generando el pase de Apple Wallet:', err);
    throw err;
  }
}

module.exports = { createWalletPass };