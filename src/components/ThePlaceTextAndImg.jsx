"use client";

import { useState, useEffect, useRef } from "react";
import "./thePlaceTextAndImg.css";
import Image from "next/image";
import Link from "next/link";

const ThePlaceTextAndImg = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const places = [
    {
      id: 1,
      name: "Suite Garden",
      plan: "Kin-Regular",
      image:
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747104266/HABITACIONMUSICA-MR-EC-002_ttkosh.jpg",
      description:
        "El verde intenso de la selva maya te abrazará conectándote con lo más sagrado de la naturaleza. Un lugar donde sientes que el tiempo se detiene.",
      additionalInfo:
        "Vista al jardín 60 m2 I 645.8 ft2 I Capacidad máxima hasta 3 adultos I 2 adultos + 1 menor de 16 a 17 años I 1 adulto + 2 menores de 16 a 17 años I Shuttle aeropuerto - hotel - aeropuerto cada 30 minutos de 9:00 a 17:00 horas y cada 60 minutos de 17:00 a 9:00 horas I ALL-FUN INCLUSIVE",
      gallery: [
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747104273/HABITACIONPIRAMIDE-Sug-EC-001_ukt5zv.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747104266/HABITACIONPAZ-ADA-EC-001_rmctqv.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747104266/HABITACIONPIRAMIDE-SR-EC-003_truolf.jpg",
      ],
    },
    {
      id: 2,
      name: "Suite Ocean Front",
      plan: "HA-VIP",
      image:
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTAS-JSOF-EC-002_ofssvv.jpg",
      description:
        "El mar Caribe frente a ti, adornado por la paleta de colores del amanecer y la luna. Una vista inigualable desde donde podrá ver la isla de Cozumel, y el infinito se fusiona con el mar.",
      additionalInfo:
        "Vista al mar 60 m² | 645.8 ft² Capacidad máxima: 3 adultos | 2 adultos + 1 joven de 16 a 17 años | 1 adulto + 2 jóvenes de 16 a 17 años. Servicio de transporte aeropuerto-hotel-aeropuerto cada 30 minutos de 9:00 a 17:00 y cada 60 minutos de 17:00 a 9:00",
      gallery: [
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTAS-SuiteOceanFrontDoble_evcamv.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTASADABA%C3%91O-EC-001_w9sa7q.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTASADAKING-EC-002_acy1oo.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102701/HABITACIONPIRAMIDE-MSOV-EC-002_lfwhlz.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102701/HABITACIONDISE%C3%91O-SO-EC-002_fikpnq.jpg",
      ],
    },
    {
      id: 2,
      name: "Suite Ocean Front (Adults)",
      plan: "HA-VIP",
      image:
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTAS-JSOF-EC-002_ofssvv.jpg",
      description:
                "El mar Caribe frente a ti, adornado por la paleta de colores del amanecer y la luna. Una vista inigualable desde donde podrá ver la isla de Cozumel, y el infinito se fusiona con el mar.",
      additionalInfo:
        "Vista al mar 60 m² | 645.8 ft² Capacidad máxima: 3 adultos | 2 adultos + 1 joven de 16 a 17 años | 1 adulto + 2 jóvenes de 16 a 17 años. Servicio de transporte aeropuerto-hotel-aeropuerto cada 30 minutos de 9:00 a 17:00 y cada 60 minutos de 17:00 a 9:00",
      gallery: [
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTAS-SuiteOceanFrontDoble_evcamv.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTASADABA%C3%91O-EC-001_w9sa7q.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102700/HABITACIONARTISTASADAKING-EC-002_acy1oo.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102701/HABITACIONPIRAMIDE-MSOV-EC-002_lfwhlz.jpg",
        "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747102701/HABITACIONDISE%C3%91O-SO-EC-002_fikpnq.jpg",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(1);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= places.length - slidesPerView ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? places.length - slidesPerView : prevIndex - 1
    );
  };

  const openPopup = (place) => {
    setSelectedPlace(place);
    setEnlargedImage(null);
  };

  const closePopup = () => {
    setSelectedPlace(null);
    setEnlargedImage(null);
  };

  const openEnlargedImage = (image) => {
    setEnlargedImage(image);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "firefly-canvas";
    document.querySelector(".thePlaceText__cont")?.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.opacity += (Math.random() - 0.5) * 0.02;
        if (this.opacity < 0.3) this.opacity = 0.3;
        if (this.opacity > 0.8) this.opacity = 0.8;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.remove();
    };
  }, []);

  return (
    <div
      className={`thePlaceText__cont ${isVisible ? "visible" : ""}`}
      ref={containerRef}
    >
      <div className="thePlaceText__imgs">
        <div className="carousel-container">
          <button className="arrow-btn prev-btn" onClick={prevSlide}>
            <span className="arrow">
              <Image
                alt="arrow"
                src={
                  "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745779085/mente-removebg-preview_1_gjy7z2.png"
                }
                width={100}
                height={100}
              />
            </span>
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              }}
            >
              {places.map((place) => (
                <div
                  className="carousel-slide"
                  key={place.id}
                  onClick={() => openPopup(place)}
                >
                  <div className="image-container">
                    <img
                      style={{ borderRadius: "5px" }}
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="carousel-nav">
                    {places
                      .slice(0, places.length - slidesPerView + 1)
                      .map((_, index) => (
                        <button
                          key={index}
                          className={`carousel-indicator ${
                            index === currentIndex ? "active" : ""
                          }`}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow-btn next-btn" onClick={nextSlide}>
            <span className="arrow">
              <Image
                src={
                  "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745779085/mente-removebg-preview_1_gjy7z2.png"
                }
                width={100}
                height={100}
              />
            </span>
          </button>
        </div>
      </div>

      <div className="thePlaceText__description">
        <h2>{places[currentIndex].name}</h2>
         <p>{places[currentIndex].plan}</p>
        <p>{places[currentIndex].description}</p>
        <div className="thePlaceText__btnDiv">
          <button
            className="view-more-btn"
            onClick={() => openPopup(places[currentIndex])}
          >
            Ver más
          </button>
        </div>
        <img
          style={{
            position: "absolute",
            right: "0px",
            width: "400px",
            bottom: "0px",
          }}
          src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1746066714/Logo_Retiro_b7gkar.png"
          alt=""
        />
      </div>

      {selectedPlace && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="enlarged-close-btn" onClick={closePopup}>
              ✕
            </button>
            <div className="popup-image-section">
              <div className="popup-image-container">
                <img
                  src={selectedPlace.image || "/placeholder.svg"}
                  alt={selectedPlace.name}
                  onClick={() => openEnlargedImage(selectedPlace.image)}
                />
              </div>
              <div className="gallery-thumbnails">
                {selectedPlace.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${selectedPlace.name} ${index + 1}`}
                    className="thumbnail"
                    onClick={() => {
                      const newGallery = [...selectedPlace.gallery];
                      newGallery[index] = selectedPlace.image;
                      setSelectedPlace({
                        ...selectedPlace,
                        image: img,
                        gallery: newGallery,
                      });
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="popup-description">
              <h4>{selectedPlace.name}</h4>
              <p>{selectedPlace.description}</p>
              <ul className="additional-info-list">
                {selectedPlace.additionalInfo
                  .split(" I ")
                  .map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
              </ul>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                href={"/tickets"}
              >
                <button className="buy-tickets-btn">
                  <span className="ticket-icon">🎟️</span> Buy Tickets
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <img src={enlargedImage} alt="Enlarged view" />
          <button className="enlarged-close-btn" onClick={closeEnlargedImage}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ThePlaceTextAndImg;
