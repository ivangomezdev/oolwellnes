"use client";

import React, { useState } from "react";
import "./xcaret-arte.css";
import "../../components/Navbar.css";
import Link from "next/link";
import Image from "next/image";
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
    casas: "CASAS",
    verMas: "VER MÁS",
    gastronomia: "Gastronomía",
    spa: "Spa & Wellness",
    // Puedes agregar más traducciones si lo necesitas
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
    casas: "HOUSES",
    verMas: "SEE MORE",
    gastronomia: "Gastronomy",
    spa: "Spa & Wellness",
    // Puedes agregar más traducciones si lo necesitas
  },
};

export default function XcaretArte() {
  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const { language } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <>
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
                "https://res.cloudinary.com/dc5zbh38m/image/upload/v1745891523/retreats-removebg-preview_plvlhh.png"
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
        </div>
      </nav>
      <div className="xcaret">
        <div className="xcaret__hero"></div>

        <div className="xcaret__content">
          <section className="xcaret__section">
            <h1 className="xcaret__title">{t[language].casas}</h1>
            <p className="xcaret__description">
              {language === "es"
                ? "Cada una de las 5 Casas de Hotel Xcaret Arte simboliza diferentes expresiones artísticas mexicanas, habilidades peculiares de la alegría y riqueza cultural de México."
                : "Each of the 5 Houses at Hotel Xcaret Arte symbolizes different Mexican artistic expressions, unique skills, and the joyful cultural richness of Mexico."}
            </p>
          </section>

          {/* ...resto del contenido de las casas... */}
          {/* Puedes traducir los nombres de las casas y los elementos si lo deseas */}

          <section className="xcaret__section">
            <div className="xcaret__casa">
              <h2 className="xcaret__casa-title">Casas del Diseño</h2>
              <ul className="xcaret__list">
                <li className="xcaret__list-item">Taller de Textil</li>
                <li className="xcaret__list-item">Restaurante Chayote</li>
                <li className="xcaret__list-item">
                  Rooftop Bar Casas del Diseño
                </li>
                <li className="xcaret__list-item">Recepción</li>
                <li className="xcaret__list-item">Boutique</li>
              </ul>
            </div>
            <div className="xcaret__separator"></div>
          </section>

          <section className="xcaret__section">
            <div className="xcaret__casa">
              <h2 className="xcaret__casa-title">Casas de los Artistas</h2>
              <ul className="xcaret__list">
                <li className="xcaret__list-item">Taller de Pintura</li>
                <li className="xcaret__list-item">Restaurante Kibi-Kibi</li>
                <li className="xcaret__list-item">
                  Rooftop Bar Casas de los Artistas
                </li>
                <li className="xcaret__list-item">Biblioteca</li>
                <li className="xcaret__list-item">Gimnasio</li>
                <li className="xcaret__list-item">Boutique</li>
              </ul>
            </div>
            <div className="xcaret__separator"></div>
          </section>

          <section className="xcaret__section">
            <div className="xcaret__casa">
              <h2 className="xcaret__casa-title">Casas de la Pirámide</h2>
              <ul className="xcaret__list">
                <li className="xcaret__list-item">Taller de Alfarería</li>
                <li className="xcaret__list-item">Restaurante Mexí</li>
                <li className="xcaret__list-item">
                  Rooftop Bar Casas de la Pirámide
                </li>
                <li className="xcaret__list-item">
                  Spa Bar Casas de la Pirámide
                </li>
                <li className="xcaret__list-item">Boutique</li>
              </ul>
            </div>
            <div className="xcaret__separator"></div>
          </section>

          <section className="xcaret__section">
            <div className="xcaret__casa">
              <h2 className="xcaret__casa-title">Casas de la Música</h2>
              <ul className="xcaret__list">
                <li className="xcaret__list-item">Taller de Baile</li>
                <li className="xcaret__list-item">Restaurante Encanta</li>
                <li className="xcaret__list-item">
                  Rooftop Bar Casas de la Música
                </li>
                <li className="xcaret__list-item">Spa Bar Casas de la Música</li>
                <li className="xcaret__list-item">Boutique</li>
              </ul>
            </div>
            <div className="xcaret__separator"></div>
          </section>

          <section className="xcaret__section">
            <div className="xcaret__casa">
              <h2 className="xcaret__casa-title">Casas de la Paz</h2>
              <ul className="xcaret__list">
                <li className="xcaret__list-item">Rooftop Bar Casas de la Paz</li>
                <li className="xcaret__list-item">Restaurante Cayuco</li>
                <li className="xcaret__list-item">Muluk Spa</li>
                <li className="xcaret__list-item">Gimnasio</li>
                <li className="xcaret__list-item">Boutique</li>
              </ul>
            </div>
            <div className="xcaret__separator"></div>
          </section>

          <section className="xcaret__section">
            <div className="xcaret__casa">
              <h2 className="xcaret__casa-title">Casas del Patrón</h2>
              <ul className="xcaret__list">
                <li className="xcaret__list-item">Cantina Mi Ajá</li>
                <li className="xcaret__list-item">
                  Restaurante Mercado de San Juan
                </li>
                <li className="xcaret__list-item">Restaurante Xin-Gao</li>
                <li className="xcaret__list-item">Restaurante Olios Atelier</li>
                <li className="xcaret__list-item">Cafetería</li>
                <li className="xcaret__list-item">Boutique</li>
              </ul>
            </div>
            <div className="xcaret__separator"></div>
          </section>

          <section className="xcaret__cta-section">
            <h2 className="xcaret__cta-title">{t[language].verMas}</h2>
            <div className="xcaret__buttons">
              <Link href={"/hotel-gastronomia"}>
                <button className="xcaret__button">{t[language].gastronomia}</button>
              </Link>
              <button className="xcaret__button">{t[language].spa}</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}