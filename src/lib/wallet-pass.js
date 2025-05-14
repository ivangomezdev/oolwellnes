
 import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import AdmZip from 'adm-zip';
import forge from 'node-forge';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const TEMP_DIR = os.tmpdir();
const CERT_DIR = path.join(process.cwd(), 'src', 'certs'); // Corregido a src/certs
const ASSETS_DIR = path.join(process.cwd(), 'src', 'images'); // Correcto en src/images

const ticketNameMap = {
  'price_1RLvqlRWJlybi2c9hUQf8Aaa': 'KIN - Regular Package',
  'price_1RLvrQRWJlybi2c92NvXjLYX': 'HA - VIP Package',
};

export async function createWalletPass(ticketId, email, eventName, eventDate) {
  const db = getFirestore();
  const ticketRef = doc(db, 'tickets', ticketId);
  const ticketSnap = await getDoc(ticketRef);
  const priceId = ticketSnap.exists() ? ticketSnap.data().priceId : null;
  const name = ticketSnap.exists() ? ticketSnap.data().name : 'Asistente';
  const ticketName = priceId ? ticketNameMap[priceId] || 'Unknown Package' : 'Unknown Package';

  console.log(`Creando pase para ticketId: ${ticketId}, ticketName: ${ticketName}, name: ${name}`);

  const passJson = {
    formatVersion: 1,
    passTypeIdentifier: 'pass.com.oolwellness.ticket',
    serialNumber: ticketId,
    teamIdentifier: '6UM33LQATP', // Reemplaza con tu Team ID de Apple
    organizationName: 'OOL Wellness',
    description: `Entrada para ${ticketName}`,
    logoText: 'OOL Wellness',
    eventTicket: {
      primaryFields: [
        {
          key: 'event',
          label: 'Festival',
          value: eventName,
        },
      ],
      secondaryFields: [
        {
          key: 'ticketType',
          label: 'Paquete',
          value: ticketName,
        },
        {
          key: 'date',
          label: 'Fecha',
          value: new Date(eventDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      ],
      auxiliaryFields: [
        {
          key: 'name',
          label: 'Nombre',
          value: name,
        },
        {
          key: 'email',
          label: 'Correo',
          value: email,
        },
      ],
      backFields: [
        {
          key: 'terms',
          label: 'Términos y Condiciones',
          value: 'Entrada válida solo para OOL Wellness 2025. No reembolsable.',
        },
        {
          key: 'contact',
          label: 'Contacto',
          value: 'Correo: support@oolwellness.com\nTeléfono: +34 123 456 789',
        },
      ],
    },
    barcode: {
      format: 'PKBarcodeFormatQR',
      message: `ticket-${ticketId}`,
      messageEncoding: 'iso-8859-1',
      altText: `ID: ${ticketId}`,
    },
    backgroundColor: '#9F9668',
    foregroundColor: '#FFFFFF',
    labelColor: '#000000',
  };

  const passDir = path.join(TEMP_DIR, `pass-${ticketId}`);
  await fs.mkdir(passDir, { recursive: true });
  await fs.writeFile(path.join(passDir, 'pass.json'), JSON.stringify(passJson, null, 2));
  console.log('pass.json creado');

  const images = ['icon.png', 'logo.png'];
  const existingImages = [];
  for (const image of images) {
    const sourcePath = path.join(ASSETS_DIR, image);
    const destPath = path.join(passDir, image);
    try {
      await fs.access(sourcePath);
      await fs.copyFile(sourcePath, destPath);
      existingImages.push(image);
      console.log(`Imagen ${image} copiada desde ${sourcePath}`);
    } catch (err) {
      console.warn(`Imagen ${image} no encontrada en ${sourcePath}, omitiendo`);
    }
  }

  const files = ['pass.json', ...existingImages];
  const manifest = {};
  for (const file of files) {
    const content = await fs.readFile(path.join(passDir, file));
    manifest[file] = forge.util.encode64(forge.md.sha1.create().update(content).digest().bytes());
  }
  await fs.writeFile(path.join(passDir, 'manifest.json'), JSON.stringify(manifest));
  console.log('manifest.json creado');

  try {
    const cert = await fs.readFile(path.join(CERT_DIR, 'pass_certificate.pem'));
    const key = await fs.readFile(path.join(CERT_DIR, 'pass_key.pem'));
    const wwdr = await fs.readFile(path.join(CERT_DIR, 'wwdr.pem'));

    const p12 = forge.pkcs12.toPkcs12Asn1(
      forge.pki.privateKeyFromPem(key),
      [forge.pki.certificateFromPem(cert), forge.pki.certificateFromPem(wwdr)],
      'mypassword123', // Ajusta si usas otra contraseña
      { algorithm: '3des' }
    );
    const asn1 = forge.asn1.fromDer(forge.util.decode64(forge.util.encode64(p12)));
    const p12Parsed = forge.pkcs12.pkcs12FromAsn1(asn1, 'mypassword123');
    const bags = p12Parsed.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const privateKey = bags[forge.pki.oids.pkcs8ShroudedKeyBag][0].key;

    const manifestContent = await fs.readFile(path.join(passDir, 'manifest.json'));
    const signature = forge.pkcs7.createSignedData();
    signature.content = forge.util.createBuffer(manifestContent);
    signature.addCertificate(cert);
    signature.addSigner({
      key: privateKey,
      certificate: cert,
      digestAlgorithm: forge.pki.oids.sha1,
      authenticatedAttributes: [
        { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
        { type: forge.pki.oids.messageDigest },
        { type: forge.pki.oids.signingTime, value: new Date() },
      ],
    });
    signature.sign();
    const signatureDer = forge.asn1.toDer(signature.toAsn1()).getBytes();
    await fs.writeFile(path.join(passDir, 'signature'), signatureDer, 'binary');
    console.log('Manifest firmado correctamente con node-forge');
  } catch (certErr) {
    console.error('Error con certificados:', certErr);
    throw new Error(`Fallo al procesar certificados: ${certErr.message}`);
  }

  const zip = new AdmZip();
  for (const file of files.concat(['signature'])) {
    zip.addLocalFile(path.join(passDir, file));
  }
  const passBuffer = zip.toBuffer();
  console.log('Pase .pkpass empaquetado');

  const filePath = path.join(TEMP_DIR, `ticket-${ticketId}.pkpass`);
  await fs.writeFile(filePath, passBuffer);
  console.log(`Pase guardado en: ${filePath}`);

  await fs.rm(passDir, { recursive: true, force: true });

  return passBuffer;
}