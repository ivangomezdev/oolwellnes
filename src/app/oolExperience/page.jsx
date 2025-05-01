"use client"
import CoachSelector from '@/components/Coach-selector'
import LayoutData from '@/components/LayoutData'
import TextAndPhoto from '@/components/TextAndPhoto'
import ThePlace from '@/components/ThePlace'
import ThePlaceTextAndImg from '@/components/ThePlaceTextAndImg'
import VideoWLogo from '@/components/VideoWLogo'
import YesOrNot from '@/components/YesOrNot'
import React, { useState } from 'react'
import "@/components/Navbar.css"
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  const [showLogo, setShowLogo] = useState(true)
  const [showNavbarLinks, setShowNavbarLinks] = useState(true) // For navbar links visibility
    const [popupOpen, setPopupOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <div>
    <nav className={`navbar ${showLogo ? "logo-visible" : ""}`}>
          <div className="navbar-container">
            <div className={`nav-links left ${showNavbarLinks ? "links-visible" : ""}`}>
              <Link href="/" className="nav-link home">
                Home
              </Link>
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
            </div>
            <div className="navbar-logo">
              <Image alt="logo" src={"https://res.cloudinary.com/dc5zbh38m/image/upload/v1745891523/retreats-removebg-preview_plvlhh.png"} width={60} height={40}/>
            </div>
            <div className={`nav-links right ${showNavbarLinks ? "links-visible" : ""}`}>
              <div 
                className="nav-link services dropdown"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                {servicesOpen && (
                  <div className="dropdown-menu">
                    <Link href="/rivera-maya-2025" className="dropdown-item">Rivera Maya 2025</Link>
                  </div>
                )}
              </div>
              <Link href="/contact" className="nav-link contact">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      <VideoWLogo />
      <TextAndPhoto />
      <YesOrNot />
      <ThePlace />
      <ThePlaceTextAndImg />
      <CoachSelector />
      <LayoutData />
    </div>
  )
}

export default Page