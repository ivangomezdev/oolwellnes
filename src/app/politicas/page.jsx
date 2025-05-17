import styles from "./page.module.css"

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <a style={{fontFamily:"CalSans",textDecoration:"none",color:"#9B956A"}} href="/">Regresar al home</a>
        <h1 className={styles.title}>Política de Privacidad</h1>
        <p className={styles.intro}>
          En OOL Wellness, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. A continuación,
          te detallamos nuestra política de privacidad y el uso que hacemos de tu información:
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Datos Personales Recopilados:</h2>
          <p className={styles.paragraph}>
            Recopilamos información personal, como nombre, correo electrónico, número de teléfono y detalles de pago,
            con el propósito de gestionar tu inscripción y participación en el evento. También podemos recopilar
            información relacionada con tus preferencias para mejorar tu experiencia en el evento.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Uso de la Información:</h2>
          <p className={styles.paragraph}>La información que recopilamos será utilizada para:</p>
          <ul className={styles.list}>
            <li>Confirmar tu participación en el evento.</li>
            <li>
              Enviarte información relacionada con el evento, como horarios, detalles y cualquier actualización
              importante.
            </li>
            <li>Promocionar futuras actividades y eventos organizados por OOL Wellness.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Protección de Datos:</h2>
          <p className={styles.paragraph}>
            Nos comprometemos a mantener tus datos personales seguros y protegidos mediante medidas de seguridad
            administrativas, técnicas y físicas adecuadas para evitar el acceso no autorizado, la divulgación o
            alteración de tus datos.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Compartir Datos:</h2>
          <p className={styles.paragraph}>
            No compartimos tus datos personales con terceros, excepto cuando sea necesario para cumplir con la
            prestación de nuestros servicios, como el procesamiento de pagos a través de plataformas de pago de
            confianza.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Revocación del Consentimiento:</h2>
          <p className={styles.paragraph}>
            Puedes revocar tu consentimiento para el uso de tus datos personales en cualquier momento contactándonos a
            través de [correo de contacto]. Ten en cuenta que si revocas tu consentimiento, no podremos ofrecerte
            nuestros servicios completos.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Derechos ARCO:</h2>
          <p className={styles.paragraph}>
            Tienes derecho a acceder, rectificar, cancelar o oponerte al procesamiento de tus datos personales. Para
            ejercer estos derechos, puedes enviar una solicitud a través de [correo de contacto].
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Cambios en la Política de Privacidad:</h2>
          <p className={styles.paragraph}>
            Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será comunicado
            a través de nuestros canales oficiales.
          </p>
        </div>
      </div>
    </div>
  )
}
