"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./dateContent.css";
import Link from "next/link";

const DateContent = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [imageVisibility, setImageVisibility] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // 20% of the component visible
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
      // Stagger the visibility of each image
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
      <div className="dateContent__imgs" >
        <div
          className={`image__one ${imageVisibility.one ? "image-visible" : ""}`}
        >
          <Image
            width={308}
            height={425}
            src={
              "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745984562/VOEUX_OolTakesOverTulum13-5_ez7v3b.jpg"
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
              "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745984570/VO_ool-22_yakzkr.jpg"
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
              "https://res.cloudinary.com/dc5zbh38m/image/upload/f_jpg/v1745984565/VO_OolCorazon2-11_jn5xod.jpg"
            }
            alt="Decorative image 1"
            loading="lazy"
          />
          <Image
            width={500}
            height={750}
            src={
              "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745984570/VO_ool-22_yakzkr.jpg"
            }
            alt="Decorative image 2"
            className="small-screen-only"
          />
          <Image
            width={500}
            height={750}
            src={
              "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745984563/VOEUX_OolTakesOverTulum12-7_ygrnml.jpg"
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
              "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745799167/2025-removebg-preview_vjljx9.png"
            }
            width={370}
            height={190}
            alt="time"
            className="dateContent__image"
          />
          <p className="dateContent__description">
            Más que una retiro, una experiencia expansiva. <span style={{color:"white"}}>Tres días de conexión,
          movimiento y comunidad.</span>
            <br />
            <br />
 Sumérgete en el arte del bienestar. Muévete,
          Siente, Reconecta. <span style={{color:"white"}}>Tu cuerpo, tu mente y tu espíritu te están
          esperando.</span>
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
            <span className="text">Más Información</span>
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
              "https://res.cloudinary.com/dc5zbh38m/image/upload/v1746066714/Logo_Retiro_b7gkar.png"
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