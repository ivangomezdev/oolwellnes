import React, { useState, useEffect } from "react";
import "./textAndPhoto.css";
import Image from "next/image";

const TextAndPhoto = () => {
  const images = [
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745891523/retreats-removebg-preview_plvlhh.png",
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Mente_1_cu5qom.png",
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png",
    "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Cuerpo_2_vahswu.png",
  ];

  const spans = [
    {
      icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png",
      text: "Rituales de bienestar",
      alt: "Soul Icon",
    },
    {
      icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Mente_1_cu5qom.png",
      text: "Indoor cycling",
      alt: "Mente Icon",
    },
    {
      icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Cuerpo_2_vahswu.png",
      text: "Clases de funcional",
      alt: "Cuerpo Icon",
    },
    {
      icon: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png",
      text: "Breathwork y más",
      alt: "Soul Icon",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentPair, setCurrentPair] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen width is 725px or less
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 725);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const imageDurations = [2000, 500, 500, 500];
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, imageDurations[currentImage]);

    const spanInterval = setInterval(() => {
      if (isMobile) {
        setCurrentPair((prev) => (prev + 1) % spans.length);
      } else {
        setCurrentPair((prev) => (prev + 1) % Math.ceil(spans.length / 2));
      }
    }, 2000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(spanInterval);
    };
  }, [currentImage, isMobile, images.length, spans.length]);

  return (
    <div className="textAndPhoto__cont">
      <div className="textAndPhoto__textCont">
        <div className="text-content">
          <div style={{ position: "relative" }}>
            <img
              style={{ position: "absolute", left: "-340px", top: "-40px" }}
              src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1746936901/Dise%C3%B1o_sin_t%C3%ADtulo_8_n2o3nm.png"
              alt=""
            />
          </div>
          <p style={{ marginTop: "10px", fontSize: "36px", color: "#F4E1D1" }}>
            Join us for 3 days and 2 nights at{" "}
            <span style={{ color: "white" }}>
              Hotel Xcaret Arte, Riviera Maya.
            </span>
            <br />
          </p>
          <div
            className="textAndPhoto__labels"
            style={{
              overflow: "hidden",
              position: "relative",
              height: "40px",
              marginTop: "25px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              className="labels-wrapper"
              style={{
                display: "flex",
                transform: `translateX(-${currentPair * 100}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {isMobile
                ? spans.map((span, index) => (
                    <div
                      key={index}
                      className="label-pair"
                      style={{
                        display: "flex",
                        gap: "10px",
                        minWidth: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          borderRadius: "5px",
                          padding: "5px",
                          fontSize: "26px",
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          flex: "1",
                        }}
                      >
                        <img
                          src={span.icon}
                          alt={span.alt}
                          style={{
                            width: "25px",
                            verticalAlign: "middle",
                            marginRight: "3px",
                          }}
                        />
                        {span.text}
                      </span>
                    </div>
                  ))
                : Array.from({ length: Math.ceil(spans.length / 2) }).map(
                    (_, pairIndex) => (
                      <div
                        key={pairIndex}
                        className="label-pair"
                        style={{
                          display: "flex",
                          gap: "10px",
                          minWidth: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {spans
                          .slice(pairIndex * 2, pairIndex * 2 + 2)
                          .map((span, index) => (
                            <span
                              key={index}
                              style={{
                                color: "white",
                                borderRadius: "5px",
                                padding: "5px",
                                fontSize: "26px",
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                flex: "1",
                              }}
                            >
                              <img
                                src={span.icon}
                                alt={span.alt}
                                style={{
                                  width: "25px",
                                  verticalAlign: "middle",
                                  marginRight: "3px",
                                }}
                              />
                              {span.text}
                            </span>
                          ))}
                      </div>
                    )
                  )}
            </div>
          </div>
        </div>
        <div className="textAndPhoto__imgAndBtn">
          <div className="image-wrapper">
            <Image
              alt={`image${currentImage + 1}`}
              src={images[currentImage]}
              width={100}
              height={100}
              className={`animated-image ${currentImage === 0 ? "centered" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAndPhoto;