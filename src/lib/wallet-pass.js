const { Pass } = require('@walletpass/pass-js');
async function createWalletPass(ticketId, email, eventName, eventDate) {
  const startTime = Date.now();
  console.log('Iniciando generación del pase a los', startTime);
  const template = new Pass({
    model: 'eventTicket',
    passTypeIdentifier: 'pass.com.oolwellness.event2025',
    teamIdentifier: '6UM33LQATP',
    organizationName: 'OOL Wellness',
    description: 'Entrada para OOL Wellness 2025',
    serialNumber: ticketId,
    backgroundColor: 'rgb(255, 255, 255)',
    foregroundColor: 'rgb(0, 0, 0)',
    labelColor: 'rgb(0, 0, 0)',
  });
  template.addFields('eventTicket', {
    primaryFields: [
      { key: 'event', label: 'Evento', value: eventName },
    ],
    auxiliaryFields: [
      { key: 'date', label: 'Fecha', value: eventDate, dateStyle: 'medium', timeStyle: 'none' },
    ],
  });
  template.setCertificates({
    wwdr: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'wwdr.pem')),
    signerCert: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'pass_certificate.pem')),
    signerKey: fs.readFileSync(path.join(process.cwd(), 'src', 'certs', 'pass_key.pem')),
    signerKeyPassphrase: process.env.PASS_KEY_PASSWORD,
  });
  template.addFile('icon.png', fs.readFileSync(path.join(process.cwd(), 'public', 'images', 'icon.png')));
  template.addFile('logo.png', fs.readFileSync(path.join(process.cwd(), 'public', 'images', 'logo.png')));
  const buffer = await template.sign();
  console.log('Pase generado exitosamente en', Date.now() - startTime, 'ms');
  return buffer;
}