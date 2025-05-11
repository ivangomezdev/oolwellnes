import React, { useState, useEffect } from 'react';
import "./textAndPhoto.css";
import Image from 'next/image';

const TextAndPhoto = () => {
  const images = [
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745891523/retreats-removebg-preview_plvlhh.png", // image4
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Mente_1_cu5qom.png", // image1
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png", // image2
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Cuerpo_2_vahswu.png", // image3
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const durations = [2000, 500, 500, 500]; // 2s for image4, 0.5s for others
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, durations[currentImage]);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <div className="textAndPhoto__cont">
      <div className="textAndPhoto__textCont">
        <p>
          En Óol, creemos que el verdadero viaje es hacia el interior.{' '}
          <span style={{ color: '#F2E2C6' }}>
            Este retiro es una invitación a pausar, soltar el ruido y sumergirte en una experiencia que despierta, nutre y transforma en comunidad.
          </span>
        </p>
      </div>
      <div className="textAndPhoto__imgAndBtn">
        <div className="image-wrapper">
          <Image
            alt={`image${currentImage + 1}`}
            src={images[currentImage]}
            width={100}
            height={100}
            className={`animated-image ${currentImage === 0 ? 'centered' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TextAndPhoto;