import React, { useEffect, useRef, useState } from 'react';
import './yesOrNot.css';

function YesOrNot() {
  const [animateTitles, setAnimateTitles] = useState(false);
  const [animatedPairs, setAnimatedPairs] = useState([]);
  const yesOrNotRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateTitles(true); // Activar animación de títulos
          // Animar los pares de elementos secuencialmente
          const totalPairs = 4; // Número de pares
          let currentPair = 0;
          const interval = setInterval(() => {
            if (currentPair < totalPairs) {
              setAnimatedPairs((prev) => [...prev, currentPair]);
              currentPair++;
            } else {
              clearInterval(interval);
            }
          }, 500); // 500ms entre pares
          observer.disconnect(); // Desconectar después de la primera ejecución
        }
      },
      { threshold: 0.01 } // Reducir el umbral para mayor sensibilidad
    );

    if (yesOrNotRef.current) {
      observer.observe(yesOrNotRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="yesOrNot" ref={yesOrNotRef}>
      <div className="yesOrNot__column">
        <h2
          className={`yesOrNot__title yesOrNot__title--included ${
            animateTitles ? 'yesOrNot__title--bg-animated yesOrNot__title--text-animated' : ''
          }`}
        >
          ¿Qué Sí?
          <span className="yesOrNot__underline"></span>
        </h2>
        <ul className="yesOrNot__list">
          <li className={`yesOrNot__item ${animatedPairs.includes(0) ? 'yesOrNot__item--animated' : ''}`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

          </li>
         
          <li className={`yesOrNot__item ${animatedPairs.includes(2) ? 'yesOrNot__item--animated' : ''}`}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

          </li>
          <li className={`yesOrNot__item ${animatedPairs.includes(3) ? 'yesOrNot__item--animated' : ''}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

          </li>
        </ul>
      </div>

      <div className="yesOrNot__column">
        <h2
          className={`yesOrNot__title yesOrNot__title--not-included ${
            animateTitles ? 'yesOrNot__title--bg-animated yesOrNot__title--text-animated' : ''
          }`}
        >
          ¿Qué No?
        </h2>
        <ul className="yesOrNot__list">
          <li className={`yesOrNot__item ${animatedPairs.includes(0) ? 'yesOrNot__item--animated' : ''}`}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </li>
       
          <li className={`yesOrNot__item ${animatedPairs.includes(2) ? 'yesOrNot__item--animated' : ''}`}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </li>
          <li className={`yesOrNot__item ${animatedPairs.includes(3) ? 'yesOrNot__item--animated' : ''}`}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default YesOrNot;