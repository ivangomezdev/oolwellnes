"use client"
import CoachSelector from '@/components/Coach-selector'
import LayoutData from '@/components/LayoutData'
import TextAndPhoto from '@/components/TextAndPhoto'
import ThePlace from '@/components/ThePlace'
import ThePlaceTextAndImg from '@/components/ThePlaceTextAndImg'
import VideoWLogo from '@/components/VideoWLogo'

import React, { useState } from 'react'
import "@/components/Navbar.css"
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const Page = () => {
  const [showLogo, setShowLogo] = useState(true)
  const [showNavbarLinks, setShowNavbarLinks] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive)
  }

  return (
    <div style={{ backgroundColor: "#9F9668" }}>
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
          <div className={`nav-links left ${showNavbarLinks ? "links-visible" : ""}`}>
            <Link href="/" className="nav-link home">
              Home
            </Link>
           <div
              className="nav-link about dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
             ÓOL Retreats
              {servicesOpen && (
                <div className="dropdown-menu">
                  <Link href="/oolExperience" className="dropdown-item">Rivera Maya 2025</Link>
                </div>
              )}
            </div>
          </div>

          {/* Logo */}
          <div className="navbarLogo2">
            <Image
              alt="logo"
              src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745891523/retreats-removebg-preview_plvlhh.png"}
              width={90}
              height={90}
            />
          </div>

          {/* Enlaces de la derecha */}
          <div className={`nav-links right ${showNavbarLinks ? "links-visible" : ""}`}>
            <div
              className="nav-link about dropdown"
              onMouseEnter={() => setPopupOpen(true)}
              onMouseLeave={() => setPopupOpen(false)}
            >
              Pop Up Experience
              {popupOpen && (
                <div className="dropdown-menu">
                  <Link href="/takes-over-tulum" className="dropdown-item">Takes Over Tulum</Link>
                  <Link href="/takes-over-geely-cancun" className="dropdown-item">Takes Over Geely Cancun</Link>
                  <Link href="/proximas" className="dropdown-item">Proximas</Link>
                </div>
              )}
            </div>
           
            <Link href="/contact" className="nav-link contact">
              Contact
            </Link>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`}>
          <Link href="/" className="nav-link" onClick={toggleMobileMenu}>
            Home
          </Link>
          <div className="dropdown-mobile">
            Pop Up Experience
            {/* Submenús ocultos en el menú móvil */}
            <div className="dropdown-menu-mobile" style={{ display: 'none' }}>
              <Link href="/takes-over-tulum" className="dropdown-item" onClick={toggleMobileMenu}>
                Takes Over Tulum
              </Link>
              <Link href="/takes-over-geely-cancun" className="dropdown-item" onClick={toggleMobileMenu}>
                Takes Over Geely Cancun
              </Link>
              <Link href="/proximas" className="dropdown-item" onClick={toggleMobileMenu}>
                Proximas
              </Link>
            </div>
          </div>
          <div className="dropdown-mobile">
            Services
            {/* Submenú oculto en el menú móvil */}
            <div className="dropdown-menu-mobile" style={{ display: 'none' }}>
              <Link href="/oolExperience" className="dropdown-item" onClick={toggleMobileMenu}>
                Rivera Maya 2025
              </Link>
            </div>
          </div>
          <Link href="/contact" className="nav-link" onClick={toggleMobileMenu}>
            Contact
          </Link>
        </div>
      </nav>

      <VideoWLogo />
      <TextAndPhoto />
  
      <ThePlace />
      <ThePlaceTextAndImg />
      <CoachSelector />
      <LayoutData />
      <Footer />
    </div>
  )
}

export default Page