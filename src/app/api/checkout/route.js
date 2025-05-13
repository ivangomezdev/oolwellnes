const Passbook = require('passbook');
const fs = require('fs');
const path = require('path');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    console.log('Iniciando generación del pase', { ticketId, email, eventName, eventDate });

    const iconPath = path.join(process.cwd(), 'public', 'images', 'icon.png');
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');

    if (!fs.existsSync(iconPath)) {
      throw new Error(`Falta imagen icon.png en ${iconPath}`);
    }

    if (!fs.existsSync(logoPath)) {
      throw new Error(`Falta imagen logo.png en ${logoPath}`);
    }

    if (!process.env.PASS_KEY_PASSWORD) {
      throw new Error('PASS_KEY_PASSWORD no está configurada en las variables de entorno');
    }

    console.log('Archivos en src/certs:', fs.readdirSync(path.join(process.cwd(), 'src', 'certs')));
    console.log('PASS_KEY_PASSWORD configurada:', !!process.env.PASS_KEY_PASSWORD);

    const template = Passbook('eventTicket', {
      passTypeIdentifier: 'pass.com.oolwellness.event2025',
      teamIdentifier: '6UM33LQATP',
      organizationName: 'OOL Wellness',
      description: 'Entrada para OOL Wellness 2025',
      serialNumber: ticketId,
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(0, 0, 0)',
      labelColor: 'rgb(0, 0, 0)',
    });

    // Configurar certificados
    template.keys(path.join(process.cwd(), 'src', 'certs'), process.env.PASS_KEY_PASSWORD);

    // Añadir imágenes al template
    template.images({
      'icon.png': fs.readFileSync(iconPath),
      'logo.png': fs.readFileSync(logoPath),
    });

    // Agregar campos al pase
    template.primaryFields.add({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });

    template.auxiliaryFields.add({
      key: 'date',
      label: 'Fecha',
      value: eventDate,
      dateStyle: 'medium',
      timeStyle: 'none',
    });

    console.log('Pase creado, generando...');

    // Generar pase como buffer
    const buffer = await new Promise((resolve, reject) => {
      template.createPass((err, pass) => {
        if (err) return reject(err);

        pass.generate((err, buffer) => {
          if (err) return reject(err);
          resolve(buffer);
        });
      });
    });

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
