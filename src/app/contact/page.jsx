"use client";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import "./contact.css";
import React, { useState } from "react";
import "@/components/Navbar.css";
import Image from "next/image";
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
  },
};

const Page = () => {
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
    <div className="contact__content">
      <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
        <div className="navbar-container">
          {/* Hamburguesa */}
          <div
            className={`hamburger ${isMobileMenuActive ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Enlaces de la izquierda */}
          <div
            className={`nav-links left ${showNavbarLinks ? "links-visible" : ""}`}
          >
            <Link href="/" className="nav-link home">
              {t[language].home}
            </Link>
            <div
              className="nav-link about dropdown"
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

          {/* Enlaces de la derecha */}
          <div
            className={`nav-links right ${showNavbarLinks ? "links-visible" : ""}`}
          >
            <div
              className="nav-link services  dropdown"
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

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`}>
          <Link href="/" className="nav-link" onClick={toggleMobileMenu}>
            {t[language].home}
          </Link>
          <div className="dropdown-mobile">
            {t[language].popUp}
            {/* Submenús ocultos en el menú móvil */}
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
            <Link
              href="/oolExperience"
              className="nav-link"
              onClick={toggleMobileMenu}
            >
              {t[language].retreats}
            </Link>
            {/* Submenú oculto en el menú móvil */}
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
              marginTop: "1rem",
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
      <div className="contact__content">
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default Page;