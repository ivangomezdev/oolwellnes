import React, { useEffect, useRef, useState } from "react";
import "./yesOrNot.css";
import Link from "next/link";

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
      ¿Qué incluye?
          <span className="yesOrNot__underline"></span>
        </h2>
        <div className="yesOrNot__container">
          <div style={{overflow:"hidden"}} className="yesOrNot__card-wrapper">
               <div style={{ position: "relative" }}>
                    <img style={{position:"absolute",right:"100px",bottom:"-260px"}} src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1746936901/Dise%C3%B1o_sin_t%C3%ADtulo_8_n2o3nm.png" alt="" />
                  </div>
            <div className="yesOrNot__card">
              
              <div className="yesOrNot__header">
                <div className="yesOrNot__icon">
                  <img
                    style={{ width: "80px" }}
                    src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747351565/esd_aflm96.png"
                    alt=""
                  />
                </div>
                <div className="yesOrNot__titleCard">Standar: KIN'</div>
              </div>
              <div className="yesOrNot__content">
                <p className="yesOrNot__description">
                  Hospedaje + Traslados + Acceso completo a las actividades
                  wellness, clases, conferencias y rituales.
                </p>
                <div className="yesOrNot__price1">$35,000.00</div>
                <Link href={"/tickets"}>
                  <button className="yesOrNot__btn">Preventa</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="yesOrNot__card-wrapper">
            <div className="yesOrNot__card">
              <div className="yesOrNot__header">
                <div className="yesOrNot__icon">
                  <div style={{ position: "relative" }}>
                    <img style={{position:"absolute"}} src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1746936901/Dise%C3%B1o_sin_t%C3%ADtulo_8_n2o3nm.png" alt="" />
                  </div>
                  <img
                    style={{ width: "80px" }}
                    src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747351565/esd_aflm96.png"
                    alt=""
                  />
                </div>
                <div className="yesOrNot__titleCard">VIP: HA'</div>
                   
              </div>
              <div className="yesOrNot__content">
                <p className="yesOrNot__description">
                  Hospedaje Ocean View + Traslados+ Todo lo incluido en Aire,
                  más beneficios premium, accesos preferenciales y detalles
                  exclusivos.
                </p>
                <div className="yesOrNot__price">$55,000.00</div>

                <button className="yesOrNot__btn">Preventa</button>
              </div>
            </div>
          </div>
        </div>
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
