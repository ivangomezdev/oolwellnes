import React from "react";
import "./PlansPreSaleInfo.css";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext.jsx";

const t = {
  es: {
    kinTitle: "Kin - Paquete Regular",
    haTitle: "Ha - Paquete VIP",
    kin: [
      "3 Días y 2 noches en Hotel Xcaret Arte",
      "Menú por chefs con estrella Michellin",
      "Acceso ilimitado a todos los parques y tours de Grupo Xcaret",
      "Transporte al aeropuerto (CUN - Hotel - CUN)",
      "Welcome Social Gathering con DJ",
      <>
        6 high-energy cycling sessions con top coaches como{" "}
        <span style={{ color: "#F4E1D1" }}>
          Kristina Girod, Pepe Abreu y Majo Ake{" "}
        </span>
      </>,
      "Closing Sunset Party",
      "Y mucho más...",
    ],
    ha: [
      "3 Días y 2 noches en Hotel Xcaret Arte",
      "Menú por chefs con estrella Michellin",
      "Acceso ilimitado a todos los parques y tours de Grupo Xcaret",
      "Transporte al aeropuerto (CUN - Hotel - CUN)",
      "Welcome Social Gathering con DJ",
      <>
        6 sessions con top coaches como{" "}
        <span style={{ color: "#F4E1D1" }}>
          Kristina Girod, Pepe Abreu y Majo Ake
        </span>
      </>,
      "Closing Sunset Party",
      <span style={{ color: "#F4E1D1" }}> Exclusive restaurants</span>,
      <span style={{ color: "#F4E1D1" }}> Ocean Front Suite</span>,
      <>
        Early booking access para{" "}
        <span style={{ color: "#F4E1D1" }}>reservar antes que nadie</span>{" "}
        clases, restaurantes y experiencias adicionales.
      </>,
    ],
    btnRestaurants: "Restaurantes",
    btnWellness: "Wellness/Spa",
    btnPresale: "venta",
  },
  en: {
    kinTitle: "Kin - Regular Package",
    haTitle: "Ha - VIP Package",
    kin: [
      "3 days and 2 nights at Hotel Xcaret Arte",
      "Menu by Michelin-starred chefs",
      "Unlimited access to all Grupo Xcaret parks and tours",
      "Airport transportation (CUN - Hotel - CUN)",
      "Welcome Social Gathering with DJ",
      <>
        6 high-energy cycling sessions with top coaches like{" "}
        <span style={{ color: "#F4E1D1" }}>
          Kristina Girod, Pepe Abreu, and Majo Ake{" "}
        </span>
      </>,
      "Closing Sunset Party",
      "And much more...",
    ],
    ha: [
      "3 days and 2 nights at Hotel Xcaret Arte",
      "Menu by Michelin-starred chefs",
      "Unlimited access to all Grupo Xcaret parks and tours",
      "Airport transportation (CUN - Hotel - CUN)",
      "Welcome Social Gathering with DJ",
      <>
        6 sessions with top coaches like{" "}
        <span style={{ color: "#F4E1D1" }}>
          Kristina Girod, Pepe Abreu, and Majo Ake
        </span>
      </>,
      "Closing Sunset Party",
      <span style={{ color: "#F4E1D1" }}> Exclusive restaurants</span>,
      <span style={{ color: "#F4E1D1" }}> Ocean Front Suite</span>,
      <>
        Early booking access to{" "}
        <span style={{ color: "#F4E1D1" }}>book before anyone else</span>{" "}
        classes, restaurants, and additional experiences.
      </>,
    ],
    btnRestaurants: "Restaurants",
    btnWellness: "Wellness/Spa",
    btnPresale: "Sale",
  },
};

const PlansPreSaleInfo = () => {
  const { language } = useLanguage();

  return (
    <div className="plansPre__content">
      <video
        src="https://res.cloudinary.com/dtovwv8hi/video/upload/v1749062926/AQNOeKr5Fpg0nmpTCm9buI-ZXSHOXpQnm6gPyEaqcxAwhP25VLeodkUttM67OM6Qt7ytejlYqmP54e4L0oqK89zQe_tA1j-mQZgtkbY_wcrkpk_b3dnhj.mp4"
        playsInline
        muted
        autoPlay
        loop
      ></video>

      <div className="plansPre__imgsCont">
        <div
          className="plansPre__imgsCont"
          style={{ position: "relative", display: "inline-block" }}
        >
          <div
            className="plansPre__occult"
            style={{ position: "absolute", top: "-9px" }}
          >
            <img
              className="plansPre__imgsContimg"
              src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062934/HABITACIONDISE%C3%91O-SO-EC-002_fikpnq_uvh9s0.jpg"
              alt=""
            />
            <div />
          </div>
          <div className="plansPre__bgBlack2">
            <img
              className="plansPre__bgBlack2Logo"
              src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062926/Sin_t%C3%ADtulo-removebg-preview_vxjtsj_v0lrul.png"
              alt="icon"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="plansPre__plan">
          <h3>{t[language].kinTitle}</h3>
          <ul>
            {t[language].kin.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
            <div className="PlanPre__btns">
              <Link href={"/hotel-gastronomia"}>
                <button>{t[language].btnRestaurants}</button>
              </Link>
              <Link href={"/hotel-wellness"}>
                <button>{t[language].btnWellness}</button>
              </Link>
              <Link href={"/tickets"}>
                <button>{t[language].btnPresale}</button>
              </Link>
            </div>
          </ul>
        </div>
        <div className="plansPre__plan">
          <h3>{t[language].haTitle}</h3>
          <ul>
            {t[language].ha.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
            <div className="PlanPre__btns">
              <Link href={"/hotel-gastronomia"}>
                <button>{t[language].btnRestaurants}</button>
              </Link>
              <Link href={"/hotel-wellness"}>
                <button>{t[language].btnWellness}</button>
              </Link>
              <Link href={"/tickets"}>
                <button>{t[language].btnPresale}</button>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlansPreSaleInfo;