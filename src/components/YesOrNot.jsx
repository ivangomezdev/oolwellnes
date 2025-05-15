import React, { useEffect, useRef, useState } from "react";
import "./yesOrNot.css";

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
            animateTitles
              ? "yesOrNot__title--bg-animated yesOrNot__title--text-animated"
              : ""
          }`}
        >
          Qué incluye
          <span className="yesOrNot__underline"></span>
        </h2>
        <ul
          style={{ color: "#333333", textAlign: "center" }}
          className="yesOrNot__list"
        >
          <li className="yesOrNot__item">Hospedaje 2 noches en Hotel xcaret Arte</li>
          <li>All inclusive (Alimentos y bebidas)</li>
          <li>Transporte aeropuerto-hotel</li>
          <li>Acceso completo a las actividades wellness y clases, conferencias y rituales</li>
          <li>Goodie bag</li>
            <li>Goodie bag</li>
            <li>All Fun Inclusive</li>
        </ul>
      </div>

     {/* <div className="yesOrNot__column">
        <h2
          className={`yesOrNot__title yesOrNot__title--not-included ${
            animateTitles
              ? "yesOrNot__title--bg-animated yesOrNot__title--text-animated"
              : ""
          }`}
        >
          Visión
        </h2>
        <h2
          style={{ color: "#333333", textAlign: "center" }}
          className="yesOrNot__list"
        >
          Ser un referente en el mundo del wellness, ofreciendo espacios y
          experiencias que inspiran un estilo de vida consciente, saludable y
          sostenible, con impacto positivo en las personas y su entorno. Nuestro
          Propósito Impulsar el bienestar personal como motor de transformación
          colectiva.{" "}
          <strong style={{ color: "#F1E6D1" }}>
            Creemos que cuando cada persona vive desde su mejor versión,
            contribuye a un mundo más equilibrado, humano y pleno.
          </strong>
        </h2>
      </div>*/}
    </div>
  );
}

export default YesOrNot;
