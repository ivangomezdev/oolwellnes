// src/lib/wallet-pass.js (mínimo)
const { Pass } = require('@walletpass/pass-js');
const fs = require('fs');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    console.log('Iniciando generación del pase', { ticketId, email, eventName, eventDate });

    if (!fs.existsSync('./images/2525.png')) {
      throw new Error('Falta imagen 2525.png en images/');
    }

    const pass = new Pass({
      model: 'eventTicket',
      passTypeIdentifier: 'pass.com.oolwellness.event2025', // TU Pass Type ID
      teamIdentifier: '6UM33LQATP', // TU Team ID
      organizationName: 'OOL Wellness',
      description: 'Entrada para OOL Wellness 2025',
      serialNumber: ticketId,
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(0, 0, 0)',
      labelColor: 'rgb(0, 0, 0)',
    });

    console.log('Pase creado, añadiendo campo...');

    pass.primaryFields.push({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });

    console.log('Campo añadido, configurando certificados...');

    pass.setCertificates({
      certificate: fs.readFileSync('./src/certs/pass_certificate.pem'),
      key: fs.readFileSync('./src/certs/pass_key.pem'),
      wwdr: fs.readFileSync('./src/certs/wwdr.pem'),
      password: process.env.PASS_KEY_PASSWORD || '',
    });

    console.log('Certificados configurados, añadiendo imagen...');

    pass.addFile('icon.png', fs.readFileSync('./images/icon.png'));

    console.log('Imagen añadida, generando pase...');

    const buffer = await pass.generate();
    console.log('Pase generado exitosamente');
    return buffer;
  } catch (err) {
    console.error('Error detallado generando el pase:', {
      message: err.message,
      stack: err.stack,
      ticketId,
      email,
    });
    throw new Error('No se pudo generar el pase: ' + err.message);
  }
}

module.exports = { createWalletPass };