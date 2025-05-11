"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
import Image from 'next/image';

const Navbar = ({ showLogo, showLinks, forceHamburger }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobilePopupOpen, setMobilePopupOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setPopupOpen(false);
    setServicesOpen(false);
    setMobilePopupOpen(false);
    setMobileServicesOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setPopupOpen(false);
    setServicesOpen(false);
    setMobilePopupOpen(false);
    setMobileServicesOpen(false);
  };

  const toggleMobilePopup = () => {
    setMobilePopupOpen(!mobilePopupOpen);
    setMobileServicesOpen(false);
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
    setMobilePopupOpen(false);
  };

  return (
    <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
      <div className="navbar-container">
        <div className={`nav-links left ${showLinks ? "links-visible" : ""}`}>
          <Link href="/" className="nav-link home" onClick={handleLinkClick}>
            HOME
          </Link>
          <div 
            className="nav-link about dropdown"
            onMouseEnter={() => setPopupOpen(true)}
            onMouseLeave={() => setPopupOpen(false)}
          >
            POP UP EXPERIENCE
            {popupOpen && (
              <div className="dropdown-menu">
                <Link href="/" className="dropdown-item" onClick={handleLinkClick}>
                  Takes Over Tulum (Soon)
                </Link>
                <Link href="/" className="dropdown-item" onClick={handleLinkClick}>
                  Takes Over Geely Cancun (Soon)
                </Link>
                <Link href="/" className="dropdown-item" onClick={handleLinkClick}>
                  Proximas
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-logo">
          <Image 
            src="https://res.cloudinary.com/dc5zbh38m/image/upload/v1745979884/LogoOolWeb_ri9tvt.png" 
            width={160} 
            height={80} 
            alt="Ool Retreat Logo"
          />
        </div>
        <div className={`nav-links right ${showLinks ? "links-visible" : ""}`}>
          <div 
            className="nav-link services dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            RETREATS
            {servicesOpen && (
              <div className="dropdown-menu">
                <Link href="/oolExperience" className="dropdown-item" onClick={handleLinkClick}>
                  Rivera Maya 2025
                </Link>
              </div>
            )}
          </div>
          <Link href="/contact" className="nav-link contact" onClick={handleLinkClick}>
            CONTACT
          </Link>
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
          HOME
        </Link>
        <div className="nav-link dropdown-mobile" onClick={toggleMobilePopup}>
          POP UP EXPERIENCE
          {mobilePopupOpen && (
            <div className="dropdown-menu-mobile">
              <Link href="/takes-over-tulum" className="dropdown-item" onClick={handleLinkClick}>
                Takes Over Tulum
              </Link>
              <Link href="/takes-over-geely-cancun" className="dropdown-item" onClick={handleLinkClick}>
                Takes Over Geely Cancun
              </Link>
              <Link href="/proximas" className="dropdown-item" onClick={handleLinkClick}>
                Proximas
              </Link>
            </div>
          )}
        </div>
        <div className="nav-link dropdown-mobile" onClick={toggleMobileServices}>
          RETREATS
          {mobileServicesOpen && (
            <div className="dropdown-menu-mobile">
              <Link href="/rivera-maya-2025" className="dropdown-item" onClick={handleLinkClick}>
                Rivera Maya 2025
              </Link>
            </div>
          )}
        </div>
        <Link href="/contact" className="nav-link" onClick={handleLinkClick}>
          CONTACT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;