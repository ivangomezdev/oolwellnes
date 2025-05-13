
// src/lib/wallet-pass.js
const Passkit = require('passkit');
const fs = require('fs');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    const pass = new Passkit.Pass({
      model: 'eventTicket',
      passTypeIdentifier: 'pass.com.oolwellness.event2025', // Reemplaza con TU Pass Type ID
      teamIdentifier: '6UM33LQATP', // Reemplaza con TU Team ID
      organizationName: 'OOL Wellness',
      description: 'Entrada para OOL Wellness 2025',
      serialNumber: ticketId,
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(0, 0, 0)',
      labelColor: 'rgb(0, 0, 0)',
    });

    // Añadir un campo simple
    pass.primaryFields.add({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });

    // Configurar certificados
    pass.keys({
      certificate: './src/certs/pass_certificate.pem',
      key: './src/certs/pass_key.pem',
      wwdr: './src/certs/wwdr.pem',
      password: '',
    });

    // Añadir imagen requerida
    pass.addBuffer('icon.png', fs.readFileSync('./src/images/icon.png'));

    // Generar el pase
    const buffer = await pass.generate();
    return buffer;
  } catch (err) {
    console.error('Error generando el pase de Apple Wallet:', err);
    throw err;
  }
}

module.exports = { createWalletPass };