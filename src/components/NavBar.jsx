"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
import Image from 'next/image';
import { useLanguage } from "../context/LanguageContext.jsx";

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

const Navbar = ({ showLogo, showLinks, forceHamburger }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setPopupOpen(false);
    setServicesOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setPopupOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
      <div className="navbar-container">
        <div className={`nav-links left ${showLinks ? "links-visible" : ""}`}>
          <Link href="/" className="nav-link home" onClick={handleLinkClick}>
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
                <Link href="/oolExperience" className="dropdown-item" onClick={handleLinkClick}>
                  {t[language].rivera}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-logo">
          <Image 
            src="https://res.cloudinary.com/dtovwv8hi/image/upload/v1749062931/LogoOolWeb_ri9tvt_oit8th.png" 
            width={160} 
            height={80} 
            alt="Ool Retreat Logo"
          />
        </div>
        <div className={`nav-links right ${showLinks ? "links-visible" : ""}`}>
          <div 
            className="nav-link services dropdown"
            onMouseEnter={() => setPopupOpen(true)}
            onMouseLeave={() => setPopupOpen(false)}
          >
            {t[language].popUp}
            {popupOpen && (
              <div className="dropdown-menu">
                <Link href="/takes-over-tulum" className="dropdown-item" onClick={handleLinkClick}>
                  {t[language].takesOverTulum}
                </Link>
                <Link href="/takes-over-geely-cancun" className="dropdown-item" onClick={handleLinkClick}>
                  {t[language].takesOverGeely}
                </Link>
                <Link href="/proximas" className="dropdown-item" onClick={handleLinkClick}>
                  {t[language].upcoming}
                </Link>
              </div>
            )}
          </div>
          <Link href="/contact" className="nav-link contact" onClick={handleLinkClick}>
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

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""} ${forceHamburger ? "force-visible" : ""}`}
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Link href="/" className="nav-link" onClick={handleLinkClick}>
          {t[language].home}
        </Link>
        <div className="dropdown-mobile">
          {t[language].popUp}
          <div className="dropdown-menu-mobile" style={{ display: "none" }}>
            <Link href="/takes-over-tulum" className="dropdown-item" onClick={handleLinkClick}>
              {t[language].takesOverTulum}
            </Link>
            <Link href="/takes-over-geely-cancun" className="dropdown-item" onClick={handleLinkClick}>
              {t[language].takesOverGeely}
            </Link>
            <Link href="/proximas" className="dropdown-item" onClick={handleLinkClick}>
              {t[language].upcoming}
            </Link>
          </div>
        </div>
        <Link href="/oolExperience" className="nav-link" onClick={handleLinkClick}>
          {t[language].retreatsMobile}
        </Link>
        <Link href="/contact" className="nav-link" onClick={handleLinkClick}>
          {t[language].contact}
        </Link>
        {/* Botón de bandera para cambiar idioma en menú móvil */}
        <button
          className="lang-btn"
          onClick={() => {
            toggleLanguage();
            setIsMenuOpen(false);
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
  );
};

export default Navbar;