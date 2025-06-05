"use client"
import Image from "next/image"
import "../globals.css"
import "../../components/Navbar.css";
import "./spa.css"
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext.jsx";

const t = {
  es: {
    home: "Inicio",
    retreats: "ÓOL Retreats",
    popUp: "Pop Up Experience",
    contact: "Contacto",
    rivera: "Rivera Maya 2025",
    takesOverTulum: "Takes Over Tulum",
    takesOverGeely: "Takes Over Geely Cancun",
    upcoming: "Próximas",
    retreatsMobile: "Retreats",
    muluk: "MULUK SPA",
    desc: "Sumérgete en un espacio dedicado a tu bienestar que une la sabiduría ancestral y las técnicas de distintas partes del mundo para brindarte una experiencia sensorial única que te llevará a un estado profundo de relajación.",
    salud: "SALUD BAJO MÉTODO",
    saludDesc: "Nuestros rituales están diseñados bajo un método que equilibra los principios ancestrales con técnicas contemporáneas. Cada detalle está pensado para crear una experiencia sensorial única, donde el cuerpo y la mente encuentran un estado de armonía y bienestar. Nuestros terapeutas están capacitados para brindarte una atención personalizada.",
    instalaciones: "INSTALACIONES",
    areas: "Áreas húmedas",
    areasDesc: "Sauna, vapor, jacuzzi, alberca de sensaciones, fuente de hielo, regaderas, cabinas de tratamiento.",
    zonas: "Zonas de relajación",
    zonasDesc: "Interior y exterior",
    cabinas: "Cabinas",
    cabinasDesc: "Individuales y de pareja",
    vestidores: "Vestidores",
    vista360: "Vista 360",
  },
  en: {
    home: "Home",
    retreats: "ÓOL Retreats",
    popUp: "Pop Up Experience",
    contact: "Contact",
    rivera: "Rivera Maya 2025",
    takesOverTulum: "Takes Over Tulum",
    takesOverGeely: "Takes Over Geely Cancun",
    upcoming: "Upcoming",
    retreatsMobile: "Retreats",
    muluk: "MULUK SPA",
    desc: "Immerse yourself in a space dedicated to your well-being that combines ancestral wisdom and techniques from around the world to provide you with a unique sensory experience that will take you to a deep state of relaxation.",
    salud: "HEALTH BY METHOD",
    saludDesc: "Our rituals are designed under a method that balances ancestral principles with contemporary techniques. Every detail is thought out to create a unique sensory experience, where body and mind find a state of harmony and well-being. Our therapists are trained to provide you with personalized attention.",
    instalaciones: "FACILITIES",
    areas: "Wet areas",
    areasDesc: "Sauna, steam, jacuzzi, sensations pool, ice fountain, showers, treatment cabins.",
    zonas: "Relaxation zones",
    zonasDesc: "Indoor and outdoor",
    cabinas: "Cabins",
    cabinasDesc: "Individual and couple",
    vestidores: "Dressing rooms",
    vista360: "360 View",
  },
};

export default function SpaPage() {
  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const { language, toggleLanguage } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };
  return (
    <div style={{ backgroundColor: "#BFB47B" }}>
      <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
        <div className="navbar-container">
          {/* Hamburger */}
          <div
            className={`hamburger ${isMobileMenuActive ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Left nav links */}
          <div
            className={`nav-links left ${showNavbarLinks ? "links-visible" : ""}`}
          >
            <Link href="/" className="nav-link home">
              {t[language].home}
            </Link>
            <div
              className="nav-link services dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {t[language].retreats}
              {servicesOpen && (
                <div className="dropdown-menu">
                  <Link href="/oolExperience" className="dropdown-item">
                    {t[language].rivera}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Logo */}
          <div className="navbarLogo2">
            <Image
              alt="logo"
              src={
                "https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062928/retreats-removebg-preview_plvlhh_xq82zk.png"
              }
              width={90}
              height={90}
            />
          </div>

          {/* Right nav links */}
          <div
            className={`nav-links right ${showNavbarLinks ? "links-visible" : ""}`}
          >
            <div
              className="nav-link about dropdown"
              onMouseEnter={() => setPopupOpen(true)}
              onMouseLeave={() => setPopupOpen(false)}
            >
              {t[language].popUp}
              {popupOpen && (
                <div className="dropdown-menu">
                  <Link href="/takes-over-tulum" className="dropdown-item">
                    {t[language].takesOverTulum}
                  </Link>
                  <Link
                    href="/takes-over-geely-cancun"
                    className="dropdown-item"
                  >
                    {t[language].takesOverGeely}
                  </Link>
                  <Link href="/proximas" className="dropdown-item">
                    {t[language].upcoming}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="nav-link contact">
              {t[language].contact}
            </Link>
            {/* Botón de bandera para cambiar idioma */}
            <button
              className="lang-btn"
              onClick={toggleLanguage}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "1rem",
                fontSize: "1.5rem",
                padding: 0,
              }}
              aria-label="Cambiar idioma"
            >
              {language === "es" ? (
                <img
                  src="https://flagcdn.com/es.svg"
                  alt="Español"
                  style={{ width: "2rem", height: "auto" }}
                />
              ) : (
                <img
                  src="https://flagcdn.com/gb.svg"
                  alt="English"
                  style={{ width: "2rem", height: "auto" }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`}>
          <Link href="/" className="nav-link" onClick={toggleMobileMenu}>
            {t[language].home}
          </Link>
          <div className="dropdown-mobile">
            {t[language].popUp}
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/takes-over-tulum"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].takesOverTulum}
              </Link>
              <Link
                href="/takes-over-geely-cancun"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].takesOverGeely}
              </Link>
              <Link
                href="/proximas"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].upcoming}
              </Link>
            </div>
          </div>
          <div className="dropdown-mobile">
            <Link href="/oolExperience" className="nav-link" onClick={toggleMobileMenu}>
              {t[language].retreatsMobile}
            </Link>
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/oolExperience"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                {t[language].rivera}
              </Link>
            </div>
          </div>
          <Link href="/contact" className="nav-link" onClick={toggleMobileMenu}>
            {t[language].contact}
          </Link>
          {/* Botón de bandera para cambiar idioma en menú móvil */}
          <button
            className="lang-btn"
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuActive(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "1rem",
              fontSize: "1.5rem",
              padding: 0,
              marginTop: "1rem"
            }}
            aria-label="Cambiar idioma"
          >
            {language === "es" ? (
              <img
                src="https://flagcdn.com/es.svg"
                alt="Español"
                style={{ width: "2rem", height: "auto" }}
              />
            ) : (
              <img
                src="https://flagcdn.com/gb.svg"
                alt="English"
                style={{ width: "2rem", height: "auto" }}
              />
            )}
          </button>
        </div>
      </nav>
      <main className="spa">

        <header className="spa__header">
          <h1 className="spa__title">{t[language].muluk}</h1>
          <p className="spa__description">
            {t[language].desc}
          </p>
        </header>

        <section className="spa__section">
          <div className="spa__image-container">
            <Image
              src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062926/spa1_tdefjh_p9h7bn.webp"
              alt="Muluk Spa - Área principal"
              width={600}
              height={400}
              className="spa__image"
            />
            <button className="spa__vista360">{t[language].vista360}</button>
          </div>
          <div className="spa__info">
            <h2 className="spa__section-title">{t[language].salud}</h2>
            <p className="spa__section-description">
              {t[language].saludDesc}
            </p>
          </div>
        </section>

        <section className="spa__section spa__section--reverse">
          <div className="spa__info">
            <h2 className="spa__section-title">{t[language].instalaciones}</h2>
            <ul className="spa__facilities-list">
              <li className="spa__facility">
                <strong>{t[language].areas}</strong>
                <p>{t[language].areasDesc}</p>
              </li>
              <li className="spa__facility">
                <strong>{t[language].zonas}</strong>
                <p>{t[language].zonasDesc}</p>
              </li>
              <li className="spa__facility">
                <strong>{t[language].cabinas}</strong>
                <p>{t[language].cabinasDesc}</p>
              </li>
              <li className="spa__facility">
                <strong>{t[language].vestidores}</strong>
              </li>
            </ul>
          </div>
          <div className="spa__image-container">
            <Image
              src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062848/spa2_l3dmty_q0ty7e.webp"
              alt="Muluk Spa - Cabina de tratamiento"
              width={600}
              height={400}
              className="spa__image"
            />
          </div>
        </section>
      </main>
    </div>
  )
}