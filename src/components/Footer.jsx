import React from 'react';
import "./footer.css";
import { useLanguage } from '../context/LanguageContext.jsx';

const t = {
  es: {
    privacy: "Política de privacidad",
    please: "Por favor asegúrate de leerlos solo te llevará 1 minuto.",
    see: "Ver política de privacidad",
  },
  en: {
    privacy: "Privacy Policy",
    please: "Please make sure to read it, it will only take 1 minute.",
    see: "See privacy policy",
  },
};

const Footer = () => {
  const { language } = useLanguage();

  return (
    <div className='footer__cont'>
      <img src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745979884/LogoOolWeb_ri9tvt.png" alt="" />
      <div className="card">
        <span className="card__title">{t[language].privacy}</span>
        <p className="card__content">{t[language].please}</p>
        <div className="card__form">
          <a style={{textDecoration:"none",color:"#9B956A"}} href="/politicas">
            {t[language].see}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
