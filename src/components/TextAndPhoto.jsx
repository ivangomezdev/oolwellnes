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
        <p>
        Únete a nosotros durante 3 días y 2 noches en el Hotel Xcaret Arte,
          Riviera Maya.<br /> 
          
        </p>
        <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"20px"}}>
          <span style={{backgroundColor:"#BEAA88",color:"white",borderRadius:"5px",padding:"5px",fontSize:"20px"}}>Rituales de bienestar </span> <span style={{backgroundColor:"#BEAA88",padding:"5px",borderRadius:"5px",color:"white",fontSize:"20px"}}>Clases de
          Indoor cycling </span> <span style={{backgroundColor:"#BEAA88",color:"white",borderRadius:"5px",padding:"5px",fontSize:"20px"}}>Clases de entrenamiento funcional </span> <span style={{backgroundColor:"#BEAA88",borderRadius:"5px",padding:"5px",color:"white",fontSize:"20px"}}>Breathwork y más.</span>
          </div>
          <p style={{fontSize:"18px",paddingTop:"20px"}}>Una experiencia diseñada para reconectar y celebrar tu versión más
          auténtica.
     </p>
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
  );
};

export default TextAndPhoto;
