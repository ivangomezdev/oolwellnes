"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./dateContent.css";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext.jsx";

const t = {
  es: {
    description1: "Más que una retiro, una experiencia expansiva.",
    description2: "Tres días de conexión, movimiento y comunidad.",
    description3: "Sumérgete en el arte del bienestar. Muévete, Siente, Reconecta.",
    description4: "Tu cuerpo, tu mente y tu espíritu te están esperando.",
    moreInfo: "Más Información",
  },
  en: {
    description1: "More than a retreat, an expansive experience.",
    description2: "Three days of connection, movement and community.",
    description3: "Immerse yourself in the art of wellness. Move, Feel, Reconnect.",
    description4: "Your body, mind and spirit are waiting for you.",
    moreInfo: "More Information",
  },
};

const DateContent = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [imageVisibility, setImageVisibility] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(
        () => setImageVisibility((prev) => ({ ...prev, one: true })),
        300
      );
      setTimeout(
        () => setImageVisibility((prev) => ({ ...prev, two: true })),
        600
      );
      setTimeout(
        () => setImageVisibility((prev) => ({ ...prev, three: true })),
        900
      );
      setTimeout(
        () => setImageVisibility((prev) => ({ ...prev, four: true })),
        1200
      );
    }
  }, [isVisible]);

  return (
    <div
      className={`dateContent__content ${isVisible ? "is-visible" : ""}`}
      ref={containerRef}
    >
      <div className="dateContent__imgs">
        <div
          className={`image__one ${imageVisibility.one ? "image-visible" : ""}`}
        >
          <Image
            width={308}
            height={425}
            src={
              "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062926/VOEUX_OolTakesOverTulum13-5_ez7v3b_htoito.jpg"
            }
            alt="Decorative image"
          />
        </div>
        <div
          className={`image__two ${imageVisibility.two ? "image-visible" : ""}`}
        >
          <Image
            width={308}
            height={425}
            src={
              "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062929/VO_ool-22_yakzkr_hn6zmm.jpg"
            }
            alt="Decorative image"
          />
        </div>
        <div
          className={`image__four ${
            imageVisibility.four ? "image-visible" : ""
          }`}
        >
          <Image
            width={500}
            height={750}
            src={
              "https://res.cloudinary.com/dufp4z4gq/image/upload/v1751564826/VO_OolCorazon2-11_mpa5wj.jpg"
            }
            alt="Decorative image 1"
            loading="lazy"
          />
          <Image
            width={500}
            height={750}
            src={
              "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062927/VO_OolCorazon2-11_jn5xod_w2pbzz.jpg"
            }
            alt="Decorative image 2"
            className="small-screen-only"
          />
          <Image
            width={500}
            height={750}
            src={
              "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062926/VOEUX_OolTakesOverTulum12-7_ygrnml_xbvbtb.jpg"
            }
            alt="Decorative image 3"
            className="small-screen-only"
          />
        </div>
      </div>
      <div className="dateContent-bg">
        <div className="dateContent">
          <Image
            src={
              "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749065983/2025-removebg-preview_vjljx9_wvk7oj.png"
            }
            width={370}
            height={190}
            alt="time"
            className="dateContent__image"
          />
          <p className="dateContent__description">
            {t[language].description1}{" "}
            <span style={{ color: "white" }}>{t[language].description2}</span>
            <br />
            <br />
            {t[language].description3}{" "}
            <span style={{ color: "white" }}>{t[language].description4}</span>
          </p>
          <Link href={"/oolExperience"}>
            <button className="animated-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arr-2"
                viewBox="0 0 24 24"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">{t[language].moreInfo}</span>
              <span className="circle"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arr-1"
                viewBox="0 0 24 24"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </Link>
        </div>
        <div className="retreat__logo">
          <Image
            src={
              "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062931/Logo_Retiro_b7gkar_apvhc8.png"
            }
            width={1060}
            alt="logo"
            height={640}
          />
        </div>
      </div>
    </div>
  );
};

export default DateContent;