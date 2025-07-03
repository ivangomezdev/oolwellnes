import React from 'react';
import './LayoutData.css';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext.jsx';

const t = {
  es: {
    title: "¿Para qué es esto?",
    desc: (
      <>
        Más que una retiro, una experiencia expansiva.<br />
        Tres días de conexión, movimiento y comunidad.<br />
        Sumérgete en el arte del bienestar.
      </>
    ),
  },
  en: {
    title: "What is this for?",
    desc: (
      <>
        More than a retreat, an expansive experience.<br />
        Three days of connection, movement, and community.<br />
        Immerse yourself in the art of wellness.
      </>
    ),
  },
};

const LayoutData = () => {
  const images = [
    { src: 'https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_SOUL_wcynom.png', data: 'img1' },
    { src: 'https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564510/Logo_Icono_Mente_lvk3sa.png', data: 'dadsdsd' },
    { src: 'https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564509/Logo_Icono_Cuerpo_skxtfs.png', data: 'dadsdsd' },
  ];

  const { language } = useLanguage();

  return (
    <div className="layout" style={{ position: "relative" }}>
      <h1 className="layout__title">{t[language].title}</h1>
      <div className="layout__image-column">
        {images.map((i, index) => (
          <div key={index} className="layout__image-container">
            <div className="layout__image">
              <Image width={150} height={150} src={i.src} alt={`Image ${index}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="layout__content">
        <div className="layout__text-column">
        </div>
        <div className="layout__text-area">
          <p>{t[language].desc}</p>
        </div>
        <div className="layout__right-column">
        </div>
      </div>
    </div>
  );
};

export default LayoutData;