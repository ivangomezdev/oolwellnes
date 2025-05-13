import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { exec } from 'child_process';
import util from 'util';
import AdmZip from 'adm-zip';

// Promisify exec para usar async/await
const execPromise = util.promisify(exec);

// Directorios
const CERTS_DIR = path.join(process.cwd(), 'src', 'certs');
const IMAGES_DIR = path.join(process.cwd(), 'src', 'images');
const TEMP_DIR = '/tmp'; // Usar /tmp para entornos serverless

// Configuración del pase
const PASS_CONFIG = {
  passTypeIdentifier: 'pass.com.oolwellness.event2025',
  teamIdentifier: '6UM33LQATP',
  organizationName: 'OOL Wellness',
  description: 'Entrada para OOL Wellness 2025',
  foregroundColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(0, 102, 204)',
  labelColor: 'rgb(255, 255, 255)',
};

// Función para asegurar que el directorio temporal existe
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
    console.log(`Directorio temporal creado o existente: ${TEMP_DIR}`);
  } catch (err) {
    console.error('Error creando directorio temporal:', err);
    throw new Error(`No se pudo crear el directorio temporal: ${err.message}`);
  }
}

// Función para generar pass.json
function createPassJson(ticketId, email, eventName, eventDate) {
  return {
    formatVersion: 1,
    passTypeIdentifier: PASS_CONFIG.passTypeIdentifier,
    teamIdentifier: PASS_CONFIG.teamIdentifier,
    organizationName: PASS_CONFIG.organizationName,
    description: PASS_CONFIG.description,
    serialNumber: ticketId,
    foregroundColor: PASS_CONFIG.foregroundColor,
    backgroundColor: PASS_CONFIG.backgroundColor,
    labelColor: PASS_CONFIG.labelColor,
    eventTicket: {
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
          value: new Date(eventDate).toISOString(),
          dateStyle: 'PKDateStyleMedium',
          timeStyle: 'PKDateStyleShort',
        },
      ],
      auxiliaryFields: [
        {
          key: 'email',
          label: 'Correo',
          value: email,
        },
      ],
    },
    barcode: {
      format: 'PKBarcodeFormatQR',
      message: ticketId,
      messageEncoding: 'iso-8859-1',
      altText: `Ticket ID: ${ticketId}`,
    },
    relevantDate: new Date(eventDate).toISOString(),
  };
}

// Función para crear el archivo manifest.json
async function createManifest(passDir, files) {
  const manifest = {};
  for (const file of files) {
    const filePath = path.join(passDir, file);
    try {
      const content = await fs.readFile(filePath);
      const hash = crypto.createHash('sha1').update(content).digest('hex');
      manifest[file] = hash;
    } catch (err) {
      console.error(`Error generando hash para ${file}:`, err);
      throw new Error(`No se pudo generar hash para ${file}: ${err.message}`);
    }
  }
  const manifestPath = path.join(passDir, 'manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  return manifestPath;
}

// Función para firmar el manifest
async function signManifest(manifestPath, passDir) {
  const certPath = path.join(CERTS_DIR, 'pass_certificate.pem');
  const keyPath = path.join(CERTS_DIR, 'pass_key.pem');
  const wwdrPath = path.join(CERTS_DIR, 'wwdr.pem');
  const signaturePath = path.join(passDir, 'signature');

  // Verificar que los certificados existan
  for (const cert of [certPath, keyPath, wwdrPath]) {
    try {
      await fs.access(cert);
    } catch (err) {
      console.error(`Certificado no encontrado: ${cert}`);
      throw new Error(`Certificado no encontrado: ${cert}`);
    }
  }

  const command = `openssl smime -binary -sign -certfile "${wwdrPath}" -signer "${certPath}" -inkey "${keyPath}" -in "${manifestPath}" -out "${signaturePath}" -outform DER -passin pass:mypassword123`;

  try {
    await execPromise(command);
    console.log('Manifest firmado correctamente');
  } catch (err) {
    console.error('Error firmando el manifest:', err);
    throw new Error(`Error firmando el manifest: ${err.message}`);
  }
}

// Función para empaquetar el pase en .pkpass
async function packagePass(passDir) {
  const zip = new AdmZip();
  const files = await fs.readdir(passDir);
  for (const file of files) {
    const filePath = path.join(passDir, file);
    const stats = await fs.stat(filePath);
    if (stats.isFile()) {
      zip.addLocalFile(filePath);
    }
  }
  const passBuffer = zip.toBuffer();
  return passBuffer;
}

// Función principal para crear el pase
export async function createWalletPass(ticketId, email, eventName, eventDate) {
  const passDir = path.join(TEMP_DIR, `pass-${ticketId}`);
  await ensureTempDir();
  await fs.mkdir(passDir, { recursive: true });

  try {
    // Crear pass.json
    const passJson = createPassJson(ticketId, email, eventName, eventDate);
    await fs.writeFile(path.join(passDir, 'pass.json'), JSON.stringify(passJson, null, 2));
    console.log('pass.json creado');

    // Copiar imágenes (icon.png, logo.png)
    const images = ['icon.png', 'logo.png'];
    for (const image of images) {
      const imagePath = path.join(IMAGES_DIR, image);
      try {
        await fs.copyFile(imagePath, path.join(passDir, image));
        console.log(`Imagen copiada: ${image}`);
      } catch (err) {
        console.error(`Error copiando ${image}:`, err);
        throw new Error(`Falta el archivo ${image} en ${IMAGES_DIR}`);
      }
    }

    // Crear manifest.json
    const filesToManifest = ['pass.json', ...images];
    const manifestPath = await createManifest(passDir, filesToManifest);
    console.log('manifest.json creado');

    // Firmar el manifest
    await signManifest(manifestPath, passDir);

    // Empaquetar el pase
    const passBuffer = await packagePass(passDir);
    console.log('Pase .pkpass empaquetado');

    // Limpiar directorio temporal
    await fs.rm(passDir, { recursive: true, force: true });
    console.log('Directorio temporal limpiado');

    return passBuffer;
  } catch (err) {
    // Limpiar en caso de error
    await fs.rm(passDir, { recursive: true, force: true });
    throw err;
  }
}