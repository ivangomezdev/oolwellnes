const { Pass, PassStyle } = require('@walletpass/pass-js');
const fs = require('fs');
const path = require('path');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    console.log('Iniciando generación del pase', { ticketId, email, eventName, eventDate });

    const iconPath = path.join(process.cwd(), 'public', 'images', 'icon.png');
    console.log('Buscando icon.png en:', iconPath);
    if (!fs.existsSync(iconPath)) {
      throw new Error(`Falta imagen icon.png en ${iconPath}`);
    }

    const pass = new Pass({
      passTypeIdentifier: 'pass.com.oolwellness.event2025',
      teamIdentifier: '6UM33LQATP',
      organizationName: 'OOL Wellness',
      description: 'Entrada para OOL Wellness 2025',
      serialNumber: ticketId,
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(0, 0, 0)',
      labelColor: 'rgb(0, 0, 0)',
    });

    // Configurar explícitamente el estilo del pase
    pass.passStyle = PassStyle.eventTicket;

    console.log('Pase creado, añadiendo campo...');

    pass.primaryFields.push({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });

    console.log('Campo añadido, configurando certificados...');

    pass.setCertificates({
      certificate: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'pass_certificate.pem')),
      key: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'pass_key.pem')),
      wwdr: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'wwdr.pem')),
      password: process.env.PASS_KEY_PASSWORD || '',
    });

    console.log('Certificados configurados, añadiendo imagen...');

    pass.addFile('icon.png', fs.readFileSync(iconPath));

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