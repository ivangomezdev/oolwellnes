import { Template } from '@walletpass/pass-js';
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

    const passCertPath = path.join(certsPath, 'pass.p12');
    if (!fs.existsSync(passCertPath)) {
      throw new Error(`Falta certificado pass.p12 en ${certsPath}`);
    }

    // Verificar PASS_KEY_PASSWORD
    if (!process.env.PASS_KEY_PASSWORD) {
      console.log('Advertencia: PASS_KEY_PASSWORD no está configurada. Se asumirá que el certificado no requiere contraseña.');
    }

    // Crear el template del pase
    const template = new Template('eventTicket', {
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
    template.setCertificate(
      fs.readFileSync(passCertPath),
      process.env.PASS_KEY_PASSWORD || ''
    );

    // Añadir imágenes
    template.images.add('icon', fs.readFileSync(iconPath));
    template.images.add('logo', fs.readFileSync(logoPath));

    // Configurar campos del pase
    template.primaryFields.add({
      key: 'event',
      label: 'Evento',
      value: eventName,
    });
    template.auxiliaryFields.add({
      key: 'date',
      label: 'Fecha',
      value: eventDate,
      dateStyle: 'PKDateStyleMedium',
      timeStyle: 'PKDateStyleNone',
    });

    // Generar el pase
    const pass = await template.createPass();
    const buffer = await pass.asBuffer();

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