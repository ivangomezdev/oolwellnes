"use client";

import { useState } from "react";
import Image from "next/image";
import "./gastronomia.css";
import Link from "next/link";
import "../../components/Navbar.css";
import BaresContent from "./BaresContent"; // Ensure these components are defined
import RestaurantesContent from "./RestaurantesContent";

export default function Gastronomia() {
  const [activeTab, setActiveTab] = useState<"restaurantes" | "bares">("bares");

  const [showLogo, setShowLogo] = useState(true);
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <main className="page">
      {/* Navbar */}
      <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
        <div className="navbar-container">
          <div
            className={`hamburger ${isMobileMenuActive ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
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
      {/* Tab Navigation */}
      <nav className="nav">
        <div className="nav__container">
          <button
            className={`nav__link ${
              activeTab === "restaurantes" ? "nav__link--active" : ""
            }`}
            onClick={() => setActiveTab("restaurantes")}
          >
            RESTAURANTES
          </button>
          <button
            className={`nav__link ${
              activeTab === "bares" ? "nav__link--active" : ""
            }`}
            onClick={() => setActiveTab("bares")}
          >
            BARES
          </button>
        </div>
      </nav>
      {/* Content */}
      {activeTab === "bares" && <BaresContent />}
      {activeTab === "restaurantes" && <RestaurantesContent />}
    </main>
  );
}