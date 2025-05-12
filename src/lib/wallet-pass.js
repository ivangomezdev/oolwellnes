// src/lib/wallet-pass.js
const Passkit = require('passkit');
const fs = require('fs');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  const pass = new Passkit.Pass({
    model: 'eventTicket',
    passTypeIdentifier: 'pass.com.oolwellness.event2025', // Tu Pass Type ID
    teamIdentifier: '6UM33LQATP', // Reemplaza con tu Team ID (en el Apple Developer Portal)
    organizationName: 'OOL Wellness',
    description: 'Entrada para OOL Wellness 2025',
    serialNumber: ticketId,
    backgroundColor: 'rgb(255, 255, 255)',
    foregroundColor: 'rgb(0, 0, 0)',
    labelColor: 'rgb(0, 0, 0)',
  });

  // Añadir campos al pase
  pass.primaryFields.add({
    key: 'event',
    label: 'Evento',
    value: eventName,
  });

  pass.secondaryFields.add({
    key: 'date',
    label: 'Fecha',
    value: eventDate,
  });

  // Añadir código QR (mismo que usas en el correo)
  pass.barcodes.add({
    message: `https://oolwellness.vercel.app/verify-ticket/${ticketId}`,
    format: 'PKBarcodeFormatQR',
    messageEncoding: 'iso-8859-1',
  });

  // Configurar certificados
  pass.keys({
    certificate: './src/certs/pass_certificate.pem', // Ruta a tu certificado
    key: './src/certs/pass_key.pem', // Ruta a tu clave privada
    wwdr: './src/certs/wwdr.pem', // Ruta al certificado WWDR
    password: '', // Deja en blanco si no usaste contraseña para la clave privada
  });

  // Añadir imágenes requeridas (crea estas imágenes según los requisitos de Apple)
  pass.addBuffer('icon.png', fs.readFileSync('./src/images/2525.png'));
  pass.addBuffer('logo.png', fs.readFileSync('./src/images/591.png'));

  // Generar el pase
  const buffer = await pass.generate();
  return buffer;
}

module.exports = { createWalletPass };