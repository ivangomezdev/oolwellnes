import React, { useState, useEffect } from "react";
import "./textAndPhoto.css";
import Image from "next/image";

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
        <div className="text-content">
          <div style={{ position: "relative" }}>
            <img
              style={{ position: "absolute", left: "-340px", top: "-40px" }}
              src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1746936901/Dise%C3%B1o_sin_t%C3%ADtulo_8_n2o3nm.png"
              alt=""
            />
          </div>
          <p style={{ marginTop: "10px", fontSize: "36px", color: "#F4E1D1" }}>
            Únete a nosotros durante 3 días y 2 noches en el Hotel Xcaret Arte,
            Riviera Maya.
            <br />
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
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
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png"
                    alt="Soul Icon"
                    style={{
                      width: "20px",
                      verticalAlign: "middle",
                      marginRight: "3px",
                    }}
                  />
                  Rituales de bienestar
                </span>
                <span
                  style={{
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "26px",
                    display: "flex",
                    alignItems: "center",
                    textAlign:"center"
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Mente_1_cu5qom.png"
                    alt="Mente Icon"
                    style={{
                      width: "20px",
                      verticalAlign: "middle",
                      marginRight: "3px",
                    }}
                  />
                  Indoor cycling
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
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
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981977/Logo_Icono_Cuerpo_2_vahswu.png"
                    alt="Cuerpo Icon"
                    style={{
                      width: "20px",
                      verticalAlign: "middle",
                      marginRight: "3px",
                    }}
                  />
                  Clases de funcional
                </span>
                <span
                  style={{
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "26px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745981976/Logo_Icono_SOUL_2_pxukpq.png"
                    alt="Soul Icon"
                    style={{
                      width: "20px",
                      verticalAlign: "middle",
                      marginRight: "3px",
                    }}
                  />
                  Breathwork y más
                </span>
              </div>
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