import React from 'react';
import './LayoutData.css';
import Image from 'next/image';

const LayoutData = () => {
  const images = [
    { src: 'https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797568/meditacion-removebg-preview_cntkbz.png', data: 'img1' },
    { src: 'https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797579/mindfullnes-removebg-preview_iop81z.png', data: 'dadsdsd' },
    { src: 'https://res.cloudinary.com/dc5zbh38m/image/upload/v1745797587/move-removebg-preview_f9psa9.png', data: 'dadsdsd' },
  ];

  // Array con posiciones para las imágenes decorativas
  const decorativeImages = [
    { top: '10%', left: '5%' },
    { top: '80%', right: '5%' },
    { bottom: '0%', left: '30%' },
    { top: '10%', right: '10%' },
  ];

  return (
    <div className="layout">
      {/* Imágenes decorativas con position: absolute */}
      {decorativeImages.map((pos, index) => (
        <div key={`decorative-${index}`} className="layout__decorative-image" style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}>
          <Image
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1746936901/Dise%C3%B1o_sin_t%C3%ADtulo_8_n2o3nm.png"
            width={50}
            height={50}
            alt="Decorative image"
          />
        </div>
      ))}

      <h1 className="layout__title">¿Para qué es esto?</h1>
      <div className="layout__content">
        <div className="layout__text-column">
          <div className="layout__text-area">
            <p>
             
Un viaje diseñado para sumergirte, recordar y celebrar tu verdadera esencia.
            </p>
          </div>
        </div>

        <div className="layout__image-column">
          {images.map((i, index) => (
            <div key={index} className="layout__image-container">
              <div className="layout__image">
                <Image width={90} height={70} src={i.src} alt={`Image ${index}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="layout__right-column">
          <div className="layout__text-area">
            <p>
             Más que una retiro, una experiencia expansiva.
Tres días de conexión, movimiento y comunidad. 
Sumérgete en el arte del bienestar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutData;