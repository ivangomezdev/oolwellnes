import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import forge from 'node-forge';
import AdmZip from 'adm-zip';

// Directorios
const CERTS_DIR = path.join(process.cwd(), 'src', 'certs');
const IMAGES_DIR = path.join(process.cwd(), 'src', 'images');
const TEMP_DIR = '/tmp';

// Configuración del pase
const PASS_CONFIG = {
  passTypeIdentifier: 'pass.com.oolwellness.event2025',
  teamIdentifier: '6UM33LQATP',
  organizationName: 'OOL Wellness',
  description: 'Retreat Rivera Maya',
  foregroundColor: '#F2E2C6',
  backgroundColor: '#9F9668',
  labelColor: '#F2E2C6',
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
function createPassJson(ticketId, email, eventName, eventDate, customerName, plan) {
  // Validar y mapear el valor de plan
  const validPlans = [
    'KIN - Regular Package',
    'HA - VIP Package',
    'DAYPASS - 1-3 august',
    'DAYPASS - 1 august',
    'DAYPASS - 2 august',
    'DAYPASS - 3 august'
  ];
  let planDisplayName = plan; // Mostrar el plan tal cual lo eligió el usuario
  if (!validPlans.includes(plan)) {
    planDisplayName = 'KIN Regular'; // Valor por defecto
    console.warn(`Valor de plan inválido: ${plan}. Usando valor por defecto: ${planDisplayName}`);
  }
 else {
    console.warn(`Valor de plan inválido: ${plan}. Usando valor por defecto: ${planDisplayName}`);
  }

  console.log(`Generando pass.json con plan: ${planDisplayName}`);

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
    logoText: '',
    passInformation: {
      thumbnail: {
        value: 'thumbnail.png',
      },
    },
    eventTicket: {
      headerFields: [
        {
          key: 'date',
          label: 'Fecha',
          value: '1,2 & 3 Agosto,2025',
        },
      ],
      primaryFields: [
        {
          key: 'name',
          label: '',
          textAlignment: 'PKTextAlignmentCenter',
          value: customerName,
        },
      ],
      secondaryFields: [
        {
          key: 'E-mail',
          label: 'Correo',
          value: email,
          textAlignment: 'PKTextAlignmentNatural',
        },
      ],
      auxiliaryFields: [
        {
          key: 'Venue',
          label: 'Lugar',
          value: 'Xcaret Arte',
          textAlignment: 'PKTextAlignmentCenter',
        },
        {
          key: 'plan',
          label: 'Paquete',
          value: planDisplayName, // Usar el valor mapeado
          textAlignment: 'PKTextAlignmentCenter',
        },
        {
          key: 'ticket',
          label: 'Ticket ID',
          value: ticketId,
          textAlignment: 'PKTextAlignmentCenter',
        },
      ],
    },
    barcode: {
      format: 'PKBarcodeFormatQR',
      message: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/validate?ticketId=${ticketId}`,
      messageEncoding: 'iso-8859-1',
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

// Función para firmar el manifest con node-forge
async function signManifest(manifestPath, passDir) {
  const certPath = path.join(CERTS_DIR, 'pass_certificate.pem');
  const keyPath = path.join(CERTS_DIR, 'pass_key.pem');
  const wwdrPath = path.join(CERTS_DIR, 'wwdr.pem');
  const signaturePath = path.join(passDir, 'signature');

  let certPem, keyPem, wwdrPem;
  try {
    certPem = await fs.readFile(certPath, 'utf8');
    keyPem = await fs.readFile(keyPath, 'utf8');
    wwdrPem = await fs.readFile(wwdrPath, 'utf8');
  } catch (err) {
    console.error(`Error leyendo certificados: ${err.message}`);
    throw new Error(`No se pudo leer certificado: ${err.message}`);
  }

  let cert, key, wwdrCert;
  try {
    cert = forge.pki.certificateFromPem(certPem);
    key = forge.pki.decryptRsaPrivateKey(keyPem, 'mypassword123');
    wwdrCert = forge.pki.certificateFromPem(wwdrPem);
  } catch (err) {
    console.error(`Error procesando certificados: ${err.message}`);
    throw new Error(`No se pudo procesar certificado o clave: ${err.message}`);
  }

  const manifestContent = await fs.readFile(manifestPath);
  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(manifestContent, 'utf8');
  p7.technology = 'Apple';
  p7.addCertificate(cert);
  p7.addCertificate(wwdrCert);
  p7.addSigner({
    key: key,
    certificate: cert,
    digestAlgorithm: forge.pki.oids.sha1,
    authenticatedAttributes: [
      {
        type: forge.pki.oids.contentType,
        value: forge.pki.oids.data,
      },
      {
        type: forge.pki.oids.messageDigest,
      },
      {
        type: forge.pki.oids.signingTime,
        value: new Date(),
      },
    ],
  });

  try {
    p7.sign({ detached: true });
    const der = forge.asn1.toDer(p7.toAsn1()).getBytes();
    await fs.writeFile(signaturePath, Buffer.from(der, 'binary'));
    console.log('Manifest firmado correctamente con node-forge');
  } catch (err) {
    console.error(`Error firmando manifest con node-forge: ${err.message}`);
    throw new Error(`No se pudo firmar el manifest: ${err.message}`);
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
export async function createWalletPass(ticketId, email, eventName, eventDate, customerName, plan) {
  const passDir = path.join(TEMP_DIR, `pass-${ticketId}`);
  await ensureTempDir();
  await fs.mkdir(passDir, { recursive: true });

  try {
    const passJson = createPassJson(ticketId, email, eventName, eventDate, customerName, plan);
    await fs.writeFile(path.join(passDir, 'pass.json'), JSON.stringify(passJson, null, 2));
    console.log('pass.json creado');

    const images = ['icon.png', 'logo.png', "background.png", "thumbnail.png"];
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

    const filesToManifest = ['pass.json', ...images];
    const manifestPath = await createManifest(passDir, filesToManifest);
    console.log('manifest.json creado');

    await signManifest(manifestPath, passDir);
    const passBuffer = await packagePass(passDir);
    console.log('Pase .pkpass empaquetado');

    await fs.rm(passDir, { recursive: true, force: true });
    console.log('Directorio temporal limpiado');

    return passBuffer;
  } catch (err) {
    await fs.rm(passDir, { recursive: true, force: true });
    throw err;
  }
}