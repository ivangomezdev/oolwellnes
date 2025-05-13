const { Pass } = require('@walletpass/pass-js');
const fs = require('fs');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    console.log('Iniciando generación del pase de Apple Wallet', { ticketId, email, eventName, eventDate });

    // Verificar existencia de imágenes
    if (!fs.existsSync('../images/icon.png') || !fs.existsSync('../images/logo.png')) {
      throw new Error('Faltan imágenes icon.png o logo.png en src/images/');
    }

    const pass = new Pass({
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

    console.log('Pase creado, añadiendo campos...');

    // Añadir campos al pase
    pass.primaryFields.push({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });

    pass.secondaryFields.push({
      key: 'date',
      label: 'Fecha',
      value: eventDate,
    });

    console.log('Campos añadidos, añadiendo código QR...');

    // Añadir código QR
    pass.barcodes.push({
      message: `https://oolwellness.vercel.app/verify-ticket/${ticketId}`,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1',
    });

    console.log('Código QR añadido, configurando certificados...');

    // Configurar certificados
    pass.setCertificates({
      certificate: fs.readFileSync('./src/certs/pass_certificate.pem'),
      key: fs.readFileSync('./src/certs/pass_key.pem'),
      wwdr: fs.readFileSync('./src/certs/wwdr.pem'),
      password: process.env.PASS_KEY_PASSWORD || '', // Usa variable de entorno si hay contraseña
    });

    console.log('Certificados configurados, añadiendo imágenes...');

    // Añadir imágenes
    pass.addFile('icon.png', fs.readFileSync('../images/icon.png'));
    pass.addFile('logo.png', fs.readFileSync('../images/logo.png'));

    console.log('Imágenes añadidas, generando pase...');

    // Generar el pase
    const buffer = await pass.generate();
    console.log('Pase generado exitosamente');
    return buffer;
  } catch (err) {
    console.error('Error detallado generando el pase de Apple Wallet:', {
      message: err.message,
      stack: err.stack,
      ticketId,
      email,
    });
    throw new Error('No se pudo generar el pase de Apple Wallet: ' + err.message);
  }
}

module.exports = { createWalletPass };