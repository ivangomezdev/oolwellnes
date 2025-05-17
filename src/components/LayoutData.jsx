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

      <h1 className="layout__title">¿Para qué es esto?</h1>
        <div className="layout__image-column">
          {images.map((i, index) => (
            <div key={index} className="layout__image-container">
              <div className="layout__image">
                <Image width={90} height={70} src={i.src} alt={`Image ${index}`} />
              </div>
            </div>
          ))}
        </div>
      <div className="layout__content">
        <div className="layout__text-column">
     
        </div>

         <div className="layout__text-area">
            <p>
             Más que una retiro, una experiencia expansiva.
Tres días de conexión, movimiento y comunidad. 
Sumérgete en el arte del bienestar.
            </p>
          </div>

        <div className="layout__right-column">
       
        </div>
      </div>
    </div>
  );
};

export default LayoutData;