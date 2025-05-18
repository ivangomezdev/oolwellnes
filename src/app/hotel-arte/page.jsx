"use client";

import React, { useState } from "react";
import "./xcaret-arte.css";
import "../../components/Navbar.css";
import Link from "next/link";
import Image from "next/image";
export default function XcaretArte() {
 
  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <>   <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
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
              Home
            </Link>
            <div
              className="nav-link services dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              ÓOL Retreats
              {servicesOpen && (
                <div className="dropdown-menu">
                  <Link href="/oolExperience" className="dropdown-item">
                    Rivera Maya 2025
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
              Pop Up Experience
              {popupOpen && (
                <div className="dropdown-menu">
                  <Link href="/takes-over-tulum" className="dropdown-item">
                    Takes Over Tulum
                  </Link>
                  <Link
                    href="/takes-over-geely-cancun"
                    className="dropdown-item"
                  >
                    Takes Over Geely Cancun
                  </Link>
                  <Link href="/proximas" className="dropdown-item">
                    Proximas
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="nav-link contact">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`}>
          <Link href="/" className="nav-link" onClick={toggleMobileMenu}>
            Home
          </Link>
          <div className="dropdown-mobile">
            Pop Up Experience
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/takes-over-tulum"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                Takes Over Tulum
              </Link>
              <Link
                href="/takes-over-geely-cancun"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                Takes Over Geely Cancun
              </Link>
              <Link
                href="/proximas"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                Proximas
              </Link>
            </div>
          </div>
          <div className="dropdown-mobile">
            <Link href="/oolExperience" className="nav-link" onClick={toggleMobileMenu}>
            Retreats
            </Link>
            <div className="dropdown-menu-mobile" style={{ display: "none" }}>
              <Link
                href="/oolExperience"
                className="dropdown-item"
                onClick={toggleMobileMenu}
              >
                Rivera Maya 2025
              </Link>
            </div>
          </div>
          <Link href="/contact" className="nav-link" onClick={toggleMobileMenu}>
            Contact
          </Link>
        </div>
      </nav>
    <div className="xcaret">
       
      <div className="xcaret__hero"></div>

      <div className="xcaret__content">
        <section className="xcaret__section">
          <h1 className="xcaret__title">CASAS</h1>
          <p className="xcaret__description">
            Cada una de las 5 Casas de Hotel Xcaret Arte simboliza diferentes
            expresiones artísticas mexicanas, habilidades peculiares de la
            alegría y riqueza cultural de México.
          </p>
        </section>

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
          <h2 className="xcaret__cta-title">VER MÁS</h2>
          <div className="xcaret__buttons">
           <Link href={"/hotel-gastronomia"}> <button className="xcaret__button">Gastronomía</button></Link>
            <button className="xcaret__button">Spa & Wellness</button>
          </div>
        </section>
      </div>
    </div></>
  );
}
