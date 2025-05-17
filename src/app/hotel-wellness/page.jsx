"use client"
import Image from "next/image"
import "../globals.css"
import "../../components/Navbar.css";
import "./spa.css"
import { useState } from "react";
import Link from "next/link";

export default function SpaPage() {
      const [showLogo, setShowLogo] = useState(true);
      const [showNavbarLinks, setShowNavbarLinks] = useState(true);
      const [popupOpen, setPopupOpen] = useState(false);
      const [servicesOpen, setServicesOpen] = useState(false);
      const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    
      const toggleMobileMenu = () => {
        setIsMobileMenuActive(!isMobileMenuActive);
      };
  return (
    <div style={{backgroundColor:"#BFB47B"}}>
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
            Retreats
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
    <main className="spa">

      <header className="spa__header">
        <h1 className="spa__title">MULUK SPA</h1>
        <p className="spa__description">
          Sumérgete en un espacio dedicado a tu bienestar que une la sabiduría ancestral y las técnicas de distintas
          partes del mundo para brindarte una experiencia sensorial única que te llevará a un estado profundo de
          relajación.
        </p>
      </header>

      <section className="spa__section">
        <div className="spa__image-container">
          <Image
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747463245/muluc_mshoyx.webp"
            alt="Muluk Spa - Área principal"
            width={600}
            height={400}
            className="spa__image"
          />
          <button className="spa__vista360">Vista 360</button>
        </div>
        <div className="spa__info">
          <h2 className="spa__section-title">SALUD BAJO MÉTODO</h2>
          <p className="spa__section-description">
            Nuestros rituales están diseñados bajo un método que equilibra los principios ancestrales con técnicas
            contemporáneas. Cada detalle está pensado para crear una experiencia sensorial única, donde el cuerpo y la
            mente encuentran un estado de armonía y bienestar. Nuestros terapeutas están capacitados para brindarte una
            atención personalizada.
          </p>
        </div>
      </section>

      <section className="spa__section spa__section--reverse">
        <div className="spa__info">
          <h2 className="spa__section-title">INSTALACIONES</h2>
          <ul className="spa__facilities-list">
            <li className="spa__facility">
              <strong>Áreas húmedas</strong>
              <p>Sauna, vapor, jacuzzi, alberca de sensaciones, fuente de hielo, regaderas, cabinas de tratamiento.</p>
            </li>
            <li className="spa__facility">
              <strong>Zonas de relajación</strong>
              <p>Interior y exterior</p>
            </li>
            <li className="spa__facility">
              <strong>Cabinas</strong>
              <p>Individuales y de pareja</p>
            </li>
            <li className="spa__facility">
              <strong>Vestidores</strong>
            </li>
          </ul>
        </div>
        <div className="spa__image-container">
          <Image
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1747463245/spa2_xmafot.webp"
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
