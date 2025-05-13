import { PKPass } from 'passkit-generator';
import fs from 'fs';
import path from 'path';

export async function createWalletPass(ticketId, email, eventName, eventDate) {
  try {
    console.log('Iniciando generación del pase', { ticketId, email, eventName, eventDate });

    // Verificar la existencia de icon.png
    const iconPath = path.join(process.cwd(), 'public', 'images', 'icon.png');
    console.log('Buscando icon.png en:', iconPath);
    if (!fs.existsSync(iconPath)) {
      throw new Error(`Falta imagen icon.png en ${iconPath}`);
    }

    // Verificar la existencia de logo.png
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
    console.log('Buscando logo.png en:', logoPath);
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Falta imagen logo.png en ${logoPath}`);
    }

    // Verificar certificados
    const certsPath = path.join(process.cwd(), 'src', 'certs');
    const certFiles = fs.readdirSync(certsPath);
    console.log('Archivos en src/certs:', certFiles);

    const requiredCerts = ['pass_certificate.pem', 'pass_key.pem', 'wwdr.pem'];
    for (const cert of requiredCerts) {
      if (!certFiles.includes(cert)) {
        throw new Error(`Falta certificado ${cert} en ${certsPath}`);
      }
    }

    // Verificar PASS_KEY_PASSWORD
    if (!process.env.PASS_KEY_PASSWORD) {
      console.log('Advertencia: PASS_KEY_PASSWORD no está configurada. Se asumirá que el certificado no requiere contraseña.');
    }

    // Crear el pase
    const pass = new PKPass({
      wwdr: fs.readFileSync(path.join(certsPath, 'wwdr.pem')),
      signerCert: fs.readFileSync(path.join(certsPath, 'pass_certificate.pem')),
      signerKey: fs.readFileSync(path.join(certsPath, 'pass_key.pem')),
      signerKeyPassphrase: process.env.PASS_KEY_PASSWORD || '',
    });

    // Configurar metadatos del pase
    pass.setPassTypeIdentifier('pass.com.oolwellness.event2025');
    pass.setTeamIdentifier('6UM33LQATP');
    pass.setSerialNumber(ticketId);
    pass.setOrganizationName('OOL Wellness');
    pass.setDescription('Entrada para OOL Wellness 2025');
    pass.setBackgroundColor('rgb(255, 255, 255)');
    pass.setForegroundColor('rgb(0, 0, 0)');
    pass.setLabelColor('rgb(0, 0, 0)');

    // Añadir imágenes
    pass.addBuffer('icon.png', fs.readFileSync(iconPath));
    pass.addBuffer('logo.png', fs.readFileSync(logoPath));

    // Configurar campos del pase
    pass.primaryFields.push({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });
    pass.auxiliaryFields.push({
      key: 'date',
      label: 'Fecha',
      value: eventDate,
      dateStyle: 'PKDateStyleMedium',
      timeStyle: 'PKDateStyleNone',
    });

    // Generar el pase
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
    throw new Error(`No se pudo generar el pase: ${err.message}`);
  }
}