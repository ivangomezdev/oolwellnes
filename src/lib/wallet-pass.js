const { PKPass } = require('passkit-generator');
const fs = require('fs');
const path = require('path');

async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    console.log('Iniciando generación del pase', { ticketId, email, eventName, eventDate });

    // Verificar la existencia de icon.png
    const iconPath = path.join(process.cwd(), 'public', 'images', 'icon.png');
    console.log('Buscando icon.png en:', iconPath);
    if (!fs.existsSync(iconPath)) {
      throw new Error(`Falta imagen icon.png en ${iconPath}`);
    }

    // Opcional: Verificar logo.png si es necesario
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
    console.log('Buscando logo.png en:', logoPath);
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Falta imagen logo.png en ${logoPath}`);
    }

    // Crear el pase
    const pass = new PKPass(
      {
        // Archivos estáticos (imágenes)
        icon: fs.readFileSync(iconPath),
        logo: fs.readFileSync(logoPath),
      },
      {
        // Certificados
        wwdr: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'wwdr.pem')),
        signerCert: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'pass_certificate.pem')),
        signerKey: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'pass_key.pem')),
        signerKeyPassphrase: process.env.PASS_KEY_PASSWORD || '',
      },
      {
        // Datos del pase
        formatVersion: 1,
        passTypeIdentifier: 'pass.com.oolwellness.event2025',
        teamIdentifier: '6UM33LQATP',
        organizationName: 'OOL Wellness',
        description: 'Entrada para OOL Wellness 2025',
        serialNumber: ticketId,
        backgroundColor: 'rgb(255, 255, 255)',
        foregroundColor: 'rgb(0, 0, 0)',
        labelColor: 'rgb(0, 0, 0)',
        eventTicket: {
          primaryFields: [
            {
              key: 'event',
              label: 'Evento',
              value: eventName,
            },
          ],
          auxiliaryFields: [
            {
              key: 'date',
              label: 'Fecha',
              value: eventDate,
              dateStyle: 'PKDateStyleMedium',
              timeStyle: 'PKDateStyleNone',
            },
          ],
        },
      }
    );

    console.log('Pase creado, generando...');

    // Generar el pase como buffer
    const buffer = await pass.getAsBuffer();
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